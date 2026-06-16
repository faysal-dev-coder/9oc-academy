"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Square,
  Palette,
  Maximize2,
  Layers,
  GraduationCap,
  BarChart3,
  Image as ImageIcon,
  ClipboardList,
  Clock,
  FileText,
  Trophy,
  ArrowRight,
  BookOpen,
  Users,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function CardShowcasePage() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ╔══════════════════════════════════════════════╗
            ║  HERO HEADER                                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <Square size={28} />
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

              <h1 className="text-3xl font-bold text-slate-900">Card</h1>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Flexible container component with Header, Body, Footer sub-components। Clickable,
                link support, hover effects, এবং 4টা style variants।
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "4 Variants",
                  "4 Padding Sizes",
                  "5 Sub-components",
                  "Clickable",
                  "As Link",
                  "Hover Lift",
                  "Divider Support",
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
            ║  SECTION 1: VARIANTS                          ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Variants</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                4 visual styles — default, elevated, outlined, ghost
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default">
                <Card.Title>Default Card</Card.Title>
                <Card.Description>White bg, subtle border, soft shadow</Card.Description>
              </Card>
              <Card variant="elevated">
                <Card.Title>Elevated Card</Card.Title>
                <Card.Description>No border, stronger shadow — featured content</Card.Description>
              </Card>
              <Card variant="outlined">
                <Card.Title>Outlined Card</Card.Title>
                <Card.Description>Prominent border, no shadow — clean look</Card.Description>
              </Card>
              <Card variant="ghost">
                <Card.Title>Ghost Card</Card.Title>
                <Card.Description>
                  Transparent — for groupings inside colored areas
                </Card.Description>
              </Card>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 2: PADDING SIZES                     ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Maximize2 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Padding Sizes</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                4 padding sizes — none, sm (16px), md (24px default), lg (32px)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card padding="sm">
                <Card.Title>Small</Card.Title>
                <Card.Description>p-4 (16px)</Card.Description>
                <code className="text-xs text-slate-400 font-mono mt-2 inline-block">
                  padding=&quot;sm&quot;
                </code>
              </Card>
              <Card padding="md">
                <Card.Title>Medium</Card.Title>
                <Card.Description>p-6 (24px) — default</Card.Description>
                <code className="text-xs text-slate-400 font-mono mt-2 inline-block">
                  padding=&quot;md&quot;
                </code>
              </Card>
              <Card padding="lg">
                <Card.Title>Large</Card.Title>
                <Card.Description>p-8 (32px)</Card.Description>
                <code className="text-xs text-slate-400 font-mono mt-2 inline-block">
                  padding=&quot;lg&quot;
                </code>
              </Card>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 3: FULL STRUCTURE                    ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Full Structure</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Header + Body + Footer with dividers — all sub-components
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <Card variant="elevated">
              <Card.Header divider>
                <div className="flex items-start justify-between">
                  <div>
                    <Card.Title>BCS 45th Preliminary</Card.Title>
                    <Card.Description>সম্পূর্ণ প্রস্তুতির জন্য Premium Mock Test</Card.Description>
                  </div>
                  <Badge variant="brand" icon={Sparkles}>
                    Premium
                  </Badge>
                </div>
              </Card.Header>

              <Card.Body>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    <span className="text-sm">200 MCQs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm">120 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-slate-400" />
                    <span className="text-sm">200 marks</span>
                  </div>
                </div>
              </Card.Body>

              <Card.Footer divider>
                <Button icon={ArrowRight} iconPosition="right">
                  Start Exam
                </Button>
                <Button variant="ghost">Preview</Button>
              </Card.Footer>
            </Card>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 4: REAL USE — EXAM CARDS             ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real Use — Exam Cards</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                9OC Academy এ কীভাবে use হবে — Clickable, Link, Premium variants
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card 1 — Clickable */}
              <Card variant="default" onClick={() => alert("Exam card clicked!")}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="success" dot>
                    Published
                  </Badge>
                  <span className="text-xs text-slate-500">Free</span>
                </div>
                <Card.Title>BCS 45th Mock Test</Card.Title>
                <Card.Description className="mt-1">
                  Full-length practice exam with explanations
                </Card.Description>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <FileText size={12} /> 200 MCQs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> 120 min
                  </span>
                </div>
              </Card>

              {/* Card 2 — As Link */}
              <Card variant="default" href="#bank-job">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="success" dot>
                    Published
                  </Badge>
                  <Badge variant="brand" size="sm">
                    Popular
                  </Badge>
                </div>
                <Card.Title>Bank Job MCQ Set 12</Card.Title>
                <Card.Description className="mt-1">
                  Comprehensive practice for bank exams
                </Card.Description>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <FileText size={12} /> 100 MCQs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> 60 min
                  </span>
                </div>
              </Card>

              {/* Card 3 — Premium */}
              <Card variant="elevated" onClick={() => alert("Premium exam!")}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="brand" icon={Sparkles}>
                    Premium
                  </Badge>
                  <span className="text-xs font-medium text-brand-700">৳499</span>
                </div>
                <Card.Title>NTRCA Complete Course</Card.Title>
                <Card.Description className="mt-1">
                  30 mock tests + video solutions
                </Card.Description>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> 30 tests
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> 1.2k students
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 5: STATS / METRIC CARDS              ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <BarChart3 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Stats / Metric Cards</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Dashboard preview — number metrics with trend indicators
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    Total Exams
                  </span>
                  <FileText size={16} className="text-brand-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">142</div>
                <div className="text-xs text-emerald-600 mt-1">+12% from last month</div>
              </Card>

              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Students</span>
                  <Users size={16} className="text-brand-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">2,847</div>
                <div className="text-xs text-emerald-600 mt-1">+24% growth</div>
              </Card>

              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    Active Now
                  </span>
                  <Trophy size={16} className="text-brand-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">89</div>
                <div className="text-xs text-slate-500 mt-1">Taking exams</div>
              </Card>

              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    This Month
                  </span>
                  <Calendar size={16} className="text-brand-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">1,243</div>
                <div className="text-xs text-emerald-600 mt-1">Tests completed</div>
              </Card>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 6: NO PADDING — FULL BLEED           ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <ImageIcon size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Full Bleed Header</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                padding=&quot;none&quot; — custom layouts with gradient/image headers
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card padding="none" variant="default">
                <div className="bg-linear-to-br from-brand-700 to-brand-900 p-6 text-white">
                  <Sparkles size={24} className="mb-2" />
                  <h3 className="text-lg font-bold">Premium Membership</h3>
                  <p className="text-sm text-brand-100 mt-1">সব Premium feature unlock</p>
                </div>
                <div className="p-6">
                  <Card.Description>
                    মাত্র ৳499 মাসে সব mock test, video solution এবং expert support পান।
                  </Card.Description>
                  <Button className="mt-4" fullWidth>
                    Upgrade Now
                  </Button>
                </div>
              </Card>

              <Card padding="none" variant="elevated">
                <div className="bg-slate-900 p-6 text-white">
                  <Trophy size={24} className="mb-2 text-amber-400" />
                  <h3 className="text-lg font-bold">Top Performer</h3>
                  <p className="text-sm text-slate-300 mt-1">Last week&apos;s leaderboard</p>
                </div>
                <div className="p-6">
                  <Card.Description>
                    সবচেয়ে best performing students দেখুন। নিজের rank check করুন এবং improve করুন।
                  </Card.Description>
                  <Button variant="secondary" className="mt-4" fullWidth>
                    View Leaderboard
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 7: SUB-COMPONENTS REFERENCE          ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sub-components</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                5টা sub-components available — compose করে custom layouts বানাও
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">
                    Sub-component
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Props</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Card.Header", "Top section with optional divider", "divider, className"],
                  ["Card.Title", "Card heading (h3)", "className, children"],
                  ["Card.Description", "Subtitle / description text", "className, children"],
                  ["Card.Body", "Main content area", "className, children"],
                  ["Card.Footer", "Bottom section with actions", "divider, className"],
                ].map(([name, purpose, props]) => (
                  <tr key={name} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-mono text-brand-800 font-medium">{name}</td>
                    <td className="px-4 py-3 text-slate-600">{purpose}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{props}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 8: PROPS TABLE                       ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Props</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Card component এ যেসব props pass করা যায়
              </p>
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
                  ["variant", "default | elevated | outlined | ghost", "default", "Visual style"],
                  ["padding", "none | sm | md | lg", "md", "Internal padding"],
                  ["onClick", "function", "—", "Click handler (makes clickable)"],
                  ["href", "string", "—", "Link URL (renders as anchor)"],
                  ["className", "string", "—", "Extra Tailwind classes"],
                  ["children", "ReactNode", "—", "Card content"],
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
