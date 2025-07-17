import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}

export default function UserModal({
  show,
  onClose,
  onSave,
  user,
}: UserModalProps) {
  // ✅ Hooks should be called before any return/condition
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setStatus(user.status || "");
    } else {
      setName("");
      setEmail("");
      setRole("");
      setStatus("");
    }
  }, [user]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background text-foreground rounded-2xl w-full max-w-md p-6 relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {user ? "Edit User" : "Add New User"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              name,
              email,
              role,
              status,
              avatar: user?.avatar || `https://i.pravatar.cc/150?u=${email}`,
            });
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Moderator">Moderator</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
          >
            Save User
          </button>
        </form>
      </motion.div>
    </div>
  );
}
