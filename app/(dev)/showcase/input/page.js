"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  TextCursorInput,
  Type,
  Maximize2,
  Sparkles,
  Lock,
  Search,
  AlertCircle,
  Ban,
  Sparkle,
  ClipboardList,
  Mail,
  User,
  Phone,
  Globe,
} from "lucide-react";

export default function InputShowcasePage() {
  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ╔══════════════════════════════════════════════╗
            ║  HERO HEADER                                  ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
              <TextCursorInput size={28} />
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

              <h1 className="text-3xl font-bold text-slate-900">Input</h1>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Form input field with label, helper text, error state, icon support, password
                toggle, এবং search variant। React Hook Form ready।
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "2 Variants",
                  "3 Sizes",
                  "Icon Support",
                  "Password Toggle",
                  "Error State",
                  "Disabled State",
                  "Required",
                  "Helper Text",
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
            ║  SECTION 1: BASIC INPUTS                      ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Type size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Basic Inputs</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Label, placeholder, helper text — basic form fields
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-4 max-w-md">
              <Input label="Full Name" placeholder="John Doe" helper="আপনার পূর্ণ নাম লিখুন" />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                helper="আপনার active email দিন"
                required
              />
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
            <div className="space-y-4 max-w-md">
              <div>
                <Input size="sm" placeholder="Small input" />
                <span className="text-xs text-slate-400 font-mono mt-1 inline-block">
                  size=&quot;sm&quot; → h-8 (32px)
                </span>
              </div>
              <div>
                <Input size="md" placeholder="Medium input — default" />
                <span className="text-xs text-slate-400 font-mono mt-1 inline-block">
                  size=&quot;md&quot; → h-10 (40px)
                </span>
              </div>
              <div>
                <Input size="lg" placeholder="Large input" />
                <span className="text-xs text-slate-400 font-mono mt-1 inline-block">
                  size=&quot;lg&quot; → h-12 (48px)
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 3: WITH ICONS                        ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">With Icons</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Left icon support — User, Email, Phone, Lock, etc.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-4 max-w-md">
              <Input label="Username" icon={User} placeholder="username" required />
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                helper="আমরা spam করবো না!"
              />
              <Input label="Phone Number" type="tel" icon={Phone} placeholder="+8801XXXXXXXXX" />
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 4: PASSWORD (AUTO TOGGLE)            ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Password Field</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Auto eye toggle button — show/hide password
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md">
              {/* Hidden username for accessibility */}
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 5: SEARCH VARIANT                    ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Search size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Search Variant</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Auto search icon — variant=&quot;search&quot;
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="space-y-4 max-w-md">
              <Input variant="search" placeholder="Search exams, categories..." />
              <Input variant="search" size="lg" placeholder="Large search input..." />
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 6: ERROR STATE                       ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
              <AlertCircle size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Error State</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Validation error দেখানো — red border + error message
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-md">
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
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 7: DISABLED STATE                    ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center shrink-0">
              <Ban size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Disabled State</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Locked field — user change করতে পারবে না
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <div className="max-w-md">
              <Input
                label="Email (locked)"
                type="email"
                icon={Mail}
                defaultValue="admin@9oc.com"
                disabled
                helper="এই field টি change করা যাবে না"
              />
            </div>
          </div>
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 8: REAL FORM EXAMPLE                 ║
            ╚══════════════════════════════════════════════╝ */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center shrink-0">
              <Sparkle size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Real Form Example</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                সম্পূর্ণ Sign Up form — সব features একসাথে
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("✅ Form submitted!");
              }}
              className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl border border-slate-200"
            >
              <h3 className="text-base font-semibold text-slate-900">Create Your Account</h3>
              <p className="text-sm text-slate-500 -mt-2">9OC Academy এ যোগ দিন</p>

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
        </Card>

        {/* ╔══════════════════════════════════════════════╗
            ║  SECTION 9: PROPS TABLE                       ║
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
                  ["variant", "default | search", "default", "Input variant"],
                  ["size", "sm | md | lg", "md", "Input height"],
                  ["label", "string", "—", "Label above input"],
                  ["helper", "string", "—", "Helper text below"],
                  ["error", "string", "—", "Error message (replaces helper)"],
                  ["icon", "LucideIcon", "—", "Left icon component"],
                  [
                    "type",
                    "text | email | password | tel | url | number",
                    "text",
                    "HTML input type",
                  ],
                  ["required", "boolean", "false", "Show * red asterisk"],
                  ["disabled", "boolean", "false", "Disable input"],
                  ["placeholder", "string", "—", "Placeholder text"],
                  ["name", "string", "—", "Form field name"],
                  ["autoComplete", "string", "—", "Browser autofill hint"],
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
