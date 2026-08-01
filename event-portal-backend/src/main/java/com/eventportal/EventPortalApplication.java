package com.eventportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Event Management Portal - Spring Boot Application Entry Point.
 * 
 * @author Senior Full Stack Java Architect
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.eventportal.repository")
public class EventPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventPortalApplication.class, args);
        System.out.println("===================================================================");
        System.out.println("  EVENT MANAGEMENT PORTAL BACKEND STARTED SUCCESSFULLY (JAVA 21) ");
        System.out.println("  Swagger API Docs: http://localhost:8080/api/v1/swagger-ui.html ");
        System.out.println("===================================================================");
    }
}
