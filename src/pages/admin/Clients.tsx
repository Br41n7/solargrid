import { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Client } from '../../types';

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Client Management</h2>
          <p className="text-gray-500 text-sm">Manage your client database and relationships</p>
        </div>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-900 transition-all shadow-sm">
          <Plus size={20} className="mr-2" /> Add New Client
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length > 0 ? clients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">
                {client.name.charAt(0)}
              </div>
              <div className="flex space-x-1">
                <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-full transition-colors"><Edit2 size={16} /></button>
                <button className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
            <p className="text-sm text-blue-600 font-medium mb-4">{client.company}</p>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center"><Mail size={16} className="mr-2 text-gray-400" /> {client.email}</div>
              <div className="flex items-center"><Phone size={16} className="mr-2 text-gray-400" /> {client.phone}</div>
              <div className="flex items-start"><MapPin size={16} className="mr-2 text-gray-400 mt-1" /> {client.address}</div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            {loading ? 'Loading clients...' : 'No clients found. Add your first client to get started.'}
          </div>
        )}
      </div>
    </div>
  );
}
