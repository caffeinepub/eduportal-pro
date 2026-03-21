import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCheck,
  ClipboardList,
  FileText,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

type NotifCategory =
  | "assignment_due"
  | "exam_reminder"
  | "marks_posted"
  | "attendance_alert"
  | "announcement";

type Notification = {
  id: number;
  category: NotifCategory;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const CATEGORY_CONFIG: Record<
  NotifCategory,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  assignment_due: {
    label: "Assignment",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    icon: <ClipboardList size={18} />,
  },
  exam_reminder: {
    label: "Exam",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    icon: <FileText size={18} />,
  },
  marks_posted: {
    label: "Marks",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: <TrendingUp size={18} />,
  },
  attendance_alert: {
    label: "Attendance",
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    icon: <AlertTriangle size={18} />,
  },
  announcement: {
    label: "Announcement",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: <Megaphone size={18} />,
  },
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    category: "assignment_due",
    title: "DSA Assignment Due Tomorrow",
    message:
      "Your DSA Assignment #4 on Graph Algorithms is due on Dec 22, 2025 at 11:59 PM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    category: "exam_reminder",
    title: "Final Exam: Engineering Mathematics III",
    message:
      "Reminder: Eng Math III final exam is scheduled for Dec 20, 2025 at 9:00 AM in Exam Hall A.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    category: "marks_posted",
    title: "Computer Networks Midterm Marks Published",
    message:
      "Your midterm marks for Computer Networks have been posted. Check the Results section.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    category: "attendance_alert",
    title: "Low Attendance Warning – Thermodynamics",
    message:
      "Your attendance in Thermodynamics has fallen below 75% (current: 68%). Please attend upcoming classes.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    category: "announcement",
    title: "College Annual Tech Fest – TechNova 2026",
    message:
      "Registration for TechNova 2026 is now open. Participate in coding contests, robotics, and more!",
    time: "2 days ago",
    read: true,
  },
  {
    id: 6,
    category: "assignment_due",
    title: "Digital Electronics Lab Report Submission",
    message:
      "Submit your DE Lab Report for Experiment 6 (Flip-Flops) by Dec 25, 2025.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 7,
    category: "exam_reminder",
    title: "Operating Systems Unit Test – Week 15",
    message:
      "Unit Test 3 for Operating Systems is scheduled for Dec 18, 2025 at 10:00 AM in Room 303.",
    time: "3 days ago",
    read: false,
  },
  {
    id: 8,
    category: "marks_posted",
    title: "DSA Quiz 5 Marks Available",
    message:
      "DSA Quiz 5 results are now available. Your score and feedback have been posted by Dr. Ramesh Kumar.",
    time: "4 days ago",
    read: true,
  },
];

export default function Notifications({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="notifications.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={markAllRead}
          data-ocid="notifications.primary_button"
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div
          className="text-center py-20"
          data-ocid="notifications.empty_state"
        >
          <Bell size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">No notifications</p>
          <p className="text-slate-300 text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => {
            const config = CATEGORY_CONFIG[n.category];
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => markRead(n.id)}
                data-ocid={`notifications.item.${i + 1}`}
                className={`w-full text-left rounded-xl border p-4 transition-all hover:shadow-sm ${
                  n.read ? "bg-white border-gray-200" : `${config.bg} border`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className={`text-sm font-semibold ${n.read ? "text-slate-700" : "text-slate-900"}`}
                      >
                        {n.title}
                      </p>
                      {!n.read && (
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${config.color.replace("text-", "bg-")}`}
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color} ${n.read ? "bg-slate-100" : config.bg}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-400">{n.time}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
