import { useState, useRef } from "react";
import { useAuth } from "@/context/useAuth";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import {
  Mail,
  Calendar,
  Edit,
  Camera,
  MapPin,
  Link as LinkIcon,
  Save,
  Loader2
} from "lucide-react";

function Profile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch Profile
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data;
    },
  });

  const profileData = profileResponse?.data || {};

  // Form State
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    website: "",
  });

  // Handle Edit Toggle
  const toggleEdit = () => {
    if (!isEditing) {
      setFormData({
        bio: profileData.bio || "",
        location: profileData.location || "",
        website: profileData.website || "",
      });
    }
    setIsEditing(!isEditing);
  };

  // Update Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await api.put("/users/me/profile", updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  // Avatar Upload Mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post("/users/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Avatar updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to upload avatar");
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatarMutation.mutate(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  const joinedDate = profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently";
  const avatarUrl = profileData.avatarUrl ? `${API_BASE_URL}${profileData.avatarUrl}` : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-slate-400">
            Manage your profile and view your achievements
          </p>
        </div>
        <Button
          onClick={toggleEdit}
          disabled={updateProfileMutation.isPending}
          className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400"
        >
          <Edit className="h-4 w-4" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover border-2 border-emerald-500/50" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-3xl font-bold text-emerald-400 uppercase">
                  {profileData.username?.charAt(0) || user?.username?.charAt(0) || "U"}
                </div>
              )}
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadAvatarMutation.isPending}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition"
                  >
                    {uploadAvatarMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </button>
                </>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Username (Immutable)</label>
                    <Input value={profileData.username || ""} disabled />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Email (Immutable)</label>
                    <Input value={profileData.email || ""} disabled type="email" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Write a short bio..."
                      className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Location</label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <Button
                    onClick={handleSave}
                    disabled={updateProfileMutation.isPending}
                    className="bg-emerald-500 text-black hover:bg-emerald-400"
                  >
                    {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-3 sm:justify-start">
                    <h2 className="text-2xl font-bold text-white">
                      {profileData.username}
                    </h2>
                    <Badge variant="success" className="capitalize">
                      {profileData.role}
                    </Badge>
                  </div>
                  <p className="mt-2 text-slate-400">{profileData.bio || "No bio provided yet."}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:justify-start">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      <span>{profileData.email}</span>
                    </div>
                    {profileData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>Joined {joinedDate}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                    {profileData.website && (
                      <a
                        href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
