import {
  AlertCircle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  Users,
} from "lucide-react";
import type { Page } from "../../App";

const myCourses = [
  {
    name: "Data Structures & Algorithms",
    students: 60,
    code: "CS301",
    schedule: "Mon/Wed 9:00 AM",
  },
  {
    name: "Computer Networks",
    students: 55,
    code: "CS401",
    schedule: "Tue/Thu 11:00 AM",
  },
  {
    name: "Operating Systems",
    students: 58,
    code: "CS302",
    schedule: "Mon/Fri 2:00 PM",
  },
];

const pending = [
  {
    assignment: "DSA Lab #3",
    course: "Data Structures & Algorithms",
    submissions: 52,
    due: "2 days ago",
  },
  {
    assignment: "Network Topology Assignment",
    course: "Computer Networks",
    submissions: 48,
    due: "3 days ago",
  },
  {
    assignment: "Process Scheduling Lab",
    course: "Operating Systems",
    submissions: 50,
    due: "5 days ago",
  },
];

const todayClasses = [
  {
    time: "9:00 AM",
    course: "Data Structures & Algorithms",
    room: "Lab 301",
    students: 60,
  },
  {
    time: "11:00 AM",
    course: "Computer Networks",
    room: "Room 205",
    students: 55,
  },
  {
    time: "2:00 PM",
    course: "Office Hours",
    room: "Staff Office",
    students: 0,
  },
];

export default function TeacherDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
  const teacherName = localStorage.getItem("eduportal_user_name") || "Teacher";
  const { borrowedCount, pendingFines, dueSoonBooks } = (() => {
    const email = localStorage.getItem("eduportal_user_email") || "";
    const userId = email.replace(/[^a-z0-9]/gi, "");
    const issues: any[] = JSON.parse(
      localStorage.getItem("libraryIssues") || "[]",
    );
    const today = new Date();
    const myActive = issues.filter(
      (i: any) => i.userId === userId && i.status !== "Returned",
    );
    const borrowedCount = myActive.length;
    const pendingFines = myActive.reduce((s: number, i: any) => {
      const due = new Date(i.dueDate);
      if (today > due) {
        const days = Math.floor((today.getTime() - due.getTime()) / 86400000);
        return s + days * 5;
      }
      return s;
    }, 0);
    const dueSoonBooks = myActive.filter((i: any) => {
      const due = new Date(i.dueDate);
      const diff = (due.getTime() - today.getTime()) / 86400000;
      return diff >= 0 && diff <= 3;
    });
    return { borrowedCount, pendingFines, dueSoonBooks };
  })();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Good morning, {teacherName}. You have 3 classes today.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "My Courses",
            value: "3",
            icon: <BookOpen size={18} />,
            color: "bg-blue-100 text-blue-600",
          },
          {
            label: "Total Students",
            value: "173",
            icon: <Users size={18} />,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Pending Grades",
            value: "150",
            icon: <ClipboardList size={18} />,
            color: "bg-orange-100 text-orange-600",
          },
          {
            label: "Today's Classes",
            value: "3",
            icon: <Calendar size={18} />,
            color: "bg-purple-100 text-purple-600",
          },
        ].map((k) => (
          <div
            key={k.label}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.color}`}
            >
              {k.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500">{k.label}</p>
              <p className="text-xl font-bold text-slate-900">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">My Courses</h2>
            <button
              type="button"
              onClick={() => navigate("courses")}
              className="text-xs text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {myCourses.map((c) => (
              <div key={c.name} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {c.code} &bull; {c.schedule}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {c.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">Pending to Grade</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {pending.map((p) => (
                <div
                  key={p.assignment}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {p.assignment}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.course} &bull; {p.submissions} submissions
                    </p>
                  </div>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    {p.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">Today's Schedule</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {todayClasses.map((c) => (
                <div key={c.time} className="px-5 py-3 flex items-center gap-3">
                  <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                    {c.time}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {c.course}
                    </p>
                    <p className="text-xs text-slate-400">
                      {c.room}
                      {c.students > 0 ? ` · ${c.students} students` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Library Section */}
      <div
        className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl border border-purple-200 shadow-sm p-5"
        data-ocid="library.card"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
            <BookMarked size={22} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Library</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse and borrow books — up to 5 at a time
            </p>
            {borrowedCount > 0 && (
              <p className="text-xs text-purple-700 font-medium mt-1">
                {borrowedCount} / 5 book{borrowedCount !== 1 ? "s" : ""}{" "}
                borrowed
              </p>
            )}
            {dueSoonBooks.length > 0 && (
              <p className="text-xs text-amber-700 font-semibold mt-1 flex items-center gap-1">
                <Clock size={12} /> {dueSoonBooks.length} book
                {dueSoonBooks.length > 1 ? "s" : ""} due within 3 days!
              </p>
            )}
            {pendingFines > 0 && (
              <p className="text-xs text-red-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> Outstanding fine: ₹{pendingFines}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => navigate("library")}
            data-ocid="library.primary_button"
            className="flex items-center gap-1.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            Go to Library
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
