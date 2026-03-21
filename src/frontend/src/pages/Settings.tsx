import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page, Role } from "../App";

const roleOptions: { value: Role; label: string }[] = [
  { value: "admin", label: "Administrator" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

const profileData: Record<
  Role,
  { name: string; email: string; phone: string }
> = {
  admin: {
    name: "John Admin",
    email: "admin@eduportal.edu",
    phone: "+1 (555) 000-0001",
  },
  teacher: {
    name: "Dr. Sarah Johnson",
    email: "sarah.j@eduportal.edu",
    phone: "+1 (555) 123-4567",
  },
  student: {
    name: "Alex Thompson",
    email: "alex.t@student.eduportal.edu",
    phone: "+1 (555) 234-5678",
  },
};

export default function Settings({
  role,
  onRoleChange,
  navigate,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
  navigate: (p: Page) => void;
}) {
  const profile = profileData[role];
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({ name: profile.name, email: profile.email, phone: profile.phone });
    setSaved(false);
  }, [profile.name, profile.email, profile.phone]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: { label: string; key: keyof typeof form }[] = [
    { label: "Full Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="nav.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-semibold text-slate-900 mb-4">
          Profile Information
        </h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {form.name[0]}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{form.name}</p>
            <p className="text-sm text-slate-400">{form.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label}>
              <label
                htmlFor={f.key}
                className="text-sm font-medium text-slate-700 block mb-1"
              >
                {f.label}
              </label>
              <input
                id={f.key}
                data-ocid={`settings.${f.key === "name" ? "input" : f.key === "email" ? "textarea" : "input"}`}
                value={form[f.key]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [f.key]: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            data-ocid="settings.save_button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Save Changes
          </button>
          {saved && (
            <span
              data-ocid="settings.success_state"
              className="text-sm font-medium text-green-600 animate-pulse"
            >
              ✓ Changes saved!
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-semibold text-slate-900 mb-2">
          Switch Role (Demo)
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Change your portal view to explore different dashboards.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {roleOptions.map((r) => (
            <button
              type="button"
              key={r.value}
              data-ocid={`settings.${r.value}.toggle`}
              onClick={() => onRoleChange(r.value)}
              className={`py-2 px-4 rounded-lg text-sm font-medium border transition-colors ${
                role === r.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
