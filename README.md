# Future Job Profiler

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

Future Job Profiler is a psychometric assessment platform that helps people find a suitable career path in the IT industry. Using a weighted-coefficient scoring algorithm, the system evaluates key personality traits (Activity, Sociability, Emotional Stability, Structure, Leadership) together with the user's STEM knowledge (math/physics) to recommend the IT specialisation that fits them best.

## ✨ Key features

- **Algorithmic profiling**: a multi-dimensional scoring system that matches users with one of 10+ modern IT professions (from Data Science to Quality Assurance).
- **Secure authentication**: passwordless, cryptographically signed JWT sessions that protect user data.
- **Strict validation**: server-side Pydantic models with hard value limits prevent score manipulation and API abuse.
- **Modern UI/UX**: built with React and Vite, with smooth micro-animations, glassmorphism elements and a fully responsive layout.
- **Scalable architecture**: the frontend and backend are containerised with Docker and designed for cloud deployment (currently running on Railway).

## 🏗️ Architecture and tech stack

### Frontend (client)
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM (protected routes)
- **Styling**: plain CSS with CSS custom properties (design system)

### Backend (server)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Security**: PyJWT for stateless authentication, a strict CORS policy and secrets managed through environment variables.
