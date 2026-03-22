import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  IndianRupee,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";

interface LibraryBook {
  bookId: string;
  bookName: string;
  author: string;
  category: string;
  isbn: string;
  publisher: string;
  quantity: number;
  availableQty: number;
  shelfNumber: string;
  price: number;
}

interface IssueRecord {
  issueId: string;
  bookId: string;
  bookName: string;
  userId: string;
  userName: string;
  userRole: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Issued" | "Returned" | "Overdue" | "Pending";
  fine: number;
  bookCondition: string;
}

const SEED_BOOKS: LibraryBook[] = [
  {
    bookId: "B001",
    bookName: "Introduction to Algorithms (DSA)",
    author: "Thomas H. Cormen",
    category: "BTech",
    isbn: "978-0262033848",
    publisher: "MIT Press",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A1",
    price: 699,
  },
  {
    bookId: "B002",
    bookName: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "BTech",
    isbn: "978-1119800361",
    publisher: "Wiley",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A2",
    price: 599,
  },
  {
    bookId: "B003",
    bookName: "Database Management Systems",
    author: "Ramakrishnan & Gehrke",
    category: "BTech",
    isbn: "978-0072465631",
    publisher: "McGraw-Hill",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A3",
    price: 549,
  },
  {
    bookId: "B004",
    bookName: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "BTech",
    isbn: "978-0132126953",
    publisher: "Pearson",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A4",
    price: 649,
  },
  {
    bookId: "B005",
    bookName: "Software Engineering",
    author: "Roger S. Pressman",
    category: "BTech",
    isbn: "978-0078022128",
    publisher: "McGraw-Hill",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A5",
    price: 499,
  },
  {
    bookId: "B006",
    bookName: "Digital Electronics",
    author: "Thomas L. Floyd",
    category: "BTech",
    isbn: "978-0132993418",
    publisher: "Pearson",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "A6",
    price: 450,
  },
  {
    bookId: "B007",
    bookName: "Advanced Engineering Mathematics",
    author: "Erwin Kreyszig",
    category: "BTech",
    isbn: "978-0470458365",
    publisher: "Wiley",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A7",
    price: 799,
  },
  {
    bookId: "B008",
    bookName: "C Programming Language",
    author: "Brian W. Kernighan",
    category: "BTech",
    isbn: "978-0131103627",
    publisher: "Prentice Hall",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "A8",
    price: 350,
  },
  {
    bookId: "B009",
    bookName: "Object Oriented Programming with Java",
    author: "E. Balagurusamy",
    category: "BTech",
    isbn: "978-1259029561",
    publisher: "McGraw-Hill",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "A9",
    price: 399,
  },
  {
    bookId: "B010",
    bookName: "Web Technologies",
    author: "A. A. Puntambekar",
    category: "BTech",
    isbn: "978-9350990483",
    publisher: "Technical Publications",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "A10",
    price: 320,
  },
  {
    bookId: "B011",
    bookName: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    category: "Story",
    isbn: "978-0439708180",
    publisher: "Scholastic",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "B1",
    price: 450,
  },
  {
    bookId: "B012",
    bookName: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    category: "Story",
    isbn: "978-8173711466",
    publisher: "Universities Press",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "B2",
    price: 250,
  },
  {
    bookId: "B013",
    bookName: "The Alchemist",
    author: "Paulo Coelho",
    category: "Story",
    isbn: "978-0062315007",
    publisher: "HarperOne",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "B3",
    price: 299,
  },
  {
    bookId: "B014",
    bookName: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Story",
    isbn: "978-0061935466",
    publisher: "Harper Perennial",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "B4",
    price: 349,
  },
  {
    bookId: "B015",
    bookName: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    isbn: "978-0553380163",
    publisher: "Bantam",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "C1",
    price: 399,
  },
  {
    bookId: "B016",
    bookName: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    isbn: "978-0345539434",
    publisher: "Ballantine Books",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "C2",
    price: 499,
  },
  {
    bookId: "B017",
    bookName: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Science",
    isbn: "978-0062316097",
    publisher: "Harper",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "C3",
    price: 549,
  },
  {
    bookId: "B018",
    bookName: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    isbn: "978-0735211292",
    publisher: "Avery",
    quantity: 4,
    availableQty: 4,
    shelfNumber: "D1",
    price: 449,
  },
  {
    bookId: "B019",
    bookName: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self-Help",
    isbn: "978-1585424337",
    publisher: "Tarcher",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "D2",
    price: 299,
  },
  {
    bookId: "B020",
    bookName: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Self-Help",
    isbn: "978-1612680194",
    publisher: "Plata Publishing",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "D3",
    price: 349,
  },
  {
    bookId: "B021",
    bookName: "1984",
    author: "George Orwell",
    category: "Fiction",
    isbn: "978-0451524935",
    publisher: "Signet Classic",
    quantity: 2,
    availableQty: 2,
    shelfNumber: "E1",
    price: 299,
  },
  {
    bookId: "B022",
    bookName: "Animal Farm",
    author: "George Orwell",
    category: "Fiction",
    isbn: "978-0451526342",
    publisher: "Signet Classic",
    quantity: 3,
    availableQty: 3,
    shelfNumber: "E2",
    price: 249,
  },
];

function getBooks(): LibraryBook[] {
  const stored = localStorage.getItem("libraryBooks");
  if (!stored) {
    localStorage.setItem("libraryBooks", JSON.stringify(SEED_BOOKS));
    return SEED_BOOKS;
  }
  return JSON.parse(stored);
}

function saveBooks(books: LibraryBook[]) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function getIssues(): IssueRecord[] {
  return JSON.parse(localStorage.getItem("libraryIssues") || "[]");
}

function saveIssues(issues: IssueRecord[]) {
  localStorage.setItem("libraryIssues", JSON.stringify(issues));
}

function calcDueDate(issueDate: string): string {
  const d = new Date(issueDate);
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

function calcFine(issue: IssueRecord): number {
  if (issue.returnDate) {
    const due = new Date(issue.dueDate);
    const ret = new Date(issue.returnDate);
    if (ret <= due) return 0;
    const days = Math.floor((ret.getTime() - due.getTime()) / 86400000);
    if (issue.bookCondition === "Lost") {
      const books = getBooks();
      const book = books.find((b) => b.bookId === issue.bookId);
      return (book?.price ?? 500) + days * 5;
    }
    if (issue.bookCondition === "Damaged") return 200 + days * 5;
    return days * 5;
  }
  const today = new Date();
  const due = new Date(issue.dueDate);
  if (today > due) {
    const days = Math.floor((today.getTime() - due.getTime()) / 86400000);
    return days * 5;
  }
  return 0;
}

function getCurrentUser() {
  const name = localStorage.getItem("eduportal_user_name") || "User";
  const email =
    localStorage.getItem("eduportal_user_email") || "user@email.com";
  const role = (localStorage.getItem("eduportal_role") || "student") as
    | "student"
    | "teacher"
    | "admin";
  const id = email.replace(/[^a-z0-9]/gi, "");
  return { name, email, role, id };
}

const CATEGORIES = [
  "BTech",
  "Story",
  "Science",
  "History",
  "Fiction",
  "Self-Help",
  "Other",
];

const categoryColor: Record<string, string> = {
  BTech: "bg-blue-100 text-blue-700",
  Story: "bg-purple-100 text-purple-700",
  Science: "bg-teal-100 text-teal-700",
  History: "bg-amber-100 text-amber-700",
  Fiction: "bg-pink-100 text-pink-700",
  "Self-Help": "bg-green-100 text-green-700",
  Other: "bg-gray-100 text-gray-700",
};

function emptyBook(): Omit<LibraryBook, "availableQty"> {
  return {
    bookId: "",
    bookName: "",
    author: "",
    category: "BTech",
    isbn: "",
    publisher: "",
    quantity: 1,
    shelfNumber: "",
    price: 0,
  };
}

// ── Admin View ────────────────────────────────────────────────────────────────
function AdminLibrary() {
  const [books, setBooks] = useState<LibraryBook[]>(getBooks);
  const [issues, setIssues] = useState<IssueRecord[]>(getIssues);
  const [search, setSearch] = useState("");
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [editBook, setEditBook] = useState<LibraryBook | null>(null);
  const [bookForm, setBookForm] = useState(emptyBook());
  const [returnDialogIssue, setReturnDialogIssue] =
    useState<IssueRecord | null>(null);
  const [returnCondition, setReturnCondition] = useState("Good");
  const [activeTab, setActiveTab] = useState("books");

  const refresh = () => {
    setBooks(getBooks());
    setIssues(getIssues());
  };

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.bookName.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q)
    );
  });

  const pending = issues.filter((i) => i.status === "Pending");
  const issued = issues.filter(
    (i) => i.status === "Issued" || i.status === "Overdue",
  );
  const returned = issues.filter((i) => i.status === "Returned");
  const overdue = issued.filter((i) => new Date(i.dueDate) < new Date());
  const totalFines = issues.reduce((s, i) => s + (i.fine || 0), 0);

  const openAdd = () => {
    setEditBook(null);
    setBookForm(emptyBook());
    setBookFormOpen(true);
  };

  const openEdit = (b: LibraryBook) => {
    setEditBook(b);
    setBookForm({
      bookId: b.bookId,
      bookName: b.bookName,
      author: b.author,
      category: b.category,
      isbn: b.isbn,
      publisher: b.publisher,
      quantity: b.quantity,
      shelfNumber: b.shelfNumber,
      price: b.price,
    });
    setBookFormOpen(true);
  };

  const handleSaveBook = () => {
    const bks = getBooks();
    if (editBook) {
      const idx = bks.findIndex((b) => b.bookId === editBook.bookId);
      if (idx >= 0) {
        const diff = bookForm.quantity - editBook.quantity;
        bks[idx] = {
          ...bks[idx],
          ...bookForm,
          availableQty: Math.max(0, bks[idx].availableQty + diff),
        };
      }
    } else {
      const newId = `B${String(bks.length + 1).padStart(3, "0")}`;
      bks.push({ ...bookForm, bookId: newId, availableQty: bookForm.quantity });
    }
    saveBooks(bks);
    setBookFormOpen(false);
    refresh();
  };

  const handleDelete = (bookId: string) => {
    const bks = getBooks().filter((b) => b.bookId !== bookId);
    saveBooks(bks);
    refresh();
  };

  const approveIssue = (issueId: string) => {
    const iss = getIssues().map((i) =>
      i.issueId === issueId ? { ...i, status: "Issued" as const } : i,
    );
    const approved = iss.find((i) => i.issueId === issueId);
    if (approved) {
      const bks = getBooks().map((b) =>
        b.bookId === approved.bookId
          ? { ...b, availableQty: Math.max(0, b.availableQty - 1) }
          : b,
      );
      saveBooks(bks);
    }
    saveIssues(iss);
    refresh();
  };

  const rejectIssue = (issueId: string) => {
    const iss = getIssues().filter((i) => i.issueId !== issueId);
    saveIssues(iss);
    refresh();
  };

  const processReturn = () => {
    if (!returnDialogIssue) return;
    const iss = getIssues().map((i) => {
      if (i.issueId !== returnDialogIssue.issueId) return i;
      const today = new Date().toISOString().split("T")[0];
      const fine = calcFine({
        ...i,
        returnDate: today,
        bookCondition: returnCondition,
      });
      return {
        ...i,
        returnDate: today,
        status: "Returned" as const,
        bookCondition: returnCondition,
        fine,
      };
    });
    const bk = iss.find((i) => i.issueId === returnDialogIssue.issueId);
    if (bk && returnCondition !== "Lost") {
      const bks = getBooks().map((b) =>
        b.bookId === returnDialogIssue.bookId
          ? { ...b, availableQty: b.availableQty + 1 }
          : b,
      );
      saveBooks(bks);
    }
    saveIssues(iss);
    setReturnDialogIssue(null);
    refresh();
  };

  const markFinePaid = (issueId: string) => {
    const iss = getIssues().map((i) =>
      i.issueId === issueId ? { ...i, fine: 0 } : i,
    );
    saveIssues(iss);
    refresh();
  };

  // Update overdue status
  useEffect(() => {
    const today = new Date();
    const iss = getIssues().map((i) => {
      if (i.status === "Issued" && new Date(i.dueDate) < today) {
        return { ...i, status: "Overdue" as const };
      }
      return i;
    });
    saveIssues(iss);
    setIssues(iss);
  }, []);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Books",
            value: books.reduce((s, b) => s + b.quantity, 0),
            color: "bg-blue-100 text-blue-700",
          },
          {
            label: "Available",
            value: books.reduce((s, b) => s + b.availableQty, 0),
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Issued",
            value: issued.length,
            color: "bg-orange-100 text-orange-700",
          },
          {
            label: "Overdue",
            value: overdue.length,
            color: "bg-red-100 text-red-700",
          },
          {
            label: "Fines (₹)",
            value: totalFines,
            color: "bg-purple-100 text-purple-700",
          },
        ].map((k) => (
          <Card key={k.label} className="border-gray-200">
            <CardContent className="p-4">
              <p className="text-xs text-slate-500 font-medium">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color.split(" ")[1]}`}>
                {k.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap gap-1 h-auto">
          <TabsTrigger value="books" data-ocid="library.books.tab">
            Books
          </TabsTrigger>
          <TabsTrigger value="requests" data-ocid="library.requests.tab">
            Requests{" "}
            {pending.length > 0 && (
              <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-1.5">
                {pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="issued" data-ocid="library.issued.tab">
            Issued
          </TabsTrigger>
          <TabsTrigger value="returns" data-ocid="library.returns.tab">
            Returns
          </TabsTrigger>
          <TabsTrigger value="fines" data-ocid="library.fines.tab">
            Fines
          </TabsTrigger>
          <TabsTrigger value="reports" data-ocid="library.reports.tab">
            Reports
          </TabsTrigger>
        </TabsList>

        {/* BOOKS TAB */}
        <TabsContent value="books" className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                data-ocid="library.search_input"
                placeholder="Search by title, author, category, ISBN…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              onClick={openAdd}
              data-ocid="library.add_book.button"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-1" /> Add Book
            </Button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book ID</TableHead>
                  <TableHead>Book Name</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Shelf</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((b, idx) => (
                  <TableRow
                    key={b.bookId}
                    data-ocid={`library.books.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {b.bookId}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {b.bookName}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {b.author}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[b.category] || categoryColor.Other}`}
                      >
                        {b.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {b.isbn}
                    </TableCell>
                    <TableCell>{b.quantity}</TableCell>
                    <TableCell>
                      <span
                        className={
                          b.availableQty > 0
                            ? "text-green-600 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {b.availableQty}
                      </span>
                    </TableCell>
                    <TableCell>{b.shelfNumber}</TableCell>
                    <TableCell>₹{b.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(b)}
                          data-ocid={`library.books.edit_button.${idx + 1}`}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(b.bookId)}
                          data-ocid={`library.books.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBooks.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.books.empty_state"
                    >
                      No books found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ISSUE REQUESTS TAB */}
        <TabsContent value="requests" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((i, idx) => (
                  <TableRow
                    key={i.issueId}
                    data-ocid={`library.requests.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {i.issueId}
                    </TableCell>
                    <TableCell className="font-medium">{i.bookName}</TableCell>
                    <TableCell>{i.userName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {i.userRole}
                      </Badge>
                    </TableCell>
                    <TableCell>{i.issueDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => approveIssue(i.issueId)}
                          data-ocid={`library.requests.confirm_button.${idx + 1}`}
                        >
                          <Check size={14} className="mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => rejectIssue(i.issueId)}
                          data-ocid={`library.requests.cancel_button.${idx + 1}`}
                        >
                          <X size={14} className="mr-1" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {pending.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.requests.empty_state"
                    >
                      No pending requests
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ISSUED BOOKS TAB */}
        <TabsContent value="issued" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fine</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issued.map((i, idx) => {
                  const isOv = new Date(i.dueDate) < new Date();
                  return (
                    <TableRow
                      key={i.issueId}
                      className={isOv ? "bg-red-50" : ""}
                      data-ocid={`library.issued.item.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs">
                        {i.issueId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {i.bookName}
                      </TableCell>
                      <TableCell>{i.userName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {i.userRole}
                        </Badge>
                      </TableCell>
                      <TableCell>{i.issueDate}</TableCell>
                      <TableCell
                        className={isOv ? "text-red-600 font-semibold" : ""}
                      >
                        {i.dueDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            isOv
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {isOv ? "Overdue" : "Issued"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={isOv ? "text-red-600 font-semibold" : ""}
                      >
                        {calcFine(i) > 0 ? `₹${calcFine(i)}` : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {issued.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.issued.empty_state"
                    >
                      No books currently issued
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* RETURNS TAB */}
        <TabsContent value="returns" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issued.map((i, idx) => (
                  <TableRow
                    key={i.issueId}
                    data-ocid={`library.returns.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {i.issueId}
                    </TableCell>
                    <TableCell className="font-medium">{i.bookName}</TableCell>
                    <TableCell>{i.userName}</TableCell>
                    <TableCell>{i.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          new Date(i.dueDate) < new Date()
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {new Date(i.dueDate) < new Date()
                          ? "Overdue"
                          : "Issued"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReturnDialogIssue(i);
                          setReturnCondition("Good");
                        }}
                        data-ocid={`library.returns.primary_button.${idx + 1}`}
                      >
                        Process Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {issued.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.returns.empty_state"
                    >
                      No books to return
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* FINES TAB */}
        <TabsContent value="fines" className="mt-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Fine</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues
                  .filter((i) => i.fine > 0)
                  .map((i, idx) => (
                    <TableRow
                      key={i.issueId}
                      data-ocid={`library.fines.item.${idx + 1}`}
                    >
                      <TableCell className="font-mono text-xs">
                        {i.issueId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {i.bookName}
                      </TableCell>
                      <TableCell>{i.userName}</TableCell>
                      <TableCell>{i.returnDate || "Not returned"}</TableCell>
                      <TableCell>{i.bookCondition}</TableCell>
                      <TableCell className="text-red-600 font-bold">
                        ₹{i.fine}
                      </TableCell>
                      <TableCell>
                        {i.status === "Returned" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => markFinePaid(i.issueId)}
                            data-ocid={`library.fines.confirm_button.${idx + 1}`}
                          >
                            Mark Paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                {issues.filter((i) => i.fine > 0).length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-slate-400"
                      data-ocid="library.fines.empty_state"
                    >
                      No fines
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Book Stock Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => {
                    const catBooks = books.filter((b) => b.category === cat);
                    if (catBooks.length === 0) return null;
                    return (
                      <div
                        key={cat}
                        className="flex justify-between items-center text-sm"
                      >
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor[cat] || categoryColor.Other}`}
                        >
                          {cat}
                        </span>
                        <span>
                          {catBooks.reduce((s, b) => s + b.availableQty, 0)} /{" "}
                          {catBooks.reduce((s, b) => s + b.quantity, 0)}{" "}
                          available
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-base">Issue Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Issues</span>
                  <span className="font-semibold">{issues.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Currently Issued</span>
                  <span className="font-semibold text-orange-600">
                    {issued.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Overdue</span>
                  <span className="font-semibold text-red-600">
                    {overdue.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Returned</span>
                  <span className="font-semibold text-green-600">
                    {returned.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-slate-600">Total Fines</span>
                  <span className="font-bold text-purple-700">
                    ₹{totalFines}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Book Dialog */}
      <Dialog open={bookFormOpen} onOpenChange={setBookFormOpen}>
        <DialogContent className="max-w-lg" data-ocid="library.books.dialog">
          <DialogHeader>
            <DialogTitle>{editBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2">
              <Label>Book Name</Label>
              <Input
                data-ocid="library.bookname.input"
                value={bookForm.bookName}
                onChange={(e) =>
                  setBookForm({ ...bookForm, bookName: e.target.value })
                }
                placeholder="Book name"
              />
            </div>
            <div>
              <Label>Author</Label>
              <Input
                value={bookForm.author}
                onChange={(e) =>
                  setBookForm({ ...bookForm, author: e.target.value })
                }
                placeholder="Author"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={bookForm.category}
                onValueChange={(v) => setBookForm({ ...bookForm, category: v })}
              >
                <SelectTrigger data-ocid="library.category.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ISBN</Label>
              <Input
                value={bookForm.isbn}
                onChange={(e) =>
                  setBookForm({ ...bookForm, isbn: e.target.value })
                }
                placeholder="ISBN"
              />
            </div>
            <div>
              <Label>Publisher</Label>
              <Input
                value={bookForm.publisher}
                onChange={(e) =>
                  setBookForm({ ...bookForm, publisher: e.target.value })
                }
                placeholder="Publisher"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={bookForm.quantity}
                onChange={(e) =>
                  setBookForm({ ...bookForm, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>Shelf Number</Label>
              <Input
                value={bookForm.shelfNumber}
                onChange={(e) =>
                  setBookForm({ ...bookForm, shelfNumber: e.target.value })
                }
                placeholder="e.g. A1"
              />
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                min={0}
                value={bookForm.price}
                onChange={(e) =>
                  setBookForm({ ...bookForm, price: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBookFormOpen(false)}
              data-ocid="library.books.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBook}
              data-ocid="library.books.save_button"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editBook ? "Save Changes" : "Add Book"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog
        open={!!returnDialogIssue}
        onOpenChange={(o) => !o && setReturnDialogIssue(null)}
      >
        <DialogContent data-ocid="library.return.dialog">
          <DialogHeader>
            <DialogTitle>Process Book Return</DialogTitle>
          </DialogHeader>
          {returnDialogIssue && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-slate-600">
                Book:{" "}
                <span className="font-semibold">
                  {returnDialogIssue.bookName}
                </span>
              </p>
              <p className="text-sm text-slate-600">
                Borrower:{" "}
                <span className="font-semibold">
                  {returnDialogIssue.userName}
                </span>
              </p>
              <p className="text-sm text-slate-600">
                Due Date:{" "}
                <span
                  className={
                    new Date(returnDialogIssue.dueDate) < new Date()
                      ? "text-red-600 font-semibold"
                      : "font-semibold"
                  }
                >
                  {returnDialogIssue.dueDate}
                </span>
              </p>
              <div>
                <Label>Book Condition</Label>
                <Select
                  value={returnCondition}
                  onValueChange={setReturnCondition}
                >
                  <SelectTrigger data-ocid="library.return.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Damaged">
                      Damaged (₹200 penalty)
                    </SelectItem>
                    <SelectItem value="Lost">Lost (Full price fine)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(() => {
                const today = new Date().toISOString().split("T")[0];
                const fine = calcFine({
                  ...returnDialogIssue,
                  returnDate: today,
                  bookCondition: returnCondition,
                });
                return fine > 0 ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 font-semibold flex items-center gap-1">
                      <IndianRupee size={14} /> Fine: ₹{fine}
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} /> No fine — returned on time
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReturnDialogIssue(null)}
              data-ocid="library.return.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={processReturn}
              data-ocid="library.return.confirm_button"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Confirm Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Student/Teacher View ──────────────────────────────────────────────────────
function UserLibrary({ maxBooks }: { maxBooks: number }) {
  const user = getCurrentUser();
  const [books, setBooks] = useState<LibraryBook[]>(getBooks);
  const [issues, setIssues] = useState<IssueRecord[]>(getIssues);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [requestDialogBook, setRequestDialogBook] =
    useState<LibraryBook | null>(null);

  const refresh = () => {
    setBooks(getBooks());
    setIssues(getIssues());
  };

  // Update overdue
  useEffect(() => {
    const today = new Date();
    const iss = getIssues().map((i) => {
      if (i.status === "Issued" && new Date(i.dueDate) < today) {
        return { ...i, status: "Overdue" as const, fine: calcFine(i) };
      }
      return i;
    });
    saveIssues(iss);
    setIssues(iss);
  }, []);

  const myIssues = issues.filter(
    (i) => i.userId === user.id && i.status !== "Returned",
  );
  const myActiveCount = myIssues.filter(
    (i) =>
      i.status === "Issued" || i.status === "Overdue" || i.status === "Pending",
  ).length;
  const myFines = myIssues.reduce((s, i) => s + calcFine(i), 0);

  const today = new Date();
  const dueSoon = myIssues.filter((i) => {
    const due = new Date(i.dueDate);
    const diff = (due.getTime() - today.getTime()) / 86400000;
    return diff >= 0 && diff <= 3 && i.status !== "Returned";
  });

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.bookName.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q);
    const matchCat = catFilter === "All" || b.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleRequest = (book: LibraryBook) => {
    if (myActiveCount >= maxBooks) return;
    const alreadyIssued = myIssues.some((i) => i.bookId === book.bookId);
    if (alreadyIssued) return;
    if (book.availableQty <= 0) return;
    const today = new Date().toISOString().split("T")[0];
    const newIssue: IssueRecord = {
      issueId: `ISS${Date.now()}`,
      bookId: book.bookId,
      bookName: book.bookName,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      issueDate: today,
      dueDate: calcDueDate(today),
      returnDate: null,
      status: "Pending",
      fine: 0,
      bookCondition: "Good",
    };
    const iss = [...getIssues(), newIssue];
    saveIssues(iss);
    setRequestDialogBook(null);
    refresh();
  };

  const canRequest = (book: LibraryBook) => {
    if (myActiveCount >= maxBooks) return false;
    if (book.availableQty <= 0) return false;
    if (myIssues.some((i) => i.bookId === book.bookId)) return false;
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {dueSoon.length > 0 && (
        <div
          className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3"
          data-ocid="library.duesoon.panel"
        >
          <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">Books Due Soon</p>
            {dueSoon.map((i) => (
              <p key={i.issueId} className="text-sm text-amber-700 mt-0.5">
                <span className="font-medium">{i.bookName}</span> — due{" "}
                {i.dueDate}
              </p>
            ))}
          </div>
        </div>
      )}
      {myFines > 0 && (
        <div
          className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-start gap-3"
          data-ocid="library.fines.panel"
        >
          <AlertCircle
            size={20}
            className="text-red-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="font-semibold text-red-800">
              Outstanding Fine: ₹{myFines}
            </p>
            <p className="text-sm text-red-600">
              Please pay your fine at the library counter.
            </p>
          </div>
        </div>
      )}

      {/* My Issued Books */}
      {myIssues.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-600" /> My Borrowed Books
            </h2>
            <span className="text-sm text-slate-500">
              {myActiveCount} / {maxBooks} slots used
            </span>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fine</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myIssues.map((i, idx) => {
                  const fine = calcFine(i);
                  const isOv =
                    i.status === "Overdue" ||
                    (i.status === "Issued" && new Date(i.dueDate) < today);
                  return (
                    <TableRow
                      key={i.issueId}
                      data-ocid={`library.mybooks.item.${idx + 1}`}
                    >
                      <TableCell className="font-medium">
                        {i.bookName}
                      </TableCell>
                      <TableCell>{i.issueDate}</TableCell>
                      <TableCell
                        className={isOv ? "text-red-600 font-semibold" : ""}
                      >
                        {i.dueDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            i.status === "Pending"
                              ? "bg-blue-100 text-blue-700"
                              : isOv
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                          }
                        >
                          {i.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          fine > 0 ? "text-red-600 font-bold" : "text-slate-400"
                        }
                      >
                        {fine > 0 ? `₹${fine}` : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Browse Books */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              data-ocid="library.search_input"
              placeholder="Search by title, author, category, ISBN…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-40" data-ocid="library.category.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((b, idx) => {
            const already = myIssues.some((i) => i.bookId === b.bookId);
            const canReq = canRequest(b);
            return (
              <Card
                key={b.bookId}
                className="border-gray-200 hover:shadow-md transition-shadow"
                data-ocid={`library.books.item.${idx + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug flex-1">
                      {b.bookName}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${categoryColor[b.category] || categoryColor.Other}`}
                    >
                      {b.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{b.author}</p>
                  <p className="text-xs text-slate-400 mb-3">
                    Shelf: {b.shelfNumber} · ISBN: {b.isbn}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${b.availableQty > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {b.availableQty > 0
                        ? `${b.availableQty} available`
                        : "Not available"}
                    </span>
                    {already ? (
                      <Badge className="bg-blue-100 text-blue-700">
                        Requested / Issued
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        disabled={!canReq}
                        onClick={() => setRequestDialogBook(b)}
                        data-ocid={`library.books.primary_button.${idx + 1}`}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white"
                      >
                        Request
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filteredBooks.length === 0 && (
            <div
              className="col-span-3 text-center py-12 text-slate-400"
              data-ocid="library.books.empty_state"
            >
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p>No books found</p>
            </div>
          )}
        </div>
      </div>

      {myActiveCount >= maxBooks && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700 font-medium">
          You have reached the maximum borrow limit ({maxBooks} books). Return a
          book to borrow more.
        </div>
      )}

      {/* Request Confirm Dialog */}
      <Dialog
        open={!!requestDialogBook}
        onOpenChange={(o) => !o && setRequestDialogBook(null)}
      >
        <DialogContent data-ocid="library.request.dialog">
          <DialogHeader>
            <DialogTitle>Request Book</DialogTitle>
          </DialogHeader>
          {requestDialogBook && (
            <div className="space-y-3 py-2">
              <p className="text-sm">
                You are requesting:{" "}
                <span className="font-semibold">
                  {requestDialogBook.bookName}
                </span>
              </p>
              <p className="text-sm text-slate-500">
                Author: {requestDialogBook.author}
              </p>
              <p className="text-sm text-slate-500">
                Due date will be 14 days from approval.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                Your request will be reviewed by the librarian/admin before the
                book is issued.
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRequestDialogBook(null)}
              data-ocid="library.request.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                requestDialogBook && handleRequest(requestDialogBook)
              }
              data-ocid="library.request.confirm_button"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Main Library Page ─────────────────────────────────────────────────────────
export default function Library({ navigate }: { navigate: (p: Page) => void }) {
  const role = (localStorage.getItem("eduportal_role") || "student") as
    | "student"
    | "teacher"
    | "admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("dashboard")}
          className="text-slate-400 hover:text-slate-700 transition-colors"
          data-ocid="library.back.button"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Library Management
          </h1>
          <p className="text-slate-500 text-sm">
            {role === "admin"
              ? "Manage books, issue requests, returns, and fines"
              : role === "teacher"
                ? "Browse and borrow books — up to 5 at a time"
                : "Browse and borrow books — up to 3 at a time"}
          </p>
        </div>
      </div>

      {role === "admin" ? (
        <AdminLibrary />
      ) : (
        <UserLibrary maxBooks={role === "teacher" ? 5 : 3} />
      )}
    </div>
  );
}
