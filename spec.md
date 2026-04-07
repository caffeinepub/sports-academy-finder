# Sports Management Hub

## Current State
- Full-stack app with Motoko backend storing 25 academy places (5 sports x 5 Chennai locations)
- React frontend with sport/location filtering, unique thumbnails per academy, contact details
- Enrollment form dialog (EnrollmentFormDialog.tsx) collects name, age, phone, address — but only simulates submission (fake async, data is discarded)
- No admin panel exists
- No authorization system in place

## Requested Changes (Diff)

### Add
- Backend: `Enrollment` type and stable storage for enrollment submissions
- Backend: `submitEnrollment(academyName, sport, fullName, age, phone, address)` mutation — stores submission with timestamp and auto-generated ID
- Backend: `getAllEnrollments()` query (admin only via authorization) — returns all submissions
- Backend: `getEnrollmentsByAcademy(academyName)` query (admin only) — filter by academy
- Frontend: Admin panel page/section accessible to logged-in admins showing a table of all submissions
- Frontend: Wire EnrollmentFormDialog to actually call `submitEnrollment` instead of the fake timeout
- Authorization component for role-based admin access

### Modify
- EnrollmentFormDialog.tsx: Replace `await new Promise(setTimeout)` with real backend `submitEnrollment` call
- App.tsx: Add navigation/routing between main discovery view and admin panel view

### Remove
- Nothing removed

## Implementation Plan
1. Select `authorization` Caffeine component
2. Generate updated Motoko backend with Enrollment type, submitEnrollment, getAllEnrollments, getEnrollmentsByAcademy
3. Update EnrollmentFormDialog to call real backend submitEnrollment
4. Add AdminPanel component: table showing all enrollment submissions (name, age, phone, address, academy, sport, date)
5. Add admin navigation in Header or App — only visible to logged-in admins
6. Wire authorization login/logout to header
