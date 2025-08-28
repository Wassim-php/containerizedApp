#!/bin/sh
echo "Waiting for MySQL to be ready..."

# Try connecting to MySQL until it's up
until nc -z mysql 3306; do
  echo "MySQL is still unavailable - sleeping"
  sleep 2
done

echo "MySQL is up! Starting the application..."
exec java $JAVA_OPTS -jar app.jar
