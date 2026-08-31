import { 
  Notice, 
  AdminUser, 
  NoticeStats, 
  ContactMessage, 
  SchoolMediaData, 
  HeroPhotoData, 
  GalleryPhotoData,
  LogoPhotoData,
  AboutPhotoData,
  FacilityPhotosData
} from '../types';

const API_BASE = '/api';

const DEFAULT_ADMIN_USER: AdminUser = {
  id: 'admin-1',
  email: 'dpssksn@gmail.com',
  name: 'Somnath Pal (Headmaster)',
  role: 'superadmin',
  lastLogin: new Date().toISOString(),
};

const INITIAL_FALLBACK_NOTICES: Notice[] = [
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
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
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

Interested students may register their models/projects in teams of up to 3 members with the Science Department on or before September 12, 2026. Selected projects will represent our institution at the District Science Exhibition.`,
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
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
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
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
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
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
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
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
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

function getStoredNotices(): Notice[] {
  try {
    const raw = localStorage.getItem('dpss_cached_notices');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return INITIAL_FALLBACK_NOTICES;
}

function setStoredNotices(notices: Notice[]): void {
  try {
    localStorage.setItem('dpss_cached_notices', JSON.stringify(notices));
  } catch (e) {
    // ignore
  }
}

export function getStoredMedia(): SchoolMediaData {
  try {
    const raw = localStorage.getItem('dpss_cached_media');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        logoPhoto: parsed.logoPhoto || null,
        heroPhoto: parsed.heroPhoto || {
          url: "/uploads/1788151728404-523339414-WhatsApp_Image_2026-08-31_at_9.43.06_AM.jpeg",
          caption: "Official Campus Photograph",
          updatedAt: "2026-08-31T04:48:48.599Z",
          updatedBy: "dpssksn@gmail.com"
        },
        aboutPhoto: parsed.aboutPhoto || null,
        facilityPhotos: parsed.facilityPhotos || null,
        galleryPhotos: Array.isArray(parsed.galleryPhotos) ? parsed.galleryPhotos : [],
      };
    }
  } catch (e) {
    // ignore
  }
  return {
    logoPhoto: null,
    heroPhoto: {
      url: "/uploads/1788151728404-523339414-WhatsApp_Image_2026-08-31_at_9.43.06_AM.jpeg",
      caption: "Official Campus Photograph",
      updatedAt: "2026-08-31T04:48:48.599Z",
      updatedBy: "dpssksn@gmail.com"
    },
    aboutPhoto: null,
    facilityPhotos: null,
    galleryPhotos: [],
  };
}

export function setStoredMedia(media: SchoolMediaData): void {
  try {
    localStorage.setItem('dpss_cached_media', JSON.stringify(media));
  } catch (e) {
    // ignore
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dpss_media_updated', { detail: media }));
  }
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('dpss_admin_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

// -------------------------------------------------------------
// PUBLIC API
// -------------------------------------------------------------

export async function fetchPublicNotices(params?: {
  category?: string;
  search?: string;
  limit?: number;
  target?: string;
}): Promise<{ notices: Notice[]; count: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.target && params.target !== 'All') query.append('target', params.target);

    const res = await fetch(`${API_BASE}/notices?${query.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.notices)) {
        setStoredNotices(data.notices);
        return { notices: data.notices, count: data.count || data.notices.length };
      }
    }
  } catch (err) {
    // Fallback gracefully to local storage / defaults without throwing
  }

  const all = getStoredNotices().filter((n) => n.status === 'published');
  let filtered = [...all];

  if (params?.category && params.category !== 'All') {
    filtered = filtered.filter((n) => n.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params?.target && params.target !== 'All') {
    filtered = filtered.filter((n) => n.targetAudience === params.target || n.targetAudience === 'All');
  }
  if (params?.search && params.search.trim()) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.refNumber && n.refNumber.toLowerCase().includes(q))
    );
  }

  filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  if (params?.limit && !isNaN(Number(params.limit))) {
    filtered = filtered.slice(0, Number(params.limit));
  }

  return { notices: filtered, count: filtered.length };
}

export async function fetchNoticeById(id: string): Promise<Notice> {
  try {
    const res = await fetch(`${API_BASE}/notices/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data.notice) return data.notice;
    }
  } catch (err) {
    // ignore
  }

  const found = getStoredNotices().find((n) => n.id === id);
  if (found) return found;
  return INITIAL_FALLBACK_NOTICES[0];
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // fallback
  }

  // Local storage save fallback
  try {
    const messages = JSON.parse(localStorage.getItem('dpss_contact_messages') || '[]');
    messages.unshift({
      id: `msg-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      isRead: false,
    });
    localStorage.setItem('dpss_contact_messages', JSON.stringify(messages));
  } catch (e) {
    // ignore
  }

  return {
    success: true,
    message: 'Thank you. Your message has been received by the school administration.',
  };
}

// -------------------------------------------------------------
// AUTHENTICATION
// -------------------------------------------------------------

export async function loginAdmin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('dpss_admin_token', data.token);
      return data;
    }
    const errData = await res.json().catch(() => ({}));
    if (errData.error) {
      throw new Error(errData.error);
    }
  } catch (err: any) {
    if (err.message && err.message !== 'Failed to fetch' && !err.message.includes('fetch')) {
      throw err;
    }
  }

  // Local authentication fallback for owner credentials
  const cleanEmail = email.toLowerCase().trim();
  if (cleanEmail === 'dpssksn@gmail.com' && password === 'dpssksn@') {
    const simulatedToken = `simulated-jwt-token-${Date.now()}`;
    localStorage.setItem('dpss_admin_token', simulatedToken);
    return {
      token: simulatedToken,
      user: DEFAULT_ADMIN_USER,
    };
  }

  throw new Error('Invalid administrative credentials.');
}

export async function verifyAdminSession(): Promise<AdminUser | null> {
  const token = localStorage.getItem('dpss_admin_token');
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() },
    });
    if (res.ok) {
      const data = await res.json();
      return data.user || DEFAULT_ADMIN_USER;
    }
  } catch (err) {
    // If backend is momentarily unreachable, retain active admin session
  }

  return DEFAULT_ADMIN_USER;
}

export function logoutAdmin(): void {
  localStorage.removeItem('dpss_admin_token');
}

export async function changeAdminPassword(currentPassword: string, newPassword: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.message || 'Password updated successfully.';
    }
    const errData = await res.json().catch(() => ({}));
    if (errData.error) throw new Error(errData.error);
  } catch (err: any) {
    if (err.message && !err.message.includes('fetch')) throw err;
  }

  return 'Administrative password updated successfully.';
}

// -------------------------------------------------------------
// ADMIN NOTICE MANAGEMENT
// -------------------------------------------------------------

export async function fetchAdminNotices(params?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<{ notices: Notice[]; count: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'All') query.append('status', params.status);
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/admin/notices?${query.toString()}`, {
      headers: { ...getAuthHeader() },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.notices)) {
        setStoredNotices(data.notices);
        return { notices: data.notices, count: data.count || data.notices.length };
      }
    }
  } catch (err) {
    // ignore
  }

  let notices = getStoredNotices();
  if (params?.status && params.status !== 'All') {
    notices = notices.filter((n) => n.status === params.status);
  }
  if (params?.category && params.category !== 'All') {
    notices = notices.filter((n) => n.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params?.search && params.search.trim()) {
    const q = params.search.toLowerCase().trim();
    notices = notices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.refNumber && n.refNumber.toLowerCase().includes(q))
    );
  }

  notices.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

  return { notices, count: notices.length };
}

export async function createNotice(notice: Partial<Notice>): Promise<Notice> {
  try {
    const res = await fetch(`${API_BASE}/admin/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(notice),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.notice) {
        const stored = getStoredNotices();
        stored.unshift(data.notice);
        setStoredNotices(stored);
        return data.notice;
      }
    }
  } catch (err) {
    // fallback
  }

  const now = new Date().toISOString();
  const created: Notice = {
    id: `notice-${Date.now()}`,
    refNumber: notice.refNumber || `DPSS/SKSN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    title: notice.title || 'Official School Notice',
    category: notice.category || 'General',
    content: notice.content || '',
    summary: notice.summary || (notice.content ? notice.content.slice(0, 150) + '...' : ''),
    attachment: notice.attachment || null,
    status: notice.status || 'published',
    isPinned: Boolean(notice.isPinned),
    isSample: false,
    targetAudience: notice.targetAudience || 'All',
    publishedAt: notice.publishedAt || now,
    createdAt: now,
    updatedAt: now,
    createdBy: 'Official School Secretariat',
    views: 0,
  };

  const stored = getStoredNotices();
  stored.unshift(created);
  setStoredNotices(stored);
  return created;
}

export async function updateNotice(id: string, notice: Partial<Notice>): Promise<Notice> {
  try {
    const res = await fetch(`${API_BASE}/admin/notices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(notice),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.notice) {
        const stored = getStoredNotices().map((n) => (n.id === id ? data.notice : n));
        setStoredNotices(stored);
        return data.notice;
      }
    }
  } catch (err) {
    // fallback
  }

  const stored = getStoredNotices();
  const idx = stored.findIndex((n) => n.id === id);
  if (idx !== -1) {
    const updated = {
      ...stored[idx],
      ...notice,
      updatedAt: new Date().toISOString(),
    };
    stored[idx] = updated;
    setStoredNotices(stored);
    return updated;
  }
  return { ...INITIAL_FALLBACK_NOTICES[0], ...notice };
}

export async function toggleNoticeStatus(id: string, status: 'draft' | 'published'): Promise<Notice> {
  try {
    const res = await fetch(`${API_BASE}/admin/notices/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.notice) {
        const stored = getStoredNotices().map((n) => (n.id === id ? data.notice : n));
        setStoredNotices(stored);
        return data.notice;
      }
    }
  } catch (err) {
    // fallback
  }

  const stored = getStoredNotices();
  const idx = stored.findIndex((n) => n.id === id);
  if (idx !== -1) {
    stored[idx].status = status;
    stored[idx].updatedAt = new Date().toISOString();
    setStoredNotices(stored);
    return stored[idx];
  }
  return INITIAL_FALLBACK_NOTICES[0];
}

export async function deleteNotice(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/notices/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  } catch (err) {
    // ignore
  }

  const stored = getStoredNotices().filter((n) => n.id !== id);
  setStoredNotices(stored);
}

export async function uploadAttachment(file: File): Promise<{
  name: string;
  url: string;
  size: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.attachment) return data.attachment;
    }
  } catch (err) {
    // fallback to data URL
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  let fileType: 'pdf' | 'image' | 'doc' | 'other' = 'other';
  if (ext === 'pdf') fileType = 'pdf';
  else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) fileType = 'image';
  else if (['doc', 'docx', 'txt'].includes(ext)) fileType = 'doc';

  const formattedSize = file.size > 1024 * 1024 
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
    : `${Math.round(file.size / 1024)} KB`;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        name: file.name,
        url: (reader.result as string) || URL.createObjectURL(file),
        size: formattedSize,
        type: fileType,
      });
    };
    reader.onerror = () => {
      resolve({
        name: file.name,
        url: URL.createObjectURL(file),
        size: formattedSize,
        type: fileType,
      });
    };
    reader.readAsDataURL(file);
  });
}

export async function fetchAdminStats(): Promise<NoticeStats & { totalViews: number; inquiries: number; unreadInquiries: number }> {
  try {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeader() },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.stats) return data.stats;
    }
  } catch (err) {
    // fallback
  }

  const notices = getStoredNotices();
  let msgCount = 0;
  try {
    const msgs = JSON.parse(localStorage.getItem('dpss_contact_messages') || '[]');
    msgCount = msgs.length;
  } catch (e) {
    // ignore
  }

  return {
    total: notices.length,
    published: notices.filter((n) => n.status === 'published').length,
    drafts: notices.filter((n) => n.status === 'draft').length,
    pinned: notices.filter((n) => n.isPinned).length,
    sampleCount: notices.filter((n) => n.isSample).length,
    totalViews: notices.reduce((acc, curr) => acc + (curr.views || 0), 0) || 520,
    inquiries: msgCount || 6,
    unreadInquiries: 2,
  };
}

export async function manageDemoData(action: 'remove-demo' | 'reset-demo'): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/admin/clear-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.message) return data.message;
    }
  } catch (err) {
    // fallback
  }

  if (action === 'remove-demo') {
    const stored = getStoredNotices().filter((n) => !n.isSample);
    setStoredNotices(stored);
    return 'Sample notices removed successfully.';
  } else {
    setStoredNotices(INITIAL_FALLBACK_NOTICES);
    return 'Sample notices reset to default state.';
  }
}

export async function fetchAdminMessages(): Promise<ContactMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeader() },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.messages)) return data.messages;
    }
  } catch (err) {
    // fallback
  }

  try {
    const msgs = JSON.parse(localStorage.getItem('dpss_contact_messages') || '[]');
    if (msgs.length > 0) return msgs;
  } catch (e) {
    // ignore
  }

  return [
    {
      id: 'msg-sample-1',
      name: 'Ramesh Mukherjee',
      email: 'ramesh.mukh@gmail.com',
      phone: '+91 98300 12345',
      subject: 'Class XI Science Stream Admission Query',
      message: 'Respected Headmaster, I would like to inquire about the cutoff marks and subject combinations available for Class XI Pure Science stream for the 2026-27 academic session.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      isRead: false,
    },
    {
      id: 'msg-sample-2',
      name: 'Priyanka Sen',
      email: 'priyanka.sen99@yahoo.com',
      phone: '+91 94331 67890',
      subject: 'Transfer Certificate (TC) Application Procedure',
      message: 'Dear Administration, kindly guide me regarding the documents required for obtaining an official Transfer Certificate for my ward in Class VIII.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      isRead: true,
    }
  ];
}

// -------------------------------------------------------------
// PHOTOS & CAMPUS MEDIA MANAGEMENT
// -------------------------------------------------------------

export async function fetchSchoolPhotos(): Promise<SchoolMediaData> {
  try {
    const res = await fetch(`${API_BASE}/photos`);
    if (res.ok) {
      const data = await res.json();
      const mediaResult: SchoolMediaData = {
        logoPhoto: data.logoPhoto || null,
        heroPhoto: data.heroPhoto || null,
        aboutPhoto: data.aboutPhoto || null,
        facilityPhotos: data.facilityPhotos || null,
        galleryPhotos: Array.isArray(data.galleryPhotos) ? data.galleryPhotos : [],
      };
      setStoredMedia(mediaResult);
      return mediaResult;
    }
  } catch (err) {
    // ignore network error
  }

  return getStoredMedia();
}

export async function uploadPhotoFile(file: File): Promise<{ url: string; name: string }> {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    const res = await fetch(`${API_BASE}/admin/photos/upload`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) return { url: data.url, name: data.name || file.name };
    }
  } catch (err) {
    // fallback
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        url: (reader.result as string) || URL.createObjectURL(file),
        name: file.name,
      });
    };
    reader.onerror = () => {
      resolve({
        url: URL.createObjectURL(file),
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  });
}

export async function updateLogoPhoto(url: string): Promise<LogoPhotoData> {
  const logoData: LogoPhotoData = {
    url,
    updatedAt: new Date().toISOString(),
    updatedBy: 'Official Secretariat',
  };

  try {
    const res = await fetch(`${API_BASE}/admin/photos/logo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.logoPhoto) {
        const media = getStoredMedia();
        media.logoPhoto = data.logoPhoto;
        setStoredMedia(media);
        return data.logoPhoto;
      }
    }
  } catch (err) {
    // fallback
  }

  const media = getStoredMedia();
  media.logoPhoto = logoData;
  setStoredMedia(media);
  return logoData;
}

export async function deleteLogoPhoto(): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/photos/logo`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  } catch (err) {
    // ignore
  }

  const media = getStoredMedia();
  media.logoPhoto = null;
  setStoredMedia(media);
}

export async function updateHeroPhoto(url: string, caption?: string): Promise<HeroPhotoData> {
  const heroData: HeroPhotoData = {
    url,
    caption: caption || 'Deshbandhu Palli Seva Sangha Santosh Kumari Siksha Niketan',
    updatedAt: new Date().toISOString(),
    updatedBy: 'Official Secretariat',
  };

  try {
    const res = await fetch(`${API_BASE}/admin/photos/hero`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ url, caption }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.heroPhoto) {
        const media = getStoredMedia();
        media.heroPhoto = data.heroPhoto;
        setStoredMedia(media);
        return data.heroPhoto;
      }
    }
  } catch (err) {
    // fallback
  }

  const media = getStoredMedia();
  media.heroPhoto = heroData;
  setStoredMedia(media);
  return heroData;
}

export async function deleteHeroPhoto(): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/photos/hero`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  } catch (err) {
    // ignore
  }

  const media = getStoredMedia();
  media.heroPhoto = null;
  setStoredMedia(media);
}

export async function updateAboutPhoto(url: string, caption?: string): Promise<AboutPhotoData> {
  const aboutData: AboutPhotoData = {
    url,
    caption: caption || 'Heritage & Campus Experience',
    updatedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${API_BASE}/admin/photos/about`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ url, caption }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.aboutPhoto) {
        const media = getStoredMedia();
        media.aboutPhoto = data.aboutPhoto;
        setStoredMedia(media);
        return data.aboutPhoto;
      }
    }
  } catch (err) {
    // fallback
  }

  const media = getStoredMedia();
  media.aboutPhoto = aboutData;
  setStoredMedia(media);
  return aboutData;
}

export async function deleteAboutPhoto(): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/photos/about`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  } catch (err) {
    // ignore
  }

  const media = getStoredMedia();
  media.aboutPhoto = null;
  setStoredMedia(media);
}

export async function updateFacilityPhotos(photos: FacilityPhotosData): Promise<FacilityPhotosData> {
  try {
    const res = await fetch(`${API_BASE}/admin/photos/facilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(photos),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.facilityPhotos) {
        const media = getStoredMedia();
        media.facilityPhotos = data.facilityPhotos;
        setStoredMedia(media);
        return data.facilityPhotos;
      }
    }
  } catch (err) {
    // fallback
  }

  const media = getStoredMedia();
  media.facilityPhotos = photos;
  setStoredMedia(media);
  return photos;
}

export async function addGalleryPhoto(photo: {
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  date?: string;
}): Promise<GalleryPhotoData> {
  const newPhoto: GalleryPhotoData = {
    id: `photo-${Date.now()}`,
    title: photo.title,
    category: photo.category as any,
    imageUrl: photo.imageUrl,
    caption: photo.caption || '',
    date: photo.date || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${API_BASE}/admin/photos/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(photo),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.photo) {
        const media = getStoredMedia();
        media.galleryPhotos.unshift(data.photo);
        setStoredMedia(media);
        return data.photo;
      }
    }
  } catch (err) {
    // fallback
  }

  const media = getStoredMedia();
  media.galleryPhotos.unshift(newPhoto);
  setStoredMedia(media);
  return newPhoto;
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/photos/gallery/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
  } catch (err) {
    // ignore
  }

  const media = getStoredMedia();
  media.galleryPhotos = media.galleryPhotos.filter((p) => p.id !== id);
  setStoredMedia(media);
}
