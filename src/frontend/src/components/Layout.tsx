import { useState } from "react";
import type { Page, Role } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
  role: Role;
  currentPage: Page;
  navigate: (p: Page) => void;
}

export default function Layout({
  children,
  role,
  currentPage,
  navigate,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => setSidebarOpen(false)}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 flex-shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          role={role}
          currentPage={currentPage}
          navigate={(p) => {
            navigate(p);
            setSidebarOpen(false);
          }}
        />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header role={role} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
