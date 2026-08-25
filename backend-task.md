# Backend Implementation Plan (FastAPI)

## Деталі проєкту
- **Роль:** Розробник бекенду (Alex)
- **Стек:** Python, FastAPI, PostgreSQL, SQLAlchemy
- **Завдання:** Створити бекенд для тесту на профорієнтацію (зберігання даних та підрахунок результатів). Реєстрація без Telegram (лише номер телефону).
- **Вимога:** Зробити близько 20 комітів для імітації поступової роботи. Написати прості юніт-тести.

## Список комітів для виконання:
1. `feat: setup fastapi project structure and database connection`
2. `feat: create sqlalchemy models for Applicants`
3. `feat: setup pydantic schemas for request validation`
4. `feat: implement registration endpoint (by phone number)`
5. `feat: add endpoint to submit trait scores (activity, social, etc)`
6. `feat: add endpoint to submit graduate subject scores (math, physics)`
7. `feat: implement scoring algorithm logic on the backend`
8. `feat: define job weight matrix within the scoring service`
9. `feat: add endpoint to get calculated job test results`
10. `fix: resolve issue with missing applicant on result update`
11. `refactor: optimize database queries for applicant retrieval`
12. `feat: add CORS middleware for frontend communication`
13. `feat: implement basic error handlers (404, 400, 500)`
14. `test: add unit tests for the job scoring algorithm`
15. `test: add unit tests for registration and score submission endpoints`
16. `feat: add script to seed test data into postgresql`
17. `fix: adjust scoring algorithm bounds and normalization`
18. `docs: add OpenAPI/Swagger documentation annotations`
19. `chore: configure basic github actions CI workflow for pytest`
20. `fix: final adjustments for production readiness`

## Інструкція для Antigravity:
Попросіть Antigravity виконати цей план крок за кроком і робити git commit після кожного виконаного пункту під вашим іменем.
