import React from 'react';

const DataProcessingProtectionAgreement = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">

        {/* Header Section */}
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2b4b] leading-tight">
MIBBS – Data Processing & Protection Agreement           
</h1>
          {/* <p className="text-base md:text-lg text-gray-600 mt-2">
            Effective Date: 12-12-2025

          </p> */}
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
This Data Processing and Protection Agreement governs the manner in which MIBBS (Magsmen Intelligent Brand Budgeting System) collects, stores, processes, safeguards, transfers, and retains the personal and business data submitted by users while accessing the Service. By using MIBBS, the user acknowledges and agrees to the processing activities described herein and affirms that they have the lawful authority to provide the information to MIBBS for the purposes of platform operation, analytics, benchmarking, forecasting, reporting, and agency-matching functionality. This Agreement must be read together with the Terms & Conditions, which define the contractual relationship between the user and MIBBS for all purposes relating to service delivery and data governance.
</p>
<p className="text-gray-700 leading-relaxed mt-4">
MIBBS processes data solely for the purpose of enabling the functionalities of the platform, including generating brand-budget recommendations, improving algorithmic quality, enhancing forecasting accuracy, enabling integrations such as payment gateways, agency communication tools, analytics dashboards, and ensuring overall system operation. Any personal or business data submitted through forms, questionnaires, uploads, integrations, messaging modules, or dashboard interactions is used exclusively to provide, maintain, and optimize the Service. MIBBS does not engage in any form of processing unrelated to platform operation and does not sell or commercially exploit user data under any circumstances.
</p>

<p className="text-gray-700 leading-relaxed mt-3">
By using the Service, the user remains the owner and controller of the data they provide, while MIBBS acts only as a processor responsible for executing data operations on the user’s behalf. All data submitted—including personal identifiers, business details, budget figures, location information, behavioral usage patterns, device information, and communication logs—may be collected, stored, analyzed, or processed to ensure accurate recommendation outputs, improve performance models, detect anomalies, prevent fraud, and maintain secure access control. In addition, MIBBS may record metadata such as timestamps, login sessions, IP addresses, browser specifications, and interaction flows for security monitoring, operational diagnostics, and service improvement.
</p>

<p className="text-gray-700 leading-relaxed mt-3">
MIBBS implements strict confidentiality obligations for all personnel with authorized access to user data. Only trained individuals who require access for operational, analytical, or security reasons may view or interact with user data. All such individuals are bound by contractual confidentiality and data protection obligations. Unauthorized access, disclosure, or misuse of user information is strictly prohibited and subject to disciplinary and legal action.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
The Service employs a combination of technical, administrative, and organizational measures designed to protect user data against loss, unauthorized access, alteration, destruction, or disclosure. These measures include encryption of data in transit, secure server architecture, firewall protection, access limitation through role-based controls, secure credential hashing, ongoing vulnerability assessments, activity logging, intrusion detection mechanisms, and periodic security audits. Users acknowledge that no digital service can guarantee absolute protection due to the inherent nature of internet technologies, and therefore agree to take reasonable precautions on their end, including protecting device integrity, securing login credentials, and avoiding unauthorized sharing of access.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
MIBBS may engage trusted third-party service providers to support platform functions such as hosting, database infrastructure, analytics, communication services, and payment processing. These subprocessors operate under binding contractual obligations to protect the data to standards no less stringent than those described in this Agreement. The user authorizes MIBBS to transfer or process data using such subprocessors as required for platform operation, provided that all reasonable safeguards are implemented. MIBBS remains liable for ensuring that these subprocessors uphold their obligations.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
User data may be transferred, stored, or processed across jurisdictions where MIBBS or its subprocessors maintain infrastructure. Such transfers may include regions outside the user’s home jurisdiction. By continuing to use the Service, the user consents to these geographical data flows and acknowledges that data may be subject to the regulatory frameworks of multiple territories. MIBBS shall take reasonable steps to ensure that all such transfers comply with applicable legal requirements.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
MIBBS retains user data only for as long as reasonably necessary to fulfill the purposes for which it was collected, to comply with legal and taxation requirements, to maintain operational continuity, to support platform security investigations, or to enforce contractual obligations. Upon account termination, certain information may be deleted, anonymized, or archived in accordance with retention policies. However, the user acknowledges that anonymized or aggregated forms of data may continue to be used to improve the platform’s algorithms, benchmarking capabilities, and predictive accuracy. Cached versions, backup files, or log entries may also persist for system integrity and compliance.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
Users may request access to the data stored about them, may request correction of inaccuracies, or may request deletion of certain categories of data subject to technical feasibility and lawful retention requirements. MIBBS may seek verification of identity before processing such requests to prevent unauthorized disclosure. Requests deemed unlawful, operationally disruptive, or technically impossible may be declined with justification provided to the user.
</p>

<p className="text-gray-700 leading-relaxed mt-3">
If MIBBS becomes aware of a confirmed data breach involving unauthorized access to user data, MIBBS will perform a reasonable assessment of the incident and notify affected users within an appropriate timeframe after confirming the breach. This notification will include the nature of the breach, categories of affected data, potential consequences, and steps taken to mitigate risk. The user acknowledges that MIBBS is not responsible for breaches arising from the user’s devices, networks, account negligence, or from vulnerabilities introduced by third-party tools not controlled by MIBBS.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
The user agrees to use the Service in compliance with applicable laws and confirms that any data they submit has been collected lawfully and with the necessary permissions. The user further agrees not to upload sensitive information beyond what is required for Service operation. MIBBS is not responsible for the consequences of data improperly submitted by the user or for legal claims arising from the user’s failure to obtain necessary rights from third parties.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
This Agreement remains in effect for the duration of the user’s engagement with the platform and continues to apply to retained or archived data to the extent permitted by law. Certain obligations—such as confidentiality, liability limitations, and security commitments—shall survive expiration or termination. MIBBS reserves the right to revise this Agreement periodically. Continued use of the Service constitutes acceptance of any updated version, and users are encouraged to review the Agreement regularly.
</p>
<p className="text-gray-700 leading-relaxed mt-3">
All disputes arising from this Agreement shall be governed by the laws of India and shall fall under the exclusive jurisdiction of the courts of Guntur, Andhra Pradesh. If any provision of this Agreement is found unenforceable by a competent authority, the remaining provisions shall continue in full force without limitation.
</p>



</section>

      </div>
    </div>
  );
};

export default DataProcessingProtectionAgreement;