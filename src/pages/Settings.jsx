import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import {
  User,
  Bell,
  Shield,
  Palette,
  Lock,
  Mail,
  Save,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    homework: true,
    contests: true,
    submissions: true,
    certificates: true,
    email: true,
    push: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                activeTab === tab.id
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-400" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Username
                  </label>
                  <Input defaultValue="John Doe" />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Email
                  </label>
                  <Input defaultValue="john@example.com" type="email" />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Bio
                  </label>
                  <textarea
                    defaultValue="Passionate web developer learning React and modern technologies."
                    className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Location
                  </label>
                  <Input defaultValue="San Francisco, CA" />
                </div>

                <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-emerald-400" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Push Notifications</h3>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Homework Alerts</p>
                      <p className="text-sm text-slate-400">
                        Get notified when new homework is assigned
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, homework: !notifications.homework })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.homework ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Contest Updates</p>
                      <p className="text-sm text-slate-400">
                        Get notified about upcoming contests
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, contests: !notifications.contests })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.contests ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Submission Reviews</p>
                      <p className="text-sm text-slate-400">
                        Get notified when your submission is reviewed
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, submissions: !notifications.submissions })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.submissions ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Certificates</p>
                      <p className="text-sm text-slate-400">
                        Get notified when you earn a certificate
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, certificates: !notifications.certificates })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.certificates ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Email Notifications</h3>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Email Digest</p>
                      <p className="text-sm text-slate-400">
                        Receive daily summary via email
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, email: !notifications.email })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.email ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Push Notifications</p>
                      <p className="text-sm text-slate-400">
                        Enable browser push notifications
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, push: !notifications.push })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.push ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Current Password
                    </label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      New Password
                    </label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>

                  <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                    Update Password
                  </Button>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h3 className="font-semibold text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Enable 2FA</p>
                      <p className="text-sm text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800">
                      Enable
                    </Button>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h3 className="font-semibold text-white mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                      <div>
                        <p className="font-medium text-white">Chrome on Windows</p>
                        <p className="text-sm text-slate-400">San Francisco, CA • Active now</p>
                      </div>
                      <Badge variant="success">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                      <div>
                        <p className="font-medium text-white">Safari on iPhone</p>
                        <p className="text-sm text-slate-400">San Francisco, CA • 2 hours ago</p>
                      </div>
                      <Button variant="outline" className="border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-emerald-400" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Theme
                  </label>
                  <Select defaultValue="dark">
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    <button className="h-10 w-10 rounded-full bg-emerald-500 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900" />
                    <button className="h-10 w-10 rounded-full bg-blue-500" />
                    <button className="h-10 w-10 rounded-full bg-purple-500" />
                    <button className="h-10 w-10 rounded-full bg-yellow-500" />
                    <button className="h-10 w-10 rounded-full bg-pink-500" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Font Size
                  </label>
                  <Select defaultValue="medium">
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Language
                  </label>
                  <Select defaultValue="en">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </Select>
                </div>

                <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                  <Save className="h-4 w-4 mr-2" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
