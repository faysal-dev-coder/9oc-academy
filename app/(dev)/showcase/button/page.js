"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  MousePointerClick,
  Plus,
  ArrowRight,
  Trash2,
  Eye,
  Download,
  Search,
  Palette,
  Maximize2,
  Sparkles,
  MoveRight,
  Square,
  Activity,
  Layers,
} from "lucide-react";

export default function ButtonShowcasePage() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ╔══════════════════════════════════════════════╗
            ║  HERO HEADER                                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-5">
            {/* Icon Box */}
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <MousePointerClick size={28} />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Status Badges */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="brand" size="sm">
                  UI Primitive
                </Badge>
                <Badge variant="success" size="sm" dot>
                  Ready
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-slate-900">Button</h1>

              {/* Description */}
              <p className="text-slate-500 mt-2 leading-relaxed">
                Versatile button component with multiple variants, sizes, icons, and loading states.
                বিভিন্ন action এর জন্য designed।
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "5 Variants",
                  "3 Sizes",
                  "Icon Support",
                  "Loading State",
                  "Full Width",
                  "Disabled State",
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
          {/* Section Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Variants</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                5 different visual styles — primary, secondary, ghost, danger, outline
              </p>
            </div>
          </div>

          {/* Preview Area */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 2: SIZES                             ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Maximize2 size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sizes</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                3 sizes — sm (32px), md (40px default), lg (48px)
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 3: ICON LEFT (DEFAULT)               ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Icon Left</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Default position — icon প্রপ pass করলে left এ আসে
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap gap-3">
              <Button icon={Plus}>Create Exam</Button>
              <Button variant="secondary" icon={Eye}>
                View Details
              </Button>
              <Button variant="danger" icon={Trash2}>
                Delete
              </Button>
              <Button variant="outline" icon={Download}>
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 4: ICON RIGHT                        ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <MoveRight size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Icon Right</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                iconPosition=&quot;right&quot; দিলে icon ডানে যায়
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap gap-3">
              <Button icon={ArrowRight} iconPosition="right">
                Next Step
              </Button>
              <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                Continue
              </Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 5: ICON ONLY                         ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Square size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Icon Only</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Square buttons with only icon — toolbar / action use case
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={Plus} iconOnly size="sm" />
              <Button icon={Eye} iconOnly variant="secondary" />
              <Button icon={Trash2} iconOnly variant="danger" size="lg" />
              <Button icon={Search} iconOnly variant="ghost" />
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 6: STATES                            ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">States</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Default, loading (spinner), disabled — interactive states
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button loading>Saving...</Button>
              <Button disabled>Disabled</Button>
              <Button variant="danger" loading>
                Deleting...
              </Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 7: FULL WIDTH                        ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Full Width</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                fullWidth prop — form submit, mobile buttons এর জন্য
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-3 max-w-sm mx-auto">
              <Button fullWidth icon={Plus}>
                Create New Exam
              </Button>
              <Button fullWidth variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 8: PROPS TABLE                       ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
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
                  [
                    "variant",
                    "primary | secondary | ghost | danger | outline",
                    "primary",
                    "Visual style",
                  ],
                  ["size", "sm | md | lg", "md", "Button size"],
                  ["icon", "LucideIcon", "—", "Icon component"],
                  ["iconPosition", "left | right", "left", "Icon position"],
                  ["iconOnly", "boolean", "false", "Square icon-only button"],
                  ["loading", "boolean", "false", "Show loading spinner"],
                  ["disabled", "boolean", "false", "Disable interaction"],
                  ["fullWidth", "boolean", "false", "Full container width"],
                  ["onClick", "function", "—", "Click handler"],
                  ["className", "string", "—", "Extra Tailwind classes"],
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
