import { ArrowLeft, BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type RegRole = "student" | "teacher";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BRANCHES = [
  "CSE",
  "ECE",
  "ME",
  "CE",
  "EE",
  "IT",
  "Chemical",
  "Biotechnology",
];
const SEMESTERS = ["Sem 1", "Sem 2"];

export default function Register({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [regRole, setRegRole] = useState<RegRole>("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    year: "1st Year",
    branch: "CSE",
    semester: "Sem 1",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChoose = (r: RegRole) => {
    setRegRole(r);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name) {
      localStorage.setItem("eduportal_user_name", form.name);
    }
    if (form.email) {
      localStorage.setItem("eduportal_user_email", form.email);
    }
    if (regRole === "student") {
      localStorage.setItem("eduportal_user_year", form.year);
      localStorage.setItem("eduportal_user_branch", form.branch);
      localStorage.setItem("eduportal_user_semester", form.semester);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Registration Submitted!
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Your {regRole} account has been submitted for review. You'll receive
            a confirmation soon.
          </p>
          <button
            type="button"
            onClick={() => navigate("login")}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        {step === "choose" ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => navigate("landing")}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Create Account
                </h1>
                <p className="text-slate-500 text-sm">
                  Register as a student or teacher
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleChoose("student")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Register as Student
                  </p>
                  <p className="text-sm text-slate-500">
                    Access courses, assignments, and results
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleChoose("teacher")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Register as Teacher
                  </p>
                  <p className="text-sm text-slate-500">
                    Manage courses, grades, and attendance
                  </p>
                </div>
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {regRole === "student"
                    ? "Student Registration"
                    : "Teacher Registration"}
                </h1>
                <p className="text-slate-500 text-sm">
                  Fill in your details below
                </p>
              </div>
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${regRole === "student" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
            >
              {regRole === "student" ? (
                <GraduationCap size={14} />
              ) : (
                <BookOpen size={14} />
              )}
              {regRole === "student" ? "Student" : "Teacher"}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {regRole === "teacher" && (
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Subject / Department
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Mathematics, Computer Science"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {regRole === "student" && (
                <>
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Year
                    </label>
                    <select
                      id="year"
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {YEARS.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Branch
                    </label>
                    <select
                      id="branch"
                      value={form.branch}
                      onChange={(e) =>
                        setForm({ ...form, branch: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="semester"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Semester
                    </label>
                    <select
                      id="semester"
                      value={form.semester}
                      onChange={(e) =>
                        setForm({ ...form, semester: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {SEMESTERS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  required
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 text-white rounded-xl font-semibold transition-colors ${regRole === "student" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                Create {regRole === "student" ? "Student" : "Teacher"} Account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
