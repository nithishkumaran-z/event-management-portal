# Event Management Portal - Spring Boot 3 & Java 21 REST API Backend

Enterprise-grade backend for the **Event Management Portal**, developed with **Java 21**, **Spring Boot 3.2**, **Spring Security (JWT)**, **Spring Data JPA**, **Hibernate**, and **MySQL 8.0**.

---

## 🏛 Architecture & SOLID Principles
This project follows **Clean Architecture** and **Layered MVC Architecture**:
1. **Controller Layer (`/controller`)**: Handles HTTP requests, input validation (`@Valid`), and response formatting.
2. **Service Layer (`/service` & `/service/impl`)**: Contains pure business logic, transaction management (`@Transactional`), and security authorization checks.
3. **Repository Layer (`/repository`)**: Spring Data JPA repositories with custom JPQL queries and pagination (`Pageable`).
4. **Entity Layer (`/entity`)**: JPA/Hibernate ORM entities mapping directly to the MySQL database schema.
5. **Security Layer (`/security` & `/config`)**: Stateless JWT Authentication with custom `OncePerRequestFilter`, BCrypt password encoding, and role-based access control (`ROLE_ADMIN`, `ROLE_USER`).
6. **Exception Handling Layer (`/exception`)**: Global exception handler (`@ControllerAdvice`) converting exceptions into standardized JSON `ApiResponse` objects.

---

## 📂 Project Structure
```
event-portal-backend/
├── pom.xml                               # Maven Project Dependencies
├── README.md                             # Architectural Overview & API Reference
└── src/
    └── main/
        ├── java/com/eventportal/
        │   ├── EventPortalApplication.java       # Main Spring Boot Entry Point
        │   ├── config/                           # Security & CORS Configuration
        │   ├── controller/                       # Auth, Event, Registration, User, Admin Controllers
        │   ├── dto/                              # DTOs for decoupled API contracts
        │   ├── entity/                           # JPA Entities (User, Role, Event, Registration)
        │   ├── exception/                        # Custom Exceptions & Global Exception Handler
        │   ├── repository/                       # Spring Data JPA Repositories
        │   ├── security/                         # JWT Provider, Auth Filter, UserDetailsService
        │   └── service/                          # Service Interfaces & Implementations
        └── resources/
            ├── application.properties            # MySQL, JPA, JWT, and Server Configuration
            ├── schema.sql                        # MySQL DDL Schema Definition
            └── data.sql                          # Initial Seed Data (Admin, Users, Events)
```

---

## 🌐 REST API Endpoints Reference

### 1. Authentication Module (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user account | Public |
| `POST` | `/api/v1/auth/login` | Login and receive JWT Token | Public |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset token | Public |

### 2. User Module (`/api/v1/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/profile` | Get authenticated user profile | Authenticated |
| `PUT` | `/api/v1/users/profile` | Update user profile | Authenticated |
| `POST` | `/api/v1/users/change-password` | Update account password | Authenticated |

### 3. Event Module (`/api/v1/events`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/events` | Get all events (with Pagination & Sorting) | Public |
| `GET` | `/api/v1/events/{id}` | Get event details by ID | Public |
| `GET` | `/api/v1/events/search` | Filter events by category/date/organizer | Public |
| `POST` | `/api/v1/events` | Create new event | `ROLE_ADMIN` |
| `PUT` | `/api/v1/events/{id}` | Update existing event | `ROLE_ADMIN` |
| `DELETE`| `/api/v1/events/{id}` | Delete event | `ROLE_ADMIN` |

### 4. Registration Module (`/api/v1/registrations`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/registrations/register/{eventId}` | Register for an event | Authenticated |
| `DELETE`| `/api/v1/registrations/cancel/{registrationId}` | Cancel registration | Authenticated |
| `GET` | `/api/v1/registrations/my-registrations` | Get current user's registered events | Authenticated |
| `GET` | `/api/v1/registrations/event/{eventId}` | Get participants for an event | `ROLE_ADMIN` |
| `GET` | `/api/v1/registrations/export/excel` | Export participant list to Excel | `ROLE_ADMIN` |

### 5. Admin Dashboard Module (`/api/v1/admin`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/statistics` | Get Total Users, Events, and Registrations | `ROLE_ADMIN` |
| `GET` | `/api/v1/admin/chart-data` | Category distribution & Registration trends | `ROLE_ADMIN` |

---

## 🚀 Running the Backend
1. **Database Setup**:
   Ensure MySQL is running on port `3306` with database name `event_portal_db`:
   ```sql
   CREATE DATABASE event_portal_db;
   ```
2. **Build with Maven**:
   ```bash
   mvn clean install
   ```
3. **Run Spring Boot Application**:
   ```bash
   mvn spring-boot:run
   ```
4. **Access Swagger UI API Docs**:
   Open `http://localhost:8080/api/v1/swagger-ui.html` in your browser.
