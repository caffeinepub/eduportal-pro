import { ArrowLeft } from "lucide-react";
import type { Page } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Login({ navigate }: { navigate: (p: Page) => void }) {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            E
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-slate-500 mb-8">
            Sign in to your EduPortal Pro account
          </p>

          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              "Sign in with Internet Identity"
            )}
          </button>

          <div className="mt-4 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => navigate("forgot-password")}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
            <button
              type="button"
              onClick={() => navigate("register")}
              className="text-slate-500 hover:text-slate-700"
            >
              Create account
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Secure, decentralized authentication powered by the Internet
            Computer
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("landing")}
          className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1"
        >
          <ArrowLeft size={14} /> Back to home
        </button>
      </div>
    </div>
  );
}
