"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save, Lock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/FormField";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "Alex Kumar", email: "alex.kumar@company.com", department: "Operations" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-lg">
      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        {/* Avatar */}
        <div className="text-center pb-5 border-b border-gray-100 mb-5">
          <div className="w-18 h-18 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3" style={{ width: 72, height: 72 }}>
            AK
          </div>
          <h2 className="text-lg font-bold text-gray-900">{form.name}</h2>
          <p className="text-sm text-gray-400 mt-0.5">Inventory Manager · Admin</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="green">Active</Badge>
            <Badge variant="gray">Admin</Badge>
          </div>
        </div>

        {/* Form */}
        <FormField label="Full Name">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Email Address">
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-x-3">
          <FormField label="Role">
            <Input value="Inventory Manager" readOnly className="text-gray-400 cursor-not-allowed bg-gray-50" />
          </FormField>
          <FormField label="Department">
            <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </FormField>
        </div>

        <div className="flex gap-2 mt-2">
          <Button onClick={handleSave}>
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          <Button variant="secondary">
            <Lock size={14} /> Change Password
          </Button>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Session Information</h3>
        {[
          { label: "Last login", value: "Jan 14, 2025 · 09:15 AM" },
          { label: "Session started", value: "Today, 09:15 AM" },
          { label: "IP Address", value: "192.168.1.42", mono: true },
          { label: "Browser", value: "Chrome 121 / macOS" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-400">{row.label}</span>
            <span className={`text-sm text-gray-900 ${row.mono ? "font-mono" : ""}`}>{row.value}</span>
          </div>
        ))}

        <div className="mt-4">
          <Button variant="danger" className="w-full justify-center" onClick={() => router.push("/")}>
            <LogOut size={15} /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
