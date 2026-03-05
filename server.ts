import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import multer from 'multer';
import fs from 'fs';

const db = new Database('solacegrid.db');

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    full_name TEXT,
    role TEXT CHECK(role IN ('Super Admin', 'Project Manager', 'Accountant', 'HR Manager')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    client_id INTEGER,
    manager_id INTEGER,
    description TEXT,
    category TEXT,
    status TEXT CHECK(status IN ('Ongoing', 'Completed')),
    progress INTEGER DEFAULT 0,
    deadline DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(client_id) REFERENCES clients(id),
    FOREIGN KEY(manager_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    client_id INTEGER,
    amount REAL,
    status TEXT CHECK(status IN ('Paid', 'Pending')),
    due_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(client_id) REFERENCES clients(id)
  );

  CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    department TEXT,
    position TEXT,
    salary REAL,
    attendance_count INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    service_type TEXT,
    description TEXT,
    budget_range TEXT,
    file_path TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title TEXT,
    applicant_name TEXT,
    email TEXT,
    phone TEXT,
    cv_path TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    file_path TEXT,
    project_id INTEGER,
    uploaded_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(uploaded_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed initial admin if not exists
const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)').run(
    'admin',
    hashedPassword,
    'Super Admin',
    'Super Admin'
  );
}

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'solacegrid-secret-key';

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role, full_name: user.full_name } });
});

// Dashboard Stats
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const totalProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get() as any;
  const ongoingProjects = db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'Ongoing'").get() as any;
  const completedProjects = db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'Completed'").get() as any;
  const totalRevenue = db.prepare("SELECT SUM(amount) as sum FROM invoices WHERE status = 'Paid'").get() as any;
  const pendingInvoices = db.prepare("SELECT COUNT(*) as count FROM invoices WHERE status = 'Pending'").get() as any;
  const staffCount = db.prepare('SELECT COUNT(*) as count FROM staff').get() as any;

  res.json({
    totalProjects: totalProjects.count,
    ongoingProjects: ongoingProjects.count,
    completedProjects: completedProjects.count,
    totalRevenue: totalRevenue.sum || 0,
    pendingInvoices: pendingInvoices.count,
    staffCount: staffCount.count
  });
});

// Projects
app.get('/api/projects', (req, res) => {
  const projects = db.prepare(`
    SELECT p.*, c.name as client_name, u.full_name as manager_name 
    FROM projects p 
    LEFT JOIN clients c ON p.client_id = c.id 
    LEFT JOIN users u ON p.manager_id = u.id
  `).all();
  res.json(projects);
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const { name, client_id, manager_id, description, category, status, progress, deadline } = req.body;
  const result = db.prepare(`
    INSERT INTO projects (name, client_id, manager_id, description, category, status, progress, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, client_id, manager_id, description, category, status, progress, deadline);
  res.json({ id: result.lastInsertRowid });
});

// Clients
app.get('/api/clients', authenticateToken, (req, res) => {
  const clients = db.prepare('SELECT * FROM clients').all();
  res.json(clients);
});

app.post('/api/clients', authenticateToken, (req, res) => {
  const { name, company, email, phone, address } = req.body;
  const result = db.prepare('INSERT INTO clients (name, company, email, phone, address) VALUES (?, ?, ?, ?, ?)').run(name, company, email, phone, address);
  res.json({ id: result.lastInsertRowid });
});

// Invoices
app.get('/api/invoices', authenticateToken, (req, res) => {
  const invoices = db.prepare(`
    SELECT i.*, p.name as project_name, c.name as client_name 
    FROM invoices i 
    JOIN projects p ON i.project_id = p.id 
    JOIN clients c ON i.client_id = c.id
  `).all();
  res.json(invoices);
});

// Quote Requests
app.get('/api/admin/quotes', authenticateToken, (req, res) => {
  const quotes = db.prepare('SELECT * FROM quote_requests ORDER BY created_at DESC').all();
  res.json(quotes);
});

// Staff
app.get('/api/admin/staff', authenticateToken, (req, res) => {
  const staff = db.prepare(`
    SELECT s.*, u.full_name as name, u.role 
    FROM staff s 
    JOIN users u ON s.user_id = u.id
  `).all();
  res.json(staff);
});

// Logs
app.get('/api/admin/logs', authenticateToken, (req, res) => {
  const logs = db.prepare(`
    SELECT l.*, u.full_name 
    FROM audit_logs l 
    JOIN users u ON l.user_id = u.id 
    ORDER BY l.created_at DESC
  `).all();
  res.json(logs);
});

// Documents
app.get('/api/admin/documents', authenticateToken, (req, res) => {
  const docs = db.prepare(`
    SELECT d.*, p.name as project_name, u.full_name as uploader_name 
    FROM documents d 
    LEFT JOIN projects p ON d.project_id = p.id 
    LEFT JOIN users u ON d.uploaded_by = u.id
    ORDER BY d.created_at DESC
  `).all();
  res.json(docs);
});

app.post('/api/admin/documents', authenticateToken, upload.single('file'), (req, res) => {
  const { name, category, project_id } = req.body;
  const file_path = req.file ? `/uploads/${req.file.filename}` : null;
  const uploaded_by = (req as any).user.id;

  const result = db.prepare(`
    INSERT INTO documents (name, category, file_path, project_id, uploaded_by)
    VALUES (?, ?, ?, ?, ?)
  `).run(name, category, file_path, project_id, uploaded_by);

  res.json({ id: result.lastInsertRowid, file_path });
});

// Public Forms
app.post('/api/public/quote', upload.single('file'), (req, res) => {
  const { name, company, email, phone, service_type, description, budget_range } = req.body;
  const file_path = req.file ? `/uploads/${req.file.filename}` : null;
  
  db.prepare(`
    INSERT INTO quote_requests (name, company, email, phone, service_type, description, budget_range, file_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, company, email, phone, service_type, description, budget_range, file_path);
  res.json({ success: true });
});

app.post('/api/public/careers', upload.single('cv'), (req, res) => {
  const { job_title, applicant_name, email, phone } = req.body;
  const cv_path = req.file ? `/uploads/${req.file.filename}` : null;

  db.prepare(`
    INSERT INTO job_applications (job_title, applicant_name, email, phone, cv_path)
    VALUES (?, ?, ?, ?, ?)
  `).run(job_title, applicant_name, email, phone, cv_path);
  res.json({ success: true });
});

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// --- Vite Integration ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
