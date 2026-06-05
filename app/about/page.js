// app/about/page.js

export const metadata = {
  title: 'আমাদের সম্পর্কে | 9OC Academy',
  description: '9OC Academy — বাংলাদেশের সেরা অনলাইন পরীক্ষা প্রস্তুতি প্ল্যাটফর্ম।',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A1A] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">আমাদের সম্পর্কে</h1>
        <p className="text-gray-400 text-lg">🚧 এই পেজটি শীঘ্রই আসছে — Phase 2G তে বানাবো</p>
      </div>
    </main>
  );
}
