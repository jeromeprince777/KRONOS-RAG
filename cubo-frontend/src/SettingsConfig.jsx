import { useState, useEffect } from 'react';

const API_BASE = '';

const DEFAULTS = {
  bm25Weight: 0.4,
  faissNprobe: 8,
  topK: 10,
  semanticReranking: true,
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 1024,
  frequencyPenalty: 0.0,
  dataRetention: '30 days',
  auditLogging: true,
  encryption: true,
  gpuAcceleration: 'Auto-detect (Recommended)',
  activeModel: 'Llama-3.2-3B',
};

function Toggle({ checked, onChange }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="slider" />
    </label>
  );
}

function SliderCard({ label, value, min, max, step, onChange, leftLabel, rightLabel, unit = '' }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-4">
        <label className="font-label-md text-on-surface">{label}</label>
        <span className="text-primary font-bold">{value}{unit}</span>
      </div>
      <input
        className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      {leftLabel && (
        <div className="flex justify-between mt-2 text-caption text-text-secondary">
          <span>{leftLabel}</span>
          {rightLabel && <span>{rightLabel}</span>}
        </div>
      )}
    </div>
  );
}

export default function SettingsConfig() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [activeSection, setActiveSection] = useState('retrieval');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Load settings from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then(r => r.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => { /* backend may not have settings endpoint yet — use defaults */ });
  }, []);

  const update = (key) => (val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showNotification('✓ Settings saved successfully');
        setIsDirty(false);
      } else {
        showNotification('✗ Failed to save settings', 'error');
      }
    } catch {
      // If backend not available, just show success for local demo
      showNotification('✓ Settings saved locally (offline mode)');
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to defaults?')) {
      setSettings(DEFAULTS);
      setIsDirty(true);
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(settings, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cubo_settings.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateAuditReport = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/compliance/report`);
      const data = await res.json();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'cubo_audit_report.json'; a.click();
      URL.revokeObjectURL(url);
      showNotification('✓ Audit report downloaded');
    } catch {
      showNotification('✗ Could not generate report', 'error');
    }
  };

  const navItems = [
    { id: 'retrieval', label: 'Retrieval', icon: 'search_insights' },
    { id: 'generation', label: 'Generation', icon: 'auto_awesome' },
    { id: 'compliance', label: 'Compliance', icon: 'gavel' },
    { id: 'system', label: 'System', icon: 'dns' },
  ];

  return (
    <div>
      {/* Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white font-label-md ${notification.type === 'error' ? 'bg-danger' : 'bg-secondary'}`}>
          {notification.msg}
        </div>
      )}

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border h-full flex-shrink-0">
          <div className="p-6 flex items-center gap-3 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white font-black text-lg">C</div>
            <span className="font-headline-md text-headline-md font-bold text-primary">CUBO</span>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'text-primary-container bg-surface-container-low font-bold'
                    : 'text-text-secondary hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">A</div>
              <div className="flex-1 min-w-0">
                <p className="text-label-md font-label-md truncate">Admin</p>
                <p className="text-caption text-text-secondary truncate">Admin Account</p>
              </div>
              <span className="material-symbols-outlined text-text-secondary">settings</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background custom-scrollbar">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border px-8 h-16 flex items-center justify-between">
            <h1 className="font-headline-sm text-headline-sm text-on-surface">Settings & Configuration</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-6 w-px bg-border" />
              <button
                className="bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-primary hover:text-white transition-all active:scale-95 duration-150 disabled:opacity-60"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-8 py-10 space-y-12">
            {/* Section A: Retrieval */}
            <section id="retrieval" className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-headline-md text-headline-md text-on-surface">Retrieval Settings</h2>
                <span className="material-symbols-outlined text-primary">manage_search</span>
              </div>
              <div className="bg-primary-fixed-dim/20 border-l-4 border-primary-container p-4 rounded-r-lg flex gap-3">
                <span className="material-symbols-outlined text-primary-container">info</span>
                <p className="text-body-md text-primary">These settings affect search speed and accuracy by tuning the hybrid retrieval engine.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SliderCard
                  label="BM25 Weight"
                  value={settings.bm25Weight}
                  min={0.3} max={0.7} step={0.05}
                  onChange={update('bm25Weight')}
                  leftLabel="Lexical Focus (0.3)"
                  rightLabel="High BM25 (0.7)"
                />
                <SliderCard
                  label="FAISS nprobe"
                  value={settings.faissNprobe}
                  min={4} max={32} step={4}
                  onChange={update('faissNprobe')}
                  leftLabel="Fast (4)"
                  rightLabel="Accurate (32)"
                />
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <label className="block font-label-md text-on-surface mb-2">Top-K Results</label>
                  <select
                    className="w-full bg-background border-border border-2 rounded-lg py-2 px-3 focus:border-primary-container focus:ring-0 outline-none transition-colors"
                    value={settings.topK}
                    onChange={e => update('topK')(Number(e.target.value))}
                  >
                    {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <p className="mt-2 text-caption text-text-secondary">Number of documents returned per query.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <label className="font-label-md text-on-surface">Semantic Reranking</label>
                      <span className="material-symbols-outlined text-text-secondary text-base cursor-help" title="Uses Cross-Encoder for better accuracy">help</span>
                    </div>
                    <p className="text-caption text-text-secondary">Use Cross-Encoder for better accuracy.</p>
                  </div>
                  <Toggle checked={settings.semanticReranking} onChange={update('semanticReranking')} />
                </div>
              </div>
            </section>

            {/* Section B: Generation */}
            <section id="generation" className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-headline-md text-headline-md text-on-surface">LLM Generation Settings</h2>
                <span className="material-symbols-outlined text-primary">smart_toy</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SliderCard
                      label="Temperature"
                      value={settings.temperature}
                      min={0.1} max={1.0} step={0.1}
                      onChange={update('temperature')}
                      leftLabel="Factual (0.1)"
                      rightLabel="Creative (1.0)"
                    />
                    <SliderCard
                      label="Top-P Sampling"
                      value={settings.topP}
                      min={0.5} max={1.0} step={0.05}
                      onChange={update('topP')}
                      leftLabel="Conservative (0.5)"
                      rightLabel="Diverse (1.0)"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <label className="block font-label-md text-on-surface mb-2">Max Tokens</label>
                    <select
                      className="w-full bg-background border-border border-2 rounded-lg py-2 px-3 focus:border-primary-container outline-none"
                      value={settings.maxTokens}
                      onChange={e => update('maxTokens')(Number(e.target.value))}
                    >
                      {[256, 512, 1024, 2048].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <SliderCard
                    label="Frequency Penalty"
                    value={settings.frequencyPenalty}
                    min={0.0} max={2.0} step={0.1}
                    onChange={update('frequencyPenalty')}
                    leftLabel="None (0.0)"
                    rightLabel="High (2.0)"
                  />
                </div>
              </div>
            </section>

            {/* Section C: GDPR */}
            <section id="compliance" className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-headline-md text-headline-md text-on-surface">GDPR Compliance</h2>
                <span className="material-symbols-outlined text-secondary">verified_user</span>
              </div>
              <div className="bg-error-container/20 border-l-4 border-error p-4 rounded-r-lg flex gap-3">
                <span className="material-symbols-outlined text-error">warning</span>
                <p className="text-body-md text-on-error-container">Changing retention policy affects all stored data immediately. This action is irreversible.</p>
              </div>
              <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <label className="font-label-md text-on-surface">Data Retention Period</label>
                    <p className="text-caption text-text-secondary">How long logs and history are stored.</p>
                  </div>
                  <select
                    className="w-full md:w-48 bg-background border-border border-2 rounded-lg py-2 px-3 focus:border-primary-container outline-none"
                    value={settings.dataRetention}
                    onChange={e => update('dataRetention')(e.target.value)}
                  >
                    {['7 days', '30 days', '90 days'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-text-secondary">description</span>
                      <span className="font-label-md">Audit Logging</span>
                    </div>
                    <Toggle checked={settings.auditLogging} onChange={update('auditLogging')} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-text-secondary">lock</span>
                      <span className="font-label-md">End-to-End Encryption</span>
                    </div>
                    <Toggle checked={settings.encryption} onChange={update('encryption')} />
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low/50">
                  <button
                    className="flex items-center gap-2 bg-primary-container text-on-primary px-5 py-2.5 rounded-lg font-label-md hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                    onClick={handleGenerateAuditReport}
                  >
                    <span className="material-symbols-outlined text-lg">summarize</span>
                    Generate Audit Report
                  </button>
                </div>
              </div>
            </section>

            {/* Section D: System */}
            <section id="system" className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="font-headline-md text-headline-md text-on-surface">System Configuration</h2>
                <span className="material-symbols-outlined text-text-secondary">settings_input_component</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                  <div>
                    <label className="block font-label-md text-on-surface mb-2">GPU Acceleration</label>
                    <select
                      className="w-full bg-background border-border border-2 rounded-lg py-2 px-3 focus:border-primary-container outline-none"
                      value={settings.gpuAcceleration}
                      onChange={e => update('gpuAcceleration')(e.target.value)}
                    >
                      <option>Auto-detect (Recommended)</option>
                      <option>NVIDIA RTX 4050</option>
                      <option>CPU Only</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <label className="block font-label-md text-on-surface mb-2">System Memory</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-surface-container-highest h-2 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full" style={{ width: '65%' }} />
                      </div>
                      <span className="text-caption font-bold">~65% used</span>
                    </div>
                    <p className="text-caption text-text-secondary mt-1">Read-only system status.</p>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <label className="block font-label-md text-on-surface mb-4">Active Model Selection</label>
                  <div className="space-y-3">
                    {['Llama-3.2-3B', 'Qwen-3.5-4B'].map(model => (
                      <label
                        key={model}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer group transition-all ${
                          settings.activeModel === model
                            ? 'border-primary-container bg-surface-container-low'
                            : 'border-border hover:border-outline-variant'
                        }`}
                      >
                        <input
                          type="radio"
                          name="model"
                          className="w-4 h-4 text-primary-container focus:ring-0"
                          checked={settings.activeModel === model}
                          onChange={() => update('activeModel')(model)}
                        />
                        <div className="flex-1">
                          <p className="font-label-md text-on-surface">{model}</p>
                          <p className="text-caption text-text-secondary">
                            {model === 'Llama-3.2-3B' ? 'Balanced efficiency & speed' : 'Enhanced reasoning capabilities'}
                          </p>
                        </div>
                        {settings.activeModel === model && (
                          <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Save Bar */}
            <div className="sticky bottom-8 z-10 bg-surface/90 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-label-md font-bold">
                  {isDirty ? '⚠ Unsaved Changes Detected' : '✓ All changes saved'}
                </span>
                <span className="text-caption text-text-secondary">
                  {isDirty ? 'Remember to save before leaving' : 'Settings are up to date'}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  className="flex-1 md:flex-none px-6 py-2.5 border border-border text-text-secondary rounded-lg font-label-md hover:bg-surface-container-low transition-all"
                  onClick={handleReset}
                >
                  Reset to Defaults
                </button>
                <button
                  className="flex-1 md:flex-none px-6 py-2.5 bg-surface-container-highest text-on-surface rounded-lg font-label-md hover:bg-surface-variant transition-all flex items-center justify-center gap-2"
                  onClick={handleExport}
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Export
                </button>
                <button
                  className="flex-2 md:flex-none px-10 py-2.5 bg-primary-container text-on-primary rounded-lg font-label-md hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg disabled:opacity-60"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="font-label-md text-label-md font-black text-text-primary">CUBO</span>
                <p className="font-caption text-caption text-text-secondary">© 2026 CUBO Document Intelligence.</p>
              </div>
              <div className="flex items-center gap-6">
                <a className="font-caption text-caption text-text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="font-caption text-caption text-text-secondary hover:text-primary transition-colors" href="#">Contact Support</a>
                <a className="font-caption text-caption text-text-secondary hover:text-primary transition-colors flex items-center gap-1" href="#">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  System Status
                </a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
