import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Moon, Settings, Sun, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import adminAvatar from "../assets/admin.png";

const NAV_LINKS = [
  {
    to: "/",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} aria-hidden="true" />,
    testId: "nav-dashboard",
  },
  {
    to: "/users",
    label: "Users",
    icon: <Users size={18} aria-hidden="true" />,
    testId: "nav-users",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings size={18} aria-hidden="true" />,
    testId: "nav-settings",
  },
];

export default function MainLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className="flex min-h-screen bg-background text-foreground"
      data-testid="main-layout"
    >
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-6 bg-muted/50 backdrop-blur-lg border-r border-muted">
        <h1 className="text-2xl font-bold mb-10 tracking-tight">PulseBoardX</h1>
        <nav className="flex flex-col gap-3">
          {NAV_LINKS.map(({ to, label, icon, testId }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted hover:text-primary"
                }`
              }
              data-testid={testId}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-muted bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <div className="text-base font-medium">Welcome, Admin</div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted transition"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              data-testid="dark-mode-toggle"
            >
              {darkMode ? (
                <Sun size={18} data-testid="sun-icon" />
              ) : (
                <Moon size={18} data-testid="moon-icon" />
              )}
            </button>
            <img
              src={adminAvatar}
              alt="Admin Avatar"
              className="w-8 h-8 rounded-full border border-muted object-cover"
              data-testid="admin-avatar"
            />
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          className="p-6 flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          data-testid="main-content"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
