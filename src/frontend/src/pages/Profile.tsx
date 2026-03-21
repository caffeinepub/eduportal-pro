import { ArrowLeft, Camera, Save, User } from "lucide-react";
import { useRef, useState } from "react";
import type { Page } from "../App";

export default function Profile({ navigate }: { navigate: (p: Page) => void }) {
  const [name, setName] = useState(
    () => localStorage.getItem("eduportal_user_name") || "",
  );
  const [photo, setPhoto] = useState<string | null>(() =>
    localStorage.getItem("eduportal_user_photo"),
  );
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const email = localStorage.getItem("eduportal_user_email") || "";
  const year = localStorage.getItem("eduportal_user_year") || "";
  const branch = localStorage.getItem("eduportal_user_branch") || "";
  const semester = localStorage.getItem("eduportal_user_semester") || "";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhoto(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (name.trim()) {
      localStorage.setItem("eduportal_user_name", name.trim());
    }
    if (photo) {
      localStorage.setItem("eduportal_user_photo", photo);
    } else {
      localStorage.removeItem("eduportal_user_photo");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = name.trim()
    ? name
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back arrow */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          data-ocid="profile.link"
          onClick={() => navigate("dashboard")}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 text-sm">
            View and update your account details
          </p>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top banner */}
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600" />

        {/* Avatar section */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-6">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-blue-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden"
                style={
                  photo
                    ? {
                        backgroundImage: `url(${photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
              >
                {!photo && initials}
              </div>
              <button
                type="button"
                data-ocid="profile.upload_button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow hover:bg-blue-700 transition-colors"
                title="Change profile photo"
              >
                <Camera size={14} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="pb-2">
              <p className="text-xl font-bold text-slate-900">
                {name || "Your Name"}
              </p>
              {year && branch && (
                <p className="text-sm text-slate-500">
                  {year} · {branch}
                  {semester ? ` · ${semester}` : ""}
                </p>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="profile-name"
                  data-ocid="profile.input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Read-only info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {email && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
                    {email}
                  </p>
                </div>
              )}
              {year && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Year
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
                    {year}
                  </p>
                </div>
              )}
              {branch && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Branch
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
                    {branch}
                  </p>
                </div>
              )}
              {semester && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Semester
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
                    {semester}
                  </p>
                </div>
              )}
            </div>

            {/* Save button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                data-ocid="profile.save_button"
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                Save Changes
              </button>
              {saved && (
                <span
                  className="text-sm text-green-600 font-medium"
                  data-ocid="profile.success_state"
                >
                  ✓ Profile updated!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
