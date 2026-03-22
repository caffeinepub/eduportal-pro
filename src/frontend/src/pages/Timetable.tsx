import { ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TIME_SLOTS = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "Lab",
];

type TimetableEntry = {
  day: string;
  time: string;
  subject: string;
  room: string;
  teacher: string;
  section: string;
  students: number;
  mode: "Online" | "Offline";
};

const SUBJECT_COLORS: Record<string, string> = {
  DSA: "bg-blue-100 text-blue-700 border-blue-200",
  "Computer Networks": "bg-purple-100 text-purple-700 border-purple-200",
  "Operating Systems": "bg-teal-100 text-teal-700 border-teal-200",
  DBMS: "bg-pink-100 text-pink-700 border-pink-200",
  Algorithms: "bg-orange-100 text-orange-700 border-orange-200",
  "Computer Architecture": "bg-amber-100 text-amber-700 border-amber-200",
  "DSA Lab": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "CN Lab": "bg-violet-100 text-violet-700 border-violet-200",
  "OS Lab": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "DBMS Lab": "bg-rose-100 text-rose-700 border-rose-200",
};

function getSubjectColor(subject: string) {
  return (
    SUBJECT_COLORS[subject] || "bg-slate-100 text-slate-700 border-slate-200"
  );
}

const initialEntries: TimetableEntry[] = [
  // Monday
  {
    day: "Monday",
    time: "8:00 AM",
    subject: "DSA",
    room: "Room 205",
    teacher: "Dr. Ramesh Kumar",
    section: "3rd Year CSE",
    students: 62,
    mode: "Offline",
  },
  {
    day: "Monday",
    time: "10:00 AM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
    section: "3rd Year CSE",
    students: 60,
    mode: "Offline",
  },
  {
    day: "Monday",
    time: "2:00 PM",
    subject: "Algorithms",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Monday",
    time: "Lab",
    subject: "DSA Lab",
    room: "Lab 301",
    teacher: "Dr. Ramesh Kumar",
    section: "3rd Year CSE Batch A",
    students: 30,
    mode: "Offline",
  },
  // Tuesday
  {
    day: "Tuesday",
    time: "8:00 AM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
    section: "3rd Year CSE",
    students: 62,
    mode: "Offline",
  },
  {
    day: "Tuesday",
    time: "10:00 AM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
    section: "3rd Year CSE",
    students: 60,
    mode: "Online",
  },
  {
    day: "Tuesday",
    time: "12:00 PM",
    subject: "Computer Architecture",
    room: "Room 204",
    teacher: "Prof. Suresh Iyer",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Tuesday",
    time: "Lab",
    subject: "CN Lab",
    room: "Lab 302",
    teacher: "Prof. Anita Sharma",
    section: "3rd Year CSE Batch B",
    students: 32,
    mode: "Offline",
  },
  // Wednesday
  {
    day: "Wednesday",
    time: "8:00 AM",
    subject: "Algorithms",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Wednesday",
    time: "10:00 AM",
    subject: "DSA",
    room: "Room 205",
    teacher: "Dr. Ramesh Kumar",
    section: "3rd Year CSE",
    students: 62,
    mode: "Online",
  },
  {
    day: "Wednesday",
    time: "2:00 PM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
    section: "3rd Year CSE",
    students: 60,
    mode: "Offline",
  },
  {
    day: "Wednesday",
    time: "Lab",
    subject: "OS Lab",
    room: "Lab 303",
    teacher: "Prof. Meena Iyer",
    section: "3rd Year CSE Batch A",
    students: 30,
    mode: "Offline",
  },
  // Thursday
  {
    day: "Thursday",
    time: "8:00 AM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
    section: "3rd Year CSE",
    students: 60,
    mode: "Offline",
  },
  {
    day: "Thursday",
    time: "10:00 AM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
    section: "3rd Year CSE",
    students: 62,
    mode: "Online",
  },
  {
    day: "Thursday",
    time: "2:00 PM",
    subject: "Computer Architecture",
    room: "Room 204",
    teacher: "Prof. Suresh Iyer",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Thursday",
    time: "4:00 PM",
    subject: "DSA",
    room: "Room 205",
    teacher: "Dr. Ramesh Kumar",
    section: "3rd Year CSE",
    students: 62,
    mode: "Offline",
  },
  // Friday
  {
    day: "Friday",
    time: "8:00 AM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
    section: "3rd Year CSE",
    students: 60,
    mode: "Offline",
  },
  {
    day: "Friday",
    time: "10:00 AM",
    subject: "Algorithms",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Friday",
    time: "2:00 PM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
    section: "3rd Year CSE",
    students: 60,
    mode: "Online",
  },
  {
    day: "Friday",
    time: "Lab",
    subject: "DBMS Lab",
    room: "Lab 401",
    teacher: "Prof. Ravi Mishra",
    section: "3rd Year CSE Batch B",
    students: 32,
    mode: "Offline",
  },
  // Saturday
  {
    day: "Saturday",
    time: "10:00 AM",
    subject: "Computer Architecture",
    room: "Room 204",
    teacher: "Prof. Suresh Iyer",
    section: "3rd Year CSE",
    students: 58,
    mode: "Offline",
  },
  {
    day: "Saturday",
    time: "12:00 PM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
    section: "3rd Year CSE",
    students: 62,
    mode: "Offline",
  },
  {
    day: "Saturday",
    time: "Lab",
    subject: "DSA Lab",
    room: "Lab 301",
    teacher: "Dr. Ramesh Kumar",
    section: "3rd Year CSE Batch A",
    students: 30,
    mode: "Offline",
  },
];

export default function Timetable({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [entries, setEntries] = useState<TimetableEntry[]>(initialEntries);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "day">("grid");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [form, setForm] = useState({
    day: "Monday",
    time: "8:00 AM",
    subject: "",
    room: "",
    teacher: "",
    section: "",
    students: 60,
    mode: "Offline" as "Online" | "Offline",
  });

  const getCell = (day: string, time: string) =>
    entries.find((e) => e.day === day && e.time === time);

  const handleAdd = () => {
    if (!form.subject || !form.room) return;
    setEntries((prev) => [
      ...prev.filter((e) => !(e.day === form.day && e.time === form.time)),
      { ...form },
    ]);
    setForm({
      day: "Monday",
      time: "8:00 AM",
      subject: "",
      room: "",
      teacher: "",
      section: "",
      students: 60,
      mode: "Offline",
    });
    setShowModal(false);
  };

  const handleRemove = (day: string, time: string) => {
    setEntries((prev) =>
      prev.filter((e) => !(e.day === day && e.time === time)),
    );
  };

  const dayEntries = entries
    .filter((e) => e.day === selectedDay)
    .sort((a, b) => TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time));

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="timetable.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Weekly Timetable
          </h1>
          <p className="text-slate-500 mt-1">BTech — 3rd Year CSE</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              data-ocid="timetable.toggle"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Grid View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("day")}
              data-ocid="timetable.toggle"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Day View
            </button>
          </div>
          {(role === "admin" || role === "teacher") && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              data-ocid="timetable.open_modal_button"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus size={16} /> Add Slot
            </button>
          )}
        </div>
      </div>

      {/* Subject legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(SUBJECT_COLORS).map(([subj, cls]) => (
          <span
            key={subj}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}
          >
            {subj}
          </span>
        ))}
      </div>

      {viewMode === "grid" ? (
        /* Timetable Grid */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-24">
                  Time
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="text-left px-3 py-3 text-xs font-semibold text-slate-700 uppercase"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((time, idx) => (
                <tr
                  key={time}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                >
                  <td className="px-4 py-3 text-xs font-semibold text-slate-500 border-r border-gray-100 align-top whitespace-nowrap">
                    {time}
                  </td>
                  {DAYS.map((day) => {
                    const cell = getCell(day, time);
                    return (
                      <td key={day} className="px-2 py-2 align-top">
                        {cell ? (
                          <div
                            className={`relative rounded-lg border px-2 py-2 text-xs group ${getSubjectColor(cell.subject)}`}
                          >
                            <p className="font-bold leading-tight text-[11px]">
                              {cell.subject}
                            </p>
                            <p className="opacity-75 mt-0.5 text-[10px]">
                              {cell.section}
                            </p>
                            <p className="opacity-65 text-[10px]">
                              {cell.room}
                            </p>
                            <div className="flex items-center justify-between mt-1 gap-1">
                              <span className="text-[9px] opacity-70">
                                🧑‍🎓 {cell.students}
                              </span>
                              <span
                                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                                  cell.mode === "Online"
                                    ? "bg-green-200 text-green-800"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {cell.mode}
                              </span>
                            </div>
                            {(role === "admin" || role === "teacher") && (
                              <button
                                type="button"
                                onClick={() => handleRemove(day, time)}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-current hover:text-red-600"
                              >
                                <X size={10} />
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="h-10" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Day View */
        <div className="space-y-4">
          {/* Day tabs */}
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                data-ocid="timetable.tab"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedDay === day
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {dayEntries.length === 0 ? (
            <div
              className="bg-white rounded-2xl border border-gray-200 p-10 text-center"
              data-ocid="timetable.empty_state"
            >
              <p className="text-slate-400 text-sm">
                No classes scheduled for {selectedDay}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEntries.map((entry, i) => (
                <div
                  key={`${entry.day}-${entry.time}-${i}`}
                  className={
                    "bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-start gap-4"
                  }
                  data-ocid={`timetable.item.${i + 1}`}
                >
                  {/* Time badge */}
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-2 py-2">
                      <p className="text-xs font-bold text-blue-700">
                        {entry.time}
                      </p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {entry.subject}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          📚 {entry.section}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          entry.mode === "Online"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        🖥️ {entry.mode}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-xs text-slate-500">
                        🏛️ {entry.room}
                      </span>
                      <span className="text-xs text-slate-500">
                        🧑‍🎓 {entry.students} students
                      </span>
                      <span className="text-xs text-slate-500">
                        👩‍🏫 {entry.teacher}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Slot Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            data-ocid="timetable.dialog"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Add Timetable Slot
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="timetable.close_button"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="tt-day"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Day
                </label>
                <select
                  id="tt-day"
                  value={form.day}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, day: e.target.value }))
                  }
                  data-ocid="timetable.select"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {DAYS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="tt-time"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Time Slot
                </label>
                <select
                  id="tt-time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="tt-subject"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Subject
                </label>
                <input
                  id="tt-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  data-ocid="timetable.input"
                  placeholder="e.g. DSA"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="tt-section"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Class / Section
                </label>
                <input
                  id="tt-section"
                  type="text"
                  value={form.section}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, section: e.target.value }))
                  }
                  placeholder="e.g. 3rd Year CSE"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="tt-room"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Room Number
                </label>
                <input
                  id="tt-room"
                  type="text"
                  value={form.room}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, room: e.target.value }))
                  }
                  placeholder="e.g. Room 205"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="tt-teacher"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Teacher
                </label>
                <input
                  id="tt-teacher"
                  type="text"
                  value={form.teacher}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, teacher: e.target.value }))
                  }
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="tt-students"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Number of Students
                </label>
                <input
                  id="tt-students"
                  type="number"
                  value={form.students}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, students: Number(e.target.value) }))
                  }
                  min={1}
                  placeholder="60"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="tt-mode"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Mode
                </label>
                <select
                  id="tt-mode"
                  value={form.mode}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      mode: e.target.value as "Online" | "Offline",
                    }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="timetable.cancel_button"
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                data-ocid="timetable.confirm_button"
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
