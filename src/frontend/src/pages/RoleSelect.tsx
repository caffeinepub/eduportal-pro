import { ArrowLeft, BookOpen, GraduationCap, Lock, Users } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const roles: {
  role: Role;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  requiresPassword: boolean;
}[] = [
  {
    role: "admin",
    label: "Administrator",
    desc: "Manage the entire institution",
    icon: <Users size={28} />,
    color: "bg-purple-100 text-purple-600",
    requiresPassword: true,
  },
  {
    role: "teacher",
    label: "Teacher",
    desc: "Manage courses, assignments and grades",
    icon: <BookOpen size={28} />,
    color: "bg-blue-100 text-blue-600",
    requiresPassword: true,
  },
  {
    role: "student",
    label: "Student",
    desc: "View courses, assignments and results",
    icon: <GraduationCap size={28} />,
    color: "bg-green-100 text-green-600",
    requiresPassword: false,
  },
];

const ROLE_PASSWORDS: Record<string, string> = {
  admin: "admin123",
  teacher: "teacher123",
};

export default function RoleSelect({
  onSelect,
  navigate,
}: { onSelect: (r: Role) => void; navigate: (p: Page) => void }) {
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleClick = (role: Role, requiresPassword: boolean) => {
    if (requiresPassword) {
      setPendingRole(role);
      setPassword("");
      setError("");
    } else {
      onSelect(role);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingRole) return;
    if (password === ROLE_PASSWORDS[pendingRole]) {
      setPendingRole(null);
      onSelect(pendingRole);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleCancel = () => {
    setPendingRole(null);
    setPassword("");
    setError("");
  };

  const pendingRoleLabel =
    roles.find((r) => r.role === pendingRole)?.label ?? "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl">
        <button
          type="button"
          onClick={() => navigate("landing")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

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
              onClick={() => handleRoleClick(r.role, r.requiresPassword)}
              className="bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group relative"
            >
              {r.requiresPassword && (
                <span className="absolute top-3 right-3 text-slate-300">
                  <Lock size={14} />
                </span>
              )}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${r.color}`}
              >
                {r.icon}
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">
                {r.label}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{r.desc}</p>
              {r.requiresPassword && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <Lock size={10} /> Password required
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Password Modal */}
      {pendingRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {pendingRoleLabel} Login
              </h2>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              Enter your {pendingRoleLabel.toLowerCase()} password to continue.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="role-password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="role-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1.5">{error}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
