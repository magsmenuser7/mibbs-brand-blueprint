import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-3xl font-bold text-navy mb-6"> The story behind India's first intelligent brand budgeting system.</h1>
            {/* <p className="text-xl mb-8 text-navy-light">
              The story behind India's first intelligent brand budgeting system.
              <span className="text-accent text-sm align-super">™</span>
            </p> */}
          </div>
        </div>
      </section>

      {/* Why MIBBS was Built */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-accent/10 text-[#64378e] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Why MIBBS<span className="text-accent text-sm align-super">™</span> Was Built
              </h2>
              <p className="text-lg mb-6 text-navy-light">
                At Magsmen, As consultants, we have seen brands struggle not because they lacked ideas, but because they lacked intelligent budget planning.
              </p>


              <p className="text-lg mb-2 text-navy-light">
                It’s about ensuring every rupee builds long-term brand value.
              </p>
              <p className="text-lg mb-2 text-navy-light">
                Because at Magsmen, we believe:
              </p>

              <p className="text-lg mb-2 text-navy-light">
                Smart brands don’t guess.
              </p>

              <p className="text-lg mb-2 text-navy-light">
                They plan | They build | They win.
              </p>

              <p className="text-lg mb-2 text-navy-light">
                Welcome to MIBBS.
              </p>

              <p className="text-lg mb-2 text-navy-light">
                Built by Magsmen.
              </p>

              <p className="text-lg mb-2 text-navy-light">
                Made for India’s future brands.
              </p>


              {/* <Button className="btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff] flex items-center group">
                Our Approach <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button> */}
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10">
                <img src="./lovable-uploads/about-budget-1.png" alt="about-budget-1" className="rounded-lg " />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="relative hidden md:block">
              <div className="relative z-10">
                {/* Re-using the uploaded image for this section for demonstration */}
                <img src="./lovable-uploads/about-budget-2.png" alt="about-budget-2" className="rounded-lg" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full -z-10"></div>
            </div>
            <div>


              <p className="text-lg mb-3 text-navy-light">
                It’s about ensuring every rupee builds long-term brand value.
              </p>
              <p className="text-lg mb-3 text-navy-light">
                Because at Magsmen, we believe:
              </p>

              <p className="text-lg mb-3 text-navy-light">
                Smart brands don’t guess.
              </p>

              <p className="text-lg mb-3 text-navy-light">
                They plan | They build | They win.
              </p>

              <p className="text-lg mb-3 text-navy-light">
                Welcome to MIBBS.
              </p>

              <p className="text-lg mb-3 text-navy-light">
                Built by Magsmen.
              </p>

              <p className="text-lg mb-3 text-navy-light">
                Made for India’s future brands.
              </p>


            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative hidden md:block">
              <div className="relative z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                    {/* Placeholder for founder image */}
                    <img src="./lovable-uploads/sandeep.png" alt="sandeep" />
                  </div>
                  <h3 className="text-xl font-bold text-navy text-center mb-2">Sandeep Kumar</h3>
                  <p className="text-accent text-center mb-4">Founder, MIBBS & Magsmen</p>
                  <div className="flex justify-center space-x-4">
                    <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHP2Od1_dfKSgAAAZe2GZegAjmGljyQCP5e_61PPMUsKF1Sp8UsHpUubanGNPy_OzXmgpc1alefZJHYUon3S1LxA3Q0hajVZyoal226uDsG1GnYrtEBfRqlEpRV_tiJg_oD8io=&original_referer=&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fmagsmen" className="text-navy-light hover:text-accent transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-navy-light hover:text-accent transition-colors">
                      {/* <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.946 4.946 0 004.604 3.417 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg> */}
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full -z-10"></div>
            </div>
            <div className="order-1 md:order-2">
              <span className="bg-accent/10 text-[#64378e] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                Founder's Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Sandeep's Vision for Brand Budgeting
              </h2>
              <div className="text-[#64378e] text-4xl font-serif mb-4">"</div>
              <p className="text-lg mb-6 text-navy-light italic">
                Sandeep N. is a visionary brand architect, entrepreneur, and thought leader who has redefined how brands, leaders, and individuals build lasting identities.
              </p>
              <p className="text-lg mb-6 text-navy-light italic">
                As the founder of Magsmen Brand Consultants, he has been the strategic force behind Fortune 25 companies, IPL sponsors, and iconic entrepreneurs. An enrolled advocate and certified image consultant, Sandeep has empowered over 2,500 young entrepreneurs to craft powerful personal brands.
              </p>
              <p className="text-lg mb-6 text-navy-light italic">
                Recognized among India’s Top 100 Admiring Marketing Leaders and named ‘Consultant of the Year 2023’, Sandeep’s vision is simple: brands must be engineered, not left to chance. MIBBS™ is built to bring that vision to life.
              </p>

              <div className="flex items-center my-8">
                <div className="w-16 h-1 bg-[#64378e]"></div>
                <div className="w-4 h-4 rounded-full bg-[#64378e] mx-2"></div>
                <div className="w-16 h-1 bg-[#64378e]"></div>
              </div>

              <p className="text-navy font-medium">
                Sandeep, with Magsmen's expertise in brand strategy, built MIBBS to transform how Indian businesses approach brand budgeting—from guesswork to a scientific, data-driven approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built by Magsmen */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="bg-accent/10 text-[#64378e] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
              Our Background
            </span>
            <h2 className="section-title">Built by Magsmen</h2>
            <p className="section-subtitle mx-auto">
              MIBBS is powered by insights from India's leading brand strategy consultancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-navy">About Magsmen</h3>
              <p className="text-navy-light mb-4">
                Magsmen is India's most respected brand strategy and positioning consultancy, working with businesses from startups to Fortune 500 companies.
              </p>
              <p className="text-navy-light mb-4">
                Our team has helped shape over 300+ Indian brands across technology, FMCG, retail, education, healthcare, and manufacturing sectors.
              </p>
              <p className="text-navy-light mb-4">
                MIBBS represents the culmination of insights gathered from years of successful brand building campaigns across diverse Indian markets.
              </p>
              <Button variant="outline" className="text-[#fff] bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]">
                <a href="https://magsmen.com" target="_blank" rel="noopener noreferrer">
                  Visit Magsmen Website
                  
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className=" p-4 rounded-lg flex items-center justify-center h-32">
                <span className="font-semibold text-navy"><img src="./lovable-uploads/magsmen-homepage-clients-sweathatelugufoods-168x168.png" alt="magsmen-homepage-clients-sweathatelugufoods-168x168" /></span>
              </div>
              <div className=" p-4 rounded-lg flex items-center justify-center h-32">
                <span className="font-semibold text-navy"><img src="./lovable-uploads/magsmen-homepage-clients-tenalidoublehorse-168x168.png" alt="magsmen-homepage-clients-tenalidoublehorse-168x168" /></span>
              </div>
              <div className=" p-4 rounded-lg flex items-center justify-center h-32">
                <span className="font-semibold text-navy"><img src="./lovable-uploads/magsmen-homepage-clients-colors-168x168.png" alt="magsmen-homepage-clients-colors-168x168" /></span>
              </div>
              <div className=" p-4 rounded-lg flex items-center justify-center h-32">
                <span className="font-semibold text-navy"><img src="./lovable-uploads/magsmen-homepage-clients-triplexxx-168x168.png" alt="magsmen-homepage-clients-triplexxx-168x168" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">MIBBS<span className="text-[#64378e] text-sm align-super">™</span> Development Timeline</h2>
            <p className="section-subtitle mx-auto">
              The journey from concept to India's first intelligent brand budgeting system.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#64378e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="h-full w-1 bg-accent/30"></div>
                </div>
                <div className="ml-6">
                  <span className="text-[#64378e] font-semibold">2023</span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-navy">Problem Identification</h3>
                  <p className="text-navy-light">
                    Sandeep and the Magsmen team identify the pattern of inefficient brand budget allocation across multiple Indian client engagements.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#64378e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="h-full w-1 bg-accent/30"></div>
                </div>
                <div className="ml-6">
                  <span className="text-[#64378e] font-semibold">2024</span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-navy">Initial Research</h3>
                  <p className="text-navy-light">
                    Begin collecting and analyzing data from 150+ Indian brand campaigns to identify patterns in budget allocation and effectiveness.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#64378e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="h-full w-1 bg-accent/30"></div>
                </div>
                <div className="ml-6">
                  <span className="text-[#64378e] font-semibold">2025</span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-navy">Algorithm Development</h3>
                  <p className="text-navy-light">
                    Creation of the first proprietary algorithm that factors in Indian market dynamics, industry verticals, and business stages.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#64378e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="h-full w-1 bg-accent/30"></div>
                </div>
                <div className="ml-6">
                  <span className="text-[#64378e] font-semibold">2025</span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-navy">Beta Testing</h3>
                  <p className="text-navy-light">
                    Initial version of MIBBS deployed with select Magsmen clients across various industries, gathering feedback and refining outputs.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#64378e] rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="h-full w-1 bg-accent/30 hidden"></div>
                </div>
                <div className="ml-6">
                  <span className="text-[#64378e]font-semibold">2026</span>
                  <h3 className="text-xl font-semibold mt-1 mb-2 text-navy">Official Launch</h3>
                  <p className="text-navy-light">
                    MIBBS is officially launched as India's first intelligent brand budgeting system, available to businesses of all sizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Recognition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">MIBBS<span className="text-sm align-super text-[#64378e]">™</span> in the Media</h2>
            <p className="section-subtitle mx-auto">
              Recognition and coverage of our innovative approach to brand budgeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:-translate-y-2">
              <span className="text-[#64378e] font-medium mb-2 block">Deccan Business</span>
              <h3 className="text-xl font-semibold mb-3 text-navy">
                "Magsmen Ventures into International Territory with Launch of First Australian Office in Rowville, Melbourne"
              </h3>
              <p className="text-navy-light mb-4">
                Magsmen, a renowned brand consulting firm headquartered in Hyderabad and Guntur, Andhra Pradesh, takes a bold step into international waters with the grand opening of its inaugural office in Australia.
              </p>
              <a
                href="https://deccanbusiness.com/magsmen-ventures-into-international-territory-with-launch-of-first-australian-office-in-rowville-melbourne/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="text-[#fff] bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="card hover:-translate-y-2">
              <span className="text-[#64378e] font-medium mb-2 block">The Print</span>
              <h3 className="text-xl font-semibold mb-3 text-navy">
                "Andhra Pradesh-based brand consulting firm Magsmen on the limelight in scaling up brands growth to 10x in less than 9 months"
              </h3>
              <p className="text-navy-light mb-4">
                Award-winning brand consulting firm from Andhra Pradesh, Magsmen has witnessed the growth of their clients at a 10x rate of brand growth in less than 9 months.
              </p>
              <a
                href="https://theprint.in/ani-press-releases/andhra-pradesh-based-brand-consulting-firm-magsmen-on-the-limelight-in-scaling-up-brands-growth-to-10x-in-less-than-9-months/1233451/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="text-[#fff] bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="card hover:-translate-y-2">
              <span className="text-[#64378e] font-medium mb-2 block">UP18 News</span>
              <h3 className="text-xl font-semibold mb-3 text-navy">
                "Magsmen and VIT AP Partnership: A Catalyst for Innovation and Entrepreneurial Success"
              </h3>
              <p className="text-navy-light mb-4">
                Magsmen Brand Consultants, a leading brand consultancy ﬁrm, today announced a strategic partnership with VIT AP, a renowned institute of technology and innovation in Guntur, India.
              </p>
             <a
                href="https://up18news.com/tag/magsmen-brand-consultants/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="text-[#fff] bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Smarter Brand Budgeting Movement</h2>
            <p className="text-xl mb-8">
              Experience MIBBS and transform how you plan, allocate, and optimize your brand building investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                  className="btn-primary flex items-center group bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                  onClick={() => navigate("/Login")}
                  // onClick={() => setShowAuthModal(true)}
                >
                  Start Budgeting
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white bg-[#ac89b9] hover:bg-white/10 font-semibold py-3 px-6 rounded-md transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;