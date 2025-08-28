# Use an official OpenJDK image
FROM eclipse-temurin:19-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar into the container
COPY target/*.jar app.jar

# Copy the wait script into the container
COPY wait-for-mysql.sh wait-for-mysql.sh

# Make the wait script executable
RUN chmod +x wait-for-mysql.sh

# Expose the port your service runs on
EXPOSE 9090

# Disable JMX to prevent port conflicts
ENV JAVA_OPTS="-Dspring.jmx.enabled=false"

# Use the wait script as entrypoint
ENTRYPOINT ["sh", "-c", "./wait-for-mysql.sh"]
