// components/admin/users/UserModal.jsx
// ═══════════════════════════════════════════
// User Edit Modal — Single panel form
// ═══════════════════════════════════════════
// Fields: full_name, phone, role, district,
//         preparation_level, avatar_url
//
// ⚠️  CREATE করা যায় না — শুধু EDIT
//     (User signup করলেই auto profile create হয়)
// ═══════════════════════════════════════════

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  Shield,
  MapPin,
  GraduationCap,
  ImageIcon,
  Save,
  X,
  AlertTriangle,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// ════════════════════════════════════════════════════
// Validation Schema
// ════════════════════════════════════════════════════
const schema = z.object({
  full_name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে!"),
  phone: z.string().trim().optional().or(z.literal("")),
  role: z.enum(["admin", "student"], { message: "Role select করুন!" }),
  district: z.string().trim().optional().or(z.literal("")),
  preparation_level: z.string().trim().optional().or(z.literal("")),
  avatar_url: z.string().trim().url("Valid URL দিন!").optional().or(z.literal("")),
});

// ════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════
export default function UserModal({ isOpen, onClose, editingUser, currentUserId, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);

  const isSelf = editingUser?.id === currentUserId;
  const wasAdmin = editingUser?.role === "admin";

  // ──────────────────────────────────────────────────
  // Form setup
  // ──────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: editingUser?.full_name || "",
      phone: editingUser?.phone || "",
      role: editingUser?.role || "student",
      district: editingUser?.district || "",
      preparation_level: editingUser?.preparation_level || "",
      avatar_url: editingUser?.avatar_url || "",
    },
  });

  // Watch avatar for live preview
  const watchedAvatar = useWatch({ control, name: "avatar_url" });
  const watchedName = useWatch({ control, name: "full_name" });
  const watchedRole = useWatch({ control, name: "role" });

  // Demote warning (admin → student on self)
  const isSelfDemote = isSelf && wasAdmin && watchedRole !== "admin";

  // ──────────────────────────────────────────────────
  // Submit handler
  // ──────────────────────────────────────────────────
  const onSubmit = async (data) => {
    if (!editingUser) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "আপডেট ব্যর্থ!");
        return;
      }
      toast.success(json.message || "ইউজার আপডেট হয়েছে!");
      onSuccess?.(json.user);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setSubmitting(false);
    }
  };

  // ──────────────────────────────────────────────────
  // Initials helper (for avatar fallback)
  // ──────────────────────────────────────────────────
  const initials = (watchedName || "U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // ──────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header title="ইউজার এডিট" onClose={onClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="space-y-5 max-h-[70vh] overflow-y-auto">
          {/* ════════════════════════════════════════════ */}
          {/* Avatar Preview                               */}
          {/* ════════════════════════════════════════════ */}
          <div className="flex flex-col items-center gap-2 pb-4 border-b border-slate-200">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-100 border-2 border-brand-200 relative shrink-0">
              {watchedAvatar ? (
                <Image
                  src={watchedAvatar}
                  alt={watchedName || "User"}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => {}}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-700 font-bold text-2xl">
                  {initials}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono truncate max-w-full px-4">
              ID: {editingUser?.id || "—"}
            </p>
          </div>

          {/* ════════════════════════════════════════════ */}
          {/* Self-Demote Warning                          */}
          {/* ════════════════════════════════════════════ */}
          {isSelfDemote && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-700">
                <p className="font-semibold mb-0.5">নিজেকে demote করতে পারবেন না!</p>
                <p>আপনি নিজেই admin — role পরিবর্তন করলে save হবে না।</p>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════ */}
          {/* Form Fields                                  */}
          {/* ════════════════════════════════════════════ */}

          {/* Full Name */}
          <Input
            label="পুরো নাম"
            placeholder="যেমন: Faysal Ahmed"
            required
            icon={User}
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          {/* Phone */}
          <Input
            label="ফোন নাম্বার"
            placeholder="যেমন: 01XXXXXXXXX"
            icon={Phone}
            error={errors.phone?.message}
            {...register("phone")}
          />

          {/* Role (native select) */}
          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Role
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-slate-400">
                <Shield size={16} />
              </div>
              <select
                {...register("role")}
                disabled={isSelf && wasAdmin}
                className={[
                  "w-full h-10 text-sm bg-white text-slate-900",
                  "border rounded-lg outline-none transition-all duration-150",
                  "pl-10 pr-3.5",
                  errors.role
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 hover:border-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100",
                  isSelf && wasAdmin ? "bg-slate-50 cursor-not-allowed opacity-70" : "",
                ].join(" ")}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {errors.role && <p className="text-xs text-red-600 mt-1.5">{errors.role.message}</p>}
            {isSelf && wasAdmin && (
              <p className="text-xs text-slate-500 mt-1.5">
                🛡️ নিজের role পরিবর্তন করা যাবে না (security)
              </p>
            )}
          </div>

          {/* District */}
          <Input
            label="জেলা"
            placeholder="যেমন: Dhaka"
            icon={MapPin}
            error={errors.district?.message}
            {...register("district")}
          />

          {/* Preparation Level */}
          <Input
            label="Preparation Level"
            placeholder="যেমন: BCS, Bank Job, NTRCA"
            icon={GraduationCap}
            error={errors.preparation_level?.message}
            {...register("preparation_level")}
          />

          {/* Avatar URL */}
          <Input
            label="Avatar URL"
            placeholder="https://example.com/avatar.jpg"
            icon={ImageIcon}
            error={errors.avatar_url?.message}
            helper="ছবির direct link দিন (optional)"
            {...register("avatar_url")}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="ghost" icon={X} onClick={onClose} type="button" disabled={submitting}>
            বাতিল
          </Button>
          <Button variant="success" icon={Save} type="submit" loading={submitting}>
            সেভ করুন
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
