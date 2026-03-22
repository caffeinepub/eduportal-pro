import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type RegRole = "student" | "teacher";
type Step = "choose" | "form" | "otp";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BRANCHES = [
  "CSE",
  "ECE",
  "ME",
  "CE",
  "EE",
  "IT",
  "Chemical",
  "Biotechnology",
];
const SEMESTERS = ["Sem 1", "Sem 2"];

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getPasswordCriteria(password: string) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  if (!password) return null;

  const criteria = getPasswordCriteria(password);
  const metCount = Object.values(criteria).filter(Boolean).length;

  const strengthColor =
    metCount <= 1
      ? "bg-red-500"
      : metCount === 2
        ? "bg-orange-500"
        : metCount === 3
          ? "bg-yellow-500"
          : "bg-green-500";

  const hints: { label: string; met: boolean }[] = [
    { label: "8+ characters", met: criteria.length },
    { label: "capital letter", met: criteria.uppercase },
    { label: "number", met: criteria.number },
    { label: "special character", met: criteria.special },
  ];

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bars */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < metCount ? strengthColor : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {/* Hints */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {hints.map((h) => (
          <span
            key={h.label}
            className={`text-xs flex items-center gap-0.5 ${
              h.met ? "text-green-600" : "text-slate-400"
            }`}
          >
            {h.met ? (
              <CheckCircle size={11} className="text-green-500" />
            ) : (
              <span className="inline-block w-2.5 h-2.5 text-center leading-none text-red-400 font-bold text-[10px]">
                ✕
              </span>
            )}
            {h.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Register({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState<Step>("choose");
  const [regRole, setRegRole] = useState<RegRole>("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    year: "1st Year",
    branch: "CSE",
    semester: "Sem 1",
    subject: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpResent, setOtpResent] = useState(false);

  const handleChoose = (r: RegRole) => {
    setRegRole(r);
    setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim()) return setFormError("Full name is required.");
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setFormError("A valid email address is required.");

    // Duplicate email check
    const existingAccounts: any[] = JSON.parse(
      localStorage.getItem("eduportal_accounts") || "[]",
    );
    const emailAlreadyUsed = existingAccounts.some(
      (acc) =>
        acc.email?.trim().toLowerCase() === form.email.trim().toLowerCase(),
    );
    if (emailAlreadyUsed)
      return setFormError(
        "This email is already registered. Please use a different email or sign in.",
      );

    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      return setFormError("A valid 10-digit phone number is required.");
    if (!form.password) return setFormError("Password is required.");
    if (form.password.length < 8)
      return setFormError("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(form.password))
      return setFormError("Password must contain at least one capital letter.");
    if (!/[0-9]/.test(form.password))
      return setFormError("Password must contain at least one number.");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password))
      return setFormError(
        "Password must contain at least one special character (e.g. @, #, !).",
      );
    if (form.password !== form.confirm)
      return setFormError("Passwords do not match.");

    const newOtp = generateOtp();
    setOtp(newOtp);
    setOtpInput("");
    setOtpError("");
    setOtpResent(false);
    setStep("otp");
  };

  const handleResendOtp = () => {
    const newOtp = generateOtp();
    setOtp(newOtp);
    setOtpInput("");
    setOtpError("");
    setOtpResent(true);
    setTimeout(() => setOtpResent(false), 3000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (otpInput.trim() !== otp) {
      return setOtpError("Incorrect OTP. Please try again.");
    }

    const accounts: any[] = JSON.parse(
      localStorage.getItem("eduportal_accounts") || "[]",
    );
    accounts.push({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      role: regRole,
      year: form.year,
      branch: form.branch,
      semester: form.semester,
      subject: form.subject,
    });
    localStorage.setItem("eduportal_accounts", JSON.stringify(accounts));

    localStorage.setItem("eduportal_role", regRole);
    localStorage.setItem("eduportal_logged_in", "true");
    localStorage.setItem("eduportal_user_name", form.name.trim());
    if (regRole === "student") {
      localStorage.setItem("eduportal_user_year", form.year);
      localStorage.setItem("eduportal_user_branch", form.branch);
      localStorage.setItem("eduportal_user_semester", form.semester);
    }
    navigate("dashboard");
  };

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800";

  // ── OTP Step ──
  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="text-slate-400 hover:text-slate-700 transition-colors"
              data-ocid="register.back.button"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Verify Your Identity
              </h1>
              <p className="text-slate-500 text-sm">
                OTP has been sent to your email &amp; phone
              </p>
            </div>
          </div>

          {/* OTP sent notification */}
          <div
            data-ocid="register.otp.sent_panel"
            className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <ShieldCheck size={18} className="text-green-600" />
              <span className="text-green-700 text-sm font-semibold">
                OTP Sent Successfully
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              A 6-digit OTP has been sent to
            </p>
            <p className="text-slate-800 font-medium text-sm mt-0.5">
              {form.email}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">
              and phone number ending in ****{form.phone.slice(-4)}
            </p>
          </div>

          <form
            onSubmit={handleVerifyOtp}
            className="space-y-5"
            data-ocid="register.otp.panel"
          >
            <div>
              <label
                htmlFor="otp-input"
                className="block text-sm font-medium text-slate-700 mb-2 text-center"
              >
                Enter the 6-digit OTP sent to your email/phone
              </label>
              <input
                id="otp-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                data-ocid="register.otp.input"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                placeholder="——————"
                className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white text-slate-800"
              />
            </div>

            {otpError && (
              <p
                data-ocid="register.otp.error_state"
                className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center"
              >
                {otpError}
              </p>
            )}

            {otpResent && (
              <p
                data-ocid="register.otp.success_state"
                className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center"
              >
                A new OTP has been sent to your email &amp; phone.
              </p>
            )}

            <button
              type="submit"
              data-ocid="register.otp.submit_button"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
            >
              Verify &amp; Create Account
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                data-ocid="register.otp.resend_button"
                className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline transition-colors"
              >
                <RefreshCw size={13} /> Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        {step === "choose" ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => navigate("landing")}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Create Account
                </h1>
                <p className="text-slate-500 text-sm">
                  Register as a student or teacher
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                data-ocid="register.student.button"
                onClick={() => handleChoose("student")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Register as Student
                  </p>
                  <p className="text-sm text-slate-500">
                    Access courses, assignments, and results
                  </p>
                </div>
              </button>
              <button
                type="button"
                data-ocid="register.teacher.button"
                onClick={() => handleChoose("teacher")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Register as Teacher
                  </p>
                  <p className="text-sm text-slate-500">
                    Manage courses, grades, and attendance
                  </p>
                </div>
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setStep("choose")}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {regRole === "student"
                    ? "Student Registration"
                    : "Teacher Registration"}
                </h1>
                <p className="text-slate-500 text-sm">
                  Fill in your details below
                </p>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${
                regRole === "student"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {regRole === "student" ? (
                <GraduationCap size={14} />
              ) : (
                <BookOpen size={14} />
              )}
              {regRole === "student" ? "Student" : "Teacher"}
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4"
              data-ocid="register.form.panel"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  data-ocid="register.name.input"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  data-ocid="register.email.input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  data-ocid="register.phone.input"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
              </div>

              {/* Teacher: Subject/Dept */}
              {regRole === "teacher" && (
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Subject / Department
                  </label>
                  <input
                    id="subject"
                    type="text"
                    data-ocid="register.subject.input"
                    placeholder="e.g. Mathematics, Computer Science"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              )}

              {/* Student: Year / Branch / Semester */}
              {regRole === "student" && (
                <>
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Year
                    </label>
                    <select
                      id="year"
                      data-ocid="register.year.select"
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      className={inputCls}
                    >
                      {YEARS.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Branch
                    </label>
                    <select
                      id="branch"
                      data-ocid="register.branch.select"
                      value={form.branch}
                      onChange={(e) =>
                        setForm({ ...form, branch: e.target.value })
                      }
                      className={inputCls}
                    >
                      {BRANCHES.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="semester"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Semester
                    </label>
                    <select
                      id="semester"
                      data-ocid="register.semester.select"
                      value={form.semester}
                      onChange={(e) =>
                        setForm({ ...form, semester: e.target.value })
                      }
                      className={inputCls}
                    >
                      {SEMESTERS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    required
                    data-ocid="register.password.input"
                    placeholder="Min 8 chars, capital, number, symbol"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className={`${inputCls} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <PasswordStrengthIndicator password={form.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    required
                    data-ocid="register.confirm_password.input"
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    className={`${inputCls} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {formError && (
                <p
                  data-ocid="register.form.error_state"
                  className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                data-ocid="register.form.submit_button"
                className={`w-full py-3 text-white rounded-xl font-semibold transition-colors ${
                  regRole === "student"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Continue — Verify via OTP
              </button>

              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <CheckCircle size={12} className="text-green-500" />
                OTP verification will be sent to your email &amp; phone
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
