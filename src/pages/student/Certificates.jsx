import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Award, Download, Share2, ShieldCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await api.get("/certificates");
        if (res.data && res.data.success) {
          setCertificates(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load certificates.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleShare = (code) => {
    const shareUrl = `${window.location.origin}/certificates/verify/${code}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Verification link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-6">
        <h2 className="text-xl font-bold text-white mb-2">My Certificates</h2>
        <p className="text-sm text-slate-400">View and verify all your completed coding challenge certifications.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-[#111827]/50 p-12 text-center space-y-4">
          <Award className="h-16 w-16 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Certificates Yet</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Certificates are issued automatically by teachers when you achieve top performance in homework modules and contests.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111827]/50 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg truncate">{cert.title || "Certificate of Excellence"}</h3>
                  <p className="text-xs text-slate-400 mt-1 capitalize">Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : "Pending"}</p>
                  <p className="text-sm text-slate-300 mt-3 line-clamp-2">{cert.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700/50 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Validation Code:</span>
                  <span className="font-mono text-white">{cert.code}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(cert.code)}
                    className="flex-1 flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Copy Link
                  </button>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/certificates/download/${cert.code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg transition text-center"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;
