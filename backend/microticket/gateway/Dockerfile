# Use an official OpenJDK image for Java 17/19
FROM eclipse-temurin:19-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar into the container
COPY target/*.jar gateway.jar

# Expose the port your ticket-service runs on
EXPOSE 8079

# Add JVM options if needed (optional)
ENV JAVA_OPTS="-Dspring.jmx.enabled=false"

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar gateway.jar"]
