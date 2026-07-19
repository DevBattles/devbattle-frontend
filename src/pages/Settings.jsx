import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  ToggleRight,
  ToggleLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

function Settings() {
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <SettingsContent userData={userResponse?.data || {}} />;
}

function SettingsContent({ userData }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const [profileForm, setProfileForm] = useState({
    bio: userData.bio || "",
    location: userData.location || "",
    website: userData.website || "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: userData.preferences?.emailNotifications ?? true,
    pushNotifications: userData.preferences?.pushNotifications ?? false,
  });

  const [appearance, setAppearance] = useState({
    theme: userData.preferences?.theme || "dark",
    language: userData.preferences?.language || "en",
  });

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await api.put("/users/me/profile", updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile settings updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedPreferences) => {
      const res = await api.put("/users/me/settings", {
        ...userData.preferences,
        ...updatedPreferences
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Preferences updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update preferences");
    },
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileForm);
  };

  const handleSaveNotifications = () => {
    updateSettingsMutation.mutate(notifications);
  };

  const handleSaveAppearance = () => {
    updateSettingsMutation.mutate(appearance);
  };

  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  const switchRoleMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/switch-role");
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(`Switched role successfully to ${res.data.user.role}!`);
      setIsSwitchModalOpen(false);
      login(res.data.user, res.data.token);
      
      const nextPath = res.data.user.role === "student" ? "/student/dashboard" : res.data.user.role === "teacher" ? "/teacher/dashboard" : "/admin/dashboard";
      navigate(nextPath, { replace: true });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to switch role.");
    }
  });

  const handleSwitchRole = () => {
    switchRoleMutation.mutate();
  };


  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "role", label: "Switch Role", icon: RefreshCw },
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
                  <Input value={userData.username || ""} disabled className="opacity-50 cursor-not-allowed" />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Email
                  </label>
                  <Input value={userData.email || ""} disabled type="email" className="opacity-50 cursor-not-allowed" />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Location
                  </label>
                  <Input 
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA" 
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Website
                  </label>
                  <Input 
                    value={profileForm.website}
                    onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                    placeholder="e.g. https://johndoe.com" 
                  />
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                  className="bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Profile
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
                  <h3 className="font-semibold text-white">Email & Push</h3>

                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-slate-400">
                        Receive platform updates via email
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.emailNotifications ? (
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
                        setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })
                      }
                      className="text-emerald-400"
                    >
                      {notifications.pushNotifications ? (
                        <ToggleRight className="h-6 w-6" />
                      ) : (
                        <ToggleLeft className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleSaveNotifications}
                  disabled={updateSettingsMutation.isPending}
                  className="bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Notifications
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
                  <Select 
                    value={appearance.theme} 
                    onValueChange={(val) => setAppearance({ ...appearance, theme: val })}
                  >
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Language
                  </label>
                  <Select 
                    value={appearance.language} 
                    onValueChange={(val) => setAppearance({ ...appearance, language: val })}
                  >
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </Select>
                </div>

                <Button 
                  onClick={handleSaveAppearance}
                  disabled={updateSettingsMutation.isPending}
                  className="bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "role" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Role Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider font-semibold">Current Account Role</p>
                    <p className="text-xl font-bold text-white mt-1 capitalize">{userData.role}</p>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You can switch your role between **Student** and **Teacher**. 
                    This will immediately update your dashboard permissions and change your interface.
                  </p>
                </div>

                <Button 
                  onClick={() => setIsSwitchModalOpen(true)}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Switch to {userData.role === "student" ? "Teacher" : "Student"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Modal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        title="Confirm Role Switch"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed text-sm">
            Are you sure you want to switch your account role from <span className="text-emerald-400 font-semibold capitalize">{userData.role}</span> to <span className="text-emerald-400 font-semibold capitalize">{userData.role === "student" ? "teacher" : "student"}</span>?
          </p>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-xs text-yellow-400 space-y-1">
            <p className="font-bold">⚠️ Warning:</p>
            <p>Your navigation and sidebar options will change. You will be redirected to the new dashboard instantly.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Button
              onClick={() => setIsSwitchModalOpen(false)}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSwitchRole}
              disabled={switchRoleMutation.isPending}
              className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold"
            >
              {switchRoleMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Switch"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
