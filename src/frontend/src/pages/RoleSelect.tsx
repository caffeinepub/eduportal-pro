import { BookOpen, GraduationCap, Users } from "lucide-react";
import type { Role } from "../App";

const roles: {
  role: Role;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    role: "admin",
    label: "Administrator",
    desc: "Manage the entire institution",
    icon: <Users size={28} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    role: "teacher",
    label: "Teacher",
    desc: "Manage courses, assignments and grades",
    icon: <BookOpen size={28} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    role: "student",
    label: "Student",
    desc: "View courses, assignments and results",
    icon: <GraduationCap size={28} />,
    color: "bg-green-100 text-green-600",
  },
];

export default function RoleSelect({
  onSelect,
}: { onSelect: (r: Role) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            E
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Choose your role
          </h1>
          <p className="text-slate-500 mt-2">
            Select how you'll be using EduPortal Pro
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((r) => (
            <button
              type="button"
              key={r.role}
              onClick={() => onSelect(r.role)}
              className="bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${r.color}`}
              >
                {r.icon}
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">
                {r.label}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
