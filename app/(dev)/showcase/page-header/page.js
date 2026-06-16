// app/(dev)/showcase/page-header/page.js
// ═══════════════════════════════════════════════════════════════
// 📰 PageHeader Showcase — Premium Pattern (Chat 38 LOCKED)
// ⭐ Hero + Sections + Real World + Props Table
// ═══════════════════════════════════════════════════════════════

"use client";

import PageHeader from "@/components/admin/shared/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Activity,
  Briefcase,
  Download,
  FileQuestion,
  FileText,
  FormInput,
  Layers,
  Pencil,
  Plus,
  Settings,
  Tag,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

export default function PageHeaderShowcase() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ═══════════════════════════════════════════════ */}
        {/* HERO HEADER                                    */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
              <FormInput className="w-7 h-7 text-brand-800" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  Admin Shared
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-2">PageHeader</h1>
              <p className="text-slate-600 leading-relaxed">
                Page title bar with breadcrumbs, badge, description and action buttons.
                Linear/Notion inspired clean design. Responsive (stacks on mobile).
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Breadcrumbs
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Badge support
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Custom actions
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Mobile responsive
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 1: BASIC                               */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Basic Usage</h2>
              <p className="text-sm text-slate-500">
                Just title and description — the simplest form
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <PageHeader
              title="Categories"
              description="Manage all exam categories from this page"
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Minimum props:{" "}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">title</code> +{" "}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">description</code>
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 2: WITH BADGE                          */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Badge</h2>
              <p className="text-sm text-slate-500">
                Add status badges beside the title (count, status, mode)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-6">
            <PageHeader
              title="Exams"
              description="All exams and quizzes"
              badge={{ label: "24 items", variant: "default", appearance: "soft" }}
            />

            <PageHeader
              title="Question Bank"
              description="All MCQ questions in the system"
              badge={{
                label: "Active",
                variant: "success",
                appearance: "soft",
                dot: true,
              }}
            />

            <PageHeader
              title="Edit Exam"
              description="Update exam details and settings"
              badge={{ label: "Draft", variant: "warning", appearance: "soft" }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Badge prop accepts:{" "}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{`{ label, variant, appearance, dot, icon }`}</code>
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 3: WITH ACTIONS                        */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Actions</h2>
              <p className="text-sm text-slate-500">Right side action buttons (any ReactNode)</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-6">
            <PageHeader
              title="Categories"
              description="Manage exam categories"
              actions={
                <Button variant="primary" icon={Plus}>
                  Create Category
                </Button>
              }
            />

            <PageHeader
              title="Exams"
              description="All exams and quizzes"
              actions={
                <>
                  <Button variant="outline" icon={Download}>
                    Export
                  </Button>
                  <Button variant="primary" icon={Plus}>
                    Create Exam
                  </Button>
                </>
              }
            />

            <PageHeader
              title="Question Bank"
              description="All MCQ questions"
              actions={
                <>
                  <Button variant="ghost" icon={Settings} iconOnly aria-label="Settings" />
                  <Button variant="outline" icon={Upload}>
                    Bulk Upload
                  </Button>
                  <Button variant="primary" icon={Plus}>
                    Add Question
                  </Button>
                </>
              }
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Pass any{" "}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">actions</code> as
            ReactNode — buttons, links, dropdowns, etc.
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 4: WITH BREADCRUMBS                    */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Breadcrumbs</h2>
              <p className="text-sm text-slate-500">
                Show page hierarchy with clickable navigation
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-6">
            <PageHeader
              breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Categories" }]}
              title="Categories"
              description="Manage all exam categories"
            />

            <PageHeader
              breadcrumbs={[
                { label: "Admin", href: "/admin" },
                { label: "Exams", href: "/admin/exams" },
                { label: "Edit Exam" },
              ]}
              title="Edit Exam"
              description="Update exam details"
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Last item = current page (not a link, bolder text)
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 5: FULL FEATURED                       */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Full Featured</h2>
              <p className="text-sm text-slate-500">
                Everything together: breadcrumbs + badge + actions
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <PageHeader
              breadcrumbs={[
                { label: "Admin", href: "/admin" },
                { label: "Exams", href: "/admin/exams" },
                { label: "Edit Exam" },
              ]}
              title="Edit Exam"
              description="Update exam details and settings"
              badge={{ label: "Draft", variant: "warning", appearance: "soft" }}
              actions={
                <>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="primary" icon={Pencil}>
                    Save Changes
                  </Button>
                </>
              }
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 This is the most common pattern for edit pages.
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 6: ⭐ REAL WORLD — 9OC ADMIN PAGES     */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real World — 9OC Admin Pages</h2>
              <p className="text-sm text-slate-500">Actual use cases for 9OC admin panel pages</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* ─── Example 1: Categories ─── */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  /admin/categories
                </Badge>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <PageHeader
                  title="Categories"
                  description="Manage exam categories like BCS, Bank Job, NTRCA"
                  badge={{ label: "24 items", variant: "default", appearance: "soft" }}
                  actions={
                    <Button variant="primary" icon={Plus}>
                      Create Category
                    </Button>
                  }
                />
              </div>
            </div>

            {/* ─── Example 2: Exams ─── */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  /admin/exams
                </Badge>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <PageHeader
                  title="Exams"
                  description="All published and draft exams"
                  badge={{
                    label: "12 published",
                    variant: "success",
                    appearance: "soft",
                    dot: true,
                  }}
                  actions={
                    <>
                      <Button variant="outline" icon={Download}>
                        Export
                      </Button>
                      <Button variant="primary" icon={Plus}>
                        Create Exam
                      </Button>
                    </>
                  }
                />
              </div>
            </div>

            {/* ─── Example 3: Question Bank ─── */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  /admin/questions
                </Badge>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <PageHeader
                  title="Question Bank"
                  description="All MCQ questions in the system"
                  badge={{ label: "1,284 questions", variant: "default", appearance: "soft" }}
                  actions={
                    <>
                      <Button variant="outline" icon={Upload}>
                        Bulk Upload
                      </Button>
                      <Button variant="primary" icon={Plus}>
                        Add Question
                      </Button>
                    </>
                  }
                />
              </div>
            </div>

            {/* ─── Example 4: Users ─── */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  /admin/users
                </Badge>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <PageHeader
                  breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Users" }]}
                  title="Users"
                  description="Manage student and admin accounts"
                  badge={{
                    label: "892 active",
                    variant: "success",
                    appearance: "soft",
                    dot: true,
                  }}
                  actions={
                    <>
                      <Button variant="outline" icon={Download}>
                        Export CSV
                      </Button>
                      <Button variant="primary" icon={UserPlus}>
                        Invite User
                      </Button>
                    </>
                  }
                />
              </div>
            </div>

            {/* ─── Example 5: Edit Exam (deep page) ─── */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="brand" size="sm">
                  /admin/exams/edit/123
                </Badge>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <PageHeader
                  breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Exams", href: "/admin/exams" },
                    { label: "Edit Exam" },
                  ]}
                  title="BCS Preliminary Mock Test 2024"
                  description="Update exam questions, settings and publish status"
                  badge={{ label: "Draft", variant: "warning", appearance: "soft" }}
                  actions={
                    <>
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="primary" icon={Pencil}>
                        Save Changes
                      </Button>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            🎯 এগুলোই হবে real 9OC Admin pages এর top section!
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 7: PROPS TABLE                         */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <FileQuestion className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props Reference</h2>
              <p className="text-sm text-slate-500">All available props for PageHeader</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Prop</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">title</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    &quot;Untitled Page&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Main page title (h1)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">description</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">Helper text below title</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">breadcrumbs</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                    Array&lt;{`{label, href?}`}&gt;
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">
                    Navigation hierarchy. Last item is current page.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">badge</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                    {`{label, variant, appearance, dot, icon}`}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">Status badge beside title</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">actions</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">ReactNode</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">Right side buttons or any elements</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">className</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">&quot;&quot;</td>
                  <td className="px-4 py-3 text-slate-600">Custom Tailwind classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
