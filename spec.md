# EduPortal Pro

## Current State
Library module exists with basic book categories (Academic, Reference, Competitive, GK, Literature, Journals, Digital). Students/Teachers can browse, request, and track borrowed books. Admin manages all books, issues, returns, and fines.

## Requested Changes (Diff)

### Add
- 7 fully defined book categories with subcategories and metadata:
  1. Academic Books (Textbooks, Reference books, Subject books, Lab manuals, Guides) — subjects: Mathematics, Physics, Chemistry, Computer Science, English — Used by Students & Teachers, issue allowed
  2. Reference Books (Dictionaries, Encyclopedias, Atlases, Handbooks, Manuals) — cannot be issued, library reading only — Used by Students & Teachers
  3. Competitive Exam Books (UPSC, SSC, Banking, Railways, State exams) — Used by Students, issue allowed
  4. General Knowledge Books (Current affairs, GK books, Year books, Magazines) — Used by Students & Teachers, issue allowed
  5. Story & Literature Books (Novels, Short stories, Poems, Drama, Fiction) — Used by Students, issue allowed
  6. Journals & Magazines (Monthly magazines, Weekly journals, Research journals; e.g. Science, Technology, Education journal) — Used by Teachers & Students, limited issue
  7. Digital Books (E-books, PDFs, Online books, Research papers) — Used by all, online access only (no physical issue)
- Category rules enforcement:
  - Reference Books: "No" issue — show "Library Reading Only" badge, disable borrow button
  - Digital Books: show "Online Access" button instead of borrow
  - Journals/Magazines: show "Limited" badge
- Rich sample books for each category (at least 4-6 books per category)
- Category filter tabs/sidebar in library page showing all 7 categories with icons and book counts
- Category detail view showing subcategories and available books
- Issue rules visible as badges on each book card (Issuable / Library Only / Online Access / Limited)

### Modify
- Library dashboard to display all 7 categories as visual cards with icons, descriptions, and who can use them
- Book browsing to filter by category and subcategory
- Admin book management to include all 7 categories and subcategory fields
- Student and Teacher library views to respect category-based access and issue rules

### Remove
- Old simplified category list (replace with 7 new structured categories)

## Implementation Plan
1. Define 7 category data structures with subcategories, issue rules, and user access
2. Populate 30+ sample books across all categories with proper fields
3. Update library dashboard with category cards grid
4. Add category filter/tab navigation to book browsing
5. Enforce issue rules per category (disable borrow for Reference, show Online Access for Digital)
6. Update Admin book management with new categories and subcategory fields
7. Keep all existing features (borrow tracking, fines, requests, returns) intact
