export interface User {
  id: number;
  username: string;
  full_name: string;
  role: 'Super Admin' | 'Project Manager' | 'Accountant' | 'HR Manager';
}

export interface Project {
  id: number;
  name: string;
  client_id: number;
  client_name?: string;
  manager_id: number;
  manager_name?: string;
  description: string;
  category: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
  progress: number;
  deadline: string;
  created_at: string;
}

export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Invoice {
  id: number;
  project_id: number;
  project_name?: string;
  client_id: number;
  client_name?: string;
  amount: number;
  status: 'Paid' | 'Pending';
  due_date: string;
  created_at: string;
}

export interface QuoteRequest {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
  budget_range: string;
  status: string;
  created_at: string;
}

export interface JobApplication {
  id: number;
  job_title: string;
  applicant_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export interface EngineeringDocument {
  id: number;
  name: string;
  category: string;
  file_path: string;
  project_id?: number;
  project_name?: string;
  uploaded_by: number;
  uploader_name?: string;
  created_at: string;
}
