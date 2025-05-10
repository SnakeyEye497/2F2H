# QuizMorph – AI-Driven Real-Time Quiz Platform

**QuizMorph** is a full-stack web application designed to transform the way students take and experience quizzes. It integrates real-time quiz competitions, AI-generated personalized questions, live leaderboards, and scalable infrastructure to support large-scale participation.

> ⚠️ This is an ambitious student project. All major components are individually built and functional, but the complete system is **not yet fully integrated** due to time constraints.

---

## 📌 Project Summary

The goal of QuizMorph is to create a dynamic platform where students can:

- Participate in **live quizzes** with **instant leaderboard updates**
- Get **personalized quiz questions** powered by AI (TensorFlow)
- Benefit from **performance analytics** and learning suggestions
- Enjoy a smooth and interactive UI/UX with React and Tailwind CSS

The system architecture leverages modern backend orchestration using Kubernetes, asynchronous task handling with Celery and Redis, and real-time features with WebSockets.

---

## 🧠 Features

- ⚡ **Real-Time Leaderboard Updates** via Celery and Redis
- 🤖 **AI-Powered Quiz Generation** using FastAPI + TensorFlow
- 🧪 **Live Quiz Competitions** with WebSockets and async tasks
- 💾 **Cached Results** for fast access to quiz outcomes
- 🎨 **Responsive UI** using React and Tailwind CSS
- 🔐 **Backend Security & Speed** with Django, PostgreSQL, PgBouncer
- 📦 **Containerized Deployment** using NGINX + Kubernetes (Not deployed)

---

## 🖼️ Architecture Diagram

![Architecture Diagram](./7a2f04d0-17cd-450f-9d8f-25f568df761a.png)

---

## 🛠️ Technology Stack

| Layer            | Technologies Used                                                                 |
|------------------|------------------------------------------------------------------------------------|
| **Frontend**     | React, Tailwind CSS                                                                |
| **Backend**      | Django, PostgreSQL, PgBouncer                                                      |
| **AI Engine**    | FastAPI, TensorFlow                                                                |
| **Real-Time**    | Celery, Redis, WebSockets                                                          |
| **Deployment**   | Kubernetes (orchestration), NGINX (load balancing), Docker                         |

---

## 🔮 Future Scope

1. 📘 Integration with **Google Classroom API**
2. 📊 **AI-Driven Performance Analytics** for student insights
3. 🗣️ **Voice & 🖼️ Image-Based Question Creation**
4. 🌍 **Multi-Language Support** for wider accessibility
5. 📱 **Mobile App Development** for Android and iOS platforms

---

## 🚧 Current Status

All the major modules listed above are built and tested independently:

- Frontend UI is functional
- Backend APIs work as intended
- Real-time system using Celery and Redis is operational
- AI-based FastAPI service for quiz generation is running

However, **full integration** of these services is **incomplete**. The components are not yet connected as a unified application due to limited time during development.

---

## 📁 Repository Structure

```bash
2F2H/
├── backend/              # Django backend APIs
├── frontend/             # React-based frontend UI
├── ai-engine/            # FastAPI service with TensorFlow models
├── celery_worker/        # Celery and Redis configurations
├── k8s/                  # Kubernetes manifests for orchestration
├── nginx/                # Load balancing setup
├── database/             # PostgreSQL + PgBouncer config
├── README.md             # This file
