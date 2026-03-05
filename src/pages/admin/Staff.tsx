import { useState, useEffect } from 'react';
import { Plus, Search, User, Shield, Calendar, DollarSign } from 'lucide-react';

export default function AdminStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/admin/staff', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
          <p className="text-gray-500 text-sm">Manage employee profiles, roles, and payroll</p>
        </div>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-900 transition-all shadow-sm">
          <Plus size={20} className="mr-2" /> Add Staff Member
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staff.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6 items-start">
            <div className="h-20 w-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-800 shrink-0">
              <User size={40} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{s.position}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  {s.role}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Shield size={16} className="mr-2 text-gray-400" /> {s.dept}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2 text-gray-400" /> {s.attendance}% Attendance
                </div>
                <div className="flex items-center text-gray-600 col-span-2">
                  <DollarSign size={16} className="mr-2 text-gray-400" /> ${s.salary.toLocaleString()} / month
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex gap-2">
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2 rounded text-xs transition-all">View Profile</button>
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-2 rounded text-xs transition-all">Manage Payroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
