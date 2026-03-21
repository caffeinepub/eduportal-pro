import { BarChart2, Bell, BookOpen, Shield, Users } from "lucide-react";
import type { Page } from "../App";

const features = [
  {
    icon: <BookOpen size={24} />,
    title: "Course Management",
    desc: "Create, manage, and enroll students in BTech courses with ease.",
  },
  {
    icon: <Users size={24} />,
    title: "Role-Based Access",
    desc: "Separate dashboards for Admins, Teachers, and Students.",
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Analytics & Results",
    desc: "Track attendance, grades, and performance over time.",
  },
  {
    icon: <Bell size={24} />,
    title: "Announcements",
    desc: "Keep everyone informed with targeted notifications.",
  },
  {
    icon: <Shield size={24} />,
    title: "Secure Platform",
    desc: "Built on the Internet Computer with strong identity management.",
  },
];

export default function Landing({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-lg text-slate-900">
            EduPortal Pro
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("register")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: "linear-gradient(135deg, #0F2743 0%, #1E5AAE 100%)",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          The Complete BTech Student Portal
        </h1>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Manage your BTech courses, lab assignments, attendance, and exams --
          all in one place.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => navigate("register")}
            className="px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => navigate("login")}
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-slate-50 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Ready to get started?
        </h2>
        <p className="text-slate-500 mb-6">
          Join thousands of BTech students and faculty on EduPortal Pro.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => navigate("register")}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => navigate("login")}
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Sign In
          </button>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-gray-100 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} EduPortal Pro. All rights reserved.
      </footer>
    </div>
  );
}
