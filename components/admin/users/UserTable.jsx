// components/admin/users/UserTable.jsx
// ═══════════════════════════════════════════
// Users Table — search/filter/sort + CRUD
// ═══════════════════════════════════════════
// ⚠️  No "Create" button — users come via signup
// 🛡️ Self-row delete button disabled
// ═══════════════════════════════════════════

"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Pencil, Trash2, Users, Shield, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FilterBar from "@/components/admin/shared/FilterBar";
import EmptyState from "@/components/admin/shared/EmptyState";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import UserModal from "./UserModal";

// ════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════
const roleConfig = {
  admin: { label: "Admin", color: "danger", icon: Shield },
  student: { label: "Student", color: "success", icon: GraduationCap },
};

function truncate(text, len = 60) {
  if (!text) return "";
  return text.length > len ? text.substring(0, len) + "..." : text;
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ════════════════════════════════════════════════════
// User Avatar (with fallback)
// ════════════════════════════════════════════════════
function UserAvatar({ user, size = 40 }) {
  const initials = getInitials(user.full_name);
  const sizePx = `${size}px`;

  return (
    <div
      className="rounded-full overflow-hidden bg-brand-100 border border-brand-200 relative shrink-0"
      style={{ width: sizePx, height: sizePx }}
    >
      {user.avatar_url ? (
        <Image
          src={user.avatar_url}
          alt={user.full_name || "User"}
          fill
          className="object-cover"
          sizes={sizePx}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-brand-700 font-bold text-sm">
          {initials}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════
// Main Component
// ════════════════════════════════════════════════════
export default function UserTable({ initialUsers, currentUserId }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ──────────────────────────────────────────────────
  // Filter + sort logic
  // ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = users.filter((u) => {
      const matchSearch =
        !search ||
        u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        u.phone?.toLowerCase().includes(search.toLowerCase()) ||
        u.district?.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      return matchSearch && matchRole;
    });

    // Sort
    if (sortBy === "newest") {
      list = [...list].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (sortBy === "oldest") {
      list = [...list].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
    }

    return list;
  }, [users, search, roleFilter, sortBy]);

  // ──────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────
  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSuccess = (savedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === savedUser.id ? savedUser : u)));
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error);
        return;
      }
      toast.success(json.message);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      setDeletingUser(null);
    } catch (err) {
      console.error(err);
      toast.error("সার্ভার ত্রুটি!");
    } finally {
      setDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setSortBy("newest");
  };

  // ──────────────────────────────────────────────────
  // Filter options (FilterBar API: { id, label })
  // ──────────────────────────────────────────────────
  const roleOptions = [
    { id: "all", label: "সব Role" },
    { id: "admin", label: "Admin" },
    { id: "student", label: "Student" },
  ];

  const sortOptions = [
    { id: "newest", label: "নতুন আগে" },
    { id: "oldest", label: "পুরোনো আগে" },
    { id: "name", label: "নাম অনুসারে (A-Z)" },
  ];

  // ──────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────
  return (
    <Card>
      <Card.Body>
        {/* ════════════════════════════════════════════ */}
        {/* Top Bar: Filters only (no Create button)     */}
        {/* ════════════════════════════════════════════ */}
        <div className="mb-4">
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="খুঁজুন (নাম/ফোন/জেলা)..."
            filterOptions={roleOptions}
            filterValue={roleFilter}
            onFilterChange={setRoleFilter}
            sortOptions={sortOptions}
            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* List / Empty State                           */}
        {/* ════════════════════════════════════════════ */}
        {users.length === 0 ? (
          <EmptyState
            icon={Users}
            title="এখনো কোনো ইউজার নেই"
            description="ইউজাররা signup করলে এখানে দেখা যাবে।"
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            variant="search"
            icon={Users}
            title="কোনো ইউজার পাওয়া যায়নি"
            description="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।"
          />
        ) : (
          <>
            {/* ═══════════════════════════════════════ */}
            {/* Desktop Table (lg+)                     */}
            {/* ═══════════════════════════════════════ */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3">
                      ইউজার
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-32">
                      ফোন
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-28">
                      Role
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-28">
                      জেলা
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-32">
                      Joined
                    </th>
                    <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3 w-24">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => {
                    const role = roleConfig[user.role] || roleConfig.student;
                    const RoleIcon = role.icon;
                    const isSelf = user.id === currentUserId;
                    return (
                      <tr
                        key={user.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        {/* User (Avatar + Name) */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <UserAvatar user={user} size={40} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                  {user.full_name || "Unnamed"}
                                </p>
                                {isSelf && (
                                  <Badge variant="brand" size="sm">
                                    You
                                  </Badge>
                                )}
                              </div>
                              {user.preparation_level && (
                                <p className="text-xs text-slate-500 truncate">
                                  {user.preparation_level}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-3 py-3 text-sm text-slate-600">
                          {user.phone || <span className="text-slate-400">—</span>}
                        </td>

                        {/* Role */}
                        <td className="px-3 py-3">
                          <Badge variant={role.color} size="sm" icon={RoleIcon}>
                            {role.label}
                          </Badge>
                        </td>

                        {/* District */}
                        <td className="px-3 py-3 text-sm text-slate-600">
                          {user.district || <span className="text-slate-400">—</span>}
                        </td>

                        {/* Joined */}
                        <td className="px-3 py-3 text-sm text-slate-600">
                          {formatDate(user.created_at)}
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              icon={Pencil}
                              onClick={() => handleEdit(user)}
                              title="এডিট"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              iconOnly
                              icon={Trash2}
                              onClick={() => setDeletingUser(user)}
                              disabled={isSelf}
                              title={isSelf ? "নিজেকে delete করা যাবে না" : "ডিলিট"}
                              className={
                                isSelf
                                  ? "text-slate-300 cursor-not-allowed"
                                  : "text-red-600 hover:bg-red-50"
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* Mobile Cards (< lg)                     */}
            {/* ═══════════════════════════════════════ */}
            <div className="lg:hidden space-y-3">
              {filtered.map((user) => {
                const role = roleConfig[user.role] || roleConfig.student;
                const RoleIcon = role.icon;
                const isSelf = user.id === currentUserId;
                return (
                  <div key={user.id} className="p-3 border border-slate-200 rounded-lg bg-white">
                    {/* Top: Avatar + Name + Role */}
                    <div className="flex items-start gap-3 mb-3">
                      <UserAvatar user={user} size={48} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {user.full_name || "Unnamed"}
                          </p>
                          {isSelf && (
                            <Badge variant="brand" size="sm">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={role.color} size="sm" icon={RoleIcon}>
                            {role.label}
                          </Badge>
                          {user.preparation_level && (
                            <span className="text-xs text-slate-500">{user.preparation_level}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Info Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pb-3">
                      <div>
                        <span className="text-slate-400">📞 </span>
                        {user.phone || "—"}
                      </div>
                      <div>
                        <span className="text-slate-400">📍 </span>
                        {user.district || "—"}
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400">📅 Joined: </span>
                        {formatDate(user.created_at)}
                      </div>
                    </div>

                    {/* Bottom: Actions */}
                    <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={Pencil}
                        onClick={() => handleEdit(user)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={Trash2}
                        onClick={() => setDeletingUser(user)}
                        disabled={isSelf}
                        className={
                          isSelf
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-xs text-slate-500">
              মোট {filtered.length} জন ইউজার দেখানো হচ্ছে
            </div>
          </>
        )}
      </Card.Body>

      {/* ════════════════════════════════════════════ */}
      {/* Edit Modal — Key prop (Compiler-safe reset) */}
      {/* ════════════════════════════════════════════ */}
      {modalOpen && (
        <UserModal
          key={editingUser?.id || "new"}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingUser(null);
          }}
          editingUser={editingUser}
          currentUserId={currentUserId}
          onSuccess={handleSuccess}
        />
      )}

      {/* ════════════════════════════════════════════ */}
      {/* Delete Confirm Dialog                        */}
      {/* ════════════════════════════════════════════ */}
      <ConfirmDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        title="ইউজার ডিলিট করবেন?"
        description={
          deletingUser
            ? `"${truncate(deletingUser.full_name || "Unnamed", 50)}" — এই ইউজারের profile স্থায়ীভাবে মুছে যাবে! শেষ admin বা নিজেকে delete করা যাবে না।`
            : ""
        }
        confirmLabel="ডিলিট করুন"
        cancelLabel="বাতিল"
        variant="danger"
        loading={deleting}
      />
    </Card>
  );
}
