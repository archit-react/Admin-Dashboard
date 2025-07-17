import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import UserModal from "@/components/UserModal";
import Toast from "@/components/ui/Toast";
import { Menu } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
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

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [sales, setSales] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [bounceRate, setBounceRate] = useState(0);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("This Month");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    let frame: number;
    let start = 0,
      startRev = 0,
      startConv = 0;
    let startSales = 0,
      startEngage = 0,
      startBounce = 0;

    const tabStats: Record<
      string,
      {
        users: number;
        revenue: number;
        conv: number;
        sales: number;
        engagement: number;
        bounce: number;
      }
    > = {
      Today: {
        users: 122,
        revenue: 8320,
        conv: 48.1,
        sales: 1800,
        engagement: 63.2,
        bounce: 30.1,
      },
      "This Week": {
        users: 544,
        revenue: 19820,
        conv: 51.3,
        sales: 9600,
        engagement: 71.4,
        bounce: 28.3,
      },
      "This Month": {
        users: 1369,
        revenue: 72340,
        conv: 52.4,
        sales: 52800,
        engagement: 78.6,
        bounce: 26.4,
      },
    };

    const selected = tabStats[activeTab];

    const step = () => {
      start += Math.ceil((selected.users - start) / 10);
      startRev += Math.ceil((selected.revenue - startRev) / 10);
      startConv += Math.ceil((selected.conv * 10 - startConv) / 10);
      startSales += Math.ceil((selected.sales - startSales) / 10);
      startEngage += Math.ceil((selected.engagement * 10 - startEngage) / 10);
      startBounce += Math.ceil((selected.bounce * 10 - startBounce) / 10);

      setCount(start);
      setRevenue(startRev);
      setConversion(startConv / 10);
      setSales(startSales);
      setEngagement(startEngage / 10);
      setBounceRate(startBounce / 10);

      if (
        start < selected.users ||
        startRev < selected.revenue ||
        startConv < selected.conv * 10 ||
        startSales < selected.sales ||
        startEngage < selected.engagement * 10 ||
        startBounce < selected.bounce * 10
      ) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  const chartData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 27800 },
    { month: "May", revenue: 26000 },
    { month: "Jun", revenue: 31000 },
  ];

  const [users, setUsers] = useState<User[]>([
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

  const handleDeleteUser = (index: number) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
      setToast({
        show: true,
        message: "User deleted successfully!",
        type: "success",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = (userData: User) => {
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.email === editingUser.email ? userData : user
      );
      setUsers(updatedUsers);
      setToast({
        show: true,
        message: "User updated successfully!",
        type: "success",
      });
    } else {
      // Add new user
      setUsers([...users, userData]);
      setToast({
        show: true,
        message: "User added successfully!",
        type: "success",
      });
    }
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="rounded-2xl p-6 bg-muted/40 backdrop-blur-sm shadow-lg flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Users This Month
            </p>
            <h2 className="text-2xl font-bold">{count}</h2>
          </div>
          <Users className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          className="rounded-2xl p-6 bg-muted/40 backdrop-blur-sm shadow-lg flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Revenue This Month
            </p>
            <h2 className="text-2xl font-bold">₹{revenue}</h2>
          </div>
          <DollarSign className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          className="rounded-2xl p-6 bg-muted/40 backdrop-blur-sm shadow-lg flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Conversion Rate
            </p>
            <h2 className="text-2xl font-bold">{conversion.toFixed(1)}%</h2>
          </div>
          <TrendingUp className="w-8 h-8 text-primary" />
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="mt-10 bg-muted/40 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 bg-muted/40 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h3 className="text-lg font-semibold">Analytics Overview</h3>
          <div className="flex gap-2">
            {["Today", "This Week", "This Month"].map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(label)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  activeTab === label
                    ? "bg-primary text-white border-primary"
                    : "border-muted-foreground/20 hover:bg-muted"
                } transition`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sales Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-xl bg-[#ecfdf5] text-green-800 shadow-sm border border-green-300"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">💰 Sales</p>
              <span className="text-xs font-medium">88%</span>
            </div>
            <h2 className="text-2xl font-bold">₹{sales.toLocaleString()}</h2>
            <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[88%]" />
            </div>
          </motion.div>

          {/* Engagement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 rounded-xl bg-[#eff6ff] text-blue-800 shadow-sm border border-blue-300"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">📊 Engagement</p>
              <span className="text-xs font-medium">78%</span>
            </div>
            <h2 className="text-2xl font-bold">{engagement.toFixed(1)}%</h2>
            <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[78%]" />
            </div>
          </motion.div>

          {/* Bounce Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-5 rounded-xl bg-[#fef2f2] text-red-800 shadow-sm border border-red-300"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">📉 Bounce Rate</p>
              <span className="text-xs font-medium">26%</span>
            </div>
            <h2 className="text-2xl font-bold">{bounceRate.toFixed(1)}%</h2>
            <div className="mt-2 h-2 bg-red-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[26%]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-10 bg-muted/40 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
          <h3 className="text-lg font-semibold">Recent Users</h3>
          <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
          >
            + Add User
          </button>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full sm:w-72 px-4 py-2 rounded-xl bg-muted border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-muted text-muted-foreground">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-muted/30 hover:bg-muted/20"
                  >
                    <td className="py-3 pr-4 flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{user.name}</span>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="py-3 pr-4">{user.role}</td>
                    <td className="py-3 pr-4 flex items-center justify-between gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="p-1 rounded-full hover:bg-muted transition">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-muted rounded-lg shadow-lg z-10">
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
                                  onClick={() => handleEditUser(user)}
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
                                  onClick={() => handleDeleteUser(i)}
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

      <UserModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        user={editingUser}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}
