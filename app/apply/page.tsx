/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const UrgentAssistancePage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainContent />
        <NewsSection />
      </main>
      <CallToAction />
      <Footer />
      <StickyButton />
    </div>
  );
};

const Header: React.FC = () => (
  <header className="bg-blue-600 text-white py-4 shadow-lg fixed w-full z-10">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <div className="flex items-center">
        
      <img src="/logore.png" alt="Logo" width="40" height="40" className="rounded-full" />

        <h1 className="text-lg sm:text-2xl font-bold ml-4">Urgent Needs Assistance</h1>
      </div>
      <nav>
      <ul className="hidden md:flex space-x-8 items-center">
  <li>
    <Link href="/" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
      Home
    </Link>
  </li>
  <li>
    <Link href="/crainfo" className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-full transition-colors font-semibold">
      Apply Now
    </Link>
  </li>
</ul>

      </nav>
    </div>
  </header>
);

const MainContent: React.FC = () => (
  <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
    <Overview />
    <Eligibility />
    <HowToApply />
    <FAQ />
  </div>
);

const Overview: React.FC = () => (
  <section className="mb-6">
<img src="/EmergencyAssistanceProgram.jpg" alt="Emergency Assistance Program" width="600" height="300" className="rounded-lg mb-4" />
<p className="text-base leading-relaxed">We provide urgent assistance for individuals facing financial crises, natural disasters, or medical emergencies. Our program is designed to offer immediate support to those in need, ensuring they have access to necessary resources during critical times. Whether it is emergency housing, food assistance, or financial aid, we are here to help you recover and rebuild your life.</p>
    <p className="text-base leading-relaxed mt-4">Our mission is to provide quick and efficient relief without unnecessary bureaucracy. We work closely with local communities, organizations, and government agencies to ensure that aid reaches those who need it the most. The process is simple, and our dedicated team is always available to guide you through every step of the way.</p>
  </section>
);

const Eligibility: React.FC = () => (
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-blue-600">Eligibility</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>Financial hardship due to emergencies</li>
      <li>Impact from natural disasters</li>
      <li>Immediate need for medical or housing support</li>
    </ul>
  </section>
);

const HowToApply: React.FC = () => (
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-blue-600">How to Apply</h2>
    <ol className="list-decimal pl-6 space-y-2">
      <li>Click Apply Now</li>
      <li>Fill out the form</li>
      <li>Submit and get assistance</li>
    </ol>
  </section>
);

const FAQ: React.FC = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4 text-blue-600">FAQ</h2>
    <p className="text-base leading-relaxed mb-6">Find answers to common questions regarding eligibility and application process.</p>
    
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600">What types of emergencies qualify for assistance?</h3>
        <p className="text-base mt-2">We provide assistance for a variety of emergencies, including financial crises, natural disasters, and medical emergencies. If you are unsure whether your situation qualifies, feel free to contact us for clarification.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600">How long does it take to process an application?</h3>
        <p className="text-base mt-2">Applications are typically processed within 3-5 business days. However, in cases of extreme urgency, we prioritize and expedite the process to provide assistance as quickly as possible.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600">What documents are required to apply?</h3>
        <p className="text-base mt-2">You will need to provide proof of identity, proof of residence, and documentation supporting your emergency situation (e.g., medical bills, eviction notices, or disaster impact reports).</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600">Can I apply on behalf of someone else?</h3>
        <p className="text-base mt-2">Yes, you can apply on behalf of someone else, provided you have their consent and can provide the necessary documentation to support their case.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-600">Is there a limit to the amount of assistance I can receive?</h3>
        <p className="text-base mt-2">The amount of assistance varies depending on the nature and severity of the emergency. Our team will assess your situation and determine the appropriate level of support.</p>
      </div>
    </div>
  </section>
);


const CallToAction: React.FC = () => (
  <section className="py-8 bg-blue-50 text-center">
    <h2 className="text-2xl font-semibold mb-4">Get Help Now</h2>
    <a href="/crainfo" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Apply Now</a>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6 text-center">
    <p>&copy; {new Date().getFullYear()} Urgent Need Assistance Program.</p>
  </footer>
);

const StickyButton: React.FC = () => (
  <div className="fixed bottom-4 right-4">
    <a href="/mygov" className="bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition">Apply Now</a>
  </div>
);

const NewsSection: React.FC = () => (
  <aside className="bg-white shadow-lg rounded-xl p-6 lg:col-span-1">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Latest Updates</h2>
    
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <img src="/energy-saving-tips.jpg" alt="Relief Fund Expansion" width="300" height="180" className="rounded-md mb-3" />
      <h3 className="text-lg font-semibold text-gray-900">Emergency Relief Fund Expanded</h3>
        <p className="text-sm text-gray-700 mt-2">
          We’ve increased our relief fund to support more individuals affected by recent disasters.  
          <Link href="/news/relief-fund" className="text-blue-600 hover:underline">Read more →</Link>
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <img src="/household-energy-upgrades-fund-news.jpg" alt="Eligibility Update" width="300" height="180" className="rounded-md mb-3" />
      <h3 className="text-lg font-semibold text-gray-900">New Eligibility Criteria Announced</h3>
        <p className="text-sm text-gray-700 mt-2">
          Our assistance program now includes additional financial aid options for medical emergencies.  
          <Link href="/news/eligibility-update" className="text-blue-600 hover:underline">Learn more →</Link>
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <img src="/renewable-energy-projects.jpg" alt="Webinar Announcement" width="300" height="180" className="rounded-md mb-3" />
      <h3 className="text-lg font-semibold text-gray-900">Upcoming Webinar: How to Apply for Assistance</h3>
        <p className="text-sm text-gray-700 mt-2">
          Join our free webinar on [Date] to get step-by-step guidance on applying for aid.  
          <Link href="/events/webinar" className="text-blue-600 hover:underline">Register now →</Link>
        </p>
      </div>
    </div>
  </aside>
);


export default UrgentAssistancePage;
