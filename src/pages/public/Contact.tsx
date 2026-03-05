import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send to API
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-blue-950 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 font-light">
            Have questions or need technical support? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">Get In Touch</h2>
                <h3 className="text-4xl font-bold text-blue-950 mb-8">Let's Discuss Your Next Engineering Project</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether it's a large-scale infrastructure project or a specialized technical installation, our team is ready to provide the expertise you need.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 mb-1">Head Office</h4>
                    <p className="text-gray-600 text-sm">45, Adebayo St. Ado-ekiti, Ekiti-state</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 mb-1">Regional Office</h4>
                    <p className="text-gray-600 text-sm">Sango, Ibadan, Oyo-state</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">+234 800 123 4567</p>
                    <p className="text-gray-600 text-sm">+234 800 987 6543</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">info@solacegrid.com</p>
                    <p className="text-gray-600 text-sm">support@solacegrid.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h4 className="font-bold text-blue-950 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-blue-800 hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Send className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-800 font-bold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea 
                      rows={6} 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center"
                  >
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] bg-gray-200 relative overflow-hidden">
        <iframe 
          title="SolaceGrid Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.567890123456!2d5.210987!3d7.621098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzcnMTYuMCJOIDXCsDEyJzM5LjYiRQ!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
