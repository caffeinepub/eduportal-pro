# EduPortal Pro

## Current State
- Registration form saves name/year/branch to localStorage but does NOT save semester.
- Header shows hardcoded names (e.g. "Alex Thompson") instead of the registered name.
- Bell icon in Header is static (no on/off toggle, no unread count, no navigation).
- No profile page exists; user cannot update name or profile photo.
- Registration form has Year and Branch but no Semester field.

## Requested Changes (Diff)

### Add
- Semester field (Sem 1 / Sem 2) in student registration form; saved to localStorage as `eduportal_user_semester`.
- Profile page (`profile` page type) accessible from the header avatar/name. Shows registered name, year, branch, semester, profile photo. User can edit name and upload/change profile photo (stored as base64 in localStorage).
- Notification bell in Header: clicking navigates to notifications page; shows unread count badge; bell has a toggle (on/off) to enable/disable notifications. When off, badge hides and bell is muted.

### Modify
- Header: Replace hardcoded `roleNames` with registered name from localStorage (`eduportal_user_name`). Avatar shows first letter of actual name. Clicking avatar/name navigates to profile page. Bell click navigates to notifications page and shows real unread count (from localStorage-persisted notification state). Bell icon reflects on/off toggle state.
- Register.tsx: Add Semester select (Sem 1 / Sem 2) for students after Branch field. Save to localStorage on submit.
- App.tsx: Add `profile` to Page type. Add profile page rendering.

### Remove
- Hardcoded roleNames from Header (replaced by dynamic name).

## Implementation Plan
1. Update `Register.tsx` – add Semester select for students, save `eduportal_user_semester` to localStorage.
2. Update `Header.tsx` – read name from localStorage, show real unread notification count, bell navigates to notifications, bell has on/off toggle (stored in localStorage), avatar navigates to profile.
3. Create `Profile.tsx` – shows/edits name and profile photo (base64 in localStorage), shows year/branch/semester, updates `eduportal_user_name` in localStorage.
4. Update `App.tsx` – add `profile` page type, render `<Profile>` component.
5. Update `Layout.tsx` – pass `navigate` to Header so Header can navigate to notifications and profile.
