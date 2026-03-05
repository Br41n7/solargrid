import { useState, useEffect } from 'react';
import { Search, MessageSquare, Clock, CheckCircle, XCircle, User, Building } from 'lucide-react';
import { QuoteRequest } from '../../types';

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      // Note: Backend route needs to be added to server.ts
      // For now, let's handle the case where it might fail
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (err) {
      console.error('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quote Requests</h2>
          <p className="text-gray-500 text-sm">Review and respond to new project inquiries</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search requests..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {quotes.length > 0 ? quotes.map((quote) => (
          <div key={quote.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {quote.service_type}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" /> {new Date(quote.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{quote.description.substring(0, 100)}...</h3>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center"><User size={16} className="mr-2 text-gray-400" /> {quote.name}</div>
                  <div className="flex items-center"><Building size={16} className="mr-2 text-gray-400" /> {quote.company}</div>
                  <div className="font-bold text-blue-800">Budget: {quote.budget_range}</div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-all text-sm">Respond</button>
                <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"><CheckCircle size={20} /></button>
                <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><XCircle size={20} /></button>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center bg-white rounded-xl border border-gray-100 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
            <p>{loading ? 'Loading requests...' : 'No new quote requests at the moment.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
