import { motion } from 'motion/react';
import { Shield, Zap, Settings, CheckCircle, ArrowRight, HardHat, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'civil',
    title: 'Civil Engineering Works',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
    description: 'We provide comprehensive civil engineering solutions including structural design, construction supervision, and infrastructure development. Our team ensures every structure is built to last, adhering to international safety and quality standards.',
    features: ['Structural Analysis & Design', 'Road & Bridge Construction', 'Drainage & Water Systems', 'Geotechnical Engineering']
  },
  {
    id: 'electrical',
    title: 'Electrical Engineering & Power',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    description: 'Expert power installations and electrical systems management. From high-voltage grid connections to renewable energy integration, we power your projects with reliability and efficiency.',
    features: ['Power Distribution Systems', 'Substation Installation', 'Renewable Energy Solutions', 'Electrical Maintenance']
  },
  {
    id: 'mechanical',
    title: 'Mechanical Engineering Services',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800',
    description: 'Precision mechanical engineering for industrial and commercial applications. We specialize in HVAC systems, industrial piping, and complex mechanical plant installations.',
    features: ['HVAC System Design', 'Industrial Piping & Plumbing', 'Fire Protection Systems', 'Machinery Installation']
  },
  {
    id: 'design',
    title: 'Engineering Design & Supervision',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
    description: 'Transforming concepts into technical realities. Our design team uses advanced CAD/BIM tools to create detailed specifications and provides rigorous supervision during execution.',
    features: ['CAD & BIM Modeling', 'Technical Specifications', 'Feasibility Studies', 'On-site Supervision']
  },
  {
    id: 'planning',
    title: 'Project Planning & Execution',
    icon: CheckCircle,
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800',
    description: 'Strategic planning and flawless execution. We manage timelines, budgets, and resources to ensure your engineering projects are delivered on schedule and within scope.',
    features: ['Project Lifecycle Management', 'Resource Allocation', 'Budgeting & Cost Control', 'Risk Management']
  },
  {
    id: 'contracting',
    title: 'General Engineering Contracting',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    description: 'Turnkey solutions for diverse engineering needs. As general contractors, we take full responsibility for project delivery, coordinating all technical disciplines.',
    features: ['Turnkey Project Delivery', 'Sub-contractor Management', 'Procurement & Logistics', 'Quality Assurance']
  }
];

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-blue-950 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 font-light">
            Integrated engineering solutions tailored to meet the most complex technical challenges.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {services.map((service, idx) => (
            <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-100 rounded-2xl -z-10 transform rotate-3"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-xl shadow-2xl w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-blue-800" />
                </div>
                <h2 className="text-4xl font-bold text-blue-950">{service.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link 
                    to="/request-quote" 
                    className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-md font-bold hover:bg-blue-900 transition-all shadow-lg"
                  >
                    Inquire About This Service <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-6">Have a specific project in mind?</h3>
          <p className="text-xl mb-10 opacity-90">Our engineers are ready to discuss your technical requirements and provide a custom solution.</p>
          <Link to="/contact" className="bg-white text-orange-600 px-10 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
