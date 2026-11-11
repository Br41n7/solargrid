import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Settings, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000" 
            alt="Engineering background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Integrated Engineering <br />
              <span className="text-orange-500">& Technical Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 font-light">
              Delivering excellence through precision engineering, innovative design, and expert project management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/request-quote" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center transition-all shadow-lg">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/services" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center transition-all">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">What We Do</h2>
            <h3 className="text-4xl font-bold text-blue-950">Comprehensive Engineering Services</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Civil Engineering', icon: Shield, desc: 'Structural design, construction supervision, and infrastructure development.' },
              { title: 'Electrical Power', icon: Zap, desc: 'Power installations, grid management, and renewable energy solutions.' },
              { title: 'Mechanical Services', icon: Settings, desc: 'HVAC systems, industrial piping, and mechanical plant maintenance.' },
              { title: 'Engineering Design', icon: CheckCircle, desc: 'CAD modeling, technical specifications, and feasibility studies.' },
              { title: 'Project Planning', icon: Users, desc: 'End-to-end project management and execution strategies.' },
              { title: 'General Contracting', icon: HardHat, desc: 'Turnkey solutions for complex engineering requirements.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-blue-800" />
                </div>
                <h4 className="text-xl font-bold text-blue-950 mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="text-orange-600 font-bold flex items-center hover:text-orange-700">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-blue-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Why Choose Us</h2>
            <h3 className="text-4xl font-bold mb-8">Committed to Excellence and Innovation</h3>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Breadith Engineering Ltd stands at the forefront of technical innovation. We combine years of experience with modern engineering practices to deliver results that exceed expectations.
            </p>
            
            <div className="space-y-6">
              {[
                'Expert Team of Certified Engineers',
                'Safety-First Project Execution',
                'Cost-Effective Technical Solutions',
                'Timely Project Delivery',
                'Quality Assurance & Compliance'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="bg-orange-500 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
              alt="Engineering team" 
              className="rounded-2xl shadow-2xl relative z-10 border-4 border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Projects Completed', value: '250+' },
            { label: 'Expert Engineers', value: '45+' },
            { label: 'Years Experience', value: '15+' },
            { label: 'Client Satisfaction', value: '99%' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { HardHat } from 'lucide-react';
