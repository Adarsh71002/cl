#!/bin/sh
# wait-for-db.sh

# Wait until PostgreSQL is ready
echo "Waiting for PostgreSQL at notejam-postgres:5432..."
while ! nc -z notejam-postgres 5432; do
  sleep 2
  echo "Waiting..."
done

echo "PostgreSQL is up - executing command"
exec npm start
