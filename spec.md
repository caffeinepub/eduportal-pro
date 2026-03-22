# EduPortal Pro

## Current State
- Registration flow shows OTP on screen (must be hidden)
- Library module has basic book browsing/borrowing
- Admin dashboard has limited library management
- No full book management CRUD (add/edit/delete)
- No issue/return workflow with approvals
- No fine management system
- No overdue tracking
- No library reports

## Requested Changes (Diff)

### Add
- Full library management system with role-based access:
  1. **Book Management (Admin)**: Add/Edit/Delete books with fields: Book ID, Book Name, Author, Category, ISBN, Publisher, Quantity, Shelf Number, Status (Available/Issued)
  2. **Book Search**: Search by Title, Author, Category, ISBN; filter by stock/quantity
  3. **Issue Book System**: Teacher/Student requests book; Admin approves; records issue date, return date, due date; book status changes to Issued
  4. **Issue Rules**: Student max 3 books, Teacher max 5 books; book must be available; cannot issue same book twice
  5. **Return Book**: Record return date, update status to Available, calculate fine if late, update stock
  6. **Fine Management**: ₹5/day late fine, lost book = full price fine, damage penalty
  7. **Library Users Panel (Admin)**: Teacher/Student lists, issued books list, history, overdue tracking, block users
  8. **Search & Reports**: Available/issued/overdue books, fine report, daily/monthly/stock reports
  9. **Library Notifications**: Due date reminders, overdue alerts, book available alerts
  10. **Role-Based Library Access**: Admin (full CRUD + approvals + reports), Teacher (search/request/return/view), Student (search/request/return/view in dashboard)
- OTP fix: Remove OTP display from screen; show message "OTP sent to your email/phone" instead

### Modify
- Register.tsx: Remove visible OTP from UI; show "OTP has been sent to [email] and [phone]" message only
- Library.tsx: Full rebuild with book management, issue/return workflow, fine system
- AdminDashboard.tsx: Add library management section
- StudentDashboard.tsx: Update library section with issued books and fine alerts
- TeacherDashboard.tsx: Add library section for teacher book requests

### Remove
- OTP displayed on screen in registration

## Implementation Plan
1. Update Register.tsx - hide OTP, show sent message
2. Create comprehensive Library.tsx with role-based views
3. Create LibraryAdmin.tsx component for admin book/user management
4. Update StudentDashboard library section with fine alerts
5. Update TeacherDashboard with library section
6. Update AdminDashboard with library management tab
