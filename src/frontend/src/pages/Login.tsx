import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

export default function Login({
  navigate,
  onLogin,
}: {
  navigate: (p: Page) => void;
  onLogin: (role: Role) => void;
}) {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "admin">(
    "student",
  );

  // Student
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPwd, setShowStudentPwd] = useState(false);
  const [studentError, setStudentError] = useState("");

  // Teacher
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [showTeacherPwd, setShowTeacherPwd] = useState(false);
  const [teacherError, setTeacherError] = useState("");

  // Admin
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPwd, setShowAdminPwd] = useState(false);
  const [adminError, setAdminError] = useState("");

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError("");
    if (!studentEmail.trim())
      return setStudentError("Email address is required.");
    if (!studentPassword) return setStudentError("Password is required.");

    const accounts: any[] = JSON.parse(
      localStorage.getItem("eduportal_accounts") || "[]",
    );
    const account = accounts.find(
      (a) => a.email === studentEmail.trim() && a.role === "student",
    );

    if (!account) {
      return setStudentError(
        "No student account found. Please register first.",
      );
    }
    if (account.password !== studentPassword) {
      return setStudentError("Incorrect password.");
    }

    localStorage.setItem("eduportal_role", "student");
    localStorage.setItem("eduportal_logged_in", "true");
    localStorage.setItem("eduportal_user_name", account.name);
    localStorage.setItem("eduportal_user_year", account.year);
    localStorage.setItem("eduportal_user_branch", account.branch);
    localStorage.setItem("eduportal_user_semester", account.semester);
    onLogin("student");
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError("");
    if (!teacherName.trim()) return setTeacherError("Name is required.");
    if (!teacherEmail.trim())
      return setTeacherError("Email address is required.");
    if (!teacherPassword) return setTeacherError("Password is required.");

    const accounts: any[] = JSON.parse(
      localStorage.getItem("eduportal_accounts") || "[]",
    );
    const account = accounts.find(
      (a) => a.email === teacherEmail.trim() && a.role === "teacher",
    );

    if (account) {
      if (account.password !== teacherPassword) {
        return setTeacherError("Incorrect password.");
      }
      localStorage.setItem("eduportal_role", "teacher");
      localStorage.setItem("eduportal_logged_in", "true");
      localStorage.setItem("eduportal_user_name", account.name);
      onLogin("teacher");
    } else if (teacherPassword === "teacher123") {
      // Backward-compat fallback for teachers not registered via form
      localStorage.setItem("eduportal_role", "teacher");
      localStorage.setItem("eduportal_logged_in", "true");
      localStorage.setItem("eduportal_user_name", teacherName.trim());
      onLogin("teacher");
    } else {
      return setTeacherError(
        "No teacher account found with this email. Please register first or use the default password.",
      );
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    if (!adminPassword) return setAdminError("Password is required.");
    if (adminPassword !== "admin123")
      return setAdminError("Incorrect password. Please try again.");
    localStorage.setItem("eduportal_role", "admin");
    localStorage.setItem("eduportal_logged_in", "true");
    onLogin("admin");
  };

  const tabs = [
    { id: "student" as const, label: "Student", icon: GraduationCap },
    { id: "teacher" as const, label: "Teacher", icon: UserCog },
    { id: "admin" as const, label: "Admin", icon: ShieldCheck },
  ];

  const inputCls =
    "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3 shadow-lg shadow-blue-500/30">
            E
          </div>
          <h1 className="text-2xl font-bold text-white">EduPortal Pro</h1>
          <p className="text-blue-300 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`login.${tab.id}.tab`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-blue-200 hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-7">
            {/* ── STUDENT ── */}
            {activeTab === "student" && (
              <form
                onSubmit={handleStudentLogin}
                className="space-y-4"
                data-ocid="login.student.panel"
              >
                <p className="text-blue-200 text-xs mb-4">
                  Sign in with your registered email and password.
                </p>

                <div>
                  <label
                    htmlFor="student-email"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    data-ocid="login.student.input"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-phone"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Phone Number{" "}
                    <span className="text-white/30 text-xs font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="student-phone"
                    type="tel"
                    data-ocid="login.student.phone_input"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-password"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="student-password"
                      type={showStudentPwd ? "text" : "password"}
                      data-ocid="login.student.password_input"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowStudentPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {showStudentPwd ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>
                </div>

                {studentError && (
                  <p
                    data-ocid="login.student.error_state"
                    className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2"
                  >
                    {studentError}
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="login.student.submit_button"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-600/30 mt-2"
                >
                  Sign In as Student
                </button>
              </form>
            )}

            {/* ── TEACHER ── */}
            {activeTab === "teacher" && (
              <form
                onSubmit={handleTeacherLogin}
                className="space-y-4"
                data-ocid="login.teacher.panel"
              >
                <p className="text-blue-200 text-xs mb-4">
                  Enter your name, email and portal password to access your
                  dashboard.
                </p>

                <div>
                  <label
                    htmlFor="teacher-name"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="teacher-name"
                    type="text"
                    data-ocid="login.teacher.input"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="e.g. Dr. Priya Sharma"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label
                    htmlFor="teacher-email"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="teacher-email"
                    type="email"
                    data-ocid="login.teacher.email_input"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label
                    htmlFor="teacher-password"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="teacher-password"
                      type={showTeacherPwd ? "text" : "password"}
                      data-ocid="login.teacher.password_input"
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      placeholder="Enter password"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {showTeacherPwd ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>
                </div>

                {teacherError && (
                  <p
                    data-ocid="login.teacher.error_state"
                    className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2"
                  >
                    {teacherError}
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="login.teacher.submit_button"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-600/30 mt-2"
                >
                  Sign In as Teacher
                </button>
              </form>
            )}

            {/* ── ADMIN ── */}
            {activeTab === "admin" && (
              <form
                onSubmit={handleAdminLogin}
                className="space-y-4"
                data-ocid="login.admin.panel"
              >
                <p className="text-blue-200 text-xs mb-4">
                  Administrator access requires the portal admin password.
                </p>
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-blue-100 mb-1.5"
                  >
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showAdminPwd ? "text" : "password"}
                      data-ocid="login.admin.password_input"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className={`${inputCls} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {showAdminPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                {adminError && (
                  <p
                    data-ocid="login.admin.error_state"
                    className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2"
                  >
                    {adminError}
                  </p>
                )}
                <button
                  type="submit"
                  data-ocid="login.admin.submit_button"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-600/30 mt-2"
                >
                  Sign In as Admin
                </button>
              </form>
            )}

            <div className="mt-5 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => navigate("forgot-password")}
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                Forgot password?
              </button>
              <button
                type="button"
                data-ocid="login.register.link"
                onClick={() => navigate("register")}
                className="text-white/50 hover:text-white/80"
              >
                Create account
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          data-ocid="login.back.link"
          onClick={() => navigate("landing")}
          className="mt-5 w-full text-center text-sm text-blue-300/60 hover:text-blue-300 flex items-center justify-center gap-1 transition-colors"
        >
          <ArrowLeft size={13} /> Back to home
        </button>
      </div>
    </div>
  );
}
