# Sports Management Hub

## Current State
Each academy card has an "Enroll Now" button that links to a placeholder Google Forms URL (`https://forms.google.com/sports-enroll`) via an external link.

## Requested Changes (Diff)

### Add
- An enrollment form modal/dialog that opens when "Enroll Now" is clicked
- Form fields: Full Name, Age, Phone Number, Address
- Form submit button and success state
- The form should show which academy and sport the user is enrolling in

### Modify
- `AcademyCard.tsx`: Change the "Enroll Now" button from an external link to a button that opens the enrollment dialog
- The dialog should be self-contained or imported into AcademyCard

### Remove
- The external `href` link behavior on the Enroll Now button
- The placeholder `https://forms.google.com/sports-enroll` URLs (no longer needed since form is in-app)

## Implementation Plan
1. Create `EnrollmentFormDialog.tsx` component with a Dialog that contains a form with fields: Full Name (text), Age (number), Phone Number (tel), Address (textarea)
2. The dialog title should show the academy name and sport
3. On submit, show a success/thank-you message inside the dialog
4. Basic validation: all fields required
5. Update `AcademyCard.tsx` to use `EnrollmentFormDialog` instead of the external link button
6. Remove `enrollmentUrl` dependency from the Enroll Now button (keep the field in the data structure for backward compat, but don't use it as a link)
