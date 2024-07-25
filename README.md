# formflow.ai

Formflow.ai is a platform that allows users to create and manage form flows.

## Tech Stack

- Next.js
- Prisma
- PostgreSQL
- Tailwind CSS

## Development

### Prerequisites

- Node.js
- PostgreSQL

### Setup

1. Clone the repository

```
git clone
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/formflow
```

4. Create a new database

```
createdb formflow
```

5. Run the migrations

```
npx prisma migrate dev
```

## Prisma Migrations

1. Create a new migration

```
 npx prisma migrate dev --name <migration-name>
```
