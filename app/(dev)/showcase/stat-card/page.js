// app/(dev)/showcase/stat-card/page.js
// ═══════════════════════════════════════════════════════════════
// 📊 StatCard Showcase — Premium Pattern (Chat 38 LOCKED)
// ⭐ Hero + Section Cards + Real World + Props Table
// ═══════════════════════════════════════════════════════════════

"use client";

import StatCard from "@/components/admin/shared/StatCard";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CircleAlert,
  CreditCard,
  FileQuestion,
  LayoutGrid,
  Minus,
  MousePointerClick,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

export default function StatCardShowcase() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ═══════════════════════════════════════════════ */}
        {/* HERO HEADER                                    */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
              <LayoutGrid className="w-7 h-7 text-brand-800" />
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

              <h1 className="text-3xl font-bold text-slate-900 mb-2">StatCard</h1>
              <p className="text-slate-600 leading-relaxed">
                Dashboard metric card with icon, big value, trend indicator, and subtitle. Premium
                Stripe/Vercel style. Built on top of Card.jsx wrapper.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  4 variants
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  3 trends
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Clickable
                </span>
                <span className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-200">
                  Uses Card.jsx
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 1: VARIANTS                            */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Variants</h2>
              <p className="text-sm text-slate-500">4 color themes for different metric contexts</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Default" value="1,284" icon={Users} variant="default" />
              <StatCard title="Success" value="892" icon={ShieldCheck} variant="success" />
              <StatCard title="Warning" value="48" icon={FileQuestion} variant="warning" />
              <StatCard title="Danger" value="12" icon={CircleAlert} variant="danger" />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Use <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">variant</code>{" "}
            prop to set icon box color theme.
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 2: TREND INDICATORS                    */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Trend Indicators</h2>
              <p className="text-sm text-slate-500">
                Show metric movement with colored pills (up/down/neutral)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title="Revenue"
                value="৳45,200"
                icon={CreditCard}
                variant="default"
                trend="up"
                change="+12.5%"
                subtitle="vs last month"
              />
              <StatCard
                title="Refunds"
                value="৳2,100"
                icon={ArrowDownRight}
                variant="default"
                trend="down"
                change="-3.2%"
                subtitle="vs last month"
              />
              <StatCard
                title="Pending"
                value="৳8,400"
                icon={Minus}
                variant="default"
                trend="neutral"
                change="0.0%"
                subtitle="No change"
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Combine <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">trend</code> +{" "}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">change</code> for
            movement display.
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 3: WITHOUT TREND                       */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Static Stats</h2>
              <p className="text-sm text-slate-500">
                Without trend pill — for absolute counts or static metrics
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                title="Total Courses"
                value="156"
                icon={BookOpen}
                variant="default"
                subtitle="All published"
              />
              <StatCard
                title="Question Bank"
                value="12,840"
                icon={FileQuestion}
                variant="success"
                subtitle="MCQs available"
              />
              <StatCard
                title="Categories"
                value="24"
                icon={LayoutGrid}
                variant="warning"
                subtitle="Active categories"
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Skip <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">change</code>{" "}
            prop to hide trend pill.
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 4: INTERACTIVE                         */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Interactive (Clickable)</h2>
              <p className="text-sm text-slate-500">
                Pass href or onClick to make StatCard navigable
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                title="With Link"
                value="892"
                icon={Users}
                variant="default"
                trend="up"
                change="+5.2%"
                subtitle="Click to view users"
                href="/showcase"
              />
              <StatCard
                title="With onClick"
                value="48"
                icon={CircleAlert}
                variant="warning"
                trend="down"
                change="-2.1%"
                subtitle="Click to alert"
                onClick={() => alert("StatCard clicked!")}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Hover দেখো — premium lift effect with shadow!
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 5: ⭐ REAL WORLD — 9OC DASHBOARD       */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real World — 9OC Admin Dashboard</h2>
              <p className="text-sm text-slate-500">
                Actual use case: Admin panel এ overview metrics
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            {/* Dashboard Header Mock */}
            <div className="mb-5 pb-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Dashboard Overview</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Last 30 days performance</p>
                </div>
                <Badge variant="success" size="sm" dot>
                  Live
                </Badge>
              </div>
            </div>

            {/* StatCard Grid — Real World */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Students"
                value="85,420"
                icon={Users}
                variant="default"
                trend="up"
                change="+12.5%"
                subtitle="vs last month"
              />
              <StatCard
                title="Published Exams"
                value="1,280"
                icon={BookOpen}
                variant="success"
                trend="up"
                change="+8.2%"
                subtitle="New exams added"
              />
              <StatCard
                title="Pending Reviews"
                value="48"
                icon={FileQuestion}
                variant="warning"
                trend="neutral"
                change="0.0%"
                subtitle="Needs moderation"
              />
              <StatCard
                title="Failed Payments"
                value="12"
                icon={CircleAlert}
                variant="danger"
                trend="down"
                change="-3.1%"
                subtitle="vs last week"
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            🎯 এটাই হবে real 9OC Admin Dashboard এর top stats section!
          </p>
        </Card>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 6: PROPS TABLE                         */}
        {/* ═══════════════════════════════════════════════ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
              <FileQuestion className="w-5 h-5 text-brand-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props Reference</h2>
              <p className="text-sm text-slate-500">All available props for StatCard</p>
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
                    &quot;Untitled Metric&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Metric label/name</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">value</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string | number</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">&quot;0&quot;</td>
                  <td className="px-4 py-3 text-slate-600">Big metric value to display</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">icon</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                    Component | Element
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">BarChart3</td>
                  <td className="px-4 py-3 text-slate-600">Lucide icon</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">variant</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                    &quot;default&quot; | &quot;success&quot; | &quot;warning&quot; |
                    &quot;danger&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    &quot;default&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Icon box color theme</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">trend</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                    &quot;up&quot; | &quot;down&quot; | &quot;neutral&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    &quot;neutral&quot;
                  </td>
                  <td className="px-4 py-3 text-slate-600">Trend direction</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">change</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">
                    Change value (e.g. &quot;+12.5%&quot;). Hides pill if empty.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">subtitle</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">
                    Helper text (e.g. &quot;vs last month&quot;)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">href</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">Makes card a Link</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-brand-700 font-semibold">onClick</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">function</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">undefined</td>
                  <td className="px-4 py-3 text-slate-600">Makes card clickable</td>
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
