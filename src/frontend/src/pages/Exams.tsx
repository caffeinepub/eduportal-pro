import {
  ArrowLeft,
  BarChart2,
  Download,
  Plus,
  Printer,
  Send,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page, Role } from "../App";

const CLASSES = ["3rd Year CSE", "2nd Year CSE", "2nd Year ECE"];
const SUBJECTS = [
  "Data Structures & Algorithms",
  "Computer Networks",
  "Database Management Systems",
  "Operating Systems",
];
const EXAM_TYPES = ["Mid 1", "Mid 2", "Semester"];
const MAX_MARKS: Record<string, number> = {
  "Mid 1": 30,
  "Mid 2": 30,
  Semester: 100,
};

const SAMPLE_STUDENTS = [
  { name: "Arjun Sharma", rollNo: "CS301" },
  { name: "Priya Patel", rollNo: "CS302" },
  { name: "Sneha Reddy", rollNo: "CS303" },
  { name: "Vikram Singh", rollNo: "CS304" },
  { name: "Rahul Verma", rollNo: "CS305" },
  { name: "Meera Nair", rollNo: "CS306" },
];

const SAMPLE_MARKS_SEED = [26, 24, 18, 28, 22, 25];

function calcGrade(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  return "F";
}

const initialExams = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    date: "Dec 20, 2025",
    time: "9:00 AM",
    type: "Mid 2",
    room: "Exam Hall A",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Computer Networks",
    date: "Dec 22, 2025",
    time: "2:00 PM",
    type: "Mid 2",
    room: "Room 205",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Database Management Systems",
    date: "Dec 24, 2025",
    time: "10:00 AM",
    type: "Mid 2",
    room: "Room 301",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "Data Structures & Algorithms",
    date: "Nov 28, 2025",
    time: "9:00 AM",
    type: "Mid 1",
    room: "Lab 301",
    status: "completed",
  },
  {
    id: 5,
    subject: "Operating Systems",
    date: "Nov 20, 2025",
    time: "2:00 PM",
    type: "Mid 1",
    room: "Exam Hall B",
    status: "completed",
  },
];

type StudentMark = { name: string; rollNo: string; marks: number };

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
    type: "Mid 1",
    room: "",
  });

  const [selClass, setSelClass] = useState(CLASSES[0]);
  const [selSubject, setSelSubject] = useState(SUBJECTS[0]);
  const [selExamType, setSelExamType] = useState("Mid 1");
  const [studentMarks, setStudentMarks] = useState<StudentMark[]>(
    SAMPLE_STUDENTS.map((s, i) => ({ ...s, marks: SAMPLE_MARKS_SEED[i] })),
  );
  const [published, setPublished] = useState(false);

  const maxM = MAX_MARKS[selExamType];

  const handleAdd = () => {
    if (!form.subject) return;
    setExams((prev) => [
      ...prev,
      { id: Date.now(), ...form, status: "upcoming" },
    ]);
    setForm({ subject: "", date: "", time: "", type: "Mid 1", room: "" });
    setShowModal(false);
  };

  const updateMark = (idx: number, val: string) => {
    const n = Math.min(maxM, Math.max(0, Number(val) || 0));
    setStudentMarks((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, marks: n } : s)),
    );
    setPublished(false);
  };

  const passCount = studentMarks.filter(
    (s) => Math.round((s.marks / maxM) * 100) >= 50,
  ).length;
  const classAvgPct = Math.round(
    (studentMarks.reduce((a, s) => a + s.marks, 0) /
      studentMarks.length /
      maxM) *
      100,
  );
  const topPerformer = studentMarks.reduce(
    (a, b) => (b.marks > a.marks ? b : a),
    studentMarks[0],
  );

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
            data-ocid="exam.open_modal_button"
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
              .map((e, idx) => (
                <div
                  key={e.id}
                  data-ocid={`exam.item.${idx + 1}`}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${status === "upcoming" ? "bg-blue-100" : "bg-gray-100"}`}
                    >
                      <span
                        className={`text-lg font-bold ${status === "upcoming" ? "text-blue-600" : "text-gray-400"}`}
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
                      className={`text-xs px-2 py-1 rounded-full font-medium ${status === "upcoming" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {(role === "teacher" || role === "admin") && (
        <div
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6"
          data-ocid="exam.panel"
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Conduct Exam / Manage Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="sel-class"
                className="text-xs font-semibold text-slate-500 uppercase mb-1 block"
              >
                Class
              </label>
              <select
                id="sel-class"
                value={selClass}
                onChange={(e) => setSelClass(e.target.value)}
                data-ocid="exam.select"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CLASSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sel-subject"
                className="text-xs font-semibold text-slate-500 uppercase mb-1 block"
              >
                Subject
              </label>
              <select
                id="sel-subject"
                value={selSubject}
                onChange={(e) => setSelSubject(e.target.value)}
                data-ocid="exam.select"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sel-examtype"
                className="text-xs font-semibold text-slate-500 uppercase mb-1 block"
              >
                Exam Type
              </label>
              <select
                id="sel-examtype"
                value={selExamType}
                onChange={(e) => {
                  setSelExamType(e.target.value);
                  setPublished(false);
                }}
                data-ocid="exam.select"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {EXAM_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Student Marks Entry — Max Marks: {maxM}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" data-ocid="exam.table">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Student Name",
                      "Roll No",
                      "Marks",
                      "Percentage",
                      "Grade",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentMarks.map((s, idx) => {
                    const pct = Math.round((s.marks / maxM) * 100);
                    const grade = calcGrade(pct);
                    const pass = pct >= 50;
                    return (
                      <tr
                        key={s.rollNo}
                        data-ocid={`exam.row.${idx + 1}`}
                        className={`border-t border-gray-100 ${pass ? "bg-green-50/40 hover:bg-green-50" : "bg-red-50/40 hover:bg-red-50"}`}
                      >
                        <td className="px-4 py-3 font-medium text-slate-800">
                          {s.name}
                        </td>
                        <td className="px-4 py-3 text-slate-500">{s.rollNo}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min={0}
                            max={maxM}
                            value={s.marks}
                            onChange={(e) => updateMark(idx, e.target.value)}
                            data-ocid={`exam.input.${idx + 1}`}
                            className="w-20 border border-gray-200 rounded-md px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-700">
                          {pct}%
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                              grade === "F"
                                ? "bg-red-100 text-red-600"
                                : grade === "A+"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : grade === "A"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {grade}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold ${pass ? "text-green-600" : "text-red-600"}`}
                          >
                            {pass ? "Pass" : "Fail"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setPublished(true);
                toast.success(
                  `Results published for ${selClass} — ${selSubject} (${selExamType})`,
                );
              }}
              data-ocid="exam.primary_button"
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Send size={15} /> Publish Results
            </button>
            <button
              type="button"
              onClick={() => toast.success("Report downloaded as PDF")}
              data-ocid="exam.secondary_button"
              className="flex items-center gap-2 px-5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              <Download size={15} /> Download Report
            </button>
            <button
              type="button"
              onClick={() => toast.success("Sending to printer…")}
              data-ocid="exam.secondary_button"
              className="flex items-center gap-2 px-5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              <Printer size={15} /> Print Report
            </button>
            {published && (
              <span
                className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                data-ocid="exam.success_state"
              >
                ✓ Published
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{classAvgPct}%</p>
              <p className="text-xs text-blue-500 mt-1">Class Average</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-center">
              <p className="text-2xl font-bold text-green-700">
                {Math.round((passCount / studentMarks.length) * 100)}%
              </p>
              <p className="text-xs text-green-500 mt-1">
                Pass Rate ({passCount}/{studentMarks.length} students)
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-center">
              <p className="text-lg font-bold text-amber-700 truncate">
                {topPerformer.name}
              </p>
              <p className="text-xs text-amber-500 mt-1">
                Top Performer — {topPerformer.marks}/{maxM}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Student Performance Tracking
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Student",
                      "Roll No",
                      "Marks",
                      "Percentage",
                      "Grade",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...studentMarks]
                    .sort((a, b) => b.marks - a.marks)
                    .map((s, idx) => {
                      const pct = Math.round((s.marks / maxM) * 100);
                      const grade = calcGrade(pct);
                      const pass = pct >= 50;
                      return (
                        <tr
                          key={s.rollNo}
                          data-ocid={`exam.row.${idx + 1}`}
                          className={`border-t border-gray-100 ${pass ? "bg-green-50/60 hover:bg-green-100/60" : "bg-red-50/60 hover:bg-red-100/60"}`}
                        >
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {s.name}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {s.rollNo}
                          </td>
                          <td className="px-4 py-3">
                            {s.marks}/{maxM}
                          </td>
                          <td className="px-4 py-3 font-medium">{pct}%</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                                grade === "F"
                                  ? "bg-red-100 text-red-600"
                                  : grade === "A+"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {grade}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 text-xs font-bold ${pass ? "text-green-600" : "text-red-600"}`}
                          >
                            {pass ? "Pass ✓" : "Fail ✗"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          data-ocid="exam.modal"
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Schedule Exam
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="exam.close_button"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="modal-subject"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Subject
                </label>
                <select
                  id="modal-subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              {[
                { label: "Date", key: "date", type: "date" },
                { label: "Time", key: "time", type: "time" },
                { label: "Room", key: "room", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={`modal-${f.key}`}
                    className="text-sm font-medium text-slate-700 block mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    id={`modal-${f.key}`}
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="modal-type"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Exam Type
                </label>
                <select
                  id="modal-type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {EXAM_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="exam.cancel_button"
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                data-ocid="exam.submit_button"
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
