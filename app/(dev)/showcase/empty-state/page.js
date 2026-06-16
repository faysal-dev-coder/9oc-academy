"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/admin/shared/EmptyState";
import {
  Inbox,
  FolderOpen,
  BookOpen,
  Users,
  HelpCircle,
  Search,
  AlertCircle,
  CloudOff,
  CheckCircle2,
  Sparkles,
  Plus,
  RotateCcw,
  X,
  Bell,
  FileQuestion,
  Upload,
} from "lucide-react";

// ─────────────────────────────────────────────
//  SHOWCASE PAGE
// ─────────────────────────────────────────────
export default function EmptyStateShowcase() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ═══════════════════════════════════════════ */}
        {/*  HERO HEADER                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <Inbox size={28} />
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
              <h1 className="text-3xl font-bold text-slate-900">EmptyState</h1>
              <p className="text-slate-500 mt-1.5">
                Friendly placeholder for no-data scenarios with optional call-to-action.
              </p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  3 Variants
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  3 Sizes
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Flexible Action
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Icon Circle
                </span>
                <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  Composable
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 1: 3 Variants                      */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3 Variants</h2>
              <p className="text-sm text-slate-500">default, search, error — different contexts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Default */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                variant="default"
                icon={Inbox}
                title="No data yet"
                description="Get started by creating your first item."
              />
              <div className="px-4 pb-3">
                <Badge variant="brand" size="sm">
                  default
                </Badge>
              </div>
            </div>

            {/* Search */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                variant="search"
                icon={Search}
                title="No results found"
                description="Try adjusting your search terms."
              />
              <div className="px-4 pb-3">
                <Badge variant="default" size="sm">
                  search
                </Badge>
              </div>
            </div>

            {/* Error */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                variant="error"
                icon={AlertCircle}
                title="Something went wrong"
                description="Failed to load data. Please try again."
              />
              <div className="px-4 pb-3">
                <Badge variant="danger" size="sm">
                  error
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 2: 3 Sizes                         */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Inbox size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3 Sizes</h2>
              <p className="text-sm text-slate-500">sm, md, lg — fits any context</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* sm */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                size="sm"
                icon={Bell}
                title="No notifications"
                description="You're all caught up!"
              />
              <div className="px-4 pb-3 text-center">
                <Badge variant="default" size="sm">
                  size: sm
                </Badge>
              </div>
            </div>

            {/* md */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                size="md"
                icon={FolderOpen}
                title="No categories yet"
                description="Create your first category to start organizing your exams."
              />
              <div className="px-4 pb-3 text-center">
                <Badge variant="default" size="sm">
                  size: md (default)
                </Badge>
              </div>
            </div>

            {/* lg */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                size="lg"
                icon={FileQuestion}
                title="No questions added"
                description="Start building your question bank by adding your first question. You can import in bulk later."
              />
              <div className="px-4 pb-3 text-center">
                <Badge variant="default" size="sm">
                  size: lg
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 3: With Actions                    */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Action Buttons</h2>
              <p className="text-sm text-slate-500">
                action prop accepts any ReactNode — full flexibility
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single Action */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                icon={FolderOpen}
                title="No categories yet"
                description="Create your first category to organize exams."
                action={
                  <Button variant="primary" icon={Plus}>
                    Create Category
                  </Button>
                }
              />
            </div>

            {/* Multiple Actions */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                variant="search"
                icon={Search}
                title="No exams match"
                description="Try a different search or clear filters."
                action={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={X}>
                      Clear
                    </Button>
                    <Button variant="primary" size="sm">
                      Browse All
                    </Button>
                  </div>
                }
              />
            </div>

            {/* Error with retry — CloudOff icon (cleaner!) */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                variant="error"
                icon={CloudOff}
                title="Connection lost"
                description="Check your internet connection and try again."
                action={
                  <Button variant="primary" icon={RotateCcw}>
                    Retry
                  </Button>
                }
              />
            </div>

            {/* All caught up — no action */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg">
              <EmptyState
                icon={CheckCircle2}
                title="All caught up!"
                description="You have no pending notifications."
              />
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  SECTION 4: ⭐ Real World — 9OC Admin       */}
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
                How EmptyState will look in actual admin pages (inside Cards)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Categories Page — FIX: padding="none" + manual padding header */}
            <Card variant="default" padding="none">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FolderOpen size={16} className="text-brand-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Categories</span>
                </div>
              </div>
              <EmptyState
                icon={FolderOpen}
                title="No categories yet"
                description="Categories help organize exams by subject. Create your first one to get started."
                action={
                  <Button variant="primary" icon={Plus}>
                    Create Category
                  </Button>
                }
              />
            </Card>

            {/* Exams Page */}
            <Card variant="default" padding="none">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Exams</span>
                </div>
              </div>
              <EmptyState
                icon={BookOpen}
                title="No exams created"
                description="Build engaging MCQ exams for BCS, Bank Job, NTRCA, and Primary Teacher prep."
                action={
                  <Button variant="primary" icon={Plus}>
                    Create First Exam
                  </Button>
                }
              />
            </Card>

            {/* Users Page (search) */}
            <Card variant="default" padding="none">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-brand-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">
                    Users — Search Results
                  </span>
                </div>
              </div>
              <EmptyState
                variant="search"
                icon={Search}
                title='No users match "rahim"'
                description="Try a different name or check the spelling."
                action={
                  <Button variant="outline" size="sm" icon={X}>
                    Clear Search
                  </Button>
                }
              />
            </Card>

            {/* Questions Page */}
            <Card variant="default" padding="none">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <HelpCircle size={16} className="text-brand-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Question Bank</span>
                </div>
              </div>
              <EmptyState
                icon={FileQuestion}
                title="Question bank is empty"
                description="Add questions one by one or import in bulk from a CSV file."
                action={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" icon={Plus}>
                      Add Question
                    </Button>
                    <Button variant="primary" icon={Upload}>
                      Bulk Import
                    </Button>
                  </div>
                }
              />
            </Card>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════ */}
        {/*  PROPS TABLE                                */}
        {/* ═══════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center">
              <Inbox size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props Reference</h2>
              <p className="text-sm text-slate-500">All available props for EmptyState</p>
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
                  ["icon", "Component", "—", "Lucide icon component"],
                  ["title", "string", "—", "Heading text (English)"],
                  ["description", "string", "—", "Helper text below title"],
                  ["action", "ReactNode", "—", "Button(s) or any element"],
                  [
                    "variant",
                    '"default" | "search" | "error"',
                    '"default"',
                    "Icon background tint",
                  ],
                  ["size", '"sm" | "md" | "lg"', '"md"', "Component size"],
                  ["className", "string", '""', "Additional CSS classes"],
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
    </div>
  );
}
