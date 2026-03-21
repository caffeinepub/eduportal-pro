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
};

const SUBJECT_COLORS: Record<string, string> = {
  DSA: "bg-blue-100 text-blue-700 border-blue-200",
  "Computer Networks": "bg-purple-100 text-purple-700 border-purple-200",
  "Operating Systems": "bg-teal-100 text-teal-700 border-teal-200",
  DBMS: "bg-pink-100 text-pink-700 border-pink-200",
  "Software Engineering": "bg-orange-100 text-orange-700 border-orange-200",
  "Eng Math III": "bg-amber-100 text-amber-700 border-amber-200",
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
  },
  {
    day: "Monday",
    time: "10:00 AM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
  },
  {
    day: "Monday",
    time: "2:00 PM",
    subject: "Eng Math III",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
  },
  {
    day: "Monday",
    time: "Lab",
    subject: "DSA Lab",
    room: "Lab 301",
    teacher: "Dr. Ramesh Kumar",
  },
  // Tuesday
  {
    day: "Tuesday",
    time: "8:00 AM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
  },
  {
    day: "Tuesday",
    time: "10:00 AM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
  },
  {
    day: "Tuesday",
    time: "12:00 PM",
    subject: "Software Engineering",
    room: "Room 204",
    teacher: "Dr. Kavya Nair",
  },
  {
    day: "Tuesday",
    time: "Lab",
    subject: "CN Lab",
    room: "Lab 302",
    teacher: "Prof. Anita Sharma",
  },
  // Wednesday
  {
    day: "Wednesday",
    time: "8:00 AM",
    subject: "Eng Math III",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
  },
  {
    day: "Wednesday",
    time: "10:00 AM",
    subject: "DSA",
    room: "Room 205",
    teacher: "Dr. Ramesh Kumar",
  },
  {
    day: "Wednesday",
    time: "2:00 PM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
  },
  {
    day: "Wednesday",
    time: "Lab",
    subject: "OS Lab",
    room: "Lab 303",
    teacher: "Prof. Meena Iyer",
  },
  // Thursday
  {
    day: "Thursday",
    time: "8:00 AM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
  },
  {
    day: "Thursday",
    time: "10:00 AM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
  },
  {
    day: "Thursday",
    time: "2:00 PM",
    subject: "Software Engineering",
    room: "Room 204",
    teacher: "Dr. Kavya Nair",
  },
  {
    day: "Thursday",
    time: "4:00 PM",
    subject: "DSA",
    room: "Room 205",
    teacher: "Dr. Ramesh Kumar",
  },
  // Friday
  {
    day: "Friday",
    time: "8:00 AM",
    subject: "Computer Networks",
    room: "Room 301",
    teacher: "Prof. Anita Sharma",
  },
  {
    day: "Friday",
    time: "10:00 AM",
    subject: "Eng Math III",
    room: "Room 101",
    teacher: "Dr. Vijay Patel",
  },
  {
    day: "Friday",
    time: "2:00 PM",
    subject: "DBMS",
    room: "Room 401",
    teacher: "Prof. Ravi Mishra",
  },
  {
    day: "Friday",
    time: "Lab",
    subject: "DBMS Lab",
    room: "Lab 401",
    teacher: "Prof. Ravi Mishra",
  },
  // Saturday
  {
    day: "Saturday",
    time: "10:00 AM",
    subject: "Software Engineering",
    room: "Room 204",
    teacher: "Dr. Kavya Nair",
  },
  {
    day: "Saturday",
    time: "12:00 PM",
    subject: "Operating Systems",
    room: "Room 303",
    teacher: "Prof. Meena Iyer",
  },
  {
    day: "Saturday",
    time: "Lab",
    subject: "DSA Lab",
    room: "Lab 301",
    teacher: "Dr. Ramesh Kumar",
  },
];

export default function Timetable({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [entries, setEntries] = useState<TimetableEntry[]>(initialEntries);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    day: "Monday",
    time: "8:00 AM",
    subject: "",
    room: "",
    teacher: "",
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
    });
    setShowModal(false);
  };

  const handleRemove = (day: string, time: string) => {
    setEntries((prev) =>
      prev.filter((e) => !(e.day === day && e.time === time)),
    );
  };

  const fieldItems = [
    { label: "Subject", key: "subject" as const, id: "tt-subject" },
    { label: "Room", key: "room" as const, id: "tt-room" },
    { label: "Teacher", key: "teacher" as const, id: "tt-teacher" },
  ];

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
          <p className="text-slate-500 mt-1">
            BTech — 3rd Year CSE, Semester V
          </p>
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

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-28">
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
                    <td key={day} className="px-2 py-2 align-top min-h-[60px]">
                      {cell ? (
                        <div
                          className={`relative rounded-lg border px-2 py-1.5 text-xs group ${getSubjectColor(cell.subject)}`}
                        >
                          <p className="font-semibold leading-tight">
                            {cell.subject}
                          </p>
                          <p className="opacity-70 mt-0.5">{cell.room}</p>
                          <p className="opacity-60 truncate">{cell.teacher}</p>
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

      {/* Add Slot Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
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
              {fieldItems.map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.id}
                    className="text-sm font-medium text-slate-700 block mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type="text"
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    data-ocid={
                      f.key === "subject"
                        ? "timetable.input"
                        : `timetable.${f.key}.input`
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
