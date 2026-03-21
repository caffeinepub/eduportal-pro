import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const allStudents = [
  { id: 1, name: "Alex Thompson", course: "Mathematics" },
  { id: 2, name: "Maria Garcia", course: "Mathematics" },
  { id: 3, name: "James Lee", course: "Mathematics" },
  { id: 4, name: "Sophie Turner", course: "Mathematics" },
  { id: 5, name: "Daniel Kim", course: "Mathematics" },
];

type AttRecord = {
  id: number;
  name: string;
  course: string;
  date: string;
  status: "present" | "absent";
};

const allRecords: AttRecord[] = [
  {
    id: 1,
    name: "Alex Thompson",
    course: "Mathematics",
    date: "Dec 10, 2025",
    status: "present",
  },
  {
    id: 2,
    name: "Maria Garcia",
    course: "Mathematics",
    date: "Dec 10, 2025",
    status: "present",
  },
  {
    id: 3,
    name: "James Lee",
    course: "Mathematics",
    date: "Dec 10, 2025",
    status: "absent",
  },
  {
    id: 4,
    name: "Sophie Turner",
    course: "Physics",
    date: "Dec 10, 2025",
    status: "present",
  },
  {
    id: 5,
    name: "Daniel Kim",
    course: "Physics",
    date: "Dec 10, 2025",
    status: "present",
  },
  {
    id: 6,
    name: "Alex Thompson",
    course: "Mathematics",
    date: "Dec 9, 2025",
    status: "present",
  },
  {
    id: 7,
    name: "Maria Garcia",
    course: "Mathematics",
    date: "Dec 9, 2025",
    status: "absent",
  },
];

const btechSubjects = [
  {
    subject: "Data Structures & Algorithms",
    total: 30,
    present: 27,
    presentDates: [
      "Mar 1",
      "Mar 3",
      "Mar 5",
      "Mar 8",
      "Mar 10",
      "Mar 12",
      "Mar 15",
      "Mar 17",
      "Mar 19",
      "Mar 21",
    ],
    absentDates: ["Mar 6", "Mar 13", "Mar 20"],
  },
  {
    subject: "Computer Networks",
    total: 28,
    present: 24,
    presentDates: [
      "Mar 2",
      "Mar 4",
      "Mar 7",
      "Mar 9",
      "Mar 11",
      "Mar 14",
      "Mar 16",
      "Mar 18",
    ],
    absentDates: ["Mar 3", "Mar 10", "Mar 17", "Mar 24"],
  },
  {
    subject: "Digital Electronics",
    total: 25,
    present: 18,
    presentDates: ["Mar 2", "Mar 5", "Mar 9", "Mar 12", "Mar 16", "Mar 19"],
    absentDates: [
      "Mar 3",
      "Mar 6",
      "Mar 10",
      "Mar 13",
      "Mar 17",
      "Mar 20",
      "Mar 23",
    ],
  },
  {
    subject: "Engineering Mathematics III",
    total: 32,
    present: 30,
    presentDates: [
      "Mar 1",
      "Mar 4",
      "Mar 8",
      "Mar 11",
      "Mar 15",
      "Mar 18",
      "Mar 22",
    ],
    absentDates: ["Mar 6", "Mar 13"],
  },
  {
    subject: "Thermodynamics",
    total: 20,
    present: 17,
    presentDates: ["Mar 3", "Mar 6", "Mar 10", "Mar 13", "Mar 17"],
    absentDates: ["Mar 7", "Mar 14", "Mar 21"],
  },
];

export default function Attendance({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [records] = useState<AttRecord[]>(allRecords);
  const [marking, setMarking] = useState(false);
  const [markStatus, setMarkStatus] = useState<
    Record<number, "present" | "absent">
  >(Object.fromEntries(allStudents.map((s) => [s.id, "present"])));
  const [expanded, setExpanded] = useState<string | null>(null);

  const userName = localStorage.getItem("eduportal_user_name") || "Student";

  const overallTotal = btechSubjects.reduce((sum, s) => sum + s.total, 0);
  const overallPresent = btechSubjects.reduce((sum, s) => sum + s.present, 0);
  const overallPercent = Math.round((overallPresent / overallTotal) * 100);

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
          <h1 className="text-3xl font-bold text-slate-900">Attendance</h1>
          <p className="text-slate-500 mt-1">
            {role === "student"
              ? `Your BTech attendance, ${userName}`
              : "Track student attendance records"}
          </p>
        </div>
        {(role === "teacher" || role === "admin") && (
          <button
            type="button"
            onClick={() => setMarking(!marking)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            {marking ? "View Records" : "Mark Attendance"}
          </button>
        )}
      </div>

      {/* Student BTech attendance view */}
      {role === "student" && (
        <div className="space-y-4">
          {/* Overall percentage card */}
          <div
            className={`rounded-xl p-5 border ${
              overallPercent >= 75
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className={`font-semibold text-sm ${
                  overallPercent >= 75 ? "text-green-700" : "text-red-700"
                }`}
              >
                Overall BTech Attendance
              </p>
              <span
                className={`text-2xl font-bold ${
                  overallPercent >= 75 ? "text-green-700" : "text-red-700"
                }`}
              >
                {overallPercent}%
              </span>
            </div>
            <div className="w-full bg-white/60 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  overallPercent >= 75 ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p
              className={`text-xs mt-2 ${
                overallPercent >= 75 ? "text-green-600" : "text-red-600"
              }`}
            >
              {overallPresent} / {overallTotal} classes attended
              &nbsp;&bull;&nbsp;
              {overallPercent >= 75
                ? "You meet the 75% requirement"
                : "Below 75% minimum requirement"}
            </p>
          </div>

          {/* Per-subject breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-900">
                Subject-wise Attendance
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Click a subject to see present & absent details
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {btechSubjects.map((s) => {
                const pct = Math.round((s.present / s.total) * 100);
                const isOpen = expanded === s.subject;
                return (
                  <div key={s.subject}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : s.subject)}
                      className="w-full px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium text-slate-800">
                          {s.subject}
                        </p>
                        <span
                          className={`text-sm font-bold ${
                            pct >= 75 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            pct >= 75 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {s.present} present &bull; {s.total - s.present} absent
                        &bull; {s.total} total
                      </p>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
                        {/* Present */}
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <CheckCircle size={14} className="text-green-600" />
                            <p className="text-xs font-semibold text-green-700">
                              Present ({s.presentDates.length} shown)
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {s.presentDates.map((d) => (
                              <span
                                key={d}
                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Absent */}
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <XCircle size={14} className="text-red-600" />
                            <p className="text-xs font-semibold text-red-700">
                              Absent ({s.absentDates.length})
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {s.absentDates.map((d) => (
                              <span
                                key={d}
                                className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Teacher / Admin view */}
      {role !== "student" &&
        (marking ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-slate-900 mb-4">
              Mark Attendance - {new Date().toLocaleDateString()}
            </h2>
            <div className="space-y-2">
              {allStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-medium text-slate-800">
                    {s.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setMarkStatus((prev) => ({
                          ...prev,
                          [s.id]: "present",
                        }))
                      }
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        markStatus[s.id] === "present"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-green-100"
                      }`}
                    >
                      <CheckCircle size={12} /> Present
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMarkStatus((prev) => ({ ...prev, [s.id]: "absent" }))
                      }
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        markStatus[s.id] === "absent"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-red-100"
                      }`}
                    >
                      <XCircle size={12} /> Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMarking(false)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Attendance
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Student
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Course
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((r) => (
                  <tr
                    key={`${r.name}-${r.date}-${r.course}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {r.name}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500">
                      {r.course}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500">
                      {r.date}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`flex items-center gap-1 text-xs font-medium w-fit px-2 py-1 rounded-full ${
                          r.status === "present"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {r.status === "present" ? (
                          <CheckCircle size={11} />
                        ) : (
                          <XCircle size={11} />
                        )}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
