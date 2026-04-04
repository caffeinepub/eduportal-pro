import {
  BarChart2,
  Bell,
  BellRing,
  BookMarked,
  BookOpen,
  Calendar,
  ClipboardList,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
import type { Page, Role } from "../App";

interface NavItem {
  label: string;
  page: Page;
  icon: React.ReactNode;
  roles?: Role[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    page: "dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { label: "Timetable", page: "timetable", icon: <Calendar size={18} /> },
  { label: "Courses", page: "courses", icon: <BookOpen size={18} /> },
  {
    label: "Study Materials",
    page: "study-materials",
    icon: <Download size={18} />,
  },
  {
    label: "Assignments",
    page: "assignments",
    icon: <ClipboardList size={18} />,
  },
  { label: "Attendance", page: "attendance", icon: <UserCheck size={18} /> },
  { label: "Exams", page: "exams", icon: <FileText size={18} /> },
  { label: "Results", page: "results", icon: <BarChart2 size={18} /> },
  { label: "Announcements", page: "announcements", icon: <Bell size={18} /> },
  {
    label: "Notifications",
    page: "notifications",
    icon: <BellRing size={18} />,
  },
  { label: "Messages", page: "messages", icon: <MessageSquare size={18} /> },
  {
    label: "Library",
    page: "library",
    icon: <BookMarked size={18} />,
  },
  {
    label: "Students",
    page: "students",
    icon: <Users size={18} />,
    roles: ["admin", "teacher"],
  },
  {
    label: "Teachers",
    page: "teachers",
    icon: <GraduationCap size={18} />,
    roles: ["admin"],
  },
  { label: "Settings", page: "settings", icon: <Settings size={18} /> },
];

interface Props {
  role: Role;
  currentPage: Page;
  navigate: (p: Page) => void;
}

export default function Sidebar({ role, currentPage, navigate }: Props) {
  const handleLogout = () => {
    localStorage.removeItem("eduportal_role");
    localStorage.removeItem("eduportal_logged_in");
    localStorage.removeItem("eduportal_user_name");
    window.location.reload();
  };

  const filtered = navItems.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  return (
    <div
      className="flex flex-col h-full text-white"
      style={{
        background: "linear-gradient(180deg, #1E0A3C 0%, #3B0764 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center font-bold text-lg flex-shrink-0">
          E
        </div>
        <span className="font-bold text-lg tracking-tight">EduPortal Pro</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filtered.map((item) => {
          const active = currentPage === item.page;
          return (
            <button
              type="button"
              key={item.page}
              onClick={() => navigate(item.page)}
              data-ocid={`nav.${item.page}.link`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-purple-600/60 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="nav.logout.button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
