"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail, User, Lock, Search, Phone, Globe } from "lucide-react";

export default function TestInputPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Input Component Test</h1>
          <p className="text-slate-500 text-sm mt-1">
            সব variants, sizes, states এবং features এখানে দেখো
          </p>
        </div>

        {/* ── BASIC INPUTS ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Basic Inputs
          </h2>
          <Input label="Full Name" placeholder="John Doe" helper="আপনার পূর্ণ নাম লিখুন" />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            helper="আপনার active email দিন"
            required
          />
        </section>

        {/* ── SIZES ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sizes</h2>
          <Input size="sm" placeholder="Small input (h-8)" />
          <Input size="md" placeholder="Medium input (h-10) — default" />
          <Input size="lg" placeholder="Large input (h-12)" />
        </section>

        {/* ── WITH LEFT ICON ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            With Left Icon
          </h2>
          <Input label="Username" icon={User} placeholder="username" required />
          <Input
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            helper="আমরা spam করবো না!"
          />
          <Input label="Phone Number" type="tel" icon={Phone} placeholder="+8801XXXXXXXXX" />
        </section>

        {/* ── PASSWORD (wrapped in form to fix browser warning) ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Password (auto toggle)
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Hidden username for accessibility + password manager */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              defaultValue="demo@user.com"
              style={{ display: "none" }}
              aria-hidden="true"
              tabIndex={-1}
              readOnly
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Enter password"
              helper="কমপক্ষে ৮ অক্ষর হতে হবে"
              name="password"
              autoComplete="current-password"
              required
            />
          </form>
        </section>

        {/* ── SEARCH VARIANT ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Search Variant
          </h2>
          <Input variant="search" placeholder="Search exams, categories..." />
          <Input variant="search" size="lg" placeholder="Search large..." />
        </section>

        {/* ── ERROR STATE (wrapped in form to fix warning) ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Error State
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <Input
              label="Email"
              type="email"
              icon={Mail}
              defaultValue="invalid-email"
              error="সঠিক email format দিন (যেমন: name@example.com)"
              name="error-email"
              autoComplete="email"
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              error="Password কমপক্ষে ৮ অক্ষর হতে হবে"
              name="error-password"
              autoComplete="current-password"
            />
          </form>
        </section>

        {/* ── DISABLED STATE ── */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Disabled State
          </h2>
          <Input
            label="Email (locked)"
            type="email"
            icon={Mail}
            defaultValue="admin@9oc.com"
            disabled
            helper="এই field টি change করা যাবে না"
          />
        </section>

        {/* ── REAL FORM EXAMPLE ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("✅ Form submitted!");
          }}
          className="space-y-4 bg-white p-6 rounded-xl border border-slate-200"
        >
          <h2 className="text-base font-semibold text-slate-900">Real Form Example — Sign Up</h2>
          <p className="text-sm text-slate-500 -mt-2">একটি সম্পূর্ণ form দেখো</p>

          <Input
            label="Full Name"
            icon={User}
            placeholder="Your name"
            name="fullName"
            autoComplete="name"
            required
          />
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            helper="আপনার active email দিন"
            name="email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="Create password"
            helper="কমপক্ষে ৮ অক্ষর"
            name="password"
            autoComplete="new-password"
            required
          />
          <Input
            label="Website (optional)"
            type="url"
            icon={Globe}
            placeholder="https://yoursite.com"
            name="website"
            autoComplete="url"
          />

          <Button fullWidth size="lg" type="submit" className="mt-2">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
