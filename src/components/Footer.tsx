import { Link } from 'react-router-dom';
import { HardHat, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <HardHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold tracking-tight">Breadith <span className="text-orange-500">Engineering</span></span>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            Delivering excellence through integrated engineering and technical solutions. We are committed to precision, innovation, and reliability in every project.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2">Quick Links</h3>
          <ul className="space-y-4 text-sm text-blue-100">
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-orange-500 transition-colors">Our Services</Link></li>
            <li><Link to="/projects" className="hover:text-orange-500 transition-colors">Projects Portfolio</Link></li>
            <li><Link to="/careers" className="hover:text-orange-500 transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2">Services</h3>
          <ul className="space-y-4 text-sm text-blue-100">
            <li>Civil Engineering Works</li>
            <li>Electrical Power Installations</li>
            <li>Mechanical Engineering</li>
            <li>Engineering Design</li>
            <li>Project Planning</li>
            <li>General Contracting</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2">Contact Us</h3>
          <ul className="space-y-4 text-sm text-blue-100">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
              <span>45, Adebayo St. Ado-ekiti, Ekiti-state</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-orange-500 shrink-0" />
              <span>+234 800 123 4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-orange-500 shrink-0" />
              <span>info@breadith.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-blue-900 text-center text-xs text-blue-300">
        <p>&copy; {new Date().getFullYear()} Breadith Engineering Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
