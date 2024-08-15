#!/usr/bin/env sh

# Get script execution directory
BASE_DIRECTORY="$( cd -P "$( /usr/bin/dirname "$( /usr/bin/readlink -f "${0}" )" )" && /bin/pwd )"

# Command
_PSQL="psql --echo-all ${DATABASE_URL}"

# Log
echo "CWD             : ${BASE_DIRECTORY}"
echo "Database URL    : ${DATABASE_URL}"
echo "Schema          : ${SCHEMA}"
echo "Database Reset  : ${DATABASE_RESET}"
echo "Database Migrate: ${DATABASE_MIGRATE}"
echo "Database Seed   : ${DATABASE_SEED}"
echo "PSQL Command    : ${_PSQL}"

# Reset database if requested
if [ "${DATABASE_RESET}" = true ]; then
    # Log
    echo "Resetting database schema ${SCHEMA}"

    # Drop schema
    ${_PSQL} --command="DROP SCHEMA IF EXISTS ${SCHEMA} CASCADE"
else
    # Log
    echo "Skipping resetting database schema ${SCHEMA}"
fi

# Log
echo "Creating schema ${SCHEMA}"

# Create schema
${_PSQL} --command="CREATE SCHEMA IF NOT EXISTS ${SCHEMA}"

# Log
echo "Created schema ${SCHEMA}"

# Change directory to web-root
cd /var/www || exit 10

# Migrate database if requested
if [ "${DATABASE_MIGRATE}" = true ]; then
    # Log
    echo "Running migrations"

    # Migrate
    flask db upgrade

    # Log
    echo "Ran migrations"
else
    # Log
    echo "Skipping migrations"
fi

# Seed database if requested
if [ "${DATABASE_SEED}" = true ]; then
    # Log
    echo "Seeding database"

    # Seed
    flask seed all

    # Log
    echo "Seeded database"
else
  # Log
  echo "Skipping seeding"
fi

# Log
echo "Starting webserver"

# Start application
# Need either --bind 0.0.0.0:8000 + -p 8000:8000 in docker run or
# CMD gunicorn --access-logfile - --error-logfile - --bind 0.0.0.0:8000 app:app
# no --bind 0.0.0.0:8000 + --network="host" in docker run
gunicorn --access-logfile - --error-logfile - app:app