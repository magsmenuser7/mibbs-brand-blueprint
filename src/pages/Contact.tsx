
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QrCode } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    category: "general",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      category: "general",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Contact & Collaborate</h1>
            <p className="text-xl mb-8 text-navy-light">
              Reach out to the MIBBS<span className="text-accent text-sm align-super">™</span> team for partnerships, inquiries, or support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="bg-accent/10 text-[#64378e] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Let's Connect
              </h2>
              <p className="text-lg mb-6 text-navy-light">
                Whether you're looking to collaborate, ask questions about our services, or explore partnership opportunities, we're here to help.
              </p>
              
              <div className="space-y-8 mt-12">
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Email Us</h3>
                    <p className="text-navy-light mb-1">For general inquiries:</p>
                    <a href="mailto:hello@mibbs.in" className="text-[#64378e] hover:underline">hello@mibbs.in</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Call Us</h3>
                    <p className="text-navy-light mb-1">Monday to Friday, 9am to 6pm IST</p>
                    <a href="tel:+919876543210" className="text-[#64378e] hover:underline">+91 98765 43210</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <QrCode className="h-6 w-6 text-[#64378e]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">WhatsApp</h3>
                    <p className="text-navy-light mb-1">For quick responses:</p>
                    <a href="#" className="text-[#64378e] hover:underline">Scan our QR code</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">Visit Us</h3>
                    <p className="text-navy-light mb-1">Magsmen Headquarters</p>
                    <address className="text-navy-light not-italic">
                      123 Business Avenue<br />
                      Koramangala, Bangalore 560034<br />
                      India
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-navy">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-navy-light mb-2">
                      I'd like to discuss:
                    </label>
                    <select 
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="enterprise">Enterprise Solutions</option>
                      <option value="support">Product Support</option>
                      <option value="press">Media/Press</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-light mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy-light mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-navy-light mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy-light mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-light mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-navy-light">
                      I agree to MIBBS<span className="text-accent text-xs align-super">™</span> <a href="#" className="text-accent hover:underline">privacy policy</a> and <a href="#" className="text-accent hover:underline">terms of service</a>.
                    </label>
                  </div>
                  
                  <Button type="submit" className="btn-primary w-full bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]">
                    Submit Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Collaborate With Us</h2>
            <p className="section-subtitle mx-auto">
              Explore various ways to partner with MIBBS<span className="text-accent text-sm align-super">™</span> and join our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Investors</h3>
              <p className="text-navy-light mb-4">
                Join us in our journey to transform brand budgeting for Indian businesses at scale.
              </p>
              <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Learn More</Button>
            </div>

            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Agencies</h3>
              <p className="text-navy-light mb-4">
                Become a certified MIBBS<span className="text-accent text-sm align-super">™</span> partner and offer our solutions to your clients.
              </p>
              <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Partner With Us</Button>
            </div>

            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Enterprises</h3>
              <p className="text-navy-light mb-4">
                Discover our custom solutions for large organizations with complex brand portfolios.
              </p>
              <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Explore Solutions</Button>
            </div>

            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Media & Press</h3>
              <p className="text-navy-light mb-4">
                Get in touch for interviews, expert quotes, or brand budgeting insights.
              </p>
              <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Media Inquiries</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Visit Our Office</h2>
            <p className="section-subtitle mx-auto">
              Drop by for a coffee and chat about your brand budgeting challenges.
            </p>
          </div>

          <div className="bg-gray-200 h-96 rounded-xl overflow-hidden">
            {/* Replace with actual map embed code */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-navy-light">Map Placeholder - Embed Google Maps here</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-navy-light mb-4">
              Magsmen & MIBBS<span className="text-accent text-sm align-super">™</span> Headquarters
            </p>
            <p className="text-navy font-medium">
              123 Business Avenue, Koramangala, Bangalore 560034, India
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand Budget?</h2>
            <p className="text-xl mb-8">
              Start your brand budgeting journey with MIBBS<span className="text-white text-sm align-super">™</span> today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff] font-semibold py-3 px-6 rounded-md transition-all duration-300">
                Try MIBBS Free
              </Button>
              <Button variant="outline" className="border-2 border-white text-white bg-[#ac89b9] hover:bg-white/10 font-semibold py-3 px-6 rounded-md transition-all duration-300">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
