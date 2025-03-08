#teach back mode

import json
import random
import re
from datetime import datetime
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
# You might need to run these once:
# nltk.download('punkt')
# nltk.download('stopwords')

class TeachBackSystem:
    def __init__(self):
        self.student_data = {}
        self.topics = self.load_topics()
        self.badges = {
            "master_explainer": {"name": "Master Explainer", "description": "Explained 5 concepts perfectly"},
            "quick_learner": {"name": "Quick Learner", "description": "Improved explanation after a single hint"},
            "persistent": {"name": "Persistent", "description": "Successfully explained a concept after 3+ attempts"}
        }

    def load_topics(self):
        """Load topics from a JSON file or initialize with defaults"""
        try:
            with open('/content/gravity_concepts.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            # Default topics if file doesn't exist
            return {
                "science": {
                    "gravity": {
                        "key_concepts": ["force", "attraction", "mass", "earth", "objects", "pull", "weight"],
                        "required_concepts": ["force", "mass", "attraction"],
                        "hint_questions": [
                            "What happens to objects when dropped on Earth?",
                            "Can you explain how mass affects gravity?",
                            "Can you give a real-life example of gravity in action?"
                        ],
                        "example_good_explanation": "Gravity is a force that attracts objects with mass toward each other. On Earth, gravity pulls objects downward, giving them weight. The more mass an object has, the stronger its gravitational pull."
                    },
                    "photosynthesis": {
                        "key_concepts": ["plants", "sunlight", "energy", "carbon dioxide", "water", "oxygen", "sugar", "chlorophyll"],
                        "required_concepts": ["plants", "sunlight", "carbon dioxide", "oxygen"],
                        "hint_questions": [
                            "What do plants need to perform photosynthesis?",
                            "What gas do plants take in during photosynthesis?",
                            "What does a plant produce during photosynthesis?"
                        ],
                        "example_good_explanation": "Photosynthesis is how plants make their food. They use sunlight, water, and carbon dioxide to create sugar for energy and release oxygen as a byproduct. The process happens in the chlorophyll, which gives plants their green color."
                    }
                },
                "math": {
                    "pythagorean_theorem": {
                        "key_concepts": ["right triangle", "hypotenuse", "squared", "sides", "a²+b²=c²", "calculate", "length"],
                        "required_concepts": ["right triangle", "hypotenuse", "a²+b²=c²"],
                        "hint_questions": [
                            "How does the Pythagorean theorem relate to triangles?",
                            "Can you write the formula for the Pythagorean theorem?",
                            "When would you use the Pythagorean theorem in real life?"
                        ],
                        "example_good_explanation": "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides. This is written as a²+b²=c², where c is the hypotenuse."
                    }
                }
            }

    def save_student_data(self):
        """Save student data to a JSON file"""
        with open('student_data.json', 'w') as f:
            json.dump(self.student_data, f)

    def load_student_data(self):
        """Load student data from a JSON file"""
        try:
            with open('student_data.json', 'r') as f:
                self.student_data = json.load(f)
        except FileNotFoundError:
            self.student_data = {}

    def register_student(self, student_id, name):
        """Register a new student or update existing student info"""
        if student_id not in self.student_data:
            self.student_data[student_id] = {
                "name": name,
                "points": 0,
                "badges": [],
                "topic_history": {},
                "weak_areas": [],
                "created_at": datetime.now().isoformat(),
                "last_active": datetime.now().isoformat()
            }
        else:
            self.student_data[student_id]["name"] = name
            self.student_data[student_id]["last_active"] = datetime.now().isoformat()

        self.save_student_data()
        return self.student_data[student_id]

    def select_topic(self, student_id):
        """Select a topic for the student to explain based on their history"""
        student = self.student_data.get(student_id)

        if not student:
            return None

        # Prioritize weak areas
        if student["weak_areas"] and random.random() < 0.7:  # 70% chance to pick from weak areas
            category, topic = random.choice(student["weak_areas"])
            return category, topic

        # Otherwise, pick a random topic
        category = random.choice(list(self.topics.keys()))
        topic = random.choice(list(self.topics[category].keys()))

        # Check if we've seen this topic before and it's been asked too recently
        topic_history = student.get("topic_history", {})
        if f"{category}_{topic}" in topic_history:
            # If topic was asked in last 5 attempts, try to find another
            recent_topics = list(topic_history.items())[-5:]
            if f"{category}_{topic}" in [t[0] for t in recent_topics]:
                # Try one more time to find a different topic
                new_category = random.choice(list(self.topics.keys()))
                new_topic = random.choice(list(self.topics[new_category].keys()))
                if f"{new_category}_{new_topic}" not in [t[0] for t in recent_topics]:
                    category, topic = new_category, new_topic

        return category, topic

    def generate_question(self, category, topic):
        """Generate a question for the given topic"""
        topic_data = self.topics[category][topic]

        question_templates = [
            f"Can you explain {topic} in your own words?",
            f"What is {topic}? Please explain it as if you're teaching someone.",
            f"How would you describe {topic} to someone who doesn't know about it?",
            f"Imagine you're teaching a friend about {topic}. What would you say?",
            f"Based on what you've learned, could you explain {topic}?"
        ]

        return random.choice(question_templates)

    def evaluate_explanation(self, explanation, category, topic):
        """
        Evaluate the student's explanation
        Returns: score (0-100), feedback, missing_concepts, is_complete
        """
        topic_data = self.topics[category][topic]

        # Tokenize and clean the explanation
        tokens = word_tokenize(explanation.lower())
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word.isalnum() and word not in stop_words]

        # Check for key concepts
        found_concepts = {}
        for concept in topic_data["key_concepts"]:
            # Check for the concept or related terms
            if concept in tokens or any(c in explanation.lower() for c in concept.split()):
                found_concepts[concept] = True

        # Check for required concepts
        missing_concepts = []
        for required in topic_data["required_concepts"]:
            if required not in found_concepts:
                missing_concepts.append(required)

        # Calculate completeness score
        key_concept_score = len(found_concepts) / len(topic_data["key_concepts"]) * 60
        required_concept_score = (len(topic_data["required_concepts"]) - len(missing_concepts)) / len(topic_data["required_concepts"]) * 40
        total_score = int(key_concept_score + required_concept_score)

        # Generate feedback
        if total_score >= 90:
            feedback = "Excellent explanation! You've covered all the key points about " + topic + "."
            is_complete = True
        elif total_score >= 70:
            feedback = "Good explanation. You've covered most of the important aspects of " + topic + "."
            is_complete = len(missing_concepts) == 0
        elif total_score >= 50:
            feedback = "Decent start, but your explanation could be more complete."
            is_complete = False
        else:
            feedback = "I think you need to review " + topic + " more. Let's try again with some hints."
            is_complete = False

        return {
            "score": total_score,
            "feedback": feedback,
            "missing_concepts": missing_concepts,
            "is_complete": is_complete
        }

    def get_hint(self, category, topic, missing_concepts=None):
        """Get a hint question for the student"""
        topic_data = self.topics[category][topic]

        if missing_concepts and len(missing_concepts) > 0:
            # Find hints related to missing concepts
            for concept in missing_concepts:
                concept_index = topic_data["key_concepts"].index(concept) if concept in topic_data["key_concepts"] else -1
                if concept_index >= 0 and concept_index < len(topic_data["hint_questions"]):
                    return topic_data["hint_questions"][concept_index]

        # If no specific concept hints were found, return a random hint
        return random.choice(topic_data["hint_questions"])

    def update_student_progress(self, student_id, category, topic, score, is_complete, attempt_num=1):
        """Update student progress after an explanation attempt"""
        if student_id not in self.student_data:
            return False

        student = self.student_data[student_id]
        topic_key = f"{category}_{topic}"

        # Update topic history
        if "topic_history" not in student:
            student["topic_history"] = {}

        if topic_key not in student["topic_history"]:
            student["topic_history"][topic_key] = {
                "attempts": 0,
                "best_score": 0,
                "last_attempt": None,
                "completed": False
            }

        topic_history = student["topic_history"][topic_key]
        topic_history["attempts"] += 1
        topic_history["last_attempt"] = datetime.now().isoformat()

        if score > topic_history["best_score"]:
            topic_history["best_score"] = score

        # Update completion status
        if is_complete:
            topic_history["completed"] = True

            # Award points
            points_earned = score // 10  # 1 point for every 10 score points
            if attempt_num == 1:
                points_earned += 3  # Bonus for getting it right the first time

            student["points"] += points_earned

            # Remove from weak areas if present
            if "weak_areas" in student:
                if [category, topic] in student["weak_areas"]:
                    student["weak_areas"].remove([category, topic])
        else:
            # Add to weak areas if not already there
            if "weak_areas" not in student:
                student["weak_areas"] = []

            if [category, topic] not in student["weak_areas"]:
                student["weak_areas"].append([category, topic])

        # Check for badges
        self.check_and_award_badges(student_id)

        # Save changes
        self.save_student_data()

        return True

    def check_and_award_badges(self, student_id):
        """Check if student qualifies for any badges and award them"""
        student = self.student_data[student_id]

        # Initialize badges if not present
        if "badges" not in student:
            student["badges"] = []

        # Check for Master Explainer badge
        perfect_explanations = 0
        for topic_data in student.get("topic_history", {}).values():
            if topic_data.get("best_score", 0) >= 90:
                perfect_explanations += 1

        if perfect_explanations >= 5 and "master_explainer" not in student["badges"]:
            student["badges"].append("master_explainer")
            return "master_explainer"  # Return the newly awarded badge

        # Check for Quick Learner badge
        quick_improvements = 0
        for topic_key, topic_data in student.get("topic_history", {}).items():
            if topic_data.get("attempts") == 2 and topic_data.get("completed", False):
                quick_improvements += 1

        if quick_improvements >= 3 and "quick_learner" not in student["badges"]:
            student["badges"].append("quick_learner")
            return "quick_learner"

        # Check for Persistent badge
        persistent_completions = 0
        for topic_data in student.get("topic_history", {}).values():
            if topic_data.get("attempts", 0) >= 3 and topic_data.get("completed", False):
                persistent_completions += 1

        if persistent_completions >= 2 and "persistent" not in student["badges"]:
            student["badges"].append("persistent")
            return "persistent"

        return None  # No new badges

class TeachBackCLI:
    """A simple CLI interface for the TeachBack system"""

    def __init__(self):
        self.system = TeachBackSystem()
        self.current_student_id = None
        self.current_category = None
        self.current_topic = None
        self.attempt_count = 0

    def run(self):
        """Run the CLI interface"""
        print("Welcome to AI-Powered Teach Back Mode!")
        print("====================================")

        while True:
            if not self.current_student_id:
                self.login()
            else:
                self.teach_back_session()

    def login(self):
        """Login or register a student"""
        print("\nPlease enter your student ID or 'new' to register:")
        student_input = input("> ")

        if student_input.lower() == 'new':
            print("Please enter a new student ID:")
            new_id = input("> ")
            print("Please enter your name:")
            name = input("> ")

            self.system.register_student(new_id, name)
            print(f"Welcome, {name}! You've been registered successfully.")
            self.current_student_id = new_id
        elif student_input.lower() == 'quit':
            print("Goodbye!")
            exit(0)
        else:
            # Try to load existing student
            self.system.load_student_data()
            if student_input in self.system.student_data:
                student = self.system.student_data[student_input]
                print(f"Welcome back, {student['name']}!")
                self.current_student_id = student_input
            else:
                print("Student ID not found. Please try again or enter 'new' to register.")

    def teach_back_session(self):
        """Run a teach back session for the current student"""
        # Select a topic if we don't have one
        if not self.current_category or not self.current_topic:
            topic_selection = self.system.select_topic(self.current_student_id)
            if not topic_selection:
                print("Error: Could not select a topic. Please try again later.")
                self.current_student_id = None
                return

            self.current_category, self.current_topic = topic_selection
            self.attempt_count = 0

        # Generate and ask question
        question = self.system.generate_question(self.current_category, self.current_topic)
        print("\n" + question)

        # Get student's explanation
        print("\nPlease type your explanation (or 'hint' for a hint, 'quit' to exit):")
        explanation = input("> ")

        # Handle special commands
        if explanation.lower() == 'quit':
            print("Ending session. Goodbye!")
            exit(0)
        elif explanation.lower() == 'hint':
            hint = self.system.get_hint(self.current_category, self.current_topic)
            print(f"Hint: {hint}")
            return

        # Evaluate the explanation
        self.attempt_count += 1
        evaluation = self.system.evaluate_explanation(explanation, self.current_category, self.current_topic)

        # Provide feedback
        print("\nFeedback:")
        print(evaluation["feedback"])
        print(f"Score: {evaluation['score']}/100")

        # Update student progress
        self.system.update_student_progress(
            self.current_student_id,
            self.current_category,
            self.current_topic,
            evaluation["score"],
            evaluation["is_complete"],
            self.attempt_count
        )

        # Handle incomplete explanations
        if not evaluation["is_complete"]:
            if evaluation["missing_concepts"]:
                missing = ", ".join(evaluation["missing_concepts"])
                print(f"\nYou're missing some key concepts: {missing}")

            print("\nLet me give you a hint to improve your explanation:")
            hint = self.system.get_hint(self.current_category, self.current_topic, evaluation["missing_concepts"])
            print(hint)
        else:
            # Show student progress
            student = self.system.student_data[self.current_student_id]
            print(f"\nGreat job! Your total points: {student['points']}")

            # Show any new badges
            if student["badges"]:
                print("Badges earned:")
                for badge_id in student["badges"]:
                    badge = self.system.badges[badge_id]
                    print(f"- {badge['name']}: {badge['description']}")

            # Reset for next topic
            self.current_category = None
            self.current_topic = None

            print("\nReady for another topic? (yes/no)")
            choice = input("> ")
            if choice.lower() != 'yes':
                print("Ending session. Goodbye!")
                exit(0)

class SpeechRecognitionAdapter:
    """
    A simple adapter class for speech recognition integration.
    This is a placeholder - you'll need to implement with an actual speech recognition library.
    """

    def __init__(self):
        # Initialize speech recognition capability
        # This is where you'd set up your preferred speech recognition library
        self.ready = False
        try:
            # Placeholder for speech recognition library import
            # import speech_recognition as sr
            # self.recognizer = sr.Recognizer()
            # self.microphone = sr.Microphone()
            self.ready = True
        except ImportError:
            print("Speech recognition library not available. Using text input only.")

    def is_available(self):
        """Check if speech recognition is available"""
        return self.ready

    def listen(self, prompt=None):
        """
        Listen for speech and convert to text
        Returns the recognized text as a string
        """
        if not self.ready:
            if prompt:
                print(prompt)
            return input("> ")

        if prompt:
            print(prompt)

        # This is where you'd implement the actual speech recognition
        # Example with speech_recognition library:
        # with self.microphone as source:
        #     self.recognizer.adjust_for_ambient_noise(source)
        #     print("Listening...")
        #     audio = self.recognizer.listen(source)

        # try:
        #     text = self.recognizer.recognize_google(audio)
        #     print(f"You said: {text}")
        #     return text
        # except Exception as e:
        #     print(f"Sorry, I couldn't understand. Error: {e}")
        #     return ""

        # Placeholder implementation using text input
        return input("> ")

def add_custom_topic(system, category, topic, key_concepts, required_concepts, hint_questions, example_explanation):
    """Utility function to add a custom topic to the system"""
    if category not in system.topics:
        system.topics[category] = {}

    system.topics[category][topic] = {
        "key_concepts": key_concepts,
        "required_concepts": required_concepts,
        "hint_questions": hint_questions,
        "example_good_explanation": example_explanation
    }

    # Optionally save to topics.json
    with open('topics.json', 'w') as f:
        json.dump(system.topics, f, indent=2)

    return True

def get_student_leaderboard(system, top_n=10):
    """Get the top students by points"""
    system.load_student_data()

    # Create a list of (student_id, name, points) tuples
    students = [(id, data["name"], data.get("points", 0))
                for id, data in system.student_data.items()]

    # Sort by points (descending)
    students.sort(key=lambda x: x[2], reverse=True)

    # Return top N
    return students[:top_n]

def display_student_stats(system, student_id):
    """Display detailed stats for a student"""
    system.load_student_data()

    if student_id not in system.student_data:
        return None

    student = system.student_data[student_id]

    # Calculate stats
    total_topics = len(student.get("topic_history", {}))
    completed_topics = sum(1 for topic in student.get("topic_history", {}).values()
                          if topic.get("completed", False))

    completion_rate = (completed_topics / total_topics * 100) if total_topics > 0 else 0

    # Get average score
    scores = [topic.get("best_score", 0) for topic in student.get("topic_history", {}).values()]
    avg_score = sum(scores) / len(scores) if scores else 0

    return {
        "name": student["name"],
        "points": student.get("points", 0),
        "badges": student.get("badges", []),
        "topics_attempted": total_topics,
        "topics_completed": completed_topics,
        "completion_rate": completion_rate,
        "average_score": avg_score,
        "weak_areas": student.get("weak_areas", [])
    }

# Example of how to run the CLI
if __name__ == "__main__":
    cli = TeachBackCLI()
    cli.run()