EduMasters – Product Specification Document (Current Build)
1. Overview

EduMasters is a web-based platform where students can access previous year question papers, solved papers, notes, and projects. It provides an organized search and browse system and a comment section for discussion/feedback on study materials.

2. Core Features
2.1 Search & Browse

Students can select:

University → Course → Semester

Users can filter resources by type:

Notes

Question Papers

Solved Papers

Projects

Quick keyword search for subjects/resources.

2.2 Resource Access

Students can view and download study materials.

Each resource includes metadata:

Title

Type (QP / Notes / Solved Paper / Project)

University, Course, Semester

Uploaded timestamp

2.3 Comments

Users can post comments on a resource.

Comments are displayed in chronological order.

Each comment shows username (or “Anonymous” if guest mode).

3. Non-Functional Requirements
3.1 Performance

Search results must appear within 2 seconds.

File download must begin within 3 seconds of request.

3.2 Security

Study materials are stored in Supabase storage.

Public access is read-only (write operations are admin-only for now).

3.3 Usability

Platform must be mobile responsive.

Students should be able to find study materials in 3 steps: University → Course → Semester.

4. Technical Specifications
4.1 Frontend

React (Vite) for UI.

TailwindCSS + animations for styling.

4.2 Backend & Database

Supabase (PostgreSQL + Storage).

Supabase used for:

Resource metadata storage.

Comment storage.

File storage (study materials).

4.3 Database Schema (High-Level)

Resources Table

id (UUID)

title (string)

type (enum: notes, qp, solved, project)

university (string)

course (string)

semester (string)

file_url (string)

created_at (timestamp)

Comments Table

id (UUID)

resource_id (foreign key → resources.id)

comment (text)

username (string or null for guest)

created_at (timestamp)

5. Acceptance Criteria

Users can search resources by University → Course → Semester.

Search results show correct resource type and metadata.

Resources are downloadable via file_url.

Users can post comments on any resource.

Comments display in correct chronological order.

Mobile users can access the platform without layout issues.