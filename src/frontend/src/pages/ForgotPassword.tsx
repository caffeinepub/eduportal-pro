import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type Step = "email" | "otp" | "reset" | "done";

export default function ForgotPassword({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [maskedContact, setMaskedContact] = useState("");

  const validatePassword = (p: string) => {
    if (p.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(p)) return "Must include at least one uppercase letter.";
    if (!/[a-z]/.test(p)) return "Must include at least one lowercase letter.";
    if (!/[0-9]/.test(p)) return "Must include at least one number.";
    if (!/[^A-Za-z0-9]/.test(p))
      return "Must include at least one special character.";
    return "";
  };

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const accounts: Array<{ email: string; phone?: string }> = JSON.parse(
      localStorage.getItem("eduportal_accounts") || "[]",
    );
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase(),
    );
    if (!account) {
      setError("No account found with this email address.");
      return;
    }
    const generatedOtp = generateOtp();
    const parts = email.split("@");
    const masked = `${parts[0].slice(0, 2)}****@${parts[1]}`;
    setMaskedContact(masked);
    sessionStorage.setItem("fp_otp", generatedOtp);
    sessionStorage.setItem("fp_email", email.toLowerCase());
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const storedOtp = sessionStorage.getItem("fp_otp");
    if (enteredOtp !== storedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    setStep("reset");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const pwError = validatePassword(newPassword);
    if (pwError) {
      setError(pwError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const targetEmail = sessionStorage.getItem("fp_email") || "";
    const accounts: Array<{
      email: string;
      password?: string;
      [key: string]: unknown;
    }> = JSON.parse(localStorage.getItem("eduportal_accounts") || "[]");
    const updated = accounts.map((a) =>
      a.email.toLowerCase() === targetEmail
        ? { ...a, password: newPassword }
        : a,
    );
    localStorage.setItem("eduportal_accounts", JSON.stringify(updated));
    sessionStorage.removeItem("fp_otp");
    sessionStorage.removeItem("fp_email");
    setStep("done");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Enter Email */}
          {step === "email" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => navigate("login")}
                  className="text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Forgot Password
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Enter your registered email to receive an OTP
                  </p>
                </div>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fp-email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Reset OTP
                </button>
              </form>
            </>
          )}

          {/* Step 2: Enter OTP */}
          {step === "otp" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                    setEnteredOtp("");
                  }}
                  className="text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Enter OTP
                  </h1>
                  <p className="text-slate-500 text-sm">
                    OTP sent to {maskedContact}
                  </p>
                </div>
              </div>
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> Real OTP delivery is pending a platform
                  upgrade. Please contact your admin for the OTP, or use the
                  Resend OTP button to generate a new one.
                </p>
              </div>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fp-otp"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    6-Digit OTP
                  </label>
                  <input
                    id="fp-otp"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) =>
                      setEnteredOtp(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center text-lg font-mono"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newOtp = generateOtp();
                    sessionStorage.setItem("fp_otp", newOtp);
                    setEnteredOtp("");
                    setError("");
                  }}
                  className="w-full py-2 text-blue-600 text-sm hover:underline"
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}

          {/* Step 3: Set New Password */}
          {step === "reset" && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    New Password
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Create a strong new password
                  </p>
                </div>
              </div>
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fp-new-password"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="fp-new-password"
                      type={showNew ? "text" : "password"}
                      required
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Min 8 chars, uppercase, lowercase, number, special character
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="fp-confirm-password"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="fp-confirm-password"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}

          {/* Step 4: Done */}
          {step === "done" && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Password Reset!
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Your password has been successfully updated. You can now log in
                with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate("login")}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>

        {step === "email" && (
          <button
            type="button"
            onClick={() => navigate("landing")}
            className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1"
          >
            <ArrowLeft size={14} /> Back to home
          </button>
        )}
      </div>
    </div>
  );
}
