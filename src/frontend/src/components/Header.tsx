import { Bell, Menu, Search } from "lucide-react";
import type { Role } from "../App";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  teacher: "Teacher",
  student: "Student",
};

const roleNames: Record<Role, string> = {
  admin: "John Admin",
  teacher: "Dr. Sarah Johnson",
  student: "Alex Thompson",
};

interface Props {
  role: Role;
  onMenuClick: () => void;
}

export default function Header({ role, onMenuClick }: Props) {
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
          <span className="font-semibold text-slate-900">
            {roleNames[role]}
          </span>
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
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold ml-1">
          {roleNames[role][0]}
        </div>
      </div>
    </header>
  );
}
