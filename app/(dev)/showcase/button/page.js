"use client";

import Button from "@/components/ui/Button";
import { Plus, ArrowRight, Trash2, Eye, Download, Search } from "lucide-react";

export default function TestButtonPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Button Component Test</h1>
          <p className="text-slate-500 text-sm mt-1">সব variants, sizes, এবং states এখানে দেখো</p>
        </div>

        {/* ── VARIANTS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Variants
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>

        {/* ── SIZES ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* ── ICON LEFT ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Icon Left (default)
          </h2>
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
        </section>

        {/* ── ICON RIGHT ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Icon Right
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button icon={ArrowRight} iconPosition="right">
              Next Step
            </Button>
            <Button variant="secondary" icon={ArrowRight} iconPosition="right">
              Continue
            </Button>
          </div>
        </section>

        {/* ── ICON ONLY ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Icon Only
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button icon={Plus} iconOnly size="sm" />
            <Button icon={Eye} iconOnly variant="secondary" />
            <Button icon={Trash2} iconOnly variant="danger" size="lg" />
            <Button icon={Search} iconOnly variant="ghost" />
          </div>
        </section>

        {/* ── STATES ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">States</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button loading>Saving...</Button>
            <Button disabled>Disabled</Button>
            <Button variant="danger" loading>
              Deleting...
            </Button>
          </div>
        </section>

        {/* ── FULL WIDTH ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Full Width
          </h2>
          <div className="space-y-3 max-w-sm">
            <Button fullWidth icon={Plus}>
              Create New Exam
            </Button>
            <Button fullWidth variant="secondary">
              Cancel
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
