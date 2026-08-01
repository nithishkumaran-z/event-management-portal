-- =========================================================
-- Event Management Portal - MySQL Initial Seed Data (DML)
-- =========================================================

USE event_portal_db;

-- ---------------------------------------------------------
-- Insert Roles
-- ---------------------------------------------------------
INSERT INTO roles (id, name, description) VALUES
(1, 'ROLE_ADMIN', 'System Administrator with full access to Events, Users, and Registrations'),
(2, 'ROLE_USER', 'Standard Event Participant who can browse and register for events');

-- ---------------------------------------------------------
-- Insert Users (Password is BCrypt hash for 'Password@123')
-- ---------------------------------------------------------
INSERT INTO users (id, full_name, email, password_hash, phone_number, organization, bio, avatar_url, role_id, is_active) VALUES
(1, 'Alex Mercer (Admin)', 'admin@eventportal.com', '$2a$10$E9uW4PxF7hP8Tj4k8Z1zOuQ1xZ5e0Q1xZ5e0Q1xZ5e0Q1xZ5e0Q1', '+1-555-0101', 'Global Tech Events Inc.', 'Senior Tech Event Director & System Administrator.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 1, TRUE),
(2, 'Sarah Jenkins', 'sarah.j@gmail.com', '$2a$10$E9uW4PxF7hP8Tj4k8Z1zOuQ1xZ5e0Q1xZ5e0Q1xZ5e0Q1xZ5e0Q1', '+1-555-0102', 'CloudScale Technologies', 'Full-Stack Developer & AI Enthusiast.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 2, TRUE),
(3, 'David Chen', 'david.chen@enterprise.org', '$2a$10$E9uW4PxF7hP8Tj4k8Z1zOuQ1xZ5e0Q1xZ5e0Q1xZ5e0Q1xZ5e0Q1', '+1-555-0103', 'Enterprise DevOps Forum', 'Cloud Native Architect & Speaker.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 2, TRUE),
(4, 'Emily Watson', 'emily.w@designstudio.io', '$2a$10$E9uW4PxF7hP8Tj4k8Z1zOuQ1xZ5e0Q1xZ5e0Q1xZ5e0Q1xZ5e0Q1', '+1-555-0104', 'UX Leadership Alliance', 'Lead Product Designer passionate about accessible interfaces.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 2, TRUE);

-- ---------------------------------------------------------
-- Insert Events
-- ---------------------------------------------------------
INSERT INTO events (id, event_name, description, category, event_date, event_time, venue, organizer, max_participants, registration_deadline, event_image_url, ticket_price, is_published, created_by) VALUES
(101, 'Global Java 21 & Spring Boot 3 Summit 2026', 'An intensive two-day conference covering virtual threads, Spring Boot 3 enterprise architecture, Hibernate optimizations, and cloud-native Kubernetes deployments.', 'Technology', '2026-10-15', '09:00:00', 'San Francisco Convention Center, CA & Online', 'Spring Cloud Consortium', 500, '2026-10-10 23:59:59', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 149.00, TRUE, 1),
(102, 'Next-Gen AI & Large Language Models Expo', 'Explore hands-on workshops with Gemini API, multi-agent frameworks, RAG architectures, and ethical AI governance for enterprise engineering teams.', 'Artificial Intelligence', '2026-11-05', '10:00:00', 'Silicon Valley Innovation Hub, San Jose, CA', 'DeepMind & Google Cloud Builders', 350, '2026-11-01 18:00:00', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 0.00, TRUE, 1),
(103, 'Enterprise Cloud Security & Zero Trust Bootcamp', 'Master modern JWT security, OAuth2, OpenID Connect, API gateway security, and automated vulnerability scanning in hybrid cloud infrastructures.', 'Cybersecurity', '2026-09-20', '13:30:00', 'Austin Marriott Downtown, Austin, TX', 'InfoSec Alliance USA', 200, '2026-09-18 12:00:00', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', 99.00, TRUE, 1),
(104, 'Design Systems & UI/UX Leaders Connect', 'Learn scalable token systems, accessible React components, Figma to React pipelines, and micro-interaction animation patterns.', 'Design & UX', '2026-12-02', '11:00:00', 'Metropolitan Arts Center, New York, NY', 'UX Masters Network', 180, '2026-11-28 20:00:00', 'https://images.unsplash.com/photo-1558403194-611308249627?w=800', 49.00, TRUE, 1),
(105, 'Fintech Blockchain & Decentralized Finance Forum', 'In-depth panel discussions on high-throughput ledger systems, smart contract auditing, and institutional DeFi compliance.', 'Finance & FinTech', '2026-10-28', '14:00:00', 'Chicago Board of Trade Building, IL', 'FinTech Future Corp', 120, '2026-10-25 17:00:00', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', 199.00, TRUE, 1);

-- ---------------------------------------------------------
-- Insert Registrations
-- ---------------------------------------------------------
INSERT INTO registrations (id, registration_code, user_id, event_id, registration_date, status, qr_code_token, ticket_type) VALUES
(1001, 'REG-2026-JV101-SJ', 2, 101, '2026-08-01 10:15:00', 'CONFIRMED', 'QR-TOKEN-JV101-SARAH-991', 'VIP_PASS'),
(1002, 'REG-2026-AI102-SJ', 2, 102, '2026-08-01 11:20:00', 'CONFIRMED', 'QR-TOKEN-AI102-SARAH-442', 'STANDARD'),
(1003, 'REG-2026-JV101-DC', 3, 101, '2026-08-01 12:05:00', 'CONFIRMED', 'QR-TOKEN-JV101-DAVID-778', 'STANDARD'),
(1004, 'REG-2026-SEC103-EW', 4, 103, '2026-08-01 14:30:00', 'CONFIRMED', 'QR-TOKEN-SEC103-EMILY-331', 'STANDARD');
