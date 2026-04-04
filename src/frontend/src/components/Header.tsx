import { Bell, BellOff, Menu, Search } from "lucide-react";
import { useState } from "react";
import type { Page, Role } from "../App";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  teacher: "Teacher",
  student: "Student",
};

interface Props {
  role: Role;
  onMenuClick: () => void;
  navigate: (p: Page) => void;
}

export default function Header({ role, onMenuClick, navigate }: Props) {
  const userName =
    localStorage.getItem("eduportal_user_name") ||
    role.charAt(0).toUpperCase() + role.slice(1);
  const userPhoto = localStorage.getItem("eduportal_user_photo");

  const [notifEnabled, setNotifEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem("notifications_enabled");
    return stored === null ? true : stored === "true";
  });

  const unreadCount = Number(
    localStorage.getItem("notifications_unread") ?? "5",
  );

  const toggleNotifications = () => {
    const next = !notifEnabled;
    setNotifEnabled(next);
    localStorage.setItem("notifications_enabled", String(next));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>
        <span className="text-slate-700 font-medium text-sm">
          Welcome,{" "}
          <span className="font-semibold text-slate-900">{userName}</span>
          <span className="text-slate-400 ml-1">({roleLabels[role]})</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Bell button */}
        <button
          type="button"
          data-ocid="notifications.button"
          onClick={() => navigate("notifications")}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
          title="View notifications"
        >
          <Bell
            size={18}
            className={notifEnabled ? "text-slate-600" : "text-slate-300"}
          />
          {notifEnabled && unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Mute / unmute toggle */}
        <button
          type="button"
          data-ocid="notifications.toggle"
          onClick={toggleNotifications}
          className={`p-2 rounded-lg transition-colors ${
            notifEnabled
              ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              : "text-red-400 hover:text-red-600 hover:bg-red-50"
          }`}
          title={notifEnabled ? "Mute notifications" : "Unmute notifications"}
        >
          {notifEnabled ? <Bell size={16} /> : <BellOff size={16} />}
        </button>

        {/* Avatar / Profile */}
        <button
          type="button"
          data-ocid="profile.button"
          onClick={() => navigate("profile")}
          className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold ml-1 overflow-hidden hover:ring-2 hover:ring-purple-400 transition-all"
          title="View profile"
          style={
            userPhoto
              ? {
                  backgroundImage: `url(${userPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {!userPhoto && userName[0].toUpperCase()}
        </button>
      </div>
    </header>
  );
}
