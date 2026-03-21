import { ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const initialExams = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    date: "Dec 20, 2025",
    time: "9:00 AM",
    type: "Final Exam",
    room: "Hall A",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Physics",
    date: "Dec 22, 2025",
    time: "2:00 PM",
    type: "Midterm",
    room: "Room 201",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "English Literature",
    date: "Dec 18, 2025",
    time: "10:00 AM",
    type: "Unit Test",
    room: "Room 105",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "Computer Science",
    date: "Nov 28, 2025",
    time: "9:00 AM",
    type: "Midterm",
    room: "Lab 1",
    status: "completed",
  },
  {
    id: 5,
    subject: "Chemistry",
    date: "Nov 20, 2025",
    time: "2:00 PM",
    type: "Unit Test",
    room: "Room 303",
    status: "completed",
  },
];

export default function Exams({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [exams, setExams] = useState(initialExams);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    date: "",
    time: "",
    type: "Final Exam",
    room: "",
  });

  const handleAdd = () => {
    if (!form.subject) return;
    setExams((prev) => [
      ...prev,
      { id: Date.now(), ...form, status: "upcoming" },
    ]);
    setForm({ subject: "", date: "", time: "", type: "Final Exam", room: "" });
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
          <h1 className="text-3xl font-bold text-slate-900">Exams</h1>
          <p className="text-slate-500 mt-1">
            {exams.filter((e) => e.status === "upcoming").length} upcoming exams
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={16} /> Schedule Exam
          </button>
        )}
      </div>

      {["upcoming", "completed"].map((status) => (
        <div key={status}>
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-3">
            {status} Exams
          </h2>
          <div className="space-y-3">
            {exams
              .filter((e) => e.status === status)
              .map((e) => (
                <div
                  key={e.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        status === "upcoming" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <span
                        className={`text-lg font-bold ${
                          status === "upcoming"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {e.date.split(",")[0].split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {e.subject}
                      </p>
                      <p className="text-xs text-slate-400">
                        {e.type} &bull; {e.room} &bull; {e.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">
                      {e.date}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        status === "upcoming"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Schedule Exam
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
                { label: "Subject", key: "subject", type: "text" },
                { label: "Date", key: "date", type: "date" },
                { label: "Time", key: "time", type: "time" },
                { label: "Room", key: "room", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="text-sm font-medium text-slate-700 block mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
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
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
