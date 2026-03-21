import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

export default function ForgotPassword({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Check your email
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                We've sent a password reset link to{" "}
                <span className="font-medium text-slate-700">{email}</span>.
                Check your inbox and follow the instructions.
              </p>
              <button
                type="button"
                onClick={() => navigate("login")}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          ) : (
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
                    We'll send a reset link to your email
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}
        </div>
        {!sent && (
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
