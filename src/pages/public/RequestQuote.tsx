import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Send, CheckCircle, FileText, Briefcase, DollarSign } from 'lucide-react';
import { useState } from 'react';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  service_type: z.string().min(1, 'Please select a service'),
  description: z.string().min(10, 'Please provide a brief project description'),
  budget_range: z.string().min(1, 'Please select a budget range'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function RequestQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema)
  });

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('file', fileInput.files[0]);
      }

      const response = await fetch('/api/public/quote', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (err) {
      console.error('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-2xl shadow-xl text-center border border-green-100"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out to SolaceGrid Engineering. Our technical team will review your requirements and contact you within 24-48 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-blue-800 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-900 transition-all"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="bg-blue-950 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Request a Quote</h1>
          <p className="text-xl text-blue-100 font-light">
            Tell us about your project, and let's build something exceptional together.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
            {/* Info Sidebar */}
            <div className="bg-blue-900 p-12 text-white space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Why SolaceGrid?</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-orange-500 shrink-0" />
                    <span className="text-blue-100 text-sm">Detailed technical assessment of your requirements.</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-orange-500 shrink-0" />
                    <span className="text-blue-100 text-sm">Transparent pricing with no hidden engineering costs.</span>
                  </li>
                  <li className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-orange-500 shrink-0" />
                    <span className="text-blue-100 text-sm">Expert advice on project feasibility and optimization.</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-8 border-t border-blue-800">
                <p className="text-blue-300 text-xs uppercase tracking-widest font-bold mb-4">Need Immediate Help?</p>
                <p className="text-xl font-bold">+234 800 123 4567</p>
                <p className="text-blue-200">support@solacegrid.com</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input 
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Company Name</label>
                    <input 
                      {...register('company')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="Acme Corp"
                    />
                    {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input 
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input 
                      {...register('phone')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                      placeholder="+234..."
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-blue-800" /> Service Type
                    </label>
                    <select 
                      {...register('service_type')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.service_type ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">Select a service</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Electrical Power">Electrical Power</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Engineering Design">Engineering Design</option>
                      <option value="Project Planning">Project Planning</option>
                      <option value="General Contracting">General Contracting</option>
                    </select>
                    {errors.service_type && <p className="text-red-500 text-xs">{errors.service_type.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-blue-800" /> Budget Range
                    </label>
                    <select 
                      {...register('budget_range')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.budget_range ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-white`}
                    >
                      <option value="">Select budget</option>
                      <option value="Below $10,000">Below $10,000</option>
                      <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                      <option value="$50,000 - $200,000">$50,000 - $200,000</option>
                      <option value="$200,000+">$200,000+</option>
                    </select>
                    {errors.budget_range && <p className="text-red-500 text-xs">{errors.budget_range.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-800" /> Project Description
                  </label>
                  <textarea 
                    {...register('description')}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    placeholder="Briefly describe your project requirements..."
                  />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-800" /> Attach Project Brief (Optional)
                  </label>
                  <input 
                    type="file"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : (
                    <>Send Quote Request <Send className="ml-2 h-5 w-5" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
