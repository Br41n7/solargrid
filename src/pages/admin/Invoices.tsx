import { useState, useEffect } from 'react';
import { Plus, Search, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { Invoice } from '../../types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      console.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (invoice: Invoice) => {
    const doc = new jsPDF() as any;
    doc.setFontSize(20);
    doc.text('SolaceGrid Engineering Ltd', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('45, Adebayo St. Ado-ekiti, Ekiti-state', 105, 26, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('INVOICE', 20, 45);
    
    doc.setFontSize(10);
    doc.text(`Invoice #: INV-00${invoice.id}`, 20, 55);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 20, 60);
    doc.text(`Status: ${invoice.status}`, 20, 65);
    
    doc.text('Bill To:', 140, 45);
    doc.text(invoice.client_name || 'Client', 140, 50);
    
    doc.autoTable({
      startY: 80,
      head: [['Description', 'Project', 'Amount']],
      body: [
        ['Engineering Services', invoice.project_name || 'Project', `$${invoice.amount.toLocaleString()}`]
      ],
    });
    
    doc.text(`Total Amount: $${invoice.amount.toLocaleString()}`, 140, doc.lastAutoTable.finalY + 10);
    
    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Invoices & Quotations</h2>
          <p className="text-gray-500 text-sm">Manage billing and financial documents</p>
        </div>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-900 transition-all shadow-sm">
          <Plus size={20} className="mr-2" /> Create Invoice
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {invoices.length > 0 ? invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-blue-800">#INV-00{inv.id}</td>
                <td className="px-6 py-4 text-gray-600">{inv.project_name}</td>
                <td className="px-6 py-4 text-gray-600">{inv.client_name}</td>
                <td className="px-6 py-4 font-bold">${inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center w-fit px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {inv.status === 'Paid' ? <CheckCircle size={10} className="mr-1" /> : <Clock size={10} className="mr-1" />}
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(inv.due_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => generatePDF(inv)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  {loading ? 'Loading invoices...' : 'No invoices found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
