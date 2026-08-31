import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dpssksn-secure-school-token-secret-2026";
const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const NOTICES_FILE = path.join(DATA_DIR, "notices.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const PHOTOS_FILE = path.join(DATA_DIR, "photos.json");

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer setup for attachments
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (_req, file, cb) => {
    // Allow PDFs, images, docs, text
    const allowed = /\.(pdf|doc|docx|jpg|jpeg|png|webp|gif|txt)$/i;
    if (file.originalname.match(allowed)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, Document, and Image files are allowed."));
    }
  },
});

// Helper Functions for Data Persistence
function readJSON<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJSON<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initialize Admin & Initial Notices if not existing
function initializeDatabase() {
  // Admin setup - Always ensure owner account dpssksn@gmail.com is configured
  const defaultEmail = "dpssksn@gmail.com";
  const defaultPassword = "dpssksn@";
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
  
  writeJSON(ADMIN_FILE, {
    id: "admin-1",
    email: defaultEmail,
    name: "Somnath Pal (Headmaster)",
    passwordHash: hashedPassword,
    role: "superadmin",
    lastLogin: new Date().toISOString(),
  });
  console.log("Initialized official owner admin account:", defaultEmail);

  // Photos setup - start empty so only owner attached photos appear
  const existingPhotos = readJSON(PHOTOS_FILE, null);
  if (!existingPhotos) {
    writeJSON(PHOTOS_FILE, {
      heroPhoto: null,
      galleryPhotos: [],
    });
  }

  // Notices setup
  const existingNotices = readJSON(NOTICES_FILE, null);
  if (!existingNotices || !Array.isArray(existingNotices) || existingNotices.length === 0) {
    const initialNotices = [
      {
        id: "notice-1",
        refNumber: "DPSS/SKSN/2026/08-01",
        title: "Summative Evaluation & Term-End Examination Schedule 2026",
        category: "Examination",
        content: `This is to notify all students from Class V to Class XII that the 2nd Summative Evaluation / Mid-Term Examinations will commence from September 15, 2026. 

Students are required to collect their detailed admit cards and examination timetable from their respective class teachers by September 10, 2026.

Important Instructions:
1. Reporting time at the school examination hall is strictly 10:15 AM.
2. Students must be in full official school uniform with identity cards.
3. No electronic devices, smartwatches, or calculators are permitted inside the examination halls.
4. Guardians are requested to ensure regular attendance and revision prior to the evaluation.

By order of the Headmaster & Academic Council,
Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan.`,
        summary: "Detailed schedule and guidelines for the 2nd Summative Evaluation & Mid-Term Examinations commencing September 15, 2026.",
        attachment: {
          name: "Exam_Schedule_Timetable_2026.pdf",
          url: "/sample-exam-routine.pdf",
          size: "245 KB",
          type: "pdf",
        },
        status: "published",
        isPinned: true,
        isSample: true,
        targetAudience: "Students",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        createdBy: "Headmaster Office",
        views: 142,
      },
      {
        id: "notice-2",
        refNumber: "DPSS/SKSN/2026/08-02",
        title: "Annual Inter-School Science & Innovation Exhibition Registration",
        category: "Academic",
        content: `All students of Classes VIII through XII are cordially invited to participate in the Annual Inter-School Science & Environmental Innovation Fair 2026.

Themes for Project Submissions:
- Renewable Energy & Rural Sustainable Technology
- Biodiversity Conservation in Bengal Wetlands & Agro-Ecology
- Robotics & Smart Automation for Clean Water & Sanitation
- Health, Nutrition, and Traditional Herbal Science

Interested students may register their models/projects in teams of up to 3 members with the Science Department (Sri P. K. Banerjee / Smt. A. Mukherjee) on or before September 12, 2026. Selected projects will represent our institution at the District Science Exhibition.`,
        summary: "Call for model submissions and project registrations for the Annual Science Fair 2026 across Classes 8 to 12.",
        attachment: {
          name: "Science_Fair_Guidelines_Rules.pdf",
          url: "/sample-science-guidelines.pdf",
          size: "180 KB",
          type: "pdf",
        },
        status: "published",
        isPinned: true,
        isSample: true,
        targetAudience: "All",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        createdBy: "Science Club Coordinator",
        views: 89,
      },
      {
        id: "notice-3",
        refNumber: "DPSS/SKSN/2026/08-03",
        title: "Parent-Teacher Interaction Meeting (Classes IX & X)",
        category: "General",
        content: `A General Parent-Teacher Meeting (PTM) for students of Madhyamik batch (Classes IX & X) has been scheduled for Saturday, September 6, 2026, between 11:30 AM and 2:30 PM in the School Main Auditorium.

Agenda:
1. Review of Unit Test performance and academic progress.
2. Remedial classes and special doubt-clearing sessions for Mathematics and Physical Science.
3. Attendance monitoring and preparation for Board examinations.
4. Student wellness and career orientation counseling.

Both parents/guardians are earnestly requested to attend this vital session.`,
        summary: "Parent-Teacher meeting for Classes IX & X regarding academic performance and board preparation.",
        attachment: null,
        status: "published",
        isPinned: false,
        isSample: true,
        targetAudience: "Parents",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        createdBy: "Secretary, Academic Council",
        views: 64,
      },
      {
        id: "notice-4",
        refNumber: "DPSS/SKSN/2026/08-04",
        title: "School Closure for Janmashtami Celebration",
        category: "Holiday",
        content: `This is to inform all teachers, staff, students, and guardians that the school will remain closed on Thursday, September 4, 2026, on the auspicious occasion of Sri Krishna Janmashtami.

Normal school classes and administrative office operations will resume on Friday, September 5, 2026, following the regular timetable.

Warm wishes to all members of the Deshbandhu Palli Seva Sangha family on this festive day.`,
        summary: "School holiday announcement for Sri Krishna Janmashtami on September 4, 2026.",
        attachment: null,
        status: "published",
        isPinned: false,
        isSample: true,
        targetAudience: "All",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        createdBy: "Administrative Office",
        views: 110,
      },
      {
        id: "notice-5",
        refNumber: "DPSS/SKSN/2026/08-05",
        title: "Annual Sports Meet & Athletic Trials Announcement",
        category: "Sports & Culture",
        content: `The Department of Physical Education is pleased to announce the schedule for the Annual Athletic Trials for the upcoming Winter Sports Meet 2026.

Events include:
- 100m, 200m, 400m Sprint & Relay Races
- Long Jump, High Jump, and Shot Put
- Inter-House Football and Kabaddi Tournament Selection
- Yoga & Gymnastics Demonstrations

House Captains and interested athletes are advised to assemble at the school playground everyday after 3:30 PM with proper sports attire.`,
        summary: "Annual Sports trials and house team selections commencing next week at the school playground.",
        attachment: {
          name: "Sports_Events_Categories.jpg",
          url: "/sample-sports-notice.jpg",
          size: "420 KB",
          type: "image",
        },
        status: "published",
        isPinned: false,
        isSample: true,
        targetAudience: "Students",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(), // 9 days ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
        createdBy: "Physical Education Dept",
        views: 78,
      },
      {
        id: "notice-6",
        refNumber: "DPSS/SKSN/2026/DRAFT-01",
        title: "Draft: Upcoming Puja Vacation Assignment Guidelines & Project Work",
        category: "Academic",
        content: `Draft notification outlining holiday homework and model project assignments for all classes prior to Durga Puja 2026 break. Teachers are finalizing subject syllabus breakdown.`,
        summary: "Internal draft for upcoming festival holiday homework and project submissions.",
        attachment: null,
        status: "draft",
        isPinned: false,
        isSample: true,
        targetAudience: "Teachers",
        publishedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        createdBy: "Headmaster Office",
        views: 0,
      }
    ];

    writeJSON(NOTICES_FILE, initialNotices);
    console.log("Initialized sample notices in database.");
  }
}

// Authentication Middleware
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Authentication token required." });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired session token. Please log in again." });
  }
}

async function startServer() {
  initializeDatabase();

  const app = express();
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Serve static uploaded files
  app.use("/uploads", express.static(UPLOAD_DIR));

  // -------------------------------------------------------------
  // PUBLIC API ROUTES
  // -------------------------------------------------------------

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      school: "Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan",
      timestamp: new Date().toISOString(),
    });
  });

  // Get published notices (PUBLIC)
  app.get("/api/notices", (req, res) => {
    try {
      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const { category, search, limit, target } = req.query;

      // Filter only PUBLISHED notices for visitors
      let filtered = notices.filter((n) => n.status === "published");

      if (category && typeof category === "string" && category !== "All") {
        filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
      }

      if (target && typeof target === "string" && target !== "All") {
        filtered = filtered.filter((n) => n.targetAudience === target || n.targetAudience === "All");
      }

      if (search && typeof search === "string" && search.trim()) {
        const query = search.toLowerCase().trim();
        filtered = filtered.filter(
          (n) =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query) ||
            (n.refNumber && n.refNumber.toLowerCase().includes(query)) ||
            n.category.toLowerCase().includes(query)
        );
      }

      // Sort: Pinned first, then by publishedAt newest first
      filtered.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

      if (limit && !isNaN(Number(limit))) {
        filtered = filtered.slice(0, Number(limit));
      }

      res.json({
        success: true,
        count: filtered.length,
        notices: filtered,
      });
    } catch (err) {
      console.error("Error fetching public notices:", err);
      res.status(500).json({ error: "Failed to retrieve notices." });
    }
  });

  // Get single notice by ID (PUBLIC)
  app.get("/api/notices/:id", (req, res) => {
    try {
      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const noticeIndex = notices.findIndex((n) => n.id === req.params.id);

      if (noticeIndex === -1) {
        return res.status(404).json({ error: "Notice not found." });
      }

      const notice = notices[noticeIndex];
      // Only allow public viewing if published
      if (notice.status !== "published") {
        return res.status(403).json({ error: "This notice is currently a draft and not published." });
      }

      // Increment view count
      notice.views = (notice.views || 0) + 1;
      notices[noticeIndex] = notice;
      writeJSON(NOTICES_FILE, notices);

      res.json({ success: true, notice });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve notice." });
    }
  });

  // Submit Contact Inquiry (PUBLIC)
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const messages = readJSON<any[]>(MESSAGES_FILE, []);
      const newMessage = {
        id: `msg-${Date.now()}-${Math.round(Math.random() * 1000)}`,
        name: String(name).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : "",
        subject: subject ? String(subject).trim() : "General Inquiry",
        message: String(message).trim(),
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      messages.unshift(newMessage);
      writeJSON(MESSAGES_FILE, messages);

      res.json({
        success: true,
        message: "Thank you. Your message has been delivered to the school administration.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to submit message." });
    }
  });

  // -------------------------------------------------------------
  // PUBLIC PHOTO & MEDIA ROUTES
  // -------------------------------------------------------------
  app.get("/api/photos", (_req, res) => {
    try {
      const defaultPhotos = { 
        logoPhoto: null,
        heroPhoto: null, 
        aboutPhoto: null,
        facilityPhotos: null,
        galleryPhotos: [] 
      };
      const data = readJSON<any>(PHOTOS_FILE, defaultPhotos);
      res.json({
        success: true,
        logoPhoto: data.logoPhoto || null,
        heroPhoto: data.heroPhoto || null,
        aboutPhoto: data.aboutPhoto || null,
        facilityPhotos: data.facilityPhotos || null,
        galleryPhotos: Array.isArray(data.galleryPhotos) ? data.galleryPhotos : [],
      });
    } catch (err) {
      res.json({ success: true, logoPhoto: null, heroPhoto: null, aboutPhoto: null, facilityPhotos: null, galleryPhotos: [] });
    }
  });

  // -------------------------------------------------------------
  // AUTHENTICATION ROUTES
  // -------------------------------------------------------------

  // Admin Login
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      let admin = readJSON<any>(ADMIN_FILE, null);
      if (!admin) {
        initializeDatabase();
        admin = readJSON<any>(ADMIN_FILE, null);
      }

      const cleanEmail = String(email).toLowerCase().trim();
      const cleanPass = String(password);

      // Direct owner credential match
      const isOwnerMatch = cleanEmail === "dpssksn@gmail.com" && cleanPass === "dpssksn@";
      const isEmailMatch = admin ? admin.email.toLowerCase() === cleanEmail : false;
      const isPassMatch = admin ? bcrypt.compareSync(cleanPass, admin.passwordHash) : false;

      if (!isOwnerMatch && (!isEmailMatch || !isPassMatch)) {
        return res.status(401).json({ error: "Invalid admin credentials. Authorized access only." });
      }

      // Update last login
      if (admin) {
        admin.lastLogin = new Date().toISOString();
        writeJSON(ADMIN_FILE, admin);
      }

      // Sign JWT token
      const token = jwt.sign(
        {
          id: admin?.id || "admin-1",
          email: "dpssksn@gmail.com",
          role: "superadmin",
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: {
          id: admin?.id || "admin-1",
          email: "dpssksn@gmail.com",
          name: admin?.name || "Official School Secretariat",
          role: "superadmin",
          lastLogin: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed due to server error." });
    }
  });

  // Verify Current Session
  app.get("/api/auth/me", authenticateAdmin, (req: AuthRequest, res: Response) => {
    const admin = readJSON<any>(ADMIN_FILE, null);
    if (!admin) {
      return res.status(404).json({ error: "Admin profile not found." });
    }

    res.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  });

  // Change Admin Password
  app.post("/api/auth/change-password", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current and new password are required." });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters long." });
      }

      const admin = readJSON<any>(ADMIN_FILE, null);
      if (!admin) {
        return res.status(404).json({ error: "Admin profile not found." });
      }

      if (!bcrypt.compareSync(currentPassword, admin.passwordHash)) {
        return res.status(400).json({ error: "Current password is incorrect." });
      }

      admin.passwordHash = bcrypt.hashSync(newPassword, 10);
      writeJSON(ADMIN_FILE, admin);

      res.json({ success: true, message: "Password updated successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to update password." });
    }
  });

  // -------------------------------------------------------------
  // ADMIN NOTICE MANAGEMENT (PROTECTED)
  // -------------------------------------------------------------

  // Get All Notices (Admin - including drafts)
  app.get("/api/admin/notices", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const { status, category, search } = req.query;

      let filtered = [...notices];

      if (status && typeof status === "string" && status !== "All") {
        filtered = filtered.filter((n) => n.status === status);
      }

      if (category && typeof category === "string" && category !== "All") {
        filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
      }

      if (search && typeof search === "string" && search.trim()) {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q) ||
            (n.refNumber && n.refNumber.toLowerCase().includes(q))
        );
      }

      // Sort newest updated or created first
      filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

      res.json({
        success: true,
        count: filtered.length,
        notices: filtered,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve admin notices." });
    }
  });

  // Create Notice (Admin)
  app.post("/api/admin/notices", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { title, content, summary, category, status, isPinned, attachment, targetAudience, refNumber, publishedAt } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and notice content are required." });
      }

      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const now = new Date().toISOString();
      const newNotice = {
        id: `notice-${Date.now()}-${Math.round(Math.random() * 1000)}`,
        refNumber: refNumber ? String(refNumber).trim() : `DPSS/SKSN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
        title: String(title).trim(),
        category: category || "General",
        content: String(content).trim(),
        summary: summary ? String(summary).trim() : String(content).trim().slice(0, 150) + "...",
        attachment: attachment || null,
        status: status === "draft" ? "draft" : "published",
        isPinned: Boolean(isPinned),
        isSample: false,
        targetAudience: targetAudience || "All",
        publishedAt: publishedAt || now,
        createdAt: now,
        updatedAt: now,
        createdBy: req.user?.email || "Admin",
        views: 0,
      };

      notices.unshift(newNotice);
      writeJSON(NOTICES_FILE, notices);

      res.status(201).json({
        success: true,
        notice: newNotice,
        message: newNotice.status === "published" ? "Notice published successfully!" : "Notice saved as draft.",
      });
    } catch (err) {
      console.error("Error creating notice:", err);
      res.status(500).json({ error: "Failed to create notice." });
    }
  });

  // Edit Notice (Admin)
  app.put("/api/admin/notices/:id", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { title, content, summary, category, status, isPinned, attachment, targetAudience, refNumber, publishedAt } = req.body;

      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const index = notices.findIndex((n) => n.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Notice not found." });
      }

      const existing = notices[index];
      const now = new Date().toISOString();

      const updatedNotice = {
        ...existing,
        title: title !== undefined ? String(title).trim() : existing.title,
        content: content !== undefined ? String(content).trim() : existing.content,
        summary: summary !== undefined ? String(summary).trim() : existing.summary,
        category: category || existing.category,
        status: status || existing.status,
        isPinned: isPinned !== undefined ? Boolean(isPinned) : existing.isPinned,
        attachment: attachment !== undefined ? attachment : existing.attachment,
        targetAudience: targetAudience || existing.targetAudience,
        refNumber: refNumber !== undefined ? String(refNumber).trim() : existing.refNumber,
        publishedAt: publishedAt || existing.publishedAt,
        updatedAt: now,
      };

      notices[index] = updatedNotice;
      writeJSON(NOTICES_FILE, notices);

      res.json({
        success: true,
        notice: updatedNotice,
        message: "Notice updated successfully.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to update notice." });
    }
  });

  // Toggle Notice Status (Quick Publish / Unpublish)
  app.patch("/api/admin/notices/:id/status", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (status !== "draft" && status !== "published") {
        return res.status(400).json({ error: "Status must be 'draft' or 'published'." });
      }

      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const index = notices.findIndex((n) => n.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Notice not found." });
      }

      notices[index].status = status;
      notices[index].updatedAt = new Date().toISOString();
      if (status === "published" && !notices[index].publishedAt) {
        notices[index].publishedAt = new Date().toISOString();
      }

      writeJSON(NOTICES_FILE, notices);

      res.json({
        success: true,
        notice: notices[index],
        message: status === "published" ? "Notice is now published publicly." : "Notice reverted to draft.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to change notice status." });
    }
  });

  // Delete Notice (Admin)
  app.delete("/api/admin/notices/:id", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const initialLength = notices.length;

      const filtered = notices.filter((n) => n.id !== id);

      if (filtered.length === initialLength) {
        return res.status(404).json({ error: "Notice not found." });
      }

      writeJSON(NOTICES_FILE, filtered);

      res.json({
        success: true,
        message: "Notice deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete notice." });
    }
  });

  // Upload Notice Attachment (PDF / Image / Doc)
  app.post("/api/admin/upload", authenticateAdmin, upload.single("file"), (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file was uploaded." });
      }

      const file = req.file;
      const ext = path.extname(file.originalname).toLowerCase();
      let fileType: 'pdf' | 'image' | 'doc' | 'other' = "other";

      if (ext === ".pdf") fileType = "pdf";
      else if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) fileType = "image";
      else if ([".doc", ".docx", ".txt"].includes(ext)) fileType = "doc";

      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      const attachmentInfo = {
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        size: formattedSize,
        type: fileType,
      };

      res.json({
        success: true,
        attachment: attachmentInfo,
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "File upload failed." });
    }
  });

  // -------------------------------------------------------------
  // ADMIN PHOTO & CAMPUS MEDIA MANAGEMENT
  // -------------------------------------------------------------

  // Upload Photo File (Campus / Hero / Gallery)
  app.post("/api/admin/photos/upload", authenticateAdmin, upload.single("photo"), (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided." });
      }
      res.json({
        success: true,
        url: `/uploads/${req.file.filename}`,
        name: req.file.originalname,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to upload photo." });
    }
  });

  // Set / Update School Logo
  app.post("/api/admin/photos/logo", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "Logo URL or uploaded image is required." });
      }

      const photos = readJSON<any>(PHOTOS_FILE, { logoPhoto: null, heroPhoto: null, galleryPhotos: [] });
      photos.logoPhoto = {
        url: String(url).trim(),
        updatedAt: new Date().toISOString(),
        updatedBy: req.user?.email || "Owner / Admin",
      };
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        logoPhoto: photos.logoPhoto,
        message: "School logo updated successfully and is now active across the entire website.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to save logo." });
    }
  });

  // Reset / Delete Custom School Logo (reverts to default emblem)
  app.delete("/api/admin/photos/logo", authenticateAdmin, (_req: AuthRequest, res: Response) => {
    try {
      const photos = readJSON<any>(PHOTOS_FILE, { logoPhoto: null, heroPhoto: null, galleryPhotos: [] });
      photos.logoPhoto = null;
      writeJSON(PHOTOS_FILE, photos);
      res.json({ success: true, message: "Logo reset to official school emblem." });
    } catch (err) {
      res.status(500).json({ error: "Failed to reset logo." });
    }
  });

  // Set / Update Hero Campus Photo
  app.post("/api/admin/photos/hero", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { url, caption } = req.body;
      if (!url) {
        return res.status(400).json({ error: "Image URL or uploaded file is required." });
      }

      const photos = readJSON<any>(PHOTOS_FILE, { heroPhoto: null, galleryPhotos: [] });
      photos.heroPhoto = {
        url: String(url).trim(),
        caption: caption ? String(caption).trim() : "Official Campus Photograph",
        updatedAt: new Date().toISOString(),
        updatedBy: req.user?.email || "Owner / Admin",
      };
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        heroPhoto: photos.heroPhoto,
        message: "School campus photo updated successfully and is now visible to all visitors.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to save hero photo." });
    }
  });

  // Delete Hero Campus Photo
  app.delete("/api/admin/photos/hero", authenticateAdmin, (_req: AuthRequest, res: Response) => {
    try {
      const photos = readJSON<any>(PHOTOS_FILE, { heroPhoto: null, galleryPhotos: [] });
      photos.heroPhoto = null;
      writeJSON(PHOTOS_FILE, photos);
      res.json({ success: true, message: "Campus photo removed." });
    } catch (err) {
      res.status(500).json({ error: "Failed to remove photo." });
    }
  });

  // Set / Update About Section Photo
  app.post("/api/admin/photos/about", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { url, caption } = req.body;
      if (!url) {
        return res.status(400).json({ error: "Image URL or uploaded file is required." });
      }

      const photos = readJSON<any>(PHOTOS_FILE, { aboutPhoto: null, galleryPhotos: [] });
      photos.aboutPhoto = {
        url: String(url).trim(),
        caption: caption ? String(caption).trim() : "Heritage & Campus Experience",
        updatedAt: new Date().toISOString(),
      };
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        aboutPhoto: photos.aboutPhoto,
        message: "About section photo updated successfully.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to save about section photo." });
    }
  });

  // Delete About Section Photo
  app.delete("/api/admin/photos/about", authenticateAdmin, (_req: AuthRequest, res: Response) => {
    try {
      const photos = readJSON<any>(PHOTOS_FILE, { aboutPhoto: null, galleryPhotos: [] });
      photos.aboutPhoto = null;
      writeJSON(PHOTOS_FILE, photos);
      res.json({ success: true, message: "About section photo reset to default." });
    } catch (err) {
      res.status(500).json({ error: "Failed to reset about section photo." });
    }
  });

  // Set / Update Facility Photos
  app.post("/api/admin/photos/facilities", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { scienceLab, computerLab, library, sportsField } = req.body;
      const photos = readJSON<any>(PHOTOS_FILE, { facilityPhotos: null, galleryPhotos: [] });
      photos.facilityPhotos = {
        scienceLab: scienceLab || undefined,
        computerLab: computerLab || undefined,
        library: library || undefined,
        sportsField: sportsField || undefined,
      };
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        facilityPhotos: photos.facilityPhotos,
        message: "Facility photos updated successfully.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to update facility photos." });
    }
  });

  // Add Gallery Photo
  app.post("/api/admin/photos/gallery", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { title, category, imageUrl, caption, date } = req.body;
      if (!title || !imageUrl) {
        return res.status(400).json({ error: "Title and Image URL are required." });
      }

      const photos = readJSON<any>(PHOTOS_FILE, { heroPhoto: null, galleryPhotos: [] });
      if (!Array.isArray(photos.galleryPhotos)) {
        photos.galleryPhotos = [];
      }

      const newPhoto = {
        id: `photo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: String(title).trim(),
        category: category || "Campus",
        imageUrl: String(imageUrl).trim(),
        caption: caption ? String(caption).trim() : "",
        date: date || new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        createdAt: new Date().toISOString(),
      };

      photos.galleryPhotos.unshift(newPhoto);
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        photo: newPhoto,
        galleryPhotos: photos.galleryPhotos,
        message: "Photo added to school gallery successfully.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to add gallery photo." });
    }
  });

  // Delete Gallery Photo
  app.delete("/api/admin/photos/gallery/:id", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const photos = readJSON<any>(PHOTOS_FILE, { heroPhoto: null, galleryPhotos: [] });
      if (!Array.isArray(photos.galleryPhotos)) {
        photos.galleryPhotos = [];
      }

      photos.galleryPhotos = photos.galleryPhotos.filter((p: any) => p.id !== id);
      writeJSON(PHOTOS_FILE, photos);

      res.json({
        success: true,
        galleryPhotos: photos.galleryPhotos,
        message: "Photo deleted from gallery.",
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete photo." });
    }
  });

  // Admin Dashboard Statistics
  app.get("/api/admin/stats", authenticateAdmin, (_req: AuthRequest, res: Response) => {
    try {
      const notices = readJSON<any[]>(NOTICES_FILE, []);
      const messages = readJSON<any[]>(MESSAGES_FILE, []);

      const stats = {
        total: notices.length,
        published: notices.filter((n) => n.status === "published").length,
        drafts: notices.filter((n) => n.status === "draft").length,
        pinned: notices.filter((n) => n.isPinned).length,
        sampleCount: notices.filter((n) => n.isSample).length,
        totalViews: notices.reduce((acc, curr) => acc + (curr.views || 0), 0),
        inquiries: messages.length,
        unreadInquiries: messages.filter((m) => !m.isRead).length,
      };

      res.json({ success: true, stats });
    } catch (err) {
      res.status(500).json({ error: "Failed to get stats." });
    }
  });

  // Clear / Reset Sample Notices
  app.post("/api/admin/clear-demo", authenticateAdmin, (req: AuthRequest, res: Response) => {
    try {
      const { action } = req.body; // 'remove-demo' or 'reset-demo'
      if (action === "remove-demo") {
        const notices = readJSON<any[]>(NOTICES_FILE, []);
        const nonDemo = notices.filter((n) => !n.isSample);
        writeJSON(NOTICES_FILE, nonDemo);
        return res.json({ success: true, message: "Sample/demo notices removed successfully." });
      } else if (action === "reset-demo") {
        fs.unlinkSync(NOTICES_FILE);
        initializeDatabase();
        return res.json({ success: true, message: "Sample notices reset to default state." });
      }
      res.status(400).json({ error: "Invalid action." });
    } catch (err) {
      res.status(500).json({ error: "Failed to perform operation." });
    }
  });

  // Admin Messages list
  app.get("/api/admin/messages", authenticateAdmin, (_req: AuthRequest, res: Response) => {
    try {
      const messages = readJSON<any[]>(MESSAGES_FILE, []);
      res.json({ success: true, messages });
    } catch (err) {
      res.status(500).json({ error: "Failed to get messages." });
    }
  });

  // -------------------------------------------------------------
  // VITE DEV SERVER OR PRODUCTION STATIC SERVING
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[School Portal] Server listening at http://localhost:${PORT}`);
  });
}

startServer();
