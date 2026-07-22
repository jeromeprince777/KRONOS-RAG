import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = '';

const FILE_TYPES = ['All', 'PDF', 'DOCX', 'CSV', 'TXT'];

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getStorageColor(pct) {
  if (pct >= 80) return 'bg-danger';
  if (pct >= 50) return 'bg-amber-500';
  return 'bg-secondary';
}

export default function DocumentManager() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [storage, setStorage] = useState({ used: 0, total: 10 * 1024 * 1024 * 1024 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [selectedDocs, setSelectedDocs] = useState(new Set());
  const [isDragOver, setIsDragOver] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);
  const DOCS_PER_PAGE = 10;

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/documents`);
      const data = await res.json();
      setDocuments(data.documents || []);
      if (data.storage_total) {
        setStorage({ used: data.storage_used || 0, total: data.storage_total });
      }
    } catch (e) {
      console.error('Failed to fetch documents:', e);
    }
  }, []);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  // Apply filter + sort whenever docs / filter / sort changes
  useEffect(() => {
    let list = [...documents];
    if (activeFilter !== 'All') {
      list = list.filter(d => d.doc_id?.toLowerCase().endsWith(`.${activeFilter.toLowerCase()}`));
    }
    if (sortBy === 'Name') {
      list.sort((a, b) => (a.doc_id || '').localeCompare(b.doc_id || ''));
    } else if (sortBy === 'Date') {
      list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    } else if (sortBy === 'Chunks') {
      list.sort((a, b) => (b.chunks || 0) - (a.chunks || 0));
    }
    setFilteredDocs(list);
    setCurrentPage(1);
  }, [documents, activeFilter, sortBy]);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    setUploadingFileName(file.name);
    setUploadProgress(0);

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/api/documents/upload`, true);
      xhr.timeout = 5 * 60 * 1000; // 5 minutes — embedding on CPU can take 60-120s
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve({ success: true, name: file.name });
        } else {
          // Try to parse FastAPI's {"detail": "..."} error format
          let detail = xhr.responseText;
          try {
            const parsed = JSON.parse(xhr.responseText);
            if (parsed.detail) detail = parsed.detail;
          } catch (_) { /* use raw text */ }
          resolve({ success: false, name: file.name, error: detail });
        }
      };
      xhr.onerror = () => resolve({ success: false, name: file.name, error: 'Network error — is the backend running on port 8000?' });
      xhr.ontimeout = () => resolve({ success: false, name: file.name, error: 'Upload timed out (5 min). The file may be too large or embedding too slow.' });
      xhr.send(formData);
    });
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    for (const file of fileList) {
      const result = await uploadFile(file);
      if (result.success) {
        showNotification(`✓ "${result.name}" uploaded and indexed successfully`);
      } else {
        const detail = result.error ? ` — ${String(result.error).substring(0, 120)}` : '';
        showNotification(`✗ Failed to upload "${result.name}"${detail}`, 'error');
      }
    }
    setIsUploading(false);
    setUploadProgress(0);
    setUploadingFileName('');
    fetchDocuments();
  };

  const handleInputChange = (e) => handleFileUpload(e.target.files);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDeleteDoc = async (docId) => {
    if (!window.confirm(`Delete "${docId}" and all its chunks? This is irreversible.`)) return;
    setDeletingId(docId);
    try {
      const res = await fetch(`${API_BASE}/api/documents/${encodeURIComponent(docId)}`, { method: 'DELETE' });
      if (res.ok) {
        showNotification(`✓ "${docId}" deleted`);
        fetchDocuments();
      } else {
        showNotification(`✗ Failed to delete "${docId}"`, 'error');
      }
    } catch {
      showNotification('✗ Network error during delete', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedDocs.size === 0) return;
    if (!window.confirm(`Delete ${selectedDocs.size} selected document(s)?`)) return;
    for (const docId of selectedDocs) {
      await handleDeleteDoc(docId);
    }
    setSelectedDocs(new Set());
  };

  const toggleSelect = (docId) => {
    setSelectedDocs(prev => {
      const next = new Set(prev);
      next.has(docId) ? next.delete(docId) : next.add(docId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const pageItems = pagedDocs.map(d => d.doc_id);
    const allSelected = pageItems.every(id => selectedDocs.has(id));
    setSelectedDocs(prev => {
      const next = new Set(prev);
      if (allSelected) pageItems.forEach(id => next.delete(id));
      else pageItems.forEach(id => next.add(id));
      return next;
    });
  };

  const handleExportMetadata = () => {
    const csv = ['doc_id,timestamp,chunks', ...documents.map(d =>
      `"${d.doc_id}","${d.timestamp || ''}",${d.chunks || 0}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cubo_documents.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / DOCS_PER_PAGE));
  const pagedDocs = filteredDocs.slice((currentPage - 1) * DOCS_PER_PAGE, currentPage * DOCS_PER_PAGE);
  const storagePct = Math.min(100, (storage.used / storage.total) * 100);

  const getDocType = (docId) => {
    const ext = docId?.split('.').pop()?.toUpperCase();
    return ['PDF', 'DOCX', 'CSV', 'XLSX', 'TXT'].includes(ext) ? ext : 'DOC';
  };

  const getDocIcon = (docId) => {
    const ext = docId?.split('.').pop()?.toLowerCase();
    const icons = { pdf: 'picture_as_pdf', docx: 'article', csv: 'table_chart', xlsx: 'table_chart', txt: 'text_snippet' };
    return icons[ext] || 'description';
  };

  return (
    <div>
      {/* Toast notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white font-label-md transition-all ${notification.type === 'error' ? 'bg-danger' : 'bg-secondary'}`}>
          <span className="material-symbols-outlined text-sm">
            {notification.type === 'error' ? 'error' : 'check_circle'}
          </span>
          {notification.msg}
        </div>
      )}

      <main className="max-w-container-max mx-auto px-margin-page py-10 min-h-screen">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Document Manager</h1>
          <p className="text-text-secondary text-lg">Manage your document corpus and monitor indexing status in real-time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Upload Zone */}
            <section
              className={`bg-card rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group h-[250px] ${isDragOver ? 'drag-over' : 'border-outline-variant hover:border-primary-container hover:bg-surface-container-low'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <div className="w-full flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-[32px] text-primary animate-bounce">upload</span>
                  <p className="font-label-md text-text-primary truncate max-w-full px-2">{uploadingFileName}</p>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-caption text-text-secondary">{uploadProgress}% uploaded</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-primary-container group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[32px]">upload</span>
                  </div>
                  <p className="font-label-md text-label-md text-text-primary mb-1">
                    {isDragOver ? 'Drop files here!' : 'Drag files here or click to browse'}
                  </p>
                  <p className="text-caption text-text-secondary mb-6">Supported: PDF, DOCX, CSV, XLSX, TXT</p>
                  <span className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm">north</span>
                    Upload Files
                  </span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.csv,.xlsx,.txt"
                className="hidden"
                onChange={handleInputChange}
              />
            </section>

            {/* Storage Status */}
            <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-label-md text-label-md text-text-primary">Storage Status</h3>
                <span className={`text-caption font-bold ${storagePct >= 80 ? 'text-danger' : storagePct >= 50 ? 'text-amber-500' : 'text-secondary'}`}>
                  {storagePct.toFixed(1)}% Used
                </span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full transition-all duration-1000 ${getStorageColor(storagePct)}`}
                  style={{ width: `${storagePct}%` }}
                />
              </div>
              <div className="flex justify-between text-caption text-text-secondary">
                <span>{formatBytes(storage.used)} used</span>
                <span>{formatBytes(storage.total)} total</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="bg-surface-container-low rounded-lg p-2">
                  <p className="text-headline-sm font-bold text-text-primary">{documents.length}</p>
                  <p className="text-caption text-text-secondary">Documents</p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-2">
                  <p className="text-headline-sm font-bold text-text-primary">
                    {documents.reduce((a, d) => a + (d.chunks || 0), 0)}
                  </p>
                  <p className="text-caption text-text-secondary">Chunks</p>
                </div>
              </div>
            </section>

            {/* Bulk Actions */}
            <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-label-md text-label-md text-text-primary mb-4">Bulk Actions</h3>
              <p className="text-caption text-text-secondary mb-3">
                {selectedDocs.size > 0 ? `${selectedDocs.size} document(s) selected` : 'Select rows to enable actions'}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border font-label-md text-label-md hover:bg-surface-container-low transition-colors"
                  onClick={handleExportMetadata}
                >
                  <span className="material-symbols-outlined text-body-md">download</span>
                  Export Metadata (CSV)
                </button>
                <button
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border font-label-md text-label-md transition-colors ${selectedDocs.size > 0 ? 'border-danger text-danger hover:bg-danger/5 cursor-pointer' : 'border-border text-text-secondary opacity-50 cursor-not-allowed'}`}
                  onClick={handleBulkDelete}
                  disabled={selectedDocs.size === 0}
                >
                  <span className="material-symbols-outlined text-body-md">delete</span>
                  Bulk Delete ({selectedDocs.size})
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Document Table */}
          <div className="lg:col-span-8 space-y-6">
            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {FILE_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
                      activeFilter === type
                        ? 'bg-primary text-white'
                        : 'bg-surface-container hover:bg-surface-container-highest'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-text-secondary font-label-md text-label-md whitespace-nowrap">
                  <span className="material-symbols-outlined">sort</span>
                  Sort by:
                  <select
                    className="bg-transparent border-none focus:ring-0 text-text-primary font-bold cursor-pointer"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option>Date</option>
                    <option>Name</option>
                    <option>Chunks</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-border">
                      <th className="p-4 w-12 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-outline-variant"
                          onChange={toggleSelectAll}
                          checked={pagedDocs.length > 0 && pagedDocs.every(d => selectedDocs.has(d.doc_id))}
                        />
                      </th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Filename</th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Type</th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Status</th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Chunks</th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Uploaded</th>
                      <th className="p-4 font-label-md text-label-md text-text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pagedDocs.length === 0 && (
                      <tr>
                        <td colSpan="7" className="p-12 text-center text-text-secondary">
                          <span className="material-symbols-outlined text-4xl block mb-3">folder_open</span>
                          {activeFilter !== 'All'
                            ? `No ${activeFilter} documents found`
                            : 'No documents uploaded yet. Upload your first document above.'}
                        </td>
                      </tr>
                    )}
                    {pagedDocs.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            className="rounded border-outline-variant"
                            checked={selectedDocs.has(doc.doc_id)}
                            onChange={() => toggleSelect(doc.doc_id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">{getDocIcon(doc.doc_id)}</span>
                            <span className="font-label-md text-label-md text-text-primary truncate max-w-[200px]" title={doc.doc_id}>
                              {doc.doc_id}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 font-body-md text-body-md text-text-secondary">
                          {getDocType(doc.doc_id)}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-[12px]">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Indexed
                          </span>
                        </td>
                        <td className="p-4 font-body-md text-body-md text-text-secondary">{doc.chunks || 0}</td>
                        <td className="p-4 font-body-md text-body-md text-text-secondary">
                          {doc.timestamp ? new Date(doc.timestamp).toLocaleDateString() : '—'}
                        </td>
                        <td className="p-4">
                          <button
                            className="p-1.5 rounded hover:bg-danger/10 text-danger transition-colors disabled:opacity-40"
                            onClick={() => handleDeleteDoc(doc.doc_id)}
                            disabled={deletingId === doc.doc_id}
                            title="Delete document"
                          >
                            {deletingId === doc.doc_id
                              ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                              : <span className="material-symbols-outlined text-sm">delete</span>}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-surface-container-low">
                <span className="text-caption text-text-secondary">
                  Showing {filteredDocs.length === 0 ? 0 : (currentPage - 1) * DOCS_PER_PAGE + 1}–{Math.min(currentPage * DOCS_PER_PAGE, filteredDocs.length)} of {filteredDocs.length} documents
                </span>
                <div className="flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-surface-container-highest transition-colors disabled:opacity-40"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="px-3 py-1 text-caption text-text-secondary">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    className="p-1 rounded hover:bg-surface-container-highest transition-colors disabled:opacity-40"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-margin-page w-full">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:items-start items-center gap-2">
            <span className="font-label-md text-label-md font-black text-text-primary">KRONOS</span>
            <span className="font-caption text-caption text-text-secondary">© 2026 KRONOS Document Intelligence. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <a className="text-text-secondary hover:text-primary font-caption text-caption" href="#">Privacy Policy</a>
            <a className="text-text-secondary hover:text-primary font-caption text-caption" href="#">Terms of Service</a>
            <a className="text-text-secondary hover:text-primary font-caption text-caption" href="#">System Status</a>
            <a className="text-text-secondary hover:text-primary font-caption text-caption" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
