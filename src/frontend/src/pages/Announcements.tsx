import { ArrowLeft, Pin, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const initialAnnouncements = [
  {
    id: 1,
    title: "Final Exam Schedule Released",
    body: "The final exam schedule for December has been posted. Please check your individual course pages for details. All exams will be held in the main examination hall.",
    author: "Admin",
    date: "Dec 8, 2025",
    pinned: true,
    tag: "Academic",
  },
  {
    id: 2,
    title: "Holiday Break Notice",
    body: "The institution will be closed from December 23 to January 3. Classes will resume on January 6, 2026. Happy holidays to all students and staff!",
    author: "Principal",
    date: "Dec 5, 2025",
    pinned: false,
    tag: "General",
  },
  {
    id: 3,
    title: "Physics Lab - New Equipment",
    body: "We are pleased to announce that the Physics laboratory has been upgraded with new equipment. Students enrolled in PHYS301 can schedule extra lab sessions starting next week.",
    author: "Dr. Sarah Johnson",
    date: "Dec 3, 2025",
    pinned: false,
    tag: "Facility",
  },
  {
    id: 4,
    title: "Student Council Elections",
    body: "Nominations for the 2026 Student Council are now open. Any student in good academic standing may apply. Forms available at the admin office.",
    author: "Admin",
    date: "Dec 1, 2025",
    pinned: false,
    tag: "Events",
  },
];

const tagColors: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-600",
  General: "bg-gray-100 text-gray-600",
  Facility: "bg-green-100 text-green-600",
  Events: "bg-purple-100 text-purple-600",
};

export default function Announcements({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", tag: "General" });

  const handleAdd = () => {
    if (!form.title) return;
    setAnnouncements((prev) => [
      {
        id: Date.now(),
        ...form,
        author: role === "admin" ? "Admin" : "Teacher",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        pinned: false,
      },
      ...prev,
    ]);
    setForm({ title: "", body: "", tag: "General" });
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
          <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500 mt-1">
            {announcements.length} announcements
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={16} /> Post Announcement
          </button>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`bg-white rounded-xl border shadow-sm p-5 ${
              a.pinned
                ? "border-blue-300 ring-1 ring-blue-100"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {a.pinned && <Pin size={14} className="text-blue-500" />}
                <h3 className="font-semibold text-slate-900">{a.title}</h3>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[a.tag] || "bg-gray-100 text-gray-500"}`}
              >
                {a.tag}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{a.body}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <span>{a.author}</span>
              <span>&bull;</span>
              <span>{a.date}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Post Announcement
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
              <div>
                <label
                  htmlFor="ann-title"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Title
                </label>
                <input
                  id="ann-title"
                  type="text"
                  placeholder="Announcement title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="ann-body"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Message
                </label>
                <textarea
                  id="ann-body"
                  placeholder="Write your announcement..."
                  value={form.body}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, body: e.target.value }))
                  }
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="ann-category"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Category
                </label>
                <select
                  id="ann-category"
                  value={form.tag}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tag: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["Academic", "General", "Facility", "Events"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
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
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
