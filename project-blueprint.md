# Project Blueprint: Applicant Career Direction Test

## Purpose

This project is a PERN-style web application for applicants. It collects a short profile, optionally verifies the applicant's phone number through Telegram, presents a psychometric questionnaire, stores the resulting traits, and recommends a technical career direction together with related university departments.

This document describes the architecture and behavior in a form that can be used to recreate a similar system. It intentionally contains no real credentials, tokens, private URLs, or environment values.

## Technology Stack

### Frontend

- React 19
- React DOM
- React Router DOM 7 for client-side routes
- Vite 7 for development and production builds
- ESLint 9 with React hooks and refresh plugins
- `react-phone-number-input` is declared as a dependency, although the current login component uses a custom Ukrainian phone input instead

### Backend

- Node.js 20 runtime in Docker
- Express 5 HTTP server
- `cors` middleware
- `dotenv` for environment loading
- `pg` PostgreSQL client and connection pool
- `telegram` client library for Telegram phone-code authentication
- Jest 30 for unit tests

### Infrastructure

- PostgreSQL 16 Alpine container
- Docker multi-stage build
- Docker Compose for local orchestration
- Named PostgreSQL volume for persistence
- GitHub Actions for pre-commit checks and reusable Docker/release workflows

## Project Structure

Generated/build and dependency directories are intentionally omitted.

```text
future-job-test/
├── .dockerignore
├── .gitignore
├── .pre-commit-config.yaml
├── Dockerfile
├── docker-compose.yml
├── README.md
├── project-blueprint.md
├── .github/
│   └── workflows/
│       ├── create_new_version.yaml
│       └── pre-commit.yaml
├── client/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── iasa-logo.svg
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── config.js
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   └── react.svg
│       ├── components/
│       │   ├── login.jsx
│       │   ├── results.jsx
│       │   └── test.jsx
│       ├── data/
│       │   ├── questionsAndAnswers.js
│       │   └── weights.js
│       └── styles/
│           ├── login.css
│           ├── results.css
│           └── test.css
└── server/
    ├── .gitignore
    ├── env.js
    ├── index.js
    ├── package.json
    ├── config/
    │   ├── connect.js
    │   └── telegram.js
    ├── controllers/
    │   └── applicantController.js
    ├── db/
    │   ├── config.js
    │   ├── createTable.js
    │   ├── pool.js
    │   ├── queries.js
    │   └── schema.js
    ├── routes/
    │   └── applicantRouter.js
    ├── tests/
    │   └── scoring.test.js
    └── utils/
        ├── scoring.js
        └── weights.js
```

## Architecture

```text
Browser
  └── React/Vite SPA
       ├── Login form and optional Telegram verification
       ├── Questionnaire and client-side score accumulation
       └── Results calculation and presentation
              │ HTTP/JSON
              ▼
         Express API
       ├── Applicant controller
       ├── Telegram client
       └── PostgreSQL query module
              │
              ▼
         PostgreSQL
```

In production, the Express process also serves the built React files from `server/public`. In development, Vite serves the client and `VITE_API_URL` points to the API server.

## Frontend Logic

### Application routes

`client/src/App.jsx` creates a browser router with three routes:

| Route | Component | Responsibility |
|---|---|---|
| `/` | `Login` | Collect applicant profile and perform optional verification |
| `/test` | `Test` | Run the questionnaire and submit trait scores |
| `/results` | `Results` | Fetch scores and show the recommended direction |

`client/src/main.jsx` mounts the application in React `StrictMode`.

### API base URL

`client/src/config.js` exports:

```js
const API_BASE = import.meta.env.VITE_API_URL || "";
```

An empty value means same-origin requests in production. Development can set `VITE_API_URL` to `<LOCAL_API_URL>` or another trusted API origin.

### Login flow

The login component maintains:

- applicant fields: full name, date of birth, city, school, studying status;
- a custom nine-digit Ukrainian phone suffix, combined with the `+380` prefix;
- a two-step screen state: profile and Telegram code;
- date and studying-status picker modal state;
- validation and error-modal state.

The user first chooses whether to verify the phone number. The two branches are:

1. **Verified branch**: call `POST /api/applicant/phone-code`, then call `POST /api/applicant/login` with the five-digit code.
2. **Unverified branch**: call `POST /api/applicant/register` and create or reuse an applicant immediately.

After a successful response, the client stores these values in `localStorage`:

```text
applicantId      -> numeric database identifier
studyingStatus   -> status string, including "Graduated"
```

Applicants with `hasCompletedTest === true` go to `/results`; others go to `/test`.

### Questionnaire flow

`questionsAndAnswers.js` contains two question arrays:

- `nonGraduate`: regular school applicants;
- `graduate`: graduates, beginning with subject-score inputs and then the psychometric questions.

Each psychometric item has this conceptual shape:

```js
{
  trait: "activity | social | emotionalStability | structure | leadership",
  questionTextOne: "<QUESTION_A>",
  questionTextTwo: "<QUESTION_B>",
  answers: [
    { id: "generated-client-id", answerText: "...", points: -1 | -0.5 | 0 | 0.5 | 1 }
  ]
}
```

The test selects the graduate array only when `studyingStatus === "Graduated"`. Each answer contributes its `points` to the item's trait. The UI displays five choices ranging from `Точно А` to `Точно Б` and supports keyboard navigation.

Graduate subject scores are validated as integers from 1 through 12 and are submitted as `mathScore` and `physicsScore`. Psychometric scores are submitted using camelCase field names.

### Results flow

The results component calls `GET /api/applicant/test-results/:id`, converts the returned trait values to numbers, and calculates every job score using the client copy of the weight matrix. It then:

1. sorts jobs descending by score;
2. chooses the first job as the winner;
3. normalizes each job score relative to the minimum and maximum score;
4. renders the winner, description, percentage, alternatives, and department recommendations;
5. animates the bars and result presentation.

Job descriptions, display names, and department mappings are static frontend data. The math and physics values are persisted for graduates but are not returned by the results endpoint and do not currently affect job scoring.

## Backend Logic

### Startup

`server/env.js` loads the root `.env` file. `server/index.js` then:

1. starts database table initialization;
2. starts the Telegram connection;
3. creates an Express app;
4. enables permissive CORS and JSON parsing;
5. mounts `/api/applicant`;
6. exposes `GET /api` returning `API is working.`;
7. serves `public` and falls back to `index.html` when a production client exists;
8. listens on `PORT`, defaulting to `3000`.

### API contracts

All application responses use JSON with a boolean `success` field. Current error paths generally return HTTP 200 with `success: false` and a Ukrainian `reason` message.

#### `POST /api/applicant/phone-code`

Request:

```json
{
  "applicantPhoneNumber": "<PHONE_NUMBER>"
}
```

Behavior: calls Telegram `sendCode` with environment-backed API credentials.

Success:

```json
{ "success": true }
```

#### `POST /api/applicant/login`

Request:

```json
{
  "applicantFullName": "<FULL_NAME>",
  "applicantPhoneNumber": "<PHONE_NUMBER>",
  "applicantDateOfBirth": "<ISO_DATE>",
  "applicantCity": "<CITY>",
  "applicantSchool": "<SCHOOL>",
  "applicantStudyingStatus": "<STUDYING_STATUS>",
  "applicantPassword": "<OPTIONAL_TELEGRAM_PASSWORD>",
  "applicantPhoneCode": "<PHONE_CODE>"
}
```

Behavior: starts the Telegram client, checks authorization, logs the session out, then looks up an applicant by phone. Existing applicants are reused; new applicants are inserted with a valid-phone flag.

#### `POST /api/applicant/register`

Accepts the profile fields without Telegram verification. It reuses an existing applicant with the same phone number or inserts a new one with the phone-valid flag left at its default.

#### `PATCH /api/applicant/graduate/test-results/:id`

Request fields:

```json
{
  "activityScore": 0,
  "socialScore": 0,
  "emotionalStabilityScore": 0,
  "structureScore": 0,
  "leadershipScore": 0,
  "mathScore": 0,
  "physicsScore": 0
}
```

Behavior: updates all five traits, both subject scores, and sets `hascompletedtest` to true.

#### `PATCH /api/applicant/non-graduate/test-results/:id`

Accepts the five trait score fields, updates them, and sets `hascompletedtest` to true.

#### `GET /api/applicant/test-results/:id`

Success shape:

```json
{
  "success": true,
  "score": {
    "activityScore": 0,
    "socialScore": 0,
    "emotionalStabilityScore": 0,
    "structureScore": 0,
    "leadershipScore": 0
  }
}
```

The endpoint returns only psychometric traits, not personal data or graduate subject scores.

### Database access

`server/db/config.js` builds a PostgreSQL connection string from environment variables. `server/db/pool.js` creates a `pg.Pool` and sets the PostgreSQL `search_path` to the configured schema. `server/db/queries.js` contains parameterized SQL for lookup, insertion, result updates, and score retrieval.

The project uses a startup initializer rather than migration files. `server/db/createTable.js` creates the configured schema and an applicants table if they do not exist.

## Database Model

There is one entity, `Applicants`, with no explicit relationships:

| Column | Type | Default/meaning |
|---|---|---|
| `Id` | identity integer, primary key | generated identifier |
| `FullName` | text | applicant name |
| `PhoneNumber` | text | normalized phone string |
| `IsPhoneNumberValid` | boolean | false unless Telegram verification succeeds |
| `DateOfBirth` | text | selected date |
| `City` | text | applicant city |
| `School` | text | school name |
| `StudyingStatus` | text | grade status or `Graduated` |
| `HasCompletedTest` | boolean | false initially |
| `ActivityScore` | numeric(3,1) | nullable trait score |
| `SocialScore` | numeric(3,1) | nullable trait score |
| `EmotionalStabilityScore` | numeric(3,1) | nullable trait score |
| `StructureScore` | numeric(3,1) | nullable trait score |
| `LeadershipScore` | numeric(3,1) | nullable trait score |
| `MathScore` | integer | graduate subject score |
| `PhysicsScore` | integer | graduate subject score |

Conceptual SQL:

```sql
CREATE SCHEMA IF NOT EXISTS <DB_SCHEMA>;

CREATE TABLE IF NOT EXISTS <DB_SCHEMA>.Applicants (
  Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  FullName TEXT,
  PhoneNumber TEXT,
  IsPhoneNumberValid BOOLEAN DEFAULT FALSE,
  DateOfBirth TEXT,
  City TEXT,
  School TEXT,
  StudyingStatus TEXT,
  HasCompletedTest BOOLEAN DEFAULT FALSE,
  ActivityScore NUMERIC(3, 1),
  SocialScore NUMERIC(3, 1),
  EmotionalStabilityScore NUMERIC(3, 1),
  StructureScore NUMERIC(3, 1),
  LeadershipScore NUMERIC(3, 1),
  MathScore INT,
  PhysicsScore INT
);
```

The current implementation does not define a unique constraint on `PhoneNumber`, foreign keys, server-side score bounds, or a migration history. A recreation should preferably use a normalized lowercase table identifier consistently and add a unique phone constraint if duplicate applicants are not intended.

## Scoring Model

The trait vector is ordered as:

```text
[activity, social, emotionalStability, structure, leadership]
```

Each job has five coefficients. The score is a dot product:

```text
jobScore(job) = sum(weight[job][i] * trait[i])
```

Current job matrix:

| Job | Activity | Social | Emotional stability | Structure | Leadership |
|---|---:|---:|---:|---:|---:|
| Backend | 1 | -2 | 1 | 3 | 0 |
| Frontend | 2 | 1 | 0 | -1 | 0 |
| QA | -1 | 0 | 1 | 4 | -1 |
| DevOps | 1 | -1 | 3 | 2 | 1 |
| Data-Science | 1 | -2 | 2 | 1 | -1 |
| Data-Engineering | 0 | -1 | 2 | 3 | 0 |
| Business-Analysis | 0 | 3 | 0 | -1 | 2 |
| Project-Management | 1 | 3 | 2 | 0 | 3 |

`server/utils/scoring.js` implements the same matrix and returns `{ jobScores, winner, sorted }`. The controller does not call this helper; the browser independently computes scores using `client/src/data/weights.js`. A future implementation should make one side authoritative, preferably the server, to prevent client tampering and scoring drift.

## Configuration and Secrets

Use environment variables, never hardcode real values:

```dotenv
API_ID=<TELEGRAM_API_ID>
API_HASH=<TELEGRAM_API_HASH>
DB_USER=<DB_USER>
DB_PASS=<DB_PASSWORD>
DB_HOST=<DB_HOST>
DB_PORT=5432
DB_NAME=<DB_NAME>
DB_SCHEME=<DB_SCHEMA>
PORT=3000
VITE_API_URL=<API_BASE_URL_OR_EMPTY>
```

The root `.env`, client `.env.local`, and CI credential values are sensitive and must remain outside documentation, commits, logs, screenshots, and prompts. CI registry credentials should be stored as repository or organization secrets and rotated if they have ever been committed.

## Running Locally

### Recommended: Docker Compose

1. Install Docker Desktop with Compose support.
2. Create a local `.env` from the variable list above. Use local-only development credentials and real Telegram values only when Telegram verification is required.
3. From the project root, run:

   ```bash
   docker compose up --build
   ```

4. Open `<LOCAL_APP_URL>` in a browser. The default port mapping is `3000:3000`.
5. Stop the stack with:

   ```bash
   docker compose down
   ```

The database is persisted in the named `postgres_data` volume. The app waits for the database healthcheck before starting, but the application currently starts table initialization asynchronously, so production-quality code should await initialization before accepting requests.

### Manual development

Prerequisites: Node.js, a running PostgreSQL instance, and environment variables configured for the server.

Install and start the API:

```bash
cd server
npm ci
node index.js
```

In a second terminal, install and start Vite:

```bash
cd client
npm ci
npm run dev
```

Set `VITE_API_URL=<LOCAL_API_URL>` in the client environment when Vite and Express use different origins.

### Tests and checks

Run backend unit tests:

```bash
cd server
npm test
```

Run client linting:

```bash
cd client
npm run lint
```

Build the client:

```bash
cd client
npm run build
```

## Reproduction Notes and Known Risks

- The table initializer uses a quoted capitalized table name while queries use an unquoted lowercase name. PostgreSQL can interpret these as different identifiers. Use one naming convention consistently.
- Startup does not await database and Telegram initialization.
- CORS currently allows every origin.
- Result read and update endpoints have no authentication or authorization. Applicant IDs are stored in tamperable `localStorage`.
- The server trusts submitted scores and does not verify that they came from the expected question set or fall within expected ranges.
- Telegram uses an empty in-memory session, so authentication state is not persisted between restarts.
- Some controller exception paths log errors or fail to send a response, and raw error logging can expose implementation details.
- There are no API, database, Telegram, authorization, validation, Docker, or end-to-end tests. Existing Jest coverage is limited to the pure scoring helper.
- The weight matrix exists in both client and server code and can diverge.

## Minimal Recreation Contract

To recreate the same architecture, implement:

1. A React SPA with profile, questionnaire, and results routes.
2. A Node/Express API with the six applicant endpoints above.
3. A PostgreSQL `Applicants` entity containing profile, verification, completion, trait, and graduate subject fields.
4. A client-side questionnaire with two variants selected by applicant status.
5. A five-dimensional trait accumulator and an eight-job dot-product scoring matrix.
6. A Docker Compose environment containing the API/client container and PostgreSQL.
7. Environment-backed configuration for every credential and deployment-specific address.
8. Tests for scoring plus additional tests for API validation, database initialization, authentication, and authorization before production use.