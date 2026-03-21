import { ArrowLeft, BookOpen, Plus, Users, X } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const initialCourses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH401",
    teacher: "Dr. Sarah Johnson",
    students: 42,
    status: "active",
    dept: "Mathematics",
  },
  {
    id: 2,
    name: "Physics Lab",
    code: "PHYS301",
    teacher: "Mr. James Wilson",
    students: 28,
    status: "active",
    dept: "Science",
  },
  {
    id: 3,
    name: "English Literature",
    code: "ENGL201",
    teacher: "Ms. Emily Davis",
    students: 35,
    status: "active",
    dept: "Humanities",
  },
  {
    id: 4,
    name: "Computer Science",
    code: "CS101",
    teacher: "Prof. Robert Brown",
    students: 50,
    status: "active",
    dept: "Technology",
  },
  {
    id: 5,
    name: "History",
    code: "HIST101",
    teacher: "Dr. Anna White",
    students: 30,
    status: "active",
    dept: "Humanities",
  },
  {
    id: 6,
    name: "Chemistry",
    code: "CHEM201",
    teacher: "Mr. David Lee",
    students: 25,
    status: "inactive",
    dept: "Science",
  },
];

export default function Courses({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [courses, setCourses] = useState(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    teacher: "",
    dept: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.code) return;
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), ...form, students: 0, status: "active" },
    ]);
    setForm({ name: "", code: "", teacher: "", dept: "" });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="nav.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
          <p className="text-slate-500 mt-1">
            {courses.length} courses available
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Course
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen size={18} className="text-blue-600" />
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {c.status}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900">{c.name}</h3>
            <p className="text-xs text-slate-400 mt-1">
              {c.code} &bull; {c.dept}
            </p>
            <p className="text-sm text-slate-500 mt-2">{c.teacher}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
              <Users size={13} /> {c.students} students enrolled
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Add New Course
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Course Name",
                  key: "name",
                  placeholder: "e.g. Advanced Physics",
                },
                {
                  label: "Course Code",
                  key: "code",
                  placeholder: "e.g. PHYS401",
                },
                {
                  label: "Teacher",
                  key: "teacher",
                  placeholder: "e.g. Dr. Smith",
                },
                {
                  label: "Department",
                  key: "dept",
                  placeholder: "e.g. Science",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="text-sm font-medium text-slate-700 block mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
