"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Layers,
  Maximize2,
  ScrollText,
  Eye,
  ClipboardList,
  Sparkles,
  Trash2,
  FolderPlus,
  BookOpen,
  Database,
  AlertTriangle,
} from "lucide-react";

export default function ModalShowcasePage() {
  // ── Size Demo State ─────────────────────────────────────
  const [openSize, setOpenSize] = useState(null);

  // ── Real Examples State ─────────────────────────────────
  const [openDelete, setOpenDelete] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openExam, setOpenExam] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  // ── Advanced Demos State ────────────────────────────────
  const [openScroll, setOpenScroll] = useState(false);
  const [openNoBlur, setOpenNoBlur] = useState(false);
  const [openNoClose, setOpenNoClose] = useState(false);

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ╔══════════════════════════════════════════════╗
            ║  HERO HEADER                                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <Layers size={28} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="brand" size="sm">
                  UI Primitive
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">Modal</h1>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Portal-based modal dialog with focus trap, scroll lock, ESC close, and smooth
                animations. Forms, confirmations, এবং details show করার জন্য।
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "4 Sizes",
                  "Focus Trap",
                  "Scroll Lock",
                  "ESC Close",
                  "Backdrop Blur",
                  "Sub-components",
                ].map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 1: REAL WORLD EXAMPLES (BEST!)      ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real World Examples</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                9OC Academy এর actual use cases — Click করে নিজেই দেখো কোন size কীসের জন্য
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Example 1: Delete (SM) */}
              <button
                type="button"
                onClick={() => setOpenDelete(true)}
                className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-red-300 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                    <Trash2 size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Delete Exam</h3>
                      <Badge variant="danger" size="sm">
                        SM
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Quick confirmation dialog — Yes/No decision
                    </p>
                  </div>
                </div>
              </button>

              {/* Example 2: Create Category (MD) */}
              <button
                type="button"
                onClick={() => setOpenCategory(true)}
                className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-brand-300 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
                    <FolderPlus size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Create Category</h3>
                      <Badge variant="brand" size="sm">
                        MD
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">Simple form — Name, slug, description</p>
                  </div>
                </div>
              </button>

              {/* Example 3: Create Exam (LG) */}
              <button
                type="button"
                onClick={() => setOpenExam(true)}
                className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Create Exam</h3>
                      <Badge variant="success" size="sm">
                        LG
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Complex form — Multiple fields, 2-column layout
                    </p>
                  </div>
                </div>
              </button>

              {/* Example 4: Question Bank (XL) */}
              <button
                type="button"
                onClick={() => setOpenBank(true)}
                className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-amber-300 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Database size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Question Bank</h3>
                      <Badge variant="warning" size="sm">
                        XL
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Data table — Search, filter, bulk select
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ─── Real Example Modals ─── */}

          {/* Delete (SM) */}
          <Modal isOpen={openDelete} onClose={() => setOpenDelete(false)} size="sm">
            <Modal.Header title="Delete Exam?" />
            <Modal.Body>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="text-slate-700 font-medium">BCS Preliminary Mock Test 2024</p>
                  <p className="text-sm text-slate-500 mt-1">
                    এই exam delete করলে সব data মুছে যাবে। এই action undo করা যাবে না।
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenDelete(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpenDelete(false)}>
                Delete Exam
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Create Category (MD) */}
          <Modal isOpen={openCategory} onClose={() => setOpenCategory(false)} size="md">
            <Modal.Header title="Create New Category" />
            <Modal.Body>
              <div className="space-y-4">
                <Input
                  label="Category Name"
                  placeholder="e.g. Bangladesh Affairs"
                  helperText="ইংরেজিতে category name দিন"
                  required
                />
                <Input
                  label="Slug"
                  placeholder="e.g. bangladesh-affairs"
                  helperText="URL এ use হবে"
                />
                <Input label="Description" placeholder="Short description..." />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenCategory(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpenCategory(false)}>
                Create Category
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Create Exam (LG) */}
          <Modal isOpen={openExam} onClose={() => setOpenExam(false)} size="lg">
            <Modal.Header title="Create New Exam" />
            <Modal.Body>
              <div className="space-y-4">
                <Input label="Exam Title" placeholder="e.g. BCS Preliminary Mock Test" required />

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Category" placeholder="Select category" />
                  <Input label="Subject" placeholder="Select subject" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Input label="Duration (min)" placeholder="60" type="number" />
                  <Input label="Total Marks" placeholder="100" type="number" />
                  <Input label="Pass Marks" placeholder="40" type="number" />
                </div>

                <Input
                  label="Instructions"
                  placeholder="Special instructions for students..."
                  helperText="শিক্ষার্থীদের জন্য বিশেষ নির্দেশনা"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenExam(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpenExam(false)}>
                Create Exam
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Question Bank (XL) */}
          <Modal isOpen={openBank} onClose={() => setOpenBank(false)} size="xl">
            <Modal.Header title="Select Questions from Bank" />
            <Modal.Body>
              <div className="space-y-4">
                <Input variant="search" placeholder="Search questions..." />

                <div className="flex flex-wrap gap-2">
                  <Badge variant="brand" size="sm">
                    All (1,247)
                  </Badge>
                  <Badge variant="default" size="sm">
                    Bangla (342)
                  </Badge>
                  <Badge variant="default" size="sm">
                    English (298)
                  </Badge>
                  <Badge variant="default" size="sm">
                    Math (412)
                  </Badge>
                  <Badge variant="default" size="sm">
                    GK (195)
                  </Badge>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-slate-700 w-12">
                          <input type="checkbox" className="rounded" />
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-700">
                          Question
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-700">
                          Subject
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-700">
                          Difficulty
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { q: "বাংলাদেশের রাজধানীর নাম কী?", s: "Bangla", d: "Easy", c: "success" },
                        {
                          q: "What is the capital of Bangladesh?",
                          s: "English",
                          d: "Easy",
                          c: "success",
                        },
                        {
                          q: "মুক্তিযুদ্ধ কত সালে হয়েছিল?",
                          s: "History",
                          d: "Medium",
                          c: "warning",
                        },
                        {
                          q: "সংবিধানের প্রস্তাবনায় কয়টি অনুচ্ছেদ আছে?",
                          s: "Civics",
                          d: "Hard",
                          c: "danger",
                        },
                        { q: "২+২×২ = ?", s: "Math", d: "Easy", c: "success" },
                        {
                          q: "ভাষা আন্দোলন কত সালে হয়েছিল?",
                          s: "History",
                          d: "Medium",
                          c: "warning",
                        },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="px-4 py-3 text-slate-700">{row.q}</td>
                          <td className="px-4 py-3 text-slate-500">{row.s}</td>
                          <td className="px-4 py-3">
                            <Badge variant={row.c} size="sm">
                              {row.d}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-sm text-slate-500">
                  Selected: <strong className="text-brand-700">0</strong> questions
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenBank(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpenBank(false)}>
                Add Selected Questions
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 2: SIZES (Visual Width Bars)         ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Maximize2 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sizes</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                4 sizes for different use cases — relative width comparison
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-3">
              {[
                {
                  size: "sm",
                  width: 384,
                  percent: 43,
                  label: "Small",
                  useCase: "Confirmation dialogs, alerts",
                },
                {
                  size: "md",
                  width: 512,
                  percent: 57,
                  label: "Medium",
                  useCase: "Forms, settings (Default)",
                },
                {
                  size: "lg",
                  width: 672,
                  percent: 75,
                  label: "Large",
                  useCase: "Complex forms, multi-step wizards",
                },
                {
                  size: "xl",
                  width: 896,
                  percent: 100,
                  label: "Extra Large",
                  useCase: "Data tables, image galleries",
                },
              ].map(({ size, width, percent, label, useCase }) => (
                <div
                  key={size}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:border-brand-300 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 shrink-0">
                      <code className="text-sm font-mono font-semibold text-brand-700">{size}</code>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{label}</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-500">{useCase}</span>
                        </div>
                        <span className="text-sm font-mono text-slate-600 shrink-0">{width}px</span>
                      </div>

                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-600 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenSize(size)}
                      icon={Eye}
                      iconPosition="right"
                    >
                      Try
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Modal isOpen={!!openSize} onClose={() => setOpenSize(null)} size={openSize || "md"}>
            <Modal.Header title={`Modal — Size: ${(openSize || "md").toUpperCase()}`} />
            <Modal.Body>
              <p className="text-slate-600">
                এটা <strong>{(openSize || "md").toUpperCase()}</strong> size এর modal।
              </p>
              <p className="mt-3 text-slate-500 text-sm">
                ESC চাপো অথবা backdrop এ click করো বন্ধ করতে।
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenSize(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpenSize(null)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 3: SCROLLABLE BODY                   ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <ScrollText size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Scrollable Body</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Long content — Header/Footer fixed থাকে, Body scroll হয়
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <Button variant="outline" onClick={() => setOpenScroll(true)}>
              Open Scrollable Modal
            </Button>
          </div>

          <Modal isOpen={openScroll} onClose={() => setOpenScroll(false)} size="md">
            <Modal.Header title="Terms & Conditions" />
            <Modal.Body>
              <div className="space-y-4 text-sm text-slate-600">
                {Array.from({ length: 12 }, (_, i) => (
                  <p key={i}>
                    <strong>ধারা {i + 1}:</strong> Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpenScroll(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => setOpenScroll(false)}>
                Accept All
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 4: BACKDROP OPTIONS                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Eye size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Backdrop Options</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Blur (default), dark, এবং backdrop click control
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap items-end gap-6">
              <div className="flex flex-col items-center gap-2">
                <Button variant="outline" onClick={() => setOpenNoBlur(true)}>
                  Dark Backdrop
                </Button>
                <span className="text-xs text-slate-400 font-mono">backdropBlur=false</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="outline" onClick={() => setOpenNoClose(true)}>
                  No Backdrop Close
                </Button>
                <span className="text-xs text-slate-400 font-mono">closeOnBackdrop=false</span>
              </div>
            </div>
          </div>

          <Modal isOpen={openNoBlur} onClose={() => setOpenNoBlur(false)} backdropBlur={false}>
            <Modal.Header title="Dark Backdrop" />
            <Modal.Body>
              <p className="text-slate-600">এই modal এ backdrop blur নেই।</p>
              <p className="mt-2 text-slate-500 text-sm">Plain dark overlay দেখাচ্ছে।</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setOpenNoBlur(false)}>
                Got it
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal isOpen={openNoClose} onClose={() => setOpenNoClose(false)} closeOnBackdrop={false}>
            <Modal.Header title="Backdrop Click Disabled" />
            <Modal.Body>
              <p className="text-slate-600">Backdrop click করলে close হবে না।</p>
              <p className="mt-2 text-slate-500 text-sm">X button অথবা ESC চাপো।</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setOpenNoClose(false)}>
                Close with Button
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 5: PROPS TABLE                       ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props</h2>
              <p className="text-sm text-slate-500 mt-0.5">Component এ যেসব props pass করা যায়</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Prop</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["isOpen", "boolean", "—", "Modal open/close control"],
                  ["onClose", "function", "—", "Close handler (required)"],
                  ["size", "sm | md | lg | xl", "md", "Modal width"],
                  ["closeOnBackdrop", "boolean", "true", "Backdrop click এ close"],
                  ["backdropBlur", "boolean", "true", "Backdrop blur effect"],
                  ["className", "string", "—", "Extra classes for panel"],
                  ["children", "ReactNode", "—", "Modal.Header / Body / Footer"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-mono text-brand-800 font-medium">{prop}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{type}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{def}</td>
                    <td className="px-4 py-3 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
