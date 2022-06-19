# ladoosingh-api

Ladoosingh: The request inspector.

## Development

```bash
# Install Dependencies
pnpm install # or npm install

# Copy .env.example and configure it
cp .env.example .env

# Start the web server
pnpm start # or npm start

## Sequelize command based on env
# development
pnpm sql-dev # or npm sql-dev

# test
pnpm sql-test # or npm sql-test

# production
pnpm sql-prod # or npm sql-prod

## Migration
pnpm sql-dev db:migrate
#      ^^^
#  change as you need
```
