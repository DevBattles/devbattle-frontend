import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Contact Support
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions about student registration, contests, or AI grading credits? Reach out directly to our team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">Email Us</h3>
                <p className="text-sm text-slate-400 mt-1">support@devbattles.com</p>
              </div>
            </div>
            
            <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">Call Support</h3>
                <p className="text-sm text-slate-400 mt-1">+1 (800) 555-0199</p>
              </div>
            </div>

            <div className="bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-6 flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">Headquarters</h3>
                <p className="text-sm text-slate-400 mt-1">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-[#111827]/50 border border-slate-700/50 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
