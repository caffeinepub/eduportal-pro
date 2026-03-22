import { ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const roleOptions: { value: Role; label: string }[] = [
  { value: "admin", label: "Administrator" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

export default function Settings({
  role,
  onRoleChange,
  onLogout,
  navigate,
}: {
  role: Role;
  onRoleChange: (r: Role) => void;
  onLogout: () => void;
  navigate: (p: Page) => void;
}) {
  const getStoredName = () =>
    localStorage.getItem("eduportal_user_name") ||
    (role === "admin"
      ? "Administrator"
      : role === "teacher"
        ? "Teacher"
        : "Student");

  const [form, setForm] = useState({
    name: getStoredName(),
    email: "",
    phone: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("eduportal_user_name", form.name);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields: { label: string; key: keyof typeof form; id: string }[] = [
    { label: "Full Name", key: "name", id: "settings-name" },
    { label: "Email", key: "email", id: "settings-email" },
    { label: "Phone", key: "phone", id: "settings-phone" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="settings.back_button"
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
            {form.name[0] || "?"}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{form.name}</p>
            <p className="text-sm text-slate-400 capitalize">{role}</p>
          </div>
        </div>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label}>
              <label
                htmlFor={f.id}
                className="text-sm font-medium text-slate-700 block mb-1"
              >
                {f.label}
              </label>
              <input
                id={f.id}
                data-ocid={`settings.${f.key}.input`}
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

      <div className="bg-white rounded-xl border border-red-100 shadow-sm p-6">
        <h2 className="font-semibold text-red-700 mb-2">Sign Out</h2>
        <p className="text-sm text-slate-500 mb-4">
          You will be logged out and returned to the home page.
        </p>
        <button
          type="button"
          data-ocid="settings.logout.button"
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
