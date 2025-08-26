import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

        {/* Header Section */}
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2b4b] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Effective Date: July 24, 2025
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Grofessor’s Innovations Private Limited ("MIBBS", "we", "us", or "our") is committed to protecting the privacy and personal data of our users. MIBBS is an AI-powered platform that enables Indian businesses—whether MSMEs, startups, or large enterprises—to analyze, plan, and optimize their budgets for marketing, planning, and advertising initiatives. This Privacy Policy describes how we collect, use, store, share, and safeguard your information when you access or use our website at <a href="https://www.mibbs.ai" className="text-[#64378e] hover:underline">https://www.mibbs.ai</a>, any associated mobile/web applications, or any service governed under the MIBBS platform (collectively referred to as "Services"). This policy is applicable to users within the Republic of India and is crafted in accordance with Indian data protection laws, including the Information Technology Act, 2000, the SPDI Rules, and the Digital Personal Data Protection Act, 2023.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            By using our Services, you agree to the practices outlined in this Privacy Policy. If you do not agree with any part of this Policy, please discontinue use of the Services. If you are entering into this agreement on behalf of an organization, you confirm that you are authorized to bind that organization.
          </p>
        </section>

        {/* Content Sections */}
        <section className="space-y-8">
          {/* Collection of Personal and Business Data */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Collection of Personal and Business Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MIBBS collects certain categories of data either directly from users or through automated means. The personal and business information we collect may include business name, business contact details (name, phone number, email address), GSTIN, business sector, employee strength, annual turnover, and marketing budget allocations. In addition, we collect account credentials, interaction data (clicks, page views), and device/browser metadata such as IP address, operating system, session logs, and unique identifiers for security, analytics, and performance optimization.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              We do not knowingly collect sensitive personal data unless voluntarily submitted and necessary for service delivery. Sensitive personal data refers to financial information, authentication credentials, or other data as defined under Rule 3 of the SPDI Rules and the DPDP Act. We specifically instruct users not to submit data related to religious beliefs, biometric identifiers, or personal health information, unless essential and agreed to by both parties under separate consent.
            </p>
          </div>

          {/* Purpose and Legal Basis of Processing */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Purpose and Legal Basis of Processing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is collected and processed only for lawful purposes, including to create and maintain your account, deliver Services, personalize the user experience, enhance AI performance, conduct usage analytics, respond to support queries, detect fraud, and fulfill contractual or legal obligations. The primary legal bases for data processing include: (i) consent as provided under Section 6 of the DPDP Act, (ii) performance of a contract between you and MIBBS, (iii) compliance with applicable Indian laws, and (iv) our legitimate business interest in improving our platform and user experience, subject to your rights under Indian law.
            </p>
          </div>

          {/* Data Sharing and Disclosure */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or trade personal or business data to any third party. However, we may share data with authorized service providers such as cloud hosting vendors, analytics partners, and payment gateways. All third parties are contractually obligated to follow confidentiality and security requirements that are at least equivalent to this Policy and Indian law.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              MIBBS may disclose data to government authorities under lawful directions, including requests under Section 69 of the IT Act or relevant provisions of the BNSS. Disclosures will be made only to the extent required and after verifying legal validity. We will notify the user where possible and legally permitted.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              In the event of a merger, acquisition, restructuring, or transfer of assets, your data may be transferred to the new entity subject to this same policy and applicable legal safeguards.
            </p>
          </div>

          {/* Cookies and Tracking Technologies */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and related technologies to improve service delivery, measure performance, personalize user experience, and conduct analytics. Cookies help us store your session preferences, detect unusual behavior, and improve usability. By using our platform, you consent to our use of cookies. You can modify your browser settings to block cookies; however, doing so may affect functionality.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              We use only essential cookies by default. Any marketing or third-party analytical cookies (e.g. from tools like Google Analytics) are deployed only after explicit consent and can be managed via our cookie settings interface.
            </p>
          </div>

          {/* Children’s Data */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Children’s Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MIBBS does not knowingly collect or process personal data of individuals under the age of 18. If it is brought to our attention that such data has been submitted without valid consent from a guardian, we will delete the data as per law. Users represent that they are above 18 years of age when using the Services.
            </p>
          </div>

          {/* Data Security and Retention */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Data Security and Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use appropriate technical and organizational security measures to protect user data. This includes encryption in transit (TLS 1.2 or higher), encryption at rest, multi-factor authentication for internal access, firewalls, and periodic penetration testing. Access to user data is strictly limited to authorized personnel and based on role-specific access control.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              All personal and business data is retained only for as long as necessary for the purposes stated in this policy, or as required under Indian law (including but not limited to the Companies Act, Income Tax Act, or relevant state regulations). Generally, business data is retained for 5 years from the end of the user relationship, unless longer retention is required by legal, tax, or regulatory authorities.
            </p>
          </div>

          {/* Your Rights and Control */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Your Rights and Control
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Under Indian law, you have the right to:
            </p>
            <ul className="list-disc pl-8 text-gray-700 leading-relaxed mt-2 space-y-1">
              <li>Access and obtain a copy of your personal data held by us.</li>
              <li>Request correction or updating of your data.</li>
              <li>Withdraw consent for processing (where applicable).</li>
              <li>Request deletion of your data, subject to legal and operational exceptions.</li>
              <li>Lodge a complaint with the Data Protection Board under the DPDP Act once operational.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of the above rights, please email <a href="mailto:privacy@mibbs.ai" className="text-[#64378e] hover:underline">privacy@mibbs.ai</a>. We aim to respond within 30 days in compliance with Indian regulatory timelines. We may require identity verification before fulfilling your request.
            </p>
          </div>

          {/* International Data Transfers */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At present, all personal and business data collected by MIBBS is stored on servers located within India. If we engage global cloud service providers in the future, we will ensure that data transfers comply with applicable cross-border data transfer regulations under the DPDP Act, including standard contractual clauses or government-prescribed safeguards.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in technology, legal obligations, or our practices. Any significant updates will be notified via email and/or through a platform banner at least 15 days in advance, unless mandated sooner by law. Continued use of the Services after such notice shall constitute acceptance of the revised policy.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b4b] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or complaints about this Privacy Policy or wish to exercise your rights, you may contact our Data Protection Officer (DPO) at:
            </p>
            <ul className="text-gray-700 mt-2 space-y-1">
              <li>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:support@mibbs.ai" className="text-[#64378e] hover:underline">support@mibbs.ai</a>
              </li>
              <li>
                <span className="font-semibold">Mailing Address:</span>
                <address className="not-italic inline">
                  <br />Grofessor’s Innovations Private Limited
                  <br />4th floor, icon spaces, beside arundalpet police station, Guntur
                </address>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We are committed to resolving any concerns you may have about your data and privacy rights under Indian law.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;