import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Sparkles, 
  Clock, 
  FileCheck, 
  Layers, 
  Pin, 
  X, 
  Mail, 
  KeyRound, 
  RotateCcw,
  ArrowLeft,
  Paperclip,
  Check,
  Send,
  MessageSquare,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { 
  Notice, 
  AdminUser, 
  NoticeCategory, 
  NoticeStatus, 
  ContactMessage, 
  NoticeStats, 
  HeroPhotoData, 
  GalleryPhotoData,
  LogoPhotoData,
  AboutPhotoData,
  FacilityPhotosData,
  SchoolMediaData
} from '../types';
import { SchoolLogo, notifyLogoUpdated } from './SchoolLogo';
import { 
  loginAdmin, 
  logoutAdmin, 
  fetchAdminNotices, 
  createNotice, 
  updateNotice, 
  toggleNoticeStatus, 
  deleteNotice, 
  uploadAttachment, 
  fetchAdminStats, 
  manageDemoData, 
  fetchAdminMessages,
  changeAdminPassword,
  fetchSchoolPhotos,
  uploadPhotoFile,
  updateHeroPhoto,
  deleteHeroPhoto,
  addGalleryPhoto,
  deleteGalleryPhoto,
  updateLogoPhoto,
  deleteLogoPhoto,
  updateAboutPhoto,
  deleteAboutPhoto,
  updateFacilityPhotos
} from '../services/api';

interface AdminDashboardProps {
  adminUser: AdminUser | null;
  onLoginSuccess: (user: AdminUser) => void;
  onLogout: () => void;
  onExitAdmin: () => void;
  onNoticeChanged: () => void;
}

const CATEGORIES: NoticeCategory[] = [
  'Academic',
  'Examination',
  'Holiday',
  'Admission',
  'Sports & Culture',
  'Administrative',
  'General',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLoginSuccess,
  onLogout,
  onExitAdmin,
  onNoticeChanged,
}) => {
  // Login Form States
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Admin View States
  const [activeTab, setActiveTab] = useState<'notices' | 'photos' | 'inquiries' | 'settings'>('notices');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [stats, setStats] = useState<NoticeStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(false);

  // Photo & Media Management States (Full Owner Control)
  const [mediaActiveSubTab, setMediaActiveSubTab] = useState<'logo' | 'hero' | 'about' | 'facilities' | 'gallery'>('logo');
  const [logoPhoto, setLogoPhoto] = useState<LogoPhotoData | null>(null);
  const [heroPhoto, setHeroPhoto] = useState<HeroPhotoData | null>(null);
  const [aboutPhoto, setAboutPhoto] = useState<AboutPhotoData | null>(null);
  const [facilityPhotos, setFacilityPhotos] = useState<FacilityPhotosData | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoData[]>([]);

  // Logo form
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Hero form
  const [heroCaptionInput, setHeroCaptionInput] = useState('');
  const [heroUrlInput, setHeroUrlInput] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);

  // About form
  const [aboutCaptionInput, setAboutCaptionInput] = useState('');
  const [aboutUrlInput, setAboutUrlInput] = useState('');
  const [uploadingAbout, setUploadingAbout] = useState(false);

  // Facility form
  const [facilityForm, setFacilityForm] = useState<{
    scienceLab: string;
    computerLab: string;
    library: string;
    sportsField: string;
  }>({
    scienceLab: '',
    computerLab: '',
    library: '',
    sportsField: '',
  });
  const [uploadingFacilityKey, setUploadingFacilityKey] = useState<string | null>(null);
  const [savingFacilities, setSavingFacilities] = useState(false);

  const [photoFeedback, setPhotoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Gallery Photo States
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Campus');
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Notice Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [savingNotice, setSavingNotice] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Delete Confirmation Modal
  const [deletingNoticeId, setDeletingNoticeId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Demo data action loading
  const [demoActionLoading, setDemoActionLoading] = useState(false);
  const [demoFeedback, setDemoFeedback] = useState<string | null>(null);

  // Load Data on Admin Auth
  useEffect(() => {
    if (adminUser) {
      loadAdminData();
      loadMediaData();
    }
  }, [adminUser, filterStatus, filterCategory, searchQuery]);

  const loadAdminData = async () => {
    try {
      setLoadingNotices(true);
      const [noticesData, statsData, messagesData] = await Promise.all([
        fetchAdminNotices({
          status: filterStatus,
          category: filterCategory,
          search: searchQuery,
        }),
        fetchAdminStats(),
        fetchAdminMessages(),
      ]);

      if (noticesData && noticesData.notices) {
        setNotices(noticesData.notices);
      }
      if (statsData) {
        setStats(statsData);
      }
      if (messagesData) {
        setMessages(messagesData);
      }
    } catch {
      // Safe fallback handled by service layer
    } finally {
      setLoadingNotices(false);
    }
  };

  const loadMediaData = async () => {
    try {
      const media = await fetchSchoolPhotos();
      if (!media) return;
      setLogoPhoto(media.logoPhoto || null);
      setHeroPhoto(media.heroPhoto || null);
      setAboutPhoto(media.aboutPhoto || null);
      setFacilityPhotos(media.facilityPhotos || null);
      setGalleryPhotos(media.galleryPhotos || []);

      if (media.heroPhoto?.caption) {
        setHeroCaptionInput(media.heroPhoto.caption);
      }
      if (media.aboutPhoto?.caption) {
        setAboutCaptionInput(media.aboutPhoto.caption);
      }
      if (media.facilityPhotos) {
        setFacilityForm({
          scienceLab: media.facilityPhotos.scienceLab || '',
          computerLab: media.facilityPhotos.computerLab || '',
          library: media.facilityPhotos.library || '',
          sportsField: media.facilityPhotos.sportsField || '',
        });
      }
    } catch {
      // Safe fallback handled by service layer
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setLoginError('Please enter administrative email and password.');
      return;
    }

    try {
      setLoginLoading(true);
      setLoginError(null);
      const { user } = await loginAdmin(emailInput.trim(), passwordInput.trim());
      onLoginSuccess(user);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Shortcut to fill test credentials
  const handleFillDemoCredentials = () => {
    setEmailInput('dpssksn@gmail.com');
    setPasswordInput('dpssksn@');
    setLoginError(null);
  };

  // --- LOGO HANDLERS ---
  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      setPhotoFeedback(null);
      const uploaded = await uploadPhotoFile(file);
      const updated = await updateLogoPhoto(uploaded.url);
      setLogoPhoto(updated);
      notifyLogoUpdated(updated.url);
      setPhotoFeedback({ type: 'success', text: 'School official logo updated successfully! It is now visible on the website header and footer.' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to upload logo image.' });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUpdateLogoUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoUrlInput.trim()) {
      setPhotoFeedback({ type: 'error', text: 'Please provide a valid logo image URL.' });
      return;
    }

    try {
      setUploadingLogo(true);
      setPhotoFeedback(null);
      const updated = await updateLogoPhoto(logoUrlInput.trim());
      setLogoPhoto(updated);
      notifyLogoUpdated(updated.url);
      setLogoUrlInput('');
      setPhotoFeedback({ type: 'success', text: 'School official logo updated successfully from URL!' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to update logo.' });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleResetLogo = async () => {
    try {
      setUploadingLogo(true);
      await deleteLogoPhoto();
      setLogoPhoto(null);
      notifyLogoUpdated(null);
      setPhotoFeedback({ type: 'success', text: 'Logo reset to default official circular school emblem.' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to reset logo.' });
    } finally {
      setUploadingLogo(false);
    }
  };

  // --- HERO PHOTO HANDLERS ---
  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      setPhotoFeedback(null);
      const uploaded = await uploadPhotoFile(file);
      const updated = await updateHeroPhoto(uploaded.url, heroCaptionInput || 'Official Campus Photograph');
      setHeroPhoto(updated);
      setPhotoFeedback({ type: 'success', text: 'School hero photo uploaded and updated successfully! Visible on homepage banner.' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to upload photo.' });
    } finally {
      setUploadingHero(false);
    }
  };

  const handleUpdateHeroUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroUrlInput.trim()) {
      setPhotoFeedback({ type: 'error', text: 'Please provide a valid image URL or upload a file.' });
      return;
    }

    try {
      setUploadingHero(true);
      setPhotoFeedback(null);
      const updated = await updateHeroPhoto(heroUrlInput.trim(), heroCaptionInput || 'Official Campus Photograph');
      setHeroPhoto(updated);
      setHeroUrlInput('');
      setPhotoFeedback({ type: 'success', text: 'School hero photo updated successfully!' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to update photo.' });
    } finally {
      setUploadingHero(false);
    }
  };

  const handleRemoveHeroPhoto = async () => {
    try {
      setUploadingHero(true);
      await deleteHeroPhoto();
      setHeroPhoto(null);
      setPhotoFeedback({ type: 'success', text: 'Custom hero photo removed. Default institutional campus photo is now active.' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to remove photo.' });
    } finally {
      setUploadingHero(false);
    }
  };

  // --- ABOUT PHOTO HANDLERS ---
  const handleAboutFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAbout(true);
      setPhotoFeedback(null);
      const uploaded = await uploadPhotoFile(file);
      const updated = await updateAboutPhoto(uploaded.url, aboutCaptionInput || 'Official Heritage Building Block (ESTD 1968)');
      setAboutPhoto(updated);
      setPhotoFeedback({ type: 'success', text: 'About section heritage photo uploaded successfully!' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to upload about photo.' });
    } finally {
      setUploadingAbout(false);
    }
  };

  const handleUpdateAboutUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutUrlInput.trim()) {
      setPhotoFeedback({ type: 'error', text: 'Please provide a valid image URL.' });
      return;
    }

    try {
      setUploadingAbout(true);
      setPhotoFeedback(null);
      const updated = await updateAboutPhoto(aboutUrlInput.trim(), aboutCaptionInput || 'Official Heritage Building Block (ESTD 1968)');
      setAboutPhoto(updated);
      setAboutUrlInput('');
      setPhotoFeedback({ type: 'success', text: 'About section photo updated successfully!' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to update about photo.' });
    } finally {
      setUploadingAbout(false);
    }
  };

  const handleResetAboutPhoto = async () => {
    try {
      setUploadingAbout(true);
      await deleteAboutPhoto();
      setAboutPhoto(null);
      setPhotoFeedback({ type: 'success', text: 'About photo reset to default institutional photo.' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to reset about photo.' });
    } finally {
      setUploadingAbout(false);
    }
  };

  // --- FACILITY PHOTOS HANDLERS ---
  const handleFacilityFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: 'scienceLab' | 'computerLab' | 'library' | 'sportsField') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFacilityKey(key);
      setPhotoFeedback(null);
      const uploaded = await uploadPhotoFile(file);
      const updatedForm = { ...facilityForm, [key]: uploaded.url };
      setFacilityForm(updatedForm);
      const saved = await updateFacilityPhotos(updatedForm);
      setFacilityPhotos(saved);
      setPhotoFeedback({ type: 'success', text: `Updated ${key} facility photograph successfully!` });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to upload facility photo.' });
    } finally {
      setUploadingFacilityKey(null);
    }
  };

  const handleSaveFacilityPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingFacilities(true);
      setPhotoFeedback(null);
      const saved = await updateFacilityPhotos(facilityForm);
      setFacilityPhotos(saved);
      setPhotoFeedback({ type: 'success', text: 'Campus facilities photos updated successfully!' });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to save facility photos.' });
    } finally {
      setSavingFacilities(false);
    }
  };

  const handleClearFacilityPhoto = async (key: 'scienceLab' | 'computerLab' | 'library' | 'sportsField') => {
    try {
      setSavingFacilities(true);
      const updatedForm = { ...facilityForm, [key]: '' };
      setFacilityForm(updatedForm);
      const saved = await updateFacilityPhotos(updatedForm);
      setFacilityPhotos(saved);
      setPhotoFeedback({ type: 'success', text: `Cleared custom photo for ${key}. Default illustration restored.` });
      onNoticeChanged();
    } catch (err: any) {
      setPhotoFeedback({ type: 'error', text: err.message || 'Failed to clear photo.' });
    } finally {
      setSavingFacilities(false);
    }
  };

  // Upload Gallery Photo File
  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingGallery(true);
      const uploaded = await uploadPhotoFile(file);
      setGalleryUrl(uploaded.url);
    } catch (err: any) {
      alert(err.message || 'Failed to upload file.');
    } finally {
      setUploadingGallery(false);
    }
  };

  // Add Gallery Photo
  const handleAddGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryUrl.trim()) {
      alert('Please provide a title and image for the gallery photo.');
      return;
    }

    try {
      setUploadingGallery(true);
      const photo = await addGalleryPhoto({
        title: galleryTitle.trim(),
        category: galleryCategory,
        imageUrl: galleryUrl.trim(),
        caption: galleryCaption.trim(),
      });
      setGalleryPhotos((prev) => [photo, ...prev]);
      setGalleryTitle('');
      setGalleryUrl('');
      setGalleryCaption('');
      setPhotoFeedback({ type: 'success', text: 'Gallery photo added successfully!' });
      onNoticeChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to add gallery photo.');
    } finally {
      setUploadingGallery(false);
    }
  };

  // Delete Gallery Photo
  const handleDeleteGalleryPhoto = async (id: string) => {
    try {
      await deleteGalleryPhoto(id);
      setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
      onNoticeChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete gallery photo.');
    }
  };

  // Open Notice Creator
  const handleOpenCreateNotice = () => {
    setEditingNotice({
      title: '',
      refNumber: `DPSS/SKSN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Academic',
      targetAudience: 'All',
      content: '',
      summary: '',
      status: 'published',
      isPinned: false,
      attachment: null,
      publishedAt: new Date().toISOString().slice(0, 16),
    });
    setEditorError(null);
    setIsEditorOpen(true);
  };

  // Open Notice Editor
  const handleOpenEditNotice = (notice: Notice) => {
    setEditingNotice({
      ...notice,
      publishedAt: notice.publishedAt ? notice.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16),
    });
    setEditorError(null);
    setIsEditorOpen(true);
  };

  // File Upload inside Notice Editor
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      setEditorError(null);
      const uploaded = await uploadAttachment(file);
      setEditingNotice((prev) => prev ? { ...prev, attachment: uploaded } : null);
    } catch (err: any) {
      setEditorError(err.message || 'File upload failed.');
    } finally {
      setUploadingFile(false);
    }
  };

  // Save Notice (Create or Update)
  const handleSaveNotice = async (statusOverride?: NoticeStatus) => {
    if (!editingNotice?.title?.trim()) {
      setEditorError('Please provide a title for the notice.');
      return;
    }
    if (!editingNotice?.content?.trim()) {
      setEditorError('Notice details / content cannot be empty.');
      return;
    }

    try {
      setSavingNotice(true);
      setEditorError(null);

      const payload = {
        ...editingNotice,
        status: statusOverride || editingNotice.status || 'published',
        publishedAt: editingNotice.publishedAt ? new Date(editingNotice.publishedAt).toISOString() : new Date().toISOString(),
      };

      if (editingNotice.id) {
        await updateNotice(editingNotice.id, payload);
      } else {
        await createNotice(payload);
      }

      setIsEditorOpen(false);
      setEditingNotice(null);
      await loadAdminData();
      onNoticeChanged();
    } catch (err: any) {
      setEditorError(err.message || 'Failed to save notice.');
    } finally {
      setSavingNotice(false);
    }
  };

  // Quick Toggle Status
  const handleToggleStatus = async (notice: Notice) => {
    const nextStatus = notice.status === 'published' ? 'draft' : 'published';
    try {
      await toggleNoticeStatus(notice.id, nextStatus);
      await loadAdminData();
      onNoticeChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  // Confirm Delete Notice
  const handleConfirmDelete = async () => {
    if (!deletingNoticeId) return;

    try {
      setIsDeleting(true);
      await deleteNotice(deletingNoticeId);
      setDeletingNoticeId(null);
      await loadAdminData();
      onNoticeChanged();
    } catch (err: any) {
      alert(err.message || 'Failed to delete notice.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Demo Data
  const handleDemoAction = async (action: 'remove-demo' | 'reset-demo') => {
    try {
      setDemoActionLoading(true);
      setDemoFeedback(null);
      const msg = await manageDemoData(action);
      setDemoFeedback(msg);
      await loadAdminData();
      onNoticeChanged();
      setTimeout(() => setDemoFeedback(null), 4000);
    } catch (err: any) {
      setDemoFeedback(err.message || 'Action failed.');
    } finally {
      setDemoActionLoading(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMessage({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    try {
      setUpdatingPassword(true);
      setPasswordMessage(null);
      const msg = await changeAdminPassword(currentPassword, newPassword);
      setPasswordMessage({ type: 'success', text: msg });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM (If not authenticated)
  // -------------------------------------------------------------
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-blue-100 shadow-2xl p-8 space-y-6 relative overflow-hidden text-slate-900">
          
          {/* Top Decorative Header */}
          <div className="text-center space-y-2">
            <button
              id="back-to-website-btn"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-blue-800 hover:text-blue-950 mb-2 font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
            </button>

            <div className="w-20 h-20 rounded-full bg-white border-2 border-white ring-4 ring-blue-300 flex items-center justify-center mx-auto shadow-xl p-0.5">
              <SchoolLogo size="100%" />
            </div>

            <h1 className="text-xl font-extrabold text-blue-950 tracking-tight font-serif">
              Administrative Portal
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-snug">
              DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email ID
              </label>
              <input
                id="admin-email-input"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="dpssksn@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-slate-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="pt-4 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-500 mb-2 font-medium">Authorized School Owner Credentials:</p>
            <button
              id="fill-demo-credentials-btn"
              onClick={handleFillDemoCredentials}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-lg text-xs font-bold border border-blue-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Fill Owner Credentials (dpssksn@gmail.com)</span>
            </button>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">
              Email: <code>dpssksn@gmail.com</code> | Password: <code>dpssksn@</code>
            </p>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-blue-950 text-white border-b border-blue-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow-md border-2 border-white ring-2 ring-blue-300 flex items-center justify-center shrink-0">
              <SchoolLogo size="100%" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white leading-tight font-serif">
                  DESHBANDHU PALLI SEVA SANGHA SANTOSH KUMARI SIKSHA NIKETAN
                </h1>
                <span className="text-[10px] bg-blue-800 text-white px-2 py-0.5 rounded font-mono font-semibold border border-blue-700">
                  {adminUser.role.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Administrative Control Panel • Logged in as: <strong className="text-white">{adminUser.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="exit-to-public-site-btn"
              onClick={onExitAdmin}
              className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-blue-700"
            >
              <Eye className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={() => {
                logoutAdmin();
                onLogout();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Banner */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Notices</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Published</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{stats.published}</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Drafts</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">{stats.drafts}</p>
              </div>
              <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pinned Notices</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-1">{stats.pinned}</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                <Pin className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between col-span-2 sm:col-span-1">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Inquiries</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mt-1">{stats.inquiries}</p>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls & Primary Create Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="admin-tab-notices"
              onClick={() => setActiveTab('notices')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'notices'
                  ? 'bg-blue-950 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Notice Board Management
            </button>

            <button
              id="admin-tab-photos"
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'photos'
                  ? 'bg-blue-950 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>School Photos & Media</span>
            </button>

            <button
              id="admin-tab-inquiries"
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'bg-blue-950 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Inquiries ({messages.length})</span>
            </button>

            <button
              id="admin-tab-settings"
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-blue-950 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Admin Settings</span>
            </button>
          </div>

          {activeTab === 'notices' && (
            <button
              id="admin-create-notice-btn"
              onClick={handleOpenCreateNotice}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Notice</span>
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: NOTICES MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'notices' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-search-notices-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notices by title, content, or ref..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  id="admin-filter-status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="All">Status: All</option>
                  <option value="published">Status: Published Only</option>
                  <option value="draft">Status: Drafts Only</option>
                </select>

                <select
                  id="admin-filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="All">Category: All</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <button
                  onClick={loadAdminData}
                  className="p-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                  title="Reload"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notices Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-4">Notice Title & Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Audience</th>
                      <th className="p-4">Publish Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {loadingNotices ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          Loading notices from database...
                        </td>
                      </tr>
                    ) : notices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-10 text-center text-slate-500">
                          No notices found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      notices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Title & Ref */}
                          <td className="p-4 max-w-sm">
                            <div className="flex items-start gap-2">
                              {notice.isPinned && (
                                <Pin className="w-4 h-4 text-blue-800 shrink-0 mt-0.5 fill-blue-800" />
                              )}
                              <div>
                                <p className="font-bold text-slate-900 line-clamp-1">{notice.title}</p>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                  {notice.refNumber && <span className="font-mono">{notice.refNumber}</span>}
                                  {notice.isSample && (
                                    <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold">
                                      Sample Demo
                                    </span>
                                  )}
                                  {notice.attachment && (
                                    <span className="flex items-center gap-0.5 text-blue-700 font-semibold">
                                      <Paperclip className="w-3 h-3" /> {notice.attachment.type.toUpperCase()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700 text-xs">
                              {notice.category}
                            </span>
                          </td>

                          {/* Audience */}
                          <td className="p-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                            {notice.targetAudience || 'All'}
                          </td>

                          {/* Date */}
                          <td className="p-4 whitespace-nowrap text-xs text-slate-600 font-mono">
                            {new Date(notice.publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>

                          {/* Status & Quick Toggle */}
                          <td className="p-4 whitespace-nowrap">
                            <button
                              id={`toggle-status-btn-${notice.id}`}
                              onClick={() => handleToggleStatus(notice)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer ${
                                notice.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                              }`}
                              title="Click to toggle Published / Draft"
                            >
                              {notice.status === 'published' ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                  <span>Published</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 text-slate-600" />
                                  <span>Draft</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-4 whitespace-nowrap text-right space-x-1">
                            <button
                              id={`edit-notice-btn-${notice.id}`}
                              onClick={() => handleOpenEditNotice(notice)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Edit notice"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              id={`delete-notice-btn-${notice.id}`}
                              onClick={() => setDeletingNoticeId(notice.id)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete notice"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: OWNER MEDIA & IMAGE CONTROL CENTER */}
        {/* ========================================================= */}
        {activeTab === 'photos' && (
          <div className="space-y-8 animate-fade-in">
            
            {photoFeedback && (
              <div className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between gap-2 shadow-sm ${
                photoFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}>
                <div className="flex items-center gap-2">
                  {photoFeedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  <span>{photoFeedback.text}</span>
                </div>
                <button 
                  onClick={() => setPhotoFeedback(null)} 
                  className="text-xs opacity-70 hover:opacity-100 cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Media Sub Navigation */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="media-subtab-logo"
                onClick={() => setMediaActiveSubTab('logo')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaActiveSubTab === 'logo'
                    ? 'bg-blue-950 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>1. School Logo & Seal</span>
                {logoPhoto?.url && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </button>

              <button
                type="button"
                id="media-subtab-hero"
                onClick={() => setMediaActiveSubTab('hero')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaActiveSubTab === 'hero'
                    ? 'bg-blue-950 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>2. Homepage Hero Banner</span>
                {heroPhoto?.url && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </button>

              <button
                type="button"
                id="media-subtab-about"
                onClick={() => setMediaActiveSubTab('about')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaActiveSubTab === 'about'
                    ? 'bg-blue-950 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>3. About Heritage Photo</span>
                {aboutPhoto?.url && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </button>

              <button
                type="button"
                id="media-subtab-facilities"
                onClick={() => setMediaActiveSubTab('facilities')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaActiveSubTab === 'facilities'
                    ? 'bg-blue-950 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>4. Campus Facilities</span>
              </button>

              <button
                type="button"
                id="media-subtab-gallery"
                onClick={() => setMediaActiveSubTab('gallery')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mediaActiveSubTab === 'gallery'
                    ? 'bg-blue-950 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>5. Gallery & Events ({galleryPhotos.length})</span>
              </button>
            </div>

            {/* --------------------------------------------------------- */}
            {/* SUBTAB 1: SCHOOL LOGO & SEAL CONTROL */}
            {/* --------------------------------------------------------- */}
            {mediaActiveSubTab === 'logo' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-blue-950 font-serif flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      Official School Emblem & Logo (Locked & Verified)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Official school emblem locked as the permanent insignia across navbar, certificates, footer, and institutional documents.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shrink-0 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Emblem Locked & Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Preview */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Logo Preview</p>
                      
                      {/* Dark Navbar Preview */}
                      <div className="bg-blue-950 p-4 rounded-xl text-white space-y-2 border border-blue-900">
                        <p className="text-[10px] uppercase font-bold text-blue-300">As shown on Dark Header / Navbar:</p>
                        <div className="flex items-center gap-3 bg-blue-900/40 p-2.5 rounded-lg">
                          <SchoolLogo className="w-12 h-12" customLogoUrl={logoPhoto?.url} />
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">D.P.S. SIKKHO NIKETAN</p>
                            <p className="text-[10px] text-blue-200">Higher Secondary (WBCHSE & WBBSE)</p>
                          </div>
                        </div>
                      </div>

                      {/* Light Card Preview */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
                        <p className="text-[10px] uppercase font-bold text-slate-400">As shown on Light Background / Documents:</p>
                        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <SchoolLogo className="w-12 h-12" customLogoUrl={logoPhoto?.url} />
                          <div>
                            <p className="text-xs font-bold text-blue-950 leading-tight">D.P.S. SIKKHO NIKETAN</p>
                            <p className="text-[10px] text-slate-500">Official Institutional Seal</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                        <p className="font-semibold text-blue-950">
                          Current Source: {logoPhoto?.url ? 'Custom Owner Uploaded Logo' : 'Default Official Bengali Emblem (SVG)'}
                        </p>
                        {logoPhoto?.updatedAt && (
                          <p className="text-[11px] text-slate-400">Last updated: {new Date(logoPhoto.updatedAt).toLocaleString('en-IN')}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Upload and URL Form */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Upload File */}
                    <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-200">
                      <label className="block text-xs font-bold text-blue-950 mb-1.5">
                        Method 1: Upload Logo File From Your Computer / Phone
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 hover:border-blue-700 bg-white rounded-xl cursor-pointer transition-colors text-center">
                        <Upload className="w-8 h-8 text-blue-900 mb-2" />
                        <span className="text-xs font-bold text-blue-950">
                          {uploadingLogo ? 'Uploading & Updating School Logo...' : 'Click to Browse & Upload School Logo'}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">Supports PNG (recommended for transparent background), JPG, WEBP, SVG</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          disabled={uploadingLogo}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">Or Specify Image Link</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    {/* Direct URL Form */}
                    <form onSubmit={handleUpdateLogoUrl} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-bold text-slate-800">
                        Method 2: Set Logo via Image Web URL / Hosted Link
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="url"
                          value={logoUrlInput}
                          onChange={(e) => setLogoUrlInput(e.target.value)}
                          placeholder="https://example.com/school-logo.png"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                        />
                        <button
                          type="submit"
                          disabled={uploadingLogo || !logoUrlInput.trim()}
                          className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow shrink-0"
                        >
                          {uploadingLogo ? 'Saving...' : 'Apply Logo URL'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* SUBTAB 2: HERO BANNER & MAIN SCHOOL BUILDING PHOTO */}
            {/* --------------------------------------------------------- */}
            {mediaActiveSubTab === 'hero' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-blue-950 font-serif flex items-center gap-2">
                      <Camera className="w-5 h-5 text-blue-900" />
                      Homepage Hero Banner & Main Campus Photo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      This large photograph is featured prominently on the top homepage hero section welcoming all visitors.
                    </p>
                  </div>

                  {heroPhoto?.url && (
                    <button
                      onClick={handleRemoveHeroPhoto}
                      disabled={uploadingHero}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Reset to Default Campus Photo</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Homepage Preview</p>
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow border border-slate-200 bg-slate-200">
                      <img 
                        src={heroPhoto?.url || '/src/assets/images/regenerated_image_1788152444999.jpg'} 
                        alt="Hero School Campus" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent p-3 text-white">
                        <p className="text-xs font-bold">{heroPhoto?.caption || 'D.P.S. Sikkho Niketan Main Academic Building'}</p>
                        <p className="text-[10px] text-blue-200">Affiliated to WBCHSE & WBBSE</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                      <p className="font-semibold text-blue-950">Status: {heroPhoto?.url ? 'Custom Campus Banner Active' : 'Default Academic Campus Photograph'}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Upload School Photo File from Computer / Mobile
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 hover:border-blue-700 bg-blue-50/40 rounded-2xl cursor-pointer transition-colors text-center">
                        <Upload className="w-8 h-8 text-blue-900 mb-2" />
                        <span className="text-xs font-bold text-blue-950">
                          {uploadingHero ? 'Uploading & Processing Image...' : 'Click to Browse & Upload Hero Photo'}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 15MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroFileUpload}
                          disabled={uploadingHero}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">Or Provide Direct URL</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <form onSubmit={handleUpdateHeroUrl} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Image Direct URL
                        </label>
                        <input
                          type="url"
                          value={heroUrlInput}
                          onChange={(e) => setHeroUrlInput(e.target.value)}
                          placeholder="https://example.com/school-building.jpg"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Caption / Sub-title
                        </label>
                        <input
                          type="text"
                          value={heroCaptionInput}
                          onChange={(e) => setHeroCaptionInput(e.target.value)}
                          placeholder="Main Academic Building & Campus"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={uploadingHero || !heroUrlInput.trim()}
                        className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow"
                      >
                        {uploadingHero ? 'Saving...' : 'Apply Hero Photo via URL'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* SUBTAB 3: ABOUT SECTION HERITAGE PHOTO */}
            {/* --------------------------------------------------------- */}
            {mediaActiveSubTab === 'about' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-blue-950 font-serif flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-900" />
                      About Section & Heritage Building Photo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Shown beside the institution history narrative, ESTD 1968 milestones, and headmaster vision.
                    </p>
                  </div>

                  {aboutPhoto?.url && (
                    <button
                      onClick={handleResetAboutPhoto}
                      disabled={uploadingAbout}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <RotateCcw className="w-4 h-4 text-blue-900" />
                      <span>Reset to Default</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live About Section Preview</p>
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow border border-slate-200 bg-slate-200">
                      <img 
                        src={aboutPhoto?.url || '/src/assets/images/regenerated_image_1788152444999.jpg'} 
                        alt="About Section Building" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-amber-400 text-blue-950 font-bold px-3 py-1 rounded-full text-xs shadow">
                        ESTD 1968
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                      <p className="font-semibold text-blue-950">Caption: {aboutPhoto?.caption || 'Official Heritage Building Block (ESTD 1968)'}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Upload About Photo from Computer / Mobile
                      </label>
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 hover:border-blue-700 bg-blue-50/40 rounded-2xl cursor-pointer transition-colors text-center">
                        <Upload className="w-8 h-8 text-blue-900 mb-2" />
                        <span className="text-xs font-bold text-blue-950">
                          {uploadingAbout ? 'Uploading About Photo...' : 'Click to Browse & Upload About Photo'}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG, WEBP (Max 15MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAboutFileUpload}
                          disabled={uploadingAbout}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">Or Specify Image Link</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <form onSubmit={handleUpdateAboutUrl} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Image Direct URL
                        </label>
                        <input
                          type="url"
                          value={aboutUrlInput}
                          onChange={(e) => setAboutUrlInput(e.target.value)}
                          placeholder="https://example.com/school-heritage-building.jpg"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Caption / Historical Note
                        </label>
                        <input
                          type="text"
                          value={aboutCaptionInput}
                          onChange={(e) => setAboutCaptionInput(e.target.value)}
                          placeholder="Official Heritage Building Block (ESTD 1968)"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={uploadingAbout || !aboutUrlInput.trim()}
                        className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow"
                      >
                        {uploadingAbout ? 'Saving...' : 'Apply About Photo via URL'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* SUBTAB 4: CAMPUS FACILITIES PHOTOS */}
            {/* --------------------------------------------------------- */}
            {mediaActiveSubTab === 'facilities' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-blue-950 font-serif flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-900" />
                    Campus Facilities Photography Control
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Upload or specify real photographs for our key campus facilities: Science Laboratories, Computer ICT Lab, Central Library, and Sports Ground.
                  </p>
                </div>

                <form onSubmit={handleSaveFacilityPhotos} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Facility 1: Science Lab */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">🔬 Science & Robotics Labs</span>
                        {facilityForm.scienceLab && (
                          <button
                            type="button"
                            onClick={() => handleClearFacilityPhoto('scienceLab')}
                            className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear Photo
                          </button>
                        )}
                      </div>
                      
                      {facilityForm.scienceLab ? (
                        <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                          <img src={facilityForm.scienceLab} alt="Science Lab" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 bg-white">
                          Default 3D Science Illustration Active
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={facilityForm.scienceLab}
                          onChange={(e) => setFacilityForm({ ...facilityForm, scienceLab: e.target.value })}
                          placeholder="Image URL for Science Lab..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <label className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-800 shrink-0">
                          {uploadingFacilityKey === 'scienceLab' ? '...' : 'Upload'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFacilityFileUpload(e, 'scienceLab')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Facility 2: Computer Lab */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">💻 Computer & ICT Center</span>
                        {facilityForm.computerLab && (
                          <button
                            type="button"
                            onClick={() => handleClearFacilityPhoto('computerLab')}
                            className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear Photo
                          </button>
                        )}
                      </div>
                      
                      {facilityForm.computerLab ? (
                        <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                          <img src={facilityForm.computerLab} alt="Computer Lab" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 bg-white">
                          Default 3D ICT Lab Illustration Active
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={facilityForm.computerLab}
                          onChange={(e) => setFacilityForm({ ...facilityForm, computerLab: e.target.value })}
                          placeholder="Image URL for Computer Lab..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <label className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-800 shrink-0">
                          {uploadingFacilityKey === 'computerLab' ? '...' : 'Upload'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFacilityFileUpload(e, 'computerLab')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Facility 3: Library */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">📚 Central Library & Reading Hall</span>
                        {facilityForm.library && (
                          <button
                            type="button"
                            onClick={() => handleClearFacilityPhoto('library')}
                            className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear Photo
                          </button>
                        )}
                      </div>
                      
                      {facilityForm.library ? (
                        <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                          <img src={facilityForm.library} alt="Library" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 bg-white">
                          Default 3D Library Illustration Active
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={facilityForm.library}
                          onChange={(e) => setFacilityForm({ ...facilityForm, library: e.target.value })}
                          placeholder="Image URL for Library..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <label className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-800 shrink-0">
                          {uploadingFacilityKey === 'library' ? '...' : 'Upload'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFacilityFileUpload(e, 'library')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Facility 4: Sports Ground */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">⚽ Sports Ground & Athletics Arena</span>
                        {facilityForm.sportsField && (
                          <button
                            type="button"
                            onClick={() => handleClearFacilityPhoto('sportsField')}
                            className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Clear Photo
                          </button>
                        )}
                      </div>
                      
                      {facilityForm.sportsField ? (
                        <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                          <img src={facilityForm.sportsField} alt="Sports Ground" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 bg-white">
                          Default 3D Sports Illustration Active
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={facilityForm.sportsField}
                          onChange={(e) => setFacilityForm({ ...facilityForm, sportsField: e.target.value })}
                          placeholder="Image URL for Sports Ground..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                        <label className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-800 shrink-0">
                          {uploadingFacilityKey === 'sportsField' ? '...' : 'Upload'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFacilityFileUpload(e, 'sportsField')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      disabled={savingFacilities}
                      className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow"
                    >
                      {savingFacilities ? 'Saving Facility Photos...' : 'Save All Facility Photographs'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* SUBTAB 5: CAMPUS EVENTS & GALLERY PHOTOS */}
            {/* --------------------------------------------------------- */}
            {mediaActiveSubTab === 'gallery' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-blue-950 font-serif flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-900" />
                    Campus Events & Activities Gallery
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Upload photos for sports tournaments, science exhibitions, cultural functions, and celebrations.
                  </p>
                </div>

                {/* Add New Gallery Photo Form */}
                <form onSubmit={handleAddGalleryPhoto} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950">Add Photo to Gallery</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Photo Title *</label>
                      <input
                        type="text"
                        required
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Science Exhibition 2026"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={galleryCategory}
                        onChange={(e) => setGalleryCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                      >
                        <option value="Campus">Campus & Infrastructure</option>
                        <option value="Academic">Academic & Laboratories</option>
                        <option value="Sports">Sports & Athletics</option>
                        <option value="Culture">Cultural & Celebrations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Date</label>
                      <input
                        type="text"
                        value={galleryCaption}
                        onChange={(e) => setGalleryCaption(e.target.value)}
                        placeholder="e.g. Students demonstrating eco-friendly projects"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        required
                        value={galleryUrl}
                        onChange={(e) => setGalleryUrl(e.target.value)}
                        placeholder="Image URL or upload file via button on the right"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <label className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingGallery ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryFileUpload}
                        disabled={uploadingGallery}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={uploadingGallery || !galleryTitle.trim() || !galleryUrl.trim()}
                      className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow"
                    >
                      Add to Gallery
                    </button>
                  </div>
                </form>

                {/* Gallery Items Grid */}
                {galleryPhotos.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">No custom gallery photos attached yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryPhotos.map((photo) => (
                      <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                        <div className="aspect-video bg-slate-100 overflow-hidden">
                          <img 
                            src={photo.imageUrl} 
                            alt={photo.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-bold text-slate-900 truncate">{photo.title}</p>
                          <p className="text-[11px] text-blue-900 font-semibold">{photo.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGalleryPhoto(photo.id)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: INQUIRIES / CONTACT MESSAGES */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-blue-950 mb-4 font-serif">
                Public Contact Inquiries & Feedback ({messages.length})
              </h2>

              {messages.length === 0 ? (
                <p className="text-xs sm:text-sm text-slate-500 py-8 text-center">
                  No incoming contact messages yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                          <span className="text-xs text-blue-900 font-semibold">({msg.email})</span>
                          {msg.phone && <span className="text-xs text-slate-500 font-mono">📱 {msg.phone}</span>}
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-200">
                        Subject: {msg.subject}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ADMIN SETTINGS & SAMPLE DATA MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            
            {/* Change Password Form */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <KeyRound className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base font-serif">Change Administrator Password</h3>
              </div>

              {passwordMessage && (
                <div className={`p-3 rounded-xl text-xs ${
                  passwordMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password (Min 6 chars)</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="px-5 py-2.5 bg-blue-950 text-white rounded-xl text-xs font-bold hover:bg-blue-900 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {updatingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Sample/Demo Notice Management */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Layers className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base font-serif">Sample Notice Data Tools</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                As specified in the official school website requirements, you can easily flush sample notices when real school notices are ready, or restore initial demo notices for testing.
              </p>

              {demoFeedback && (
                <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold">
                  {demoFeedback}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleDemoAction('remove-demo')}
                  disabled={demoActionLoading}
                  className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Remove All Demo/Sample Notices</span>
                </button>

                <button
                  onClick={() => handleDemoAction('reset-demo')}
                  disabled={demoActionLoading}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                  <span>Reset to Default Sample Notices</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* NOTICE EDITOR MODAL (Create / Edit) */}
      {/* ========================================================= */}
      {isEditorOpen && editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            
            {/* Header */}
            <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between border-b-2 border-blue-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-200" />
                <h3 className="text-base font-bold text-white font-serif">
                  {editingNotice.id ? 'Edit School Notice' : 'Draft New School Notice'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              
              {editorError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{editorError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Notice Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingNotice.title || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. Schedule of 2nd Summative Evaluation 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Category, Audience, Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingNotice.category || 'General'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value as NoticeCategory })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={editingNotice.targetAudience || 'All'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                  >
                    <option value="All">All School</option>
                    <option value="Students">Students</option>
                    <option value="Parents">Parents & Guardians</option>
                    <option value="Teachers">Teachers & Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reference No.</label>
                  <input
                    type="text"
                    value={editingNotice.refNumber || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, refNumber: e.target.value })}
                    placeholder="DPSS/SKSN/2026/01"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Notice Content */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Notice Content & Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  value={editingNotice.content || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  placeholder="Enter the official school circular description, guidelines, dates, and instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm leading-relaxed focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Short Summary / Excerpt (Optional)
                </label>
                <input
                  type="text"
                  value={editingNotice.summary || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, summary: e.target.value })}
                  placeholder="Brief preview text for cards (leave blank to auto-generate)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              {/* Publication Date & Pin Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publication Date & Time</label>
                  <input
                    type="datetime-local"
                    value={editingNotice.publishedAt || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, publishedAt: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-3 sm:pt-0">
                  <input
                    type="checkbox"
                    id="pin-notice-checkbox"
                    checked={Boolean(editingNotice.isPinned)}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPinned: e.target.checked })}
                    className="w-4 h-4 text-blue-950 rounded focus:ring-blue-900"
                  />
                  <label htmlFor="pin-notice-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1">
                    <Pin className="w-3.5 h-3.5 text-blue-800" /> Pin Notice to Top of Board
                  </label>
                </div>
              </div>

              {/* File Attachment Upload */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-700">
                  Official Attachment (PDF / Image / Doc)
                </label>
                
                {editingNotice.attachment ? (
                  <div className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-900" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{editingNotice.attachment.name}</p>
                        <p className="text-[11px] text-slate-500">{editingNotice.attachment.size} • {editingNotice.attachment.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingNotice({ ...editingNotice, attachment: null })}
                      className="text-xs text-rose-600 hover:underline font-bold cursor-pointer"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-blue-900 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingFile ? 'Uploading file...' : 'Choose PDF / Image File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        disabled={uploadingFile}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-500">Max size: 15MB</span>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={savingNotice}
                  onClick={() => handleSaveNotice('draft')}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  disabled={savingNotice}
                  onClick={() => handleSaveNotice('published')}
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-md disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{savingNotice ? 'Publishing...' : 'Publish Immediately'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {deletingNoticeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Delete School Notice?</h3>
              <p className="text-xs text-slate-500">
                This notice will be permanently removed from the database and public notice board.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingNoticeId(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 shadow cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
