import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Menu } from "@headlessui/react";

// ✅ Avatar Imports
import architAvatar from "../assets/archit-avatar.png";
import ramAvatar from "../assets/ram-avatar.png";
import golloAvatar from "../assets/gollo-avatar.png";

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

export default function UsersPage() {
  const [users] = useState<User[]>([
    {
      name: "Archit Sharma",
      email: "archit@example.com",
      role: "Admin",
      status: "Active",
      avatar: architAvatar,
    },
    {
      name: "Ram Dass",
      email: "ram@example.com",
      role: "Member",
      status: "Inactive",
      avatar: ramAvatar,
    },
    {
      name: "Gollo Chama",
      email: "gollo@example.com",
      role: "Moderator",
      status: "Active",
      avatar: golloAvatar,
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">👥 Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-muted text-muted-foreground">
              <th className="py-2 pr-4">User</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={i}
                className="border-b border-muted/30 hover:bg-muted/20"
              >
                <td className="py-3 pr-4 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {user.email}
                </td>
                <td className="py-3 pr-4">{user.role}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-1 rounded-full hover:bg-muted transition">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-muted rounded-lg shadow-lg z-10 overflow-visible">
                      <div className="py-1 text-sm">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block w-full px-4 py-2 text-left ${
                                active ? "bg-muted" : ""
                              }`}
                            >
                              View
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block w-full px-4 py-2 text-left ${
                                active ? "bg-muted" : ""
                              }`}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`block w-full px-4 py-2 text-left text-red-500 ${
                                active ? "bg-muted" : ""
                              }`}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
