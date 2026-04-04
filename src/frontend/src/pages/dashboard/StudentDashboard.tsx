import {
  AlertCircle,
  ArrowRight,
  Bell,
  BookMarked,
  BookOpen,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../../App";

const enrolledCourses = [
  {
    name: "Data Structures & Algorithms",
    teacher: "Dr. Rajesh Kumar",
    progress: 68,
    grade: "A",
  },
  {
    name: "Computer Networks",
    teacher: "Prof. Sunita Rao",
    progress: 72,
    grade: "B+",
  },
  {
    name: "DBMS",
    teacher: "Mr. Anil Verma",
    progress: 60,
    grade: "A-",
  },
];

const upcomingAssignments = [
  {
    title: "DSA Lab Assignment #4",
    course: "Data Structures & Algorithms",
    due: "Tomorrow",
    status: "pending",
  },
  {
    title: "CN Protocol Analysis",
    course: "Computer Networks",
    due: "Mar 28",
    status: "pending",
  },
  {
    title: "DBMS ER Diagram",
    course: "DBMS",
    due: "Mar 30",
    status: "submitted",
  },
];

const statCards = [
  {
    label: "Enrolled Courses",
    value: "5",
    icon: <BookOpen size={18} />,
    color: "bg-purple-100 text-purple-600",
    page: null as Page | null,
  },
  {
    label: "Pending Assignments",
    value: "",
    icon: <ClipboardList size={18} />,
    color: "bg-orange-100 text-orange-600",
    page: "assignments" as Page | null,
  },
  {
    label: "Attendance Rate",
    value: "94%",
    icon: <TrendingUp size={18} />,
    color: "bg-green-100 text-green-600",
    page: null as Page | null,
  },
  {
    label: "Upcoming Exams",
    value: "2",
    icon: <Bell size={18} />,
    color: "bg-red-100 text-red-600",
    page: null as Page | null,
  },
  {
    label: "Books Borrowed",
    value: "",
    icon: <BookMarked size={18} />,
    color: "bg-purple-100 text-purple-600",
    page: "library" as Page | null,
  },
];

export default function StudentDashboard({
  navigate,
}: { navigate: (p: Page) => void }) {
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

  const pendingAssignments = upcomingAssignments.filter(
    (a) => a.status === "pending",
  );
  const userName = localStorage.getItem("eduportal_user_name") || "Student";
  const userYear = localStorage.getItem("eduportal_user_year") || "";
  const userBranch = localStorage.getItem("eduportal_user_branch") || "";

  const cards = statCards.map((k) => {
    if (k.label === "Pending Assignments")
      return { ...k, value: String(pendingAssignments.length) };
    if (k.label === "Books Borrowed")
      return { ...k, value: String(borrowedCount) };
    // dueSoonBooks is used in library card below
    return k;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {userName}!
          </h1>
          <p className="text-slate-500 mt-1">
            {userYear && userBranch ? `${userYear} · ${userBranch} · ` : ""}
            You have {pendingAssignments.length} assignment
            {pendingAssignments.length !== 1 ? "s" : ""} due this week.
          </p>
        </div>
        <img
          src="/assets/generated/student-dashboard-illustration.dim_400x400.png"
          alt="Student"
          className="hidden lg:block w-28 h-28 object-cover rounded-2xl shadow-md flex-shrink-0"
        />
      </div>

      {pendingAssignments.length > 0 && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
          <AlertCircle size={20} className="text-orange-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-700">
              Assignment should be submitted!
            </p>
            <p className="text-xs text-orange-600 mt-0.5">
              You have {pendingAssignments.length} pending assignment
              {pendingAssignments.length > 1 ? "s" : ""}. Please submit before
              the due date to avoid penalties.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("assignments")}
            className="text-xs font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            View Assignments
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((k) =>
          k.page ? (
            <button
              key={k.label}
              type="button"
              onClick={() => k.page && navigate(k.page)}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow text-left"
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
            </button>
          ) : (
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
          ),
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">My Courses</h2>
            <button
              type="button"
              onClick={() => navigate("courses")}
              className="text-xs text-purple-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {enrolledCourses.map((c) => (
              <div key={c.name} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 text-sm">{c.name}</p>
                  <span className="text-sm font-bold text-purple-600">
                    {c.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{c.teacher}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {c.progress}% complete
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">
                Upcoming Assignments
              </h2>
              <button
                type="button"
                onClick={() => navigate("assignments")}
                className="text-xs text-purple-600 hover:underline"
              >
                View all
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingAssignments.map((a) => (
                <div
                  key={a.title}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {a.title}
                      {a.status === "pending" && (
                        <span className="ml-2 text-xs text-orange-500 font-normal">
                          • Should be submitted
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">
                      {a.course} &bull; Due: {a.due}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      a.status === "submitted"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Library Quick Action */}
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
                  Browse and borrow from 22+ books
                </p>
                {borrowedCount > 0 && (
                  <p className="text-xs text-purple-700 font-medium mt-1">
                    {borrowedCount} / 3 book{borrowedCount !== 1 ? "s" : ""}{" "}
                    borrowed
                  </p>
                )}
                {dueSoonBooks.length > 0 && (
                  <p className="text-xs text-amber-700 font-semibold mt-1 flex items-center gap-1">
                    ⚠ {dueSoonBooks.length} book
                    {dueSoonBooks.length > 1 ? "s" : ""} due within 3 days!
                  </p>
                )}
                {pendingFines > 0 && (
                  <p className="text-xs text-red-600 font-semibold mt-1">
                    Outstanding fine: ₹{pendingFines}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("library")}
              data-ocid="library.primary_button"
              className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              Go to Library
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
