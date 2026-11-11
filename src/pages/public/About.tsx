import { motion } from 'motion/react';
import { Shield, Target, Eye, Award, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-blue-950 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" 
            alt="Engineering background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Breadith</h1>
          <p className="text-xl text-blue-100 font-light">
            A premier engineering firm dedicated to delivering integrated technical solutions across Africa.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">Our Story</h2>
            <h3 className="text-4xl font-bold text-blue-950 mb-8">Excellence in Engineering Since 2010</h3>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                SolaceGrid Engineering Ltd was founded with a vision to bridge the gap in technical expertise and infrastructure development in the region. Over the years, we have grown from a small consultancy to a full-scale engineering powerhouse.
              </p>
              <p>
                Our multidisciplinary approach allows us to handle complex projects that require a blend of civil, electrical, and mechanical expertise. We pride ourselves on our ability to deliver turnkey solutions that are both innovative and sustainable.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800" 
              alt="Construction site" 
              className="rounded-xl shadow-lg mt-8"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
              alt="Engineering drawing" 
              className="rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-8">
              <Target className="h-8 w-8 text-blue-800" />
            </div>
            <h3 className="text-3xl font-bold text-blue-950 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide world-class engineering services through innovation, integrity, and technical excellence, ensuring sustainable development and value for our clients and stakeholders.
            </p>
          </div>
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-8">
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-blue-950 mb-6">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the leading integrated engineering firm in Africa, recognized for setting the gold standard in technical solutions and project execution.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">Our Foundation</h2>
            <h3 className="text-4xl font-bold">Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', icon: Shield, desc: 'We uphold the highest ethical standards in all our dealings.' },
              { title: 'Excellence', icon: Award, desc: 'We strive for perfection in every technical detail.' },
              { title: 'Innovation', icon: Zap, desc: 'We embrace modern technology to solve complex problems.' },
              { title: 'Safety', icon: CheckCircle, desc: 'The well-being of our team and the public is our priority.' },
            ].map((value, idx) => (
              <div key={idx} className="text-center p-8 border border-blue-900 rounded-xl hover:bg-blue-900 transition-colors">
                <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-blue-200 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Zap } from 'lucide-react';
