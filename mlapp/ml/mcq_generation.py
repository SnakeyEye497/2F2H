import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
import random
import nltk
import re
import json

# Ensure NLTK data is downloaded properly
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    print("Downloading NLTK punkt tokenizer...")
    nltk.download('punkt')

from nltk.tokenize import sent_tokenize

def initialize_question_generator():
    """Initialize the T5 model and tokenizer"""
    print("Loading T5 model and tokenizer...")
    tokenizer = T5Tokenizer.from_pretrained('t5-small')
    model = T5ForConditionalGeneration.from_pretrained('t5-small')
    print("Model loaded successfully!")
    return model, tokenizer

def extract_key_sentences(text, max_sentences=10):
    """Extract important sentences from text"""
    # Handle potential tokenization errors
    try:
        sentences = sent_tokenize(text)
    except Exception as e:
        print(f"Error tokenizing text: {e}")
        # Fallback to simple splitting by periods
        sentences = [s.strip() + '.' for s in text.split('.') if s.strip()]

    # For a hackathon, we'll use a simple heuristic to identify important sentences
    # Sentences with numbers, technical terms, or longer than average might be important
    scored_sentences = []
    for sentence in sentences:
        score = 0
        # Longer sentences might contain more information
        if len(sentence) > 10:
            score += len(sentence) / 20

        # Sentences with numbers often contain facts
        if re.search(r'\d+', sentence):
            score += 5

        # Sentences with keywords might be important
        keywords = ['important', 'significant', 'key', 'main', 'critical', 'essential']
        for keyword in keywords:
            if keyword in sentence.lower():
                score += 3

        scored_sentences.append((sentence, score))

    # Sort by score and take top sentences
    important_sentences = [s[0] for s in sorted(scored_sentences, key=lambda x: x[1], reverse=True)[:max_sentences]]
    return important_sentences

def generate_questions_with_t5(text, model=None, tokenizer=None, num_questions=5):
    """Generate questions from text using T5 model"""
    # Initialize model and tokenizer if not provided
    if model is None or tokenizer is None:
        model, tokenizer = initialize_question_generator()

    # Extract important sentences to focus on
    key_sentences = extract_key_sentences(text)
    combined_text = " ".join(key_sentences)

    # Prepare input for question generation
    input_text = f"generate questions: {combined_text}"

    print(f"Generating questions from text (length: {len(input_text)} chars)...")

    # Tokenize input
    input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    # Generate questions
    outputs = model.generate(
        input_ids=input_ids,
        max_length=64,
        num_beams=10,
        no_repeat_ngram_size=2,
        num_return_sequences=min(num_questions * 2, 10),  # Generate extra for filtering
        early_stopping=True
    )

    # Decode questions
    generated_questions = []
    for output in outputs:
        question_text = tokenizer.decode(output, skip_special_tokens=True)
        # Add to list if it ends with a question mark
        if '?' in question_text:
            generated_questions.append(question_text)

    # For a hackathon, let's add a simple way to generate answers and options
    processed_questions = []
    for question in generated_questions[:num_questions]:
        # Generate a simple answer (in a real app, you'd use a QA model for this)
        answer = generate_simple_answer(question, text)

        # Generate options for MCQs
        options = [answer]
        for _ in range(3):  # Generate 3 distractors
            distractor = generate_distractor(answer, text)
            if distractor and distractor not in options:
                options.append(distractor)

        # Fill in with generic options if needed
        while len(options) < 4:
            options.append(f"Option {len(options) + 1}")

        # Shuffle options
        random.shuffle(options)

        processed_questions.append({
            'type': 'mcq',
            'question': question,
            'options': options,
            'correct_answer': answer,
            'source_text': get_relevant_context(question, text)
        })

    # Generate some true/false questions too
    tf_questions = generate_true_false_questions(key_sentences, num_questions // 2)

    return processed_questions[:num_questions] + tf_questions

def generate_simple_answer(question, text):
    """Generate a simple answer based on the question and text
    This is a simplified approach for the hackathon"""

    # Extract potential answer entities based on question type
    if "who" in question.lower():
        # Look for proper nouns as answer candidates
        proper_nouns = re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', text)
        if proper_nouns:
            return random.choice(proper_nouns)

    elif "when" in question.lower():
        # Look for dates or years
        dates = re.findall(r'\b\d{4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,\s+\d{4}\b', text)
        if dates:
            return random.choice(dates)

    elif "where" in question.lower():
        # Look for locations (simplified)
        locations = re.findall(r'\b[A-Z][a-z]+(?:,\s+[A-Z][a-z]+)?\b', text)
        if locations:
            return random.choice(locations)

    # Default approach: extract a key phrase
    words = text.split()
    if len(words) > 5:
        start = random.randint(0, len(words) - 5)
        return " ".join(words[start:start+random.randint(1, 3)])

    return "Answer not found"

def generate_distractor(answer, text):
    """Generate a plausible but incorrect option"""
    # Simple approach: get a different phrase from the text
    words = text.split()
    if len(words) > 5:
        start = random.randint(0, len(words) - 5)
        distractor = " ".join(words[start:start+random.randint(1, 3)])
        # Ensure it's different from the answer
        if distractor.lower() != answer.lower():
            return distractor

    # Fallback options
    fallback_options = ["Option A", "Option B", "Option C", "Option D"]
    for option in fallback_options:
        if option.lower() != answer.lower():
            return option

    return "Alternative option"

def get_relevant_context(question, text):
    """Find the most relevant section of text for a question"""
    try:
        sentences = sent_tokenize(text)
    except Exception:
        # Fallback to simple splitting
        sentences = [s.strip() + '.' for s in text.split('.') if s.strip()]

    # Simple approach: find sentences with words from the question
    question_words = set(re.findall(r'\b\w+\b', question.lower()))

    best_sentence = ""
    best_score = 0

    for sentence in sentences:
        sentence_words = set(re.findall(r'\b\w+\b', sentence.lower()))
        # Count matching words
        score = len(question_words.intersection(sentence_words))
        if score > best_score:
            best_score = score
            best_sentence = sentence

    return best_sentence if best_score > 0 else sentences[0] if sentences else text[:100]

def generate_true_false_questions(sentences, num_questions=3):
    """Generate true/false questions from sentences"""
    tf_questions = []

    for i, sentence in enumerate(sentences):
        if i >= num_questions:
            break

        # 50% chance of creating a false statement
        is_true = random.choice([True, False])

        if is_true:
            question = f"True or False: {sentence}"
            tf_questions.append({
                'type': 'true_false',
                'question': question,
                'options': ['True', 'False'],
                'correct_answer': 'True',
                'source_text': sentence
            })
        else:
            # Create a false version by modifying the sentence
            modified = modify_sentence_for_false(sentence)
            question = f"True or False: {modified}"
            tf_questions.append({
                'type': 'true_false',
                'question': question,
                'options': ['True', 'False'],
                'correct_answer': 'False',
                'source_text': sentence
            })

    return tf_questions

def modify_sentence_for_false(sentence):
    """Modify a sentence to make it false"""
    # Simple approach for hackathon: negate the sentence or change numbers

    # Try to negate the sentence
    if " not " not in sentence.lower() and " no " not in sentence.lower():
        words = sentence.split()
        for i, word in enumerate(words):
            if word.lower() in ['is', 'are', 'was', 'were', 'has', 'have', 'had', 'can', 'will']:
                words.insert(i+1, "not")
                return " ".join(words)

    # Change numbers if present
    numbers = re.findall(r'\b\d+\b', sentence)
    if numbers:
        number = random.choice(numbers)
        new_number = str(int(number) + random.randint(1, 10))
        return sentence.replace(number, new_number)

    # Add "not" somewhere as a fallback
    return "It is not true that " + sentence.lower()

# Simple question generator - alternative approach
def simple_question_generator(text, num_questions=5):
    """A simpler question generator that doesn't require T5"""
    print("Using simple question generator instead of T5...")

    try:
        sentences = sent_tokenize(text)
    except Exception:
        # Fallback to simple splitting
        sentences = [s.strip() + '.' for s in text.split('.') if s.strip()]

    # Get important sentences
    key_sentences = extract_key_sentences(text)

    questions = []

    # Generate some MCQs
    for i, sentence in enumerate(key_sentences):
        if i >= num_questions // 2:
            break

        # Try to find a key entity to ask about
        entities = re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', sentence)
        dates = re.findall(r'\b\d{4}\b', sentence)
        numbers = re.findall(r'\b\d+\b', sentence)

        if entities:
            entity = random.choice(entities)
            question_text = sentence.replace(entity, "______")
            question_text = f"Which of the following correctly fills in the blank? {question_text}"

            # Create options
            options = [entity]
            # Add some other entities as distractors
            other_entities = [e for e in entities if e != entity]
            other_entities.extend([e for e in re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', text) if e not in entities])

            # Get unique distractors
            for e in other_entities[:3]:
                if e not in options and len(options) < 4:
                    options.append(e)

            # Fill with generic options if needed
            while len(options) < 4:
                options.append(f"Option {len(options) + 1}")

            random.shuffle(options)

            questions.append({
                'type': 'mcq',
                'question': question_text,
                'options': options,
                'correct_answer': entity,
                'source_text': sentence
            })

        elif dates or numbers:
            item = random.choice(dates or numbers)
            question_text = sentence.replace(item, "______")
            question_text = f"Which number correctly fills in the blank? {question_text}"

            # Create options
            options = [item]
            # Create some wrong numbers
            for _ in range(3):
                if item in dates:
                    # For years, add some nearby years
                    wrong_item = str(int(item) + random.randint(-20, 20))
                else:
                    # For other numbers, do +/- operations
                    wrong_item = str(int(item) + random.randint(1, int(item) if int(item) < 10 else 10))

                if wrong_item not in options:
                    options.append(wrong_item)

            # Fill with generic options if needed
            while len(options) < 4:
                options.append(f"{int(item) + len(options) * 5}")

            random.shuffle(options)

            questions.append({
                'type': 'mcq',
                'question': question_text,
                'options': options,
                'correct_answer': item,
                'source_text': sentence
            })

    # Add some true/false questions
    tf_questions = generate_true_false_questions(key_sentences, num_questions - len(questions))
    questions.extend(tf_questions)

    return questions

# Run with fallback - fixed the variable reference issue
def run_with_fallback():
    sample_text = """
    Machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to 'learn' from data, without being explicitly programmed. The name machine learning was coined in 1959 by Arthur Samuel. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as email filtering and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.

    Machine learning is closely related to computational statistics, which focuses on making predictions using computers. The study of mathematical optimization delivers methods, theory and application domains to the field of machine learning. Data mining is a related field of study, focusing on exploratory data analysis through unsupervised learning. In its application across business problems, machine learning is also referred to as predictive analytics.
    """

    try:
        # Try to use T5
        model, tokenizer = initialize_question_generator()
        questions = generate_questions_with_t5(lists, model, tokenizer, 5)  # Fixed: changed 'lists' to 'sample_text'
    except Exception as e:
        print(f"Error using T5 model: {e}")
        # Fallback to simpler method
        questions = simple_question_generator(lists, 5)  # Fixed: changed 'lists' to 'sample_text'

    # Print the generated questions
    print("\nGenerated Questions:")
    for i, q in enumerate(questions):
        print(f"\n{i+1}. {q['question']}")
        if q['type'] == 'mcq':
            print("Options:")
            for j, option in enumerate(q['options']):
                correct = "✓" if option == q['correct_answer'] else " "
                print(f"  {chr(65+j)}. {option} {correct}")
        else:  # true/false
            print(f"Correct answer: {q['correct_answer']}")
        print(f"Source text: \"{q['source_text']}\"")
    
    return questions

# Fixed this function - removed the duplicate implementation and consolidated approaches
def save_mcqs_to_json(mcqs, filename="mcqs.json"):
    """Save the generated MCQs to a JSON file"""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(mcqs, f, indent=4, ensure_ascii=False)
    print(f"MCQs saved successfully in {filename}")

# Main example function - simplified and fixed
def run_example():
    sample_text = """
    Machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to 'learn' from data, without being explicitly programmed. The name machine learning was coined in 1959 by Arthur Samuel. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions.
    """

    try:
        # Try with T5 approach
        model, tokenizer = initialize_question_generator()
        mcqs = generate_questions_with_t5(lists, model, tokenizer, num_questions=5)
        
        # Print generated questions
        print("\nGenerated Questions:")
        for i, q in enumerate(mcqs):
            print(f"\n{i+1}. {q['question']}")
            if q['type'] == 'mcq':
                print("Options:")
                for j, option in enumerate(q['options']):
                    correct = "✓" if option == q['correct_answer'] else " "
                    print(f"  {chr(65+j)}. {option} {correct}")
            else:  # true/false
                print(f"Correct answer: {q['correct_answer']}")
            print(f"Source text: \"{q['source_text']}\"")
        
        # Save MCQs to JSON file
        save_mcqs_to_json(mcqs)
        
    except Exception as e:
        print(f"Error in T5 approach: {e}")
        print("Falling back to simple approach...")
        mcqs = simple_question_generator(lists, num_questions=5)
        save_mcqs_to_json(mcqs)

# Run example if script is executed directly
if __name__ == "__main__":
    run_example()




#     # In your views.py
# from .ml_utils.question_generator import generate_questions_with_t5, simple_question_generator

# def generate_questions_view(request):
#     if request.method == "POST":
#         text = request.POST.get("text", "")
        
#         # Try using T5, with fallback to simple generator
#         try:
#             model, tokenizer = initialize_question_generator()
#             questions = generate_questions_with_t5(text, model, tokenizer, 5)
#         except Exception:
#             questions = simple_question_generator(text, 5)
        
#         # Now use the questions in your context
#         return render(request, 'questions_template.html', {'questions': questions})