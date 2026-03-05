import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
      const [statsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/projects', { headers })
      ]);
      
      const statsData = await statsRes.json();
      const projectsData = await projectsRes.json();
      
      setStats(statsData);
      setRecentProjects(projectsData.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading Dashboard...</div>;

  const statCards = [
    { label: 'Total Projects', value: stats?.totalProjects, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Ongoing', value: stats?.ongoingProjects, icon: Clock, color: 'bg-orange-500' },
    { label: 'Completed', value: stats?.completedProjects, icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Total Revenue', value: `$${stats?.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-indigo-600' },
    { label: 'Pending Invoices', value: stats?.pendingInvoices, icon: AlertCircle, color: 'bg-red-500' },
    { label: 'Staff Count', value: stats?.staffCount, icon: Users, color: 'bg-purple-500' },
  ];

  const chartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white`}>
              <card.icon size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Project Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500 uppercase font-bold">
                <th className="pb-4">Project Name</th>
                <th className="pb-4">Client</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Progress</th>
                <th className="pb-4">Deadline</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentProjects.length > 0 ? recentProjects.map((project) => (
                <tr key={project.id} className="border-b border-gray-50">
                  <td className="py-4 font-medium">{project.name}</td>
                  <td className="py-4">{project.client_name || 'N/A'}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="w-full bg-gray-100 rounded-full h-2 max-w-[100px]">
                      <div 
                        className={`h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'}`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500">{new Date(project.deadline).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">No recent projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
