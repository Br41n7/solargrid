import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle, FileText } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Civil Engineer',
    department: 'Engineering',
    location: 'Ado-Ekiti, Ekiti',
    type: 'Full-time',
    desc: 'We are looking for an experienced Civil Engineer to lead our infrastructure projects in Ekiti state.',
    requirements: ['B.Eng in Civil Engineering', 'COREN Registration', '7+ years experience', 'Proficiency in AutoCAD/Civil 3D']
  },
  {
    id: 2,
    title: 'Electrical Project Manager',
    department: 'Power Systems',
    location: 'Ibadan, Oyo',
    type: 'Full-time',
    desc: 'Join our power systems division to manage substation installations and grid extension projects.',
    requirements: ['B.Eng in Electrical Engineering', 'Project Management Certification', '5+ years experience', 'Experience with high-voltage systems']
  },
  {
    id: 3,
    title: 'Mechanical Technician',
    department: 'Mechanical',
    location: 'Ikeja, Lagos',
    type: 'Contract',
    desc: 'Skilled technician needed for HVAC and industrial piping installations across our Lagos projects.',
    requirements: ['HND/OND in Mechanical Engineering', '3+ years field experience', 'Strong troubleshooting skills']
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('job_title', selectedJob.title);

    try {
      const response = await fetch('/api/public/careers', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Application failed');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-blue-950 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-blue-100 font-light">
            Build your career with a company that values technical excellence and innovation.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Growth Opportunities', icon: Briefcase, desc: 'We invest in our people through continuous training and mentorship.' },
            { title: 'Innovative Projects', icon: CheckCircle, desc: 'Work on challenging engineering projects that make a real impact.' },
            { title: 'Great Culture', icon: Clock, desc: 'A collaborative environment built on integrity and mutual respect.' },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-blue-950">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">Open Positions</h2>
            <h3 className="text-4xl font-bold text-blue-950">Current Opportunities</h3>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <motion.div 
                key={job.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{job.department}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{job.type}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-blue-950">{job.title}</h4>
                  <div className="flex items-center text-gray-500 text-sm space-x-6">
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="bg-blue-800 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-900 transition-all flex items-center justify-center"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-blue-900 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Apply for {selectedJob.title}</h3>
                <p className="text-blue-200 text-sm">{selectedJob.department} | {selectedJob.location}</p>
              </div>
              <button onClick={() => { setSelectedJob(null); setSubmitted(false); }} className="text-white/50 hover:text-white">
                <Clock className="h-8 w-8 rotate-45" />
              </button>
            </div>

            <div className="p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-blue-950">Application Submitted!</h4>
                  <p className="text-gray-600">Thank you for your interest in Breadith. Our HR team will review your application and contact you if your profile matches our needs.</p>
                  <button onClick={() => { setSelectedJob(null); setSubmitted(false); }} className="bg-blue-800 text-white px-8 py-3 rounded-md font-bold">Close</button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input name="applicant_name" type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input name="phone" type="tel" required className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Upload CV (PDF)</label>
                    <input name="cv" type="file" required className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button type="submit" className="w-full bg-blue-800 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-900 transition-all">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
