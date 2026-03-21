import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const students = [
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

const initialRecords: AttRecord[] = [
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

export default function Attendance({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [records] = useState<AttRecord[]>(initialRecords);
  const [marking, setMarking] = useState(false);
  const [markStatus, setMarkStatus] = useState<
    Record<number, "present" | "absent">
  >(Object.fromEntries(students.map((s) => [s.id, "present"])));

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
            Track student attendance records
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

      {marking ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-900 mb-4">
            Mark Attendance - {new Date().toLocaleDateString()}
          </h2>
          <div className="space-y-2">
            {students.map((s) => (
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
                      setMarkStatus((prev) => ({ ...prev, [s.id]: "present" }))
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
                <tr key={`${r.name}-${r.date}`} className="hover:bg-slate-50">
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {r.name}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">
                    {r.course}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">{r.date}</td>
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
      )}
    </div>
  );
}
