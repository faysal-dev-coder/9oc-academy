"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Clock,
  FileText,
  Trophy,
  ArrowRight,
  BookOpen,
  Users,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function TestCardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Card Component Test</h1>
          <p className="text-slate-500 text-sm mt-1">
            সব variants, paddings, sub-components এবং features এখানে দেখো
          </p>
        </div>

        {/* ── 1. VARIANTS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Variants (4 styles)
          </h2>
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
              <Card.Description>Transparent — for groupings inside colored areas</Card.Description>
            </Card>
          </div>
        </section>

        {/* ── 2. PADDING SIZES ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Padding Sizes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card padding="sm">
              <Card.Title>Small (p-4)</Card.Title>
              <Card.Description>Compact list items</Card.Description>
            </Card>
            <Card padding="md">
              <Card.Title>Medium (p-6)</Card.Title>
              <Card.Description>Default size</Card.Description>
            </Card>
            <Card padding="lg">
              <Card.Title>Large (p-8)</Card.Title>
              <Card.Description>Spacious hero cards</Card.Description>
            </Card>
          </div>
        </section>

        {/* ── 3. FULL STRUCTURE WITH DIVIDERS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Full Structure (Header + Body + Footer with dividers)
          </h2>
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
        </section>

        {/* ── 4. EXAM CARDS GRID (REAL USE) ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Real Use — Exam Cards Grid
          </h2>
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
              <Card.Description className="mt-1">30 mock tests + video solutions</Card.Description>
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
        </section>

        {/* ── 5. STATS / METRIC CARDS ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Stats / Metric Cards (Dashboard preview)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Total Exams</span>
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
                <span className="text-xs text-slate-500 uppercase tracking-wider">Active Now</span>
                <Trophy size={16} className="text-brand-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">89</div>
              <div className="text-xs text-slate-500 mt-1">Taking exams</div>
            </Card>

            <Card padding="sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase tracking-wider">This Month</span>
                <Calendar size={16} className="text-brand-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2">1,243</div>
              <div className="text-xs text-emerald-600 mt-1">Tests completed</div>
            </Card>
          </div>
        </section>

        {/* ── 6. NO PADDING — IMAGE/GRADIENT CARD ── */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Padding &quot;none&quot; — Full Bleed Header
          </h2>
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
        </section>
      </div>
    </div>
  );
}
