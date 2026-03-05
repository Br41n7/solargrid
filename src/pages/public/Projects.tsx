import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ExternalLink, Calendar, MapPin } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Ado-Ekiti Road Expansion',
    category: 'Civil',
    status: 'Ongoing',
    location: 'Ado-Ekiti, Ekiti',
    date: '2025 - Present',
    image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=800',
    desc: 'Major infrastructure project involving the expansion of the main arterial road to 6 lanes with modern drainage.'
  },
  {
    id: 2,
    title: 'Sango Power Substation',
    category: 'Electrical',
    status: 'Completed',
    location: 'Ibadan, Oyo',
    date: '2024 - 2025',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    desc: 'Installation of a 33/11KV injection substation to improve power stability in the Sango industrial area.'
  },
  {
    id: 3,
    title: 'Lagos Industrial HVAC System',
    category: 'Mechanical',
    status: 'Completed',
    location: 'Ikeja, Lagos',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800',
    desc: 'Design and installation of a central HVAC system for a 10,000sqm manufacturing facility.'
  },
  {
    id: 4,
    title: 'Ekiti State Secretariat Design',
    category: 'Design',
    status: 'Completed',
    location: 'Ado-Ekiti, Ekiti',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800',
    desc: 'Comprehensive structural and electrical design for the new state secretariat complex.'
  },
  {
    id: 5,
    title: 'Rural Electrification Project',
    category: 'Electrical',
    status: 'Ongoing',
    location: 'Various, Ekiti',
    date: '2025 - Present',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
    desc: 'Extending the national grid to 15 underserved rural communities in Ekiti state.'
  },
  {
    id: 6,
    title: 'Bridge Structural Reinforcement',
    category: 'Civil',
    status: 'Completed',
    location: 'Ibadan, Oyo',
    date: '2023 - 2024',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
    desc: 'Emergency structural reinforcement and maintenance of the historic Sango bridge.'
  }
];

const categories = ['All', 'Civil', 'Electrical', 'Mechanical', 'Design'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-blue-950 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Project Portfolio</h1>
          <p className="text-xl text-blue-100 font-light">
            Showcasing our track record of engineering excellence across diverse sectors.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center text-gray-500 mr-4">
              <Filter className="h-5 w-5 mr-2" />
              <span className="font-semibold text-sm uppercase tracking-wider">Filter By:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-blue-800 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">{project.category}</span>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-800 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs pt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.location}
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                      <button className="text-blue-800 font-bold text-sm flex items-center hover:text-blue-950">
                        View Details <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
