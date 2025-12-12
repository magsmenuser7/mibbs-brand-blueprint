import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

        {/* Header Section */}
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2b4b] leading-tight">
            MIBBS – Privacy Policy 
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Effective Date: 12-12-2025
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
This Privacy Policy describes how MIBBS (Magsmen Intelligent Brand Budgeting System) collects, uses, stores, processes, and protects personal and business information when you access or use the MIBBS platform (“Service”). By using MIBBS, you consent to the practices outlined in this Policy. If you do not agree, discontinue use immediately.          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
MIBBS collects information provided directly by users during onboarding, including name, business details, location, industry classification, budget amounts, strategic objectives, and contact information. The platform also collects technical data such as device identifiers, IP addresses, browser details, interaction logs, and cookies. Additionally, users may upload or input business budgets, campaign details, agency information, documents, or any other data relevant to generating recommendations and using platform features. Agencies may submit service details, pricing, credentials, and portfolio information.          
</p>

<p className="text-gray-700 leading-relaxed mt-3">
  MIBBS uses the collected information to operate and improve the Service, generate brand-budget recommendations, provide analytics, conduct benchmarking, match users with agencies, process payments, enable integrations, enhance user experience, and maintain platform security. MIBBS may also use anonymized or aggregated data for research, reporting, product development, and statistical insights. No personal or business-sensitive data is sold to third parties.
</p>

<p className="text-gray-700 leading-relaxed mt-3">
  Your information may be shared with third-party service providers strictly for operational purposes, including hosting infrastructure, analytics partners, payment gateways, communication tools, and authentication services. These third parties are required to protect your data in accordance with applicable laws. MIBBS does not authorize them to use your data for unrelated purposes. Where required by law, regulation, or court order, MIBBS may disclose information to government authorities or legal bodies.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
  Payment-related information submitted through the Service is processed by third-party payment gateways. MIBBS does not store or access full card details, bank credentials, or UPI PINs. Transaction data may be retained for financial compliance, auditing, or dispute resolution. In cases where escrow workflows are used, MIBBS may store status updates, approvals, and transactional metadata but not sensitive payment credentials.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
You are responsible for ensuring that all information submitted is accurate and updated. You may request corrections or deletion of certain data, subject to legal and operational constraints. MIBBS may retain information as long as required to provide the Service, comply with law, resolve disputes, or enforce agreements. Cached or anonymized versions of data may persist beyond account deletion for compliance, analytics, or fraud-prevention purposes.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
MIBBS implements administrative, technical, and physical safeguards to protect user information; however, no digital platform can guarantee absolute security. By using the Service, you acknowledge the inherent risks of internet-based systems. MIBBS is not responsible for unauthorized access arising from user-side vulnerabilities, device compromises, weak passwords, or third-party networks.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
The Service is not intended for individuals below 18 years of age. MIBBS does not knowingly collect information from minors. If such data is discovered, it will be deleted promptly upon verification.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
MIBBS may transfer data across regions or jurisdictions where its servers, partners, or service providers operate. Such transfers will comply with applicable data protection laws to the best extent possible. Use of the platform implies consent to these transfers.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
The Service may contain links to third-party websites or integrated tools. MIBBS is not responsible for their privacy practices or content. Users should review third-party privacy policies before interacting with external services.
</p>

<p className="text-gray-700 leading-relaxed mt-3">
MIBBS may update this Privacy Policy periodically. Continued use of the Service after updates constitutes acceptance of the revised Policy. Users are encouraged to review this Policy regularly.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
For questions or concerns, you may contact contact Grofessors innovations private limited at <a
  href="mailto:ceo@grofessors.com?subject=Inquiry"
  className="underline"
>
  ceo@grofessors.com
</a> 
</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;