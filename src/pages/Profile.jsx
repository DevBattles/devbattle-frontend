import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import {
  User,
  Mail,
  Calendar,
  Award,
  Trophy,
  TrendingUp,
  Edit,
  Camera,
  MapPin,
  Link as LinkIcon,
  Save,
} from "lucide-react";

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "John Doe",
    email: user?.email || "john@example.com",
    bio: "Passionate web developer learning React and modern technologies.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
  });

  const stats = {
    xp: 2450,
    submissions: 28,
    contestsWon: 5,
    streak: 12,
    rank: 15,
    certificates: 5,
  };

  const achievements = [
    { id: 1, name: "First Submission", icon: "🎯", date: "2024-01-05" },
    { id: 2, name: "Week Warrior", icon: "⚔️", date: "2024-01-10" },
    { id: 3, name: "Code Master", icon: "💻", date: "2024-01-15" },
    { id: 4, name: "Contest Champion", icon: "🏆", date: "2024-01-18" },
    { id: 5, name: "Perfect Score", icon: "⭐", date: "2024-01-20" },
  ];

  const activity = [
    { id: 1, type: "submission", title: "Completed React Portfolio", date: "2 hours ago" },
    { id: 2, type: "contest", title: "Joined JavaScript Mastery", date: "1 day ago" },
    { id: 3, type: "achievement", title: "Earned Code Master badge", date: "2 days ago" },
    { id: 4, type: "homework", title: "Submitted E-commerce API", date: "3 days ago" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
  };

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
          onClick={() => setIsEditing(!isEditing)}
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
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-3xl font-bold text-emerald-400">
                {formData.username.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="Username"
                  />
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    type="email"
                  />
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Bio"
                    className="w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-emerald-400 min-h-[80px]"
                  />
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Location"
                  />
                  <Button onClick={handleSave} className="bg-emerald-500 text-black hover:bg-emerald-400">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-3 sm:justify-start">
                    <h2 className="text-2xl font-bold text-white">
                      {formData.username}
                    </h2>
                    <Badge variant="success" className="capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  <p className="mt-2 text-slate-400">{formData.bio}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:justify-start">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-400" />
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>Joined Jan 2024</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                    {formData.website && (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Portfolio</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total XP</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.xp}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                <Trophy className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Submissions</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.submissions}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Contests Won</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.contestsWon}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Current Streak</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.streak}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                <Trophy className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/50 text-2xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{achievement.name}</h4>
                    <p className="text-sm text-slate-400">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      item.type === "submission"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : item.type === "contest"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : item.type === "achievement"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-400" />
            Certificates ({stats.certificates})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((cert) => (
              <div
                key={cert}
                className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:border-emerald-500/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <Award className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      React Mastery
                    </h4>
                    <p className="text-xs text-slate-400">Issued Jan 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 bg-slate-800/50 text-xs text-white hover:bg-slate-800"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 bg-slate-800/50 text-xs text-white hover:bg-slate-800"
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
