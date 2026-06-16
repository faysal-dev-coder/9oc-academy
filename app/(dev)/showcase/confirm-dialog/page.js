"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import {
  AlertCircle,
  Trash2,
  LogOut,
  Send,
  Archive,
  Sparkles,
  ShieldAlert,
  Upload,
  RefreshCw,
  XCircle,
} from "lucide-react";

// ─────────────────────────────────────────────
//  SHOWCASE PAGE
// ─────────────────────────────────────────────
export default function ConfirmDialogShowcase() {
  // ── States for each demo ──
  const [danger, setDanger] = useState(false);
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);

  // Loading demo
  const [loading1, setLoading1] = useState(false);
  const [loadingOpen1, setLoadingOpen1] = useState(false);

  // Real World states
  const [rwDelete, setRwDelete] = useState(false);
  const [rwDeleteLoading, setRwDeleteLoading] = useState(false);

  const [rwArchive, setRwArchive] = useState(false);
  const [rwSubmit, setRwSubmit] = useState(false);
  const [rwLogout, setRwLogout] = useState(false);
  const [rwPublish, setRwPublish] = useState(false);

  // ── Loading simulator ──
  const simulateLoading = (setLoading, closeFn) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeFn(false);
    }, 1800);
  };

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ═══════════════════════════════════════════ */}
        {/*  HERO HEADER                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  Layer 2
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">ConfirmDialog</h1>
              <p className="text-slate-500 mt-1.5">
                Confirmation dialog for destructive or important actions — built on Modal.
              </p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Uses Modal
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Uses Button
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  4 Variants
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Loading State
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Smart Defaults
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 1: 4 Variants                      */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">4 Variants</h2>
              <p className="text-sm text-slate-500">
                danger, warning, info, success — each with smart defaults
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Danger */}
            <Button variant="danger" onClick={() => setDanger(true)}>
              Danger
            </Button>
            <ConfirmDialog
              isOpen={danger}
              onClose={() => setDanger(false)}
              variant="danger"
              title="Delete item?"
              description="This action cannot be undone."
              onConfirm={() => setDanger(false)}
            />

            {/* Warning */}
            <Button variant="warning" onClick={() => setWarning(true)}>
              Warning
            </Button>
            <ConfirmDialog
              isOpen={warning}
              onClose={() => setWarning(false)}
              variant="warning"
              title="Discard changes?"
              description="Your unsaved changes will be lost."
              onConfirm={() => setWarning(false)}
            />

            {/* Info */}
            <Button variant="primary" onClick={() => setInfo(true)}>
              Info
            </Button>
            <ConfirmDialog
              isOpen={info}
              onClose={() => setInfo(false)}
              variant="info"
              title="Continue with this action?"
              description="Please confirm to proceed."
              onConfirm={() => setInfo(false)}
            />

            {/* Success */}
            <Button variant="success" onClick={() => setSuccess(true)}>
              Success
            </Button>
            <ConfirmDialog
              isOpen={success}
              onClose={() => setSuccess(false)}
              variant="success"
              title="Action completed"
              description="Your changes have been saved successfully."
              onConfirm={() => setSuccess(false)}
            />
          </div>

          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600">
              <strong>Smart defaults:</strong> danger → red &quot;Delete&quot; button | warning →
              primary &quot;Continue&quot; | info → primary &quot;Confirm&quot; | success → primary
              &quot;OK&quot;
            </p>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 2: Loading State                   */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <RefreshCw size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Loading State</h2>
              <p className="text-sm text-slate-500">
                Confirm button shows spinner • Cancel/backdrop disabled while loading
              </p>
            </div>
          </div>

          <Button variant="danger" icon={Trash2} onClick={() => setLoadingOpen1(true)}>
            Delete with Loading
          </Button>
          <ConfirmDialog
            isOpen={loadingOpen1}
            onClose={() => setLoadingOpen1(false)}
            variant="danger"
            title="Delete account?"
            description="Your account and all related data will be permanently removed. This action cannot be undone."
            confirmLabel="Delete Forever"
            loading={loading1}
            onConfirm={() => simulateLoading(setLoading1, setLoadingOpen1)}
          />

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800">
              <strong>Try it:</strong> Click button → click &quot;Delete Forever&quot; → notice
              spinner, disabled Cancel, and backdrop blocked for 1.8s.
            </p>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 3: ⭐ Real World — 9OC Scenarios   */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                ⭐ Real World — 9OC Admin Scenarios
              </h2>
              <p className="text-sm text-slate-500">
                Actual confirmation dialogs that will appear in 9OC Academy
              </p>
            </div>
          </div>

          {/* Trigger Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Delete Category — DANGER 🔴 */}
            <Button variant="danger" icon={Trash2} onClick={() => setRwDelete(true)}>
              Delete Category
            </Button>

            {/* Archive Exam — WARNING 🟡 */}
            <Button variant="warning" icon={Archive} onClick={() => setRwArchive(true)}>
              Archive Exam
            </Button>

            {/* Submit Exam (Student) — SUCCESS 🟢 */}
            <Button variant="success" icon={Send} onClick={() => setRwSubmit(true)}>
              Submit Exam
            </Button>

            {/* Logout — DANGER 🔴 */}
            <Button variant="danger" icon={LogOut} onClick={() => setRwLogout(true)}>
              Logout
            </Button>

            {/* Publish Exam — SUCCESS 🟢 */}
            <Button variant="success" icon={Upload} onClick={() => setRwPublish(true)}>
              Publish Exam
            </Button>
          </div>

          {/* ── All ConfirmDialogs (rendered in Portal — outside grid) ── */}
          <ConfirmDialog
            isOpen={rwDelete}
            onClose={() => setRwDelete(false)}
            variant="danger"
            title="Delete this category?"
            description='"BCS Preliminary" will be permanently deleted along with 48 exams inside it. This action cannot be undone.'
            confirmLabel="Yes, Delete"
            loading={rwDeleteLoading}
            onConfirm={() => simulateLoading(setRwDeleteLoading, setRwDelete)}
          />

          <ConfirmDialog
            isOpen={rwArchive}
            onClose={() => setRwArchive(false)}
            variant="warning"
            title="Archive this exam?"
            description="Students will no longer see this exam, but past results will remain. You can unarchive it later."
            confirmLabel="Archive"
            onConfirm={() => setRwArchive(false)}
          />

          <ConfirmDialog
            isOpen={rwSubmit}
            onClose={() => setRwSubmit(false)}
            variant="success"
            title="Submit your answers?"
            description="You have answered 45 of 50 questions. Are you sure you want to submit?"
            confirmLabel="Yes, Submit"
            onConfirm={() => setRwSubmit(false)}
          />

          <ConfirmDialog
            isOpen={rwLogout}
            onClose={() => setRwLogout(false)}
            variant="danger"
            icon={LogOut}
            title="Log out of your account?"
            description="You'll need to sign in again to access the admin dashboard."
            confirmLabel="Log Out"
            onConfirm={() => setRwLogout(false)}
          />

          <ConfirmDialog
            isOpen={rwPublish}
            onClose={() => setRwPublish(false)}
            variant="success"
            title="Publish this exam?"
            description="The exam will become visible to all enrolled students immediately."
            confirmLabel="Publish Now"
            onConfirm={() => setRwPublish(false)}
          />
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 4: Custom Icon Override            */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Custom Icon Override</h2>
              <p className="text-sm text-slate-500">
                Pass your own icon to match the context (overrides variant default)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-sm text-slate-600 mb-4">
              Real World &quot;Logout&quot; example above uses{" "}
              <code className="text-xs font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-brand-700">
                icon={"{LogOut}"}
              </code>{" "}
              instead of the warning variant default (AlertCircle).
            </p>
            <Button variant="ghost" icon={LogOut} onClick={() => setRwLogout(true)}>
              See &quot;Logout&quot; example
            </Button>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  PROPS TABLE                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props Reference</h2>
              <p className="text-sm text-slate-500">All available props for ConfirmDialog</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Default</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["isOpen", "boolean", "false", "Controls dialog visibility"],
                  ["onClose", "() => void", "—", "Called when dialog should close"],
                  ["title", "string", "—", "Dialog heading"],
                  ["description", "string", "—", "Helper text below title"],
                  ["icon", "Component", "auto", "Override the variant default icon"],
                  [
                    "variant",
                    '"danger" | "warning" | "info" | "success"',
                    '"danger"',
                    "Visual style and smart defaults",
                  ],
                  [
                    "confirmLabel",
                    "string",
                    "auto",
                    "Confirm button text (variant default if empty)",
                  ],
                  ["cancelLabel", "string", '"Cancel"', "Cancel button text"],
                  ["onConfirm", "() => void", "—", "Called when confirm clicked"],
                  ["loading", "boolean", "false", "Show spinner, block close actions"],
                  ["size", '"sm" | "md" | "lg" | "xl"', '"sm"', "Modal size"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="py-3 px-4">
                      <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-brand-700">
                        {prop}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">{type}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">{def}</td>
                    <td className="py-3 px-4 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Suppress unused warning for XCircle (kept for future use) */}
      <span className="hidden">
        <XCircle />
      </span>
    </div>
  );
}
