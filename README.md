# Future Job Profiler (CES 2027 Entry)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

Future Job Profiler is an advanced psychometric evaluation platform designed to help candidates discover their optimal career paths in the modern tech industry. Using a scientifically backed weighted algorithm, the system evaluates core psychological traits (Activity, Social aptitude, Emotional Stability, Structure, Leadership) alongside STEM proficiency to accurately predict the best IT specialization for the user.

## ✨ Key Features

- **Algorithmic Profiling**: A multi-dimensional weighted scoring system that matches candidates to 10+ modern tech roles (from Data Science to Quality Assurance).
- **Secure Authentication**: Passwordless, JWT-based cryptographic sessions ensuring total privacy and data integrity.
- **Robust Validation**: Server-side Pydantic models with strict data boundaries prevent score manipulation and API abuse.
- **Modern UI/UX**: Built with React and Vite, featuring smooth micro-animations, glassmorphism elements, and fully responsive design.
- **Scalable Architecture**: Dockerized frontend and backend designed for seamless cloud deployment (currently hosted on Railway).

## 🏗️ Architecture & Tech Stack

### Frontend (Client)
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM (Protected Routes)
- **Styling**: Vanilla CSS with modern CSS Variables (Design System)

### Backend (Server)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Security**: PyJWT for stateless authentication, strict CORS policies, and environment-based secret management.

## 🚀 Getting Started (Local Development)

### Prerequisites
- Docker and Docker Compose
- Node.js (v18+)

### Running the Stack
1. Clone the repository.
2. Spin up the PostgreSQL database and backend using Docker:
   ```bash
   docker-compose up -d
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🛡️ Security Posture
This platform implements enterprise-grade security standards:
- **No PII Leakage**: Registration endpoints exchange JWT tokens without exposing user data.
- **IDOR Protection**: Test results and user profiles are tied to the cryptographic signature of the JWT, preventing ID iteration.
- **Zero-Trust Input**: All psychometric scores and subject grades are validated against strict numerical bounds before reaching the database.

---
*Developed for the CES 2027 Innovation Showcase.*
