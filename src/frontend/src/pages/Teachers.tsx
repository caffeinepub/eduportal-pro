import { ArrowLeft, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type Teacher = {
  id: number;
  name: string;
  dept: string;
  courses: number;
  students: number;
  exp: string;
};

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    dept: "Mathematics",
    courses: 3,
    students: 105,
    exp: "12 years",
  },
  {
    id: 2,
    name: "Mr. James Wilson",
    dept: "Physics",
    courses: 2,
    students: 56,
    exp: "8 years",
  },
  {
    id: 3,
    name: "Ms. Emily Davis",
    dept: "English",
    courses: 3,
    students: 90,
    exp: "6 years",
  },
  {
    id: 4,
    name: "Prof. Robert Brown",
    dept: "Computer Science",
    courses: 2,
    students: 75,
    exp: "15 years",
  },
  {
    id: 5,
    name: "Dr. Anna White",
    dept: "History",
    courses: 2,
    students: 60,
    exp: "10 years",
  },
  {
    id: 6,
    name: "Mr. David Lee",
    dept: "Chemistry",
    courses: 2,
    students: 50,
    exp: "5 years",
  },
];

export default function Teachers({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", dept: "", exp: "" });

  const handleAdd = () => {
    if (!form.name.trim() || !form.dept.trim()) return;
    const newTeacher: Teacher = {
      id: Date.now(),
      name: form.name.trim(),
      dept: form.dept.trim(),
      courses: 0,
      students: 0,
      exp: form.exp.trim() || "N/A",
    };
    setTeachers((prev) => [...prev, newTeacher]);
    setForm({ name: "", dept: "", exp: "" });
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
          <h1 className="text-3xl font-bold text-slate-900">Teachers</h1>
          <p className="text-slate-500 mt-1">
            {teachers.length} teachers on staff
          </p>
        </div>
        <button
          type="button"
          data-ocid="teachers.open_modal_button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <GraduationCap size={16} /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((t, i) => (
          <div
            key={t.id}
            data-ocid={`teachers.item.${i + 1}`}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                {t.name.split(" ").slice(-1)[0][0]}
                {t.name.split(" ")[0][0]}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.dept}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
              <div>
                <p className="text-lg font-bold text-slate-900">{t.courses}</p>
                <p className="text-xs text-slate-400">Courses</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{t.students}</p>
                <p className="text-xs text-slate-400">Students</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t.exp}</p>
                <p className="text-xs text-slate-400">Exp.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            data-ocid="teachers.dialog"
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Add New Teacher
              </h2>
              <button
                type="button"
                data-ocid="teachers.close_button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="teacher-name"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Full Name
                </label>
                <input
                  id="teacher-name"
                  data-ocid="teachers.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter teacher's full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="teacher-dept"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Department
                </label>
                <input
                  id="teacher-dept"
                  data-ocid="teachers.textarea"
                  value={form.dept}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dept: e.target.value }))
                  }
                  placeholder="e.g. Mathematics"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="teacher-exp"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Experience
                </label>
                <input
                  id="teacher-exp"
                  value={form.exp}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, exp: e.target.value }))
                  }
                  placeholder="e.g. 5 years"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                data-ocid="teachers.cancel_button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="teachers.confirm_button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
