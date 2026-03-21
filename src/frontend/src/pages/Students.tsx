import { ArrowLeft, Users, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type Student = {
  id: number;
  name: string;
  grade: string;
  courses: number;
  attendance: string;
  gpa: string;
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Alex Thompson",
    grade: "10th",
    courses: 5,
    attendance: "94%",
    gpa: "3.7",
  },
  {
    id: 2,
    name: "Maria Garcia",
    grade: "10th",
    courses: 6,
    attendance: "98%",
    gpa: "3.9",
  },
  {
    id: 3,
    name: "James Lee",
    grade: "11th",
    courses: 4,
    attendance: "87%",
    gpa: "3.2",
  },
  {
    id: 4,
    name: "Sophie Turner",
    grade: "11th",
    courses: 5,
    attendance: "96%",
    gpa: "3.8",
  },
  {
    id: 5,
    name: "Daniel Kim",
    grade: "9th",
    courses: 5,
    attendance: "91%",
    gpa: "3.5",
  },
  {
    id: 6,
    name: "Emma Wilson",
    grade: "12th",
    courses: 6,
    attendance: "99%",
    gpa: "4.0",
  },
  {
    id: 7,
    name: "Noah Johnson",
    grade: "9th",
    courses: 4,
    attendance: "85%",
    gpa: "3.1",
  },
  {
    id: 8,
    name: "Olivia Brown",
    grade: "12th",
    courses: 5,
    attendance: "97%",
    gpa: "3.8",
  },
];

export default function Students({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", grade: "9th" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newStudent: Student = {
      id: Date.now(),
      name: form.name.trim(),
      grade: form.grade,
      courses: 0,
      attendance: "100%",
      gpa: "N/A",
    };
    setStudents((prev) => [...prev, newStudent]);
    setForm({ name: "", grade: "9th" });
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
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 mt-1">
            {students.length} students enrolled
          </p>
        </div>
        <button
          type="button"
          data-ocid="students.open_modal_button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Users size={16} /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Grade
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Courses
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Attendance
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                GPA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s, i) => (
              <tr
                key={s.id}
                data-ocid={`students.item.${i + 1}`}
                className="hover:bg-slate-50"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium text-slate-900">
                      {s.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-slate-500">{s.grade}</td>
                <td className="px-5 py-3 text-sm text-slate-500">
                  {s.courses}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      Number.parseInt(s.attendance) >= 95
                        ? "bg-green-100 text-green-600"
                        : Number.parseInt(s.attendance) >= 90
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {s.attendance}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-semibold text-slate-900">
                  {s.gpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            data-ocid="students.dialog"
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Add New Student
              </h2>
              <button
                type="button"
                data-ocid="students.close_button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="student-name"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Full Name
                </label>
                <input
                  id="student-name"
                  data-ocid="students.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Enter student's full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="student-grade"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Grade
                </label>
                <select
                  id="student-grade"
                  data-ocid="students.select"
                  value={form.grade}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, grade: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>9th</option>
                  <option>10th</option>
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                data-ocid="students.cancel_button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="students.confirm_button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
