import { ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const initialAssignments = [
  {
    id: 1,
    title: "Calculus Homework #5",
    course: "Advanced Mathematics",
    due: "Dec 12, 2025",
    status: "overdue",
    submissions: 28,
    total: 42,
  },
  {
    id: 2,
    title: "Lab Report 3",
    course: "Physics Lab",
    due: "Dec 15, 2025",
    status: "pending",
    submissions: 15,
    total: 28,
  },
  {
    id: 3,
    title: "Essay Draft",
    course: "English Literature",
    due: "Dec 18, 2025",
    status: "submitted",
    submissions: 30,
    total: 35,
  },
  {
    id: 4,
    title: "Problem Set 8",
    course: "Advanced Mathematics",
    due: "Dec 20, 2025",
    status: "pending",
    submissions: 0,
    total: 42,
  },
  {
    id: 5,
    title: "Circuit Analysis",
    course: "Computer Science",
    due: "Dec 22, 2025",
    status: "graded",
    submissions: 48,
    total: 50,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-orange-100 text-orange-600",
  submitted: "bg-blue-100 text-blue-600",
  overdue: "bg-red-100 text-red-600",
  graded: "bg-green-100 text-green-600",
};

export default function Assignments({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", course: "", due: "" });

  const handleAdd = () => {
    if (!form.title) return;
    setAssignments((prev) => [
      ...prev,
      { id: Date.now(), ...form, status: "pending", submissions: 0, total: 30 },
    ]);
    setForm({ title: "", course: "", due: "" });
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
          <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
          <p className="text-slate-500 mt-1">
            {assignments.length} total assignments
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={16} /> Create Assignment
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Course
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Due Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Status
              </th>
              {(role === "teacher" || role === "admin") && (
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Submissions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignments.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {a.title}
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{a.course}</td>
                <td className="px-5 py-4 text-sm text-slate-500">{a.due}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status] || "bg-gray-100 text-gray-500"}`}
                  >
                    {a.status}
                  </span>
                </td>
                {(role === "teacher" || role === "admin") && (
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {a.submissions}/{a.total}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Create Assignment
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
                  label: "Title",
                  key: "title",
                  type: "text",
                  placeholder: "Assignment title",
                },
                {
                  label: "Course",
                  key: "course",
                  type: "text",
                  placeholder: "Course name",
                },
                {
                  label: "Due Date",
                  key: "due",
                  type: "date",
                  placeholder: "",
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
                    type={f.type}
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
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
