import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, ExternalLink, X, CheckCircle } from 'lucide-react';
import { Project, Client, User } from '../../types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    client_id: '',
    manager_id: '',
    description: '',
    category: 'Civil',
    status: 'Ongoing',
    progress: 0,
    deadline: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
      const [projectsRes, clientsRes, staffRes] = await Promise.all([
        fetch('/api/projects', { headers }),
        fetch('/api/clients', { headers }),
        fetch('/api/admin/staff', { headers })
      ]);
      
      const projectsData = await projectsRes.json();
      const clientsData = await clientsRes.json();
      const staffData = await staffRes.json();
      
      setProjects(projectsData);
      setClients(clientsData);
      setManagers(staffData);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowModal(false);
        fetchData();
        setFormData({
          name: '',
          client_id: '',
          manager_id: '',
          description: '',
          category: 'Civil',
          status: 'Ongoing',
          progress: 0,
          deadline: ''
        });
      }
    } catch (err) {
      console.error('Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Projects Management</h2>
          <p className="text-gray-500 text-sm">Manage and track all engineering projects</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-900 transition-all shadow-sm"
        >
          <Plus size={20} className="mr-2" /> Add New Project
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter size={18} className="mr-2" /> Filter
          </button>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-xs text-gray-500 uppercase font-bold">
                <th className="px-6 py-4">Project Details</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Manager</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.length > 0 ? projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{project.name}</div>
                    <div className="text-xs text-gray-500">{project.category}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{project.client_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{project.manager_name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-[80px]">
                        <div 
                          className={`h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-600'}`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(project.deadline).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 hover:bg-blue-50 text-blue-600 rounded transition-colors"><Edit2 size={16} /></button>
                      <button className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"><Trash2 size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 text-gray-600 rounded transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {loading ? 'Loading projects...' : 'No projects found. Add your first project to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Project</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Project Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Civil">Civil Engineering</option>
                    <option value="Electrical">Electrical Power</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Design">Engineering Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Client</label>
                  <select 
                    required
                    value={formData.client_id}
                    onChange={(e) => setFormData({...formData, client_id: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.company})</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Project Manager</label>
                  <select 
                    required
                    value={formData.manager_id}
                    onChange={(e) => setFormData({...formData, manager_id: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Manager</option>
                    {managers.map(m => <option key={m.user_id} value={m.user_id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Deadline</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Initial Progress (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-900 transition-all shadow-lg disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
