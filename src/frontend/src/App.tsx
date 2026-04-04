import { useState } from "react";
import Layout from "./components/Layout";
import Announcements from "./pages/Announcements";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Results from "./pages/Results";
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
  | "profile"
  | "library";

export type Role = "admin" | "teacher" | "student";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<Role | null>(() => {
    const loggedIn = localStorage.getItem("eduportal_logged_in");
    if (!loggedIn) return null;
    return (localStorage.getItem("eduportal_role") as Role) || null;
  });

  const isAuthenticated = !!role;

  const navigate = (p: Page) => setPage(p);

  const handleLogin = (r: Role) => {
    setRole(r);
    setPage("dashboard");
  };

  const handleRoleSelect = (r: Role) => {
    localStorage.setItem("eduportal_role", r);
    localStorage.setItem("eduportal_logged_in", "true");
    setRole(r);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("eduportal_logged_in");
    localStorage.removeItem("eduportal_role");
    localStorage.removeItem("eduportal_user_name");
    localStorage.removeItem("eduportal_roll_number");
    setRole(null);
    setPage("landing");
  };

  if (!isAuthenticated) {
    if (page === "login")
      return <Login navigate={navigate} onLogin={handleLogin} />;
    if (page === "register")
      return <Register navigate={navigate} onLogin={handleLogin} />;
    if (page === "forgot-password")
      return <ForgotPassword navigate={navigate} />;
    return <Landing navigate={navigate} />;
  }

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
      case "library":
        return <Library navigate={navigate} role={role} />;
      case "settings":
        return (
          <Settings
            role={role}
            onRoleChange={handleRoleSelect}
            onLogout={handleLogout}
            navigate={navigate}
          />
        );
      default:
        if (role === "admin") return <AdminDashboard navigate={navigate} />;
        if (role === "teacher") return <TeacherDashboard navigate={navigate} />;
        return <StudentDashboard navigate={navigate} />;
    }
  };

  return (
    <Layout role={role} currentPage={page} navigate={navigate}>
      {dashboardContent()}
    </Layout>
  );
}
