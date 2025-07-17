import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">⚙️ App Settings</h1>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between border border-muted rounded-xl p-4">
        <div>
          <h2 className="text-lg font-medium">Theme Toggle</h2>
          <p className="text-muted-foreground text-sm">
            Light/Dark Mode
          </p>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full border border-muted hover:bg-muted transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
