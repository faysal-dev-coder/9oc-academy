"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiChatBubbleLeftRight,
  HiPaperAirplane,
  HiCheckCircle,
  HiXCircle,
  HiSparkles,
} from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";
import { CONTACT_FORM_SUBJECTS } from "@/constants";

export default function ContactForm() {
  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Form States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // ═══════════════════════════════════════════
  // Validation Function
  // ═══════════════════════════════════════════

  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "নাম লিখুন";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "ইমেইল লিখুন";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল লিখুন";
    }

    // Phone Validation (Optional but if filled, must be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^(\+?88)?0?1[3-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "সঠিক বাংলাদেশি ফোন নম্বর লিখুন";
      }
    }

    // Subject Validation
    if (!formData.subject) {
      newErrors.subject = "বিষয় নির্বাচন করুন";
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = "মেসেজ লিখুন";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "মেসেজ কমপক্ষে ১০ অক্ষরের হতে হবে";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ═══════════════════════════════════════════
  // Input Change Handler
  // ═══════════════════════════════════════════

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear submit status on change
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // ═══════════════════════════════════════════
  // Submit Handler
  // ═══════════════════════════════════════════

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API Call (Phase 3 তে আসল Backend আসবে)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Auto-hide success after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch {
      setSubmitStatus("error");

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ═══════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════

  return (
    <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-dark via-primary/5 to-dark" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">মেসেজ পাঠান</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            আপনার বার্তা{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              আমাদের কাছে পৌঁছান
            </span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            নিচের ফর্মটি পূরণ করুন। আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Glow Effect */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />

            {/* Form Card */}
            <div className="relative p-6 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Top Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

              {/* Decorative Corner Glows */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Name + Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    label="পুরো নাম"
                    name="name"
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    icon={HiUser}
                    value={formData.name}
                    error={errors.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />

                  {/* Email Field */}
                  <FormField
                    label="ইমেইল ঠিকানা"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    icon={HiEnvelope}
                    value={formData.email}
                    error={errors.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Phone + Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <FormField
                    label="ফোন নম্বর"
                    name="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    icon={HiPhone}
                    value={formData.phone}
                    error={errors.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    optional
                  />

                  {/* Subject Field (Select) */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      বিষয় <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer ${
                          errors.subject
                            ? "border-red-500/50"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <option value="" className="bg-dark text-white/50">
                          -- বিষয় নির্বাচন করুন --
                        </option>
                        {CONTACT_FORM_SUBJECTS.map((subject) => (
                          <option
                            key={subject.id}
                            value={subject.value}
                            className="bg-dark text-white"
                          >
                            {subject.label}
                          </option>
                        ))}
                      </select>

                      {/* Custom Dropdown Arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-white/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        >
                          <HiXCircle className="w-4 h-4" />
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message Field (Textarea) */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    মেসেজ <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <HiChatBubbleLeftRight className="w-5 h-5 text-white/40" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
                        errors.message
                          ? "border-red-500/50"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    />
                  </div>

                  {/* Character Count + Error */}
                  <div className="mt-2 flex items-center justify-between">
                    <AnimatePresence>
                      {errors.message ? (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          <HiXCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.p>
                      ) : (
                        <span className="text-xs text-white/40">কমপক্ষে ১০ অক্ষর লিখুন</span>
                      )}
                    </AnimatePresence>
                    <span className="text-xs text-white/40">{formData.message.length} অক্ষর</span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="group relative w-full px-6 py-4 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  {!isSubmitting && (
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>পাঠানো হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane className="w-5 h-5" />
                        <span>মেসেজ পাঠান</span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Submit Status Messages */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                    >
                      <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <HiCheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-400 mb-1">সফলভাবে পাঠানো হয়েছে! ✨</h4>
                        <p className="text-sm text-white/70">
                          আপনার মেসেজ আমাদের কাছে পৌঁছেছে। আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করবো।
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                    >
                      <div className="shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <HiXCircle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-400 mb-1">কিছু একটা ভুল হয়েছে! 😔</h4>
                        <p className="text-sm text-white/70">
                          মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন অথবা সরাসরি ইমেইল করুন।
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Privacy Note */}
                <p className="text-xs text-white/40 text-center">
                  🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। আমরা স্প্যাম পাঠাই না।
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// Sub-Component: Reusable Form Field
// ═══════════════════════════════════════════

function FormField({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  value,
  error,
  onChange,
  disabled,
  required,
  optional,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {optional && <span className="text-white/40 text-xs font-normal ml-2">(ঐচ্ছিক)</span>}
      </label>

      <div className="relative">
        {/* Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-5 h-5 text-white/40" />
        </div>

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-red-500/50" : "border-white/10 hover:border-white/20"
          }`}
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1"
          >
            <HiXCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
