import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Download, Trash2, Filter, FolderOpen, X, Clock } from 'lucide-react';
import { EngineeringDocument, Project } from '../../types';

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<EngineeringDocument[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Drawing',
    project_id: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
      const [docsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/documents', { headers }),
        fetch('/api/projects', { headers })
      ]);
      const docsData = await docsRes.json();
      const projectsData = await projectsRes.json();
      setDocuments(docsData);
      setProjects(projectsData);
    } catch (err) {
      console.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    setSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('project_id', formData.project_id);
    data.append('file', formData.file);

    try {
      const response = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: data
      });
      if (response.ok) {
        setShowModal(false);
        fetchData();
        setFormData({ name: '', category: 'Drawing', project_id: '', file: null });
      }
    } catch (err) {
      console.error('Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Document Management</h2>
          <p className="text-gray-500 text-sm">Store and manage engineering drawings, contracts, and technical files</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-900 transition-all shadow-sm"
        >
          <Plus size={20} className="mr-2" /> Upload Document
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter size={18} className="mr-2" /> Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.length > 0 ? documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-800">
                <FileText size={24} />
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 truncate" title={doc.name}>{doc.name}</h3>
            <p className="text-xs text-blue-600 font-medium mb-4 uppercase tracking-wider">{doc.category}</p>
            
            <div className="space-y-2 text-xs text-gray-500 mb-6">
              <div className="flex items-center"><FolderOpen size={12} className="mr-2" /> {doc.project_name || 'General'}</div>
              <div className="flex items-center"><Clock size={12} className="mr-1" /> {new Date(doc.created_at).toLocaleDateString()}</div>
            </div>

            <a 
              href={doc.file_path} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-gray-50 hover:bg-blue-800 hover:text-white text-gray-700 font-bold py-2 rounded flex items-center justify-center transition-all text-xs"
            >
              <Download size={14} className="mr-2" /> Download File
            </a>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-gray-100 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-10" />
            <p>{loading ? 'Loading documents...' : 'No documents found. Upload your first technical file.'}</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Upload Technical Document</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Document Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g. Structural Drawing Rev A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Drawing">Engineering Drawing</option>
                    <option value="Contract">Contract / Agreement</option>
                    <option value="Report">Technical Report</option>
                    <option value="Permit">Permit / Approval</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Project (Optional)</label>
                  <select 
                    value={formData.project_id}
                    onChange={(e) => setFormData({...formData, project_id: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">General / No Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Select File</label>
                <input 
                  type="file" 
                  required 
                  onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
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
                  {submitting ? 'Uploading...' : 'Start Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
