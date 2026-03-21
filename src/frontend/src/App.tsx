import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import Announcements from "./pages/Announcements";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Results from "./pages/Results";
import RoleSelect from "./pages/RoleSelect";
import Settings from "./pages/Settings";
import Students from "./pages/Students";
import StudyMaterials from "./pages/StudyMaterials";
import Teachers from "./pages/Teachers";
import Timetable from "./pages/Timetable";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";

export type Page =
  | "landing"
  | "login"
  | "register"
  | "forgot-password"
  | "role-select"
  | "dashboard"
  | "courses"
  | "assignments"
  | "attendance"
  | "exams"
  | "results"
  | "announcements"
  | "messages"
  | "settings"
  | "students"
  | "teachers"
  | "timetable"
  | "study-materials"
  | "notifications"
  | "profile";

export type Role = "admin" | "teacher" | "student";

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<Role | null>(() => {
    return (localStorage.getItem("eduportal_role") as Role) || null;
  });

  const isAuthenticated = !!identity;

  const publicPages: Page[] = [
    "landing",
    "login",
    "register",
    "forgot-password",
  ];

  useEffect(() => {
    if (!isInitializing) {
      if (!isAuthenticated) {
        if (!publicPages.includes(page)) setPage("landing");
      } else if (!role) {
        setPage("role-select");
      } else if (publicPages.includes(page) || page === "role-select") {
        setPage("dashboard");
      }
    }
  }, [isAuthenticated, isInitializing, role, page]);

  const navigate = (p: Page) => setPage(p);

  const handleRoleSelect = (r: Role) => {
    localStorage.setItem("eduportal_role", r);
    setRole(r);
    setPage("dashboard");
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading EduPortal Pro...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (page === "login") return <Login navigate={navigate} />;
    if (page === "register") return <Register navigate={navigate} />;
    if (page === "forgot-password")
      return <ForgotPassword navigate={navigate} />;
    return <Landing navigate={navigate} />;
  }

  if (!role)
    return <RoleSelect onSelect={handleRoleSelect} navigate={navigate} />;

  const dashboardContent = () => {
    switch (page) {
      case "dashboard":
        if (role === "admin") return <AdminDashboard navigate={navigate} />;
        if (role === "teacher") return <TeacherDashboard navigate={navigate} />;
        return <StudentDashboard navigate={navigate} />;
      case "courses":
        return <Courses role={role} navigate={navigate} />;
      case "assignments":
        return <Assignments role={role} navigate={navigate} />;
      case "attendance":
        return <Attendance role={role} navigate={navigate} />;
      case "exams":
        return <Exams role={role} navigate={navigate} />;
      case "results":
        return <Results role={role} navigate={navigate} />;
      case "announcements":
        return <Announcements role={role} navigate={navigate} />;
      case "messages":
        return <Messages navigate={navigate} />;
      case "students":
        return <Students navigate={navigate} />;
      case "teachers":
        return <Teachers navigate={navigate} />;
      case "timetable":
        return <Timetable role={role} navigate={navigate} />;
      case "study-materials":
        return <StudyMaterials role={role} navigate={navigate} />;
      case "notifications":
        return <Notifications navigate={navigate} />;
      case "profile":
        return <Profile navigate={navigate} />;
      case "settings":
        return (
          <Settings
            role={role}
            onRoleChange={handleRoleSelect}
            navigate={navigate}
          />
        );
      default:
        return <AdminDashboard navigate={navigate} />;
    }
  };

  return (
    <Layout role={role} currentPage={page} navigate={navigate}>
      {dashboardContent()}
    </Layout>
  );
}
