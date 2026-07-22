import { useState, useEffect } from 'react';

const API_BASE = '';

const MOCK_EVENTS = [
  { type: 'upload', color: 'bg-primary', icon: 'upload', label: 'Document upload', time: '10:45 AM', detail: 'User: ID_92842 • 14 files' },
  { type: 'search', color: 'bg-secondary', icon: 'search', label: 'Search query', time: '09:32 AM', detail: 'User: ID_44210 • 1 resource' },
  { type: 'delete', color: 'bg-danger', icon: 'delete', label: 'Data deletion', time: 'Yesterday', detail: 'System Auto • 412 entries' },
  { type: 'login', color: 'bg-outline', icon: 'login', label: 'User login', time: 'Yesterday', detail: 'User: ID_10292 • 2FA verified' },
];

const ACCESS_LOG_MOCK = [
  { ts: '2024-07-01 14:22:01', user: 'USR-88219', action: 'READ', resource: '/legal/contracts/v2', ip: '192.168.1.44', status: 'success' },
  { ts: '2024-07-01 14:15:55', user: 'USR-10023', action: 'WRITE', resource: '/hr/records/p3', ip: '10.0.0.122', status: 'success' },
  { ts: '2024-07-01 13:58:12', user: 'USR-92842', action: 'DELETE', resource: '/cache/temp_logs', ip: '192.168.1.12', status: 'success' },
  { ts: '2024-07-01 13:42:00', user: 'USR-11928', action: 'READ', resource: '/finance/q2_reports', ip: '45.22.1.9', status: 'denied' },
];

const ACTION_COLORS = {
  READ: 'bg-primary/10 text-primary',
  WRITE: 'bg-secondary/10 text-secondary',
  DELETE: 'bg-danger/10 text-danger',
};

export default function ComplianceReport() {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('2024-06-01');
  const [dateTo, setDateTo] = useState('2024-07-01');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [actionFilter, setActionFilter] = useState('All');

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/compliance/report`);
        if (res.ok) {
          const data = await res.json();
          setReport(data);
        }
      } catch (e) {
        console.error('Could not fetch compliance report:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, []);

  const handleExportCSV = () => {
    const rows = ACCESS_LOG_MOCK.map(r => `"${r.ts}","${r.user}","${r.action}","${r.resource}","${r.ip}","${r.status}"`);
    const csv = ['Timestamp,User ID,Action,Resource,IP Address,Status', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cubo_compliance_${dateFrom}_to_${dateTo}.csv`; a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    const data = { report, access_log: ACCESS_LOG_MOCK, date_range: { from: dateFrom, to: dateTo } };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cubo_compliance_${dateFrom}.json`; a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const filteredLog = actionFilter === 'All'
    ? ACCESS_LOG_MOCK
    : ACCESS_LOG_MOCK.filter(r => r.action === actionFilter);

  const totalQueries = report?.total_actions || 2543;
  const totalAuditEvents = report?.total_actions || 8932;
  const actionBreakdown = report?.action_breakdown || {};

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col p-4 gap-stack-md fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-border shadow-sm z-50">
        <div className="flex items-center gap-3 mb-8 px-2 pt-4">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-white font-black text-xl">C</div>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-black text-primary">CUBO</h2>
            <p className="text-[10px] uppercase tracking-wider text-outline">GDPR Compliance</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { icon: 'dashboard', label: 'Overview' },
            { icon: 'security', label: 'Data Access' },
            { icon: 'person_search', label: 'Privacy Requests' },
            { icon: 'history_edu', label: 'Audit Log', active: true },
            { icon: 'timer', label: 'Retention' },
          ].map(item => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:scale-95 duration-150 font-label-md text-label-md ${
                item.active
                  ? 'bg-primary-container text-white font-bold shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="bg-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-colors shadow-lg">
          <span className="material-symbols-outlined">add</span>
          New Audit
        </button>
        <footer className="space-y-1 pt-4 border-t border-border/50">
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">help</span> Help
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">verified_user</span> Compliance Status
          </a>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col">
        {/* Top Header */}
        <header className="bg-surface border-b border-border shadow-sm flex justify-between items-center px-margin-page h-16 w-full sticky top-0 z-40">
          <div className="flex items-center gap-stack-lg">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">Compliance Reports</h1>
            <div className="hidden md:flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg border border-border">
              <span className="material-symbols-outlined text-outline text-sm">calendar_today</span>
              <input
                className="bg-transparent border-none text-body-md font-body-md p-0 w-24 focus:ring-0 focus:outline-none"
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
              />
              <span className="text-outline">→</span>
              <input
                className="bg-transparent border-none text-body-md font-body-md p-0 w-24 focus:ring-0 focus:outline-none"
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-stack-md">
            <div className="relative">
              <button
                className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors font-body-md text-body-md shadow-sm"
                onClick={() => setShowExportMenu(m => !m)}
              >
                Export Report
                <span className="material-symbols-outlined">expand_more</span>
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-xl z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-surface-container font-body-md" onClick={handleExportCSV}>
                    Download CSV
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-surface-container font-body-md" onClick={handleExportJSON}>
                    Download JSON
                  </button>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-sm cursor-pointer">A</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-margin-page space-y-stack-lg max-w-container-max mx-auto w-full">
          {/* Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
            {[
              {
                label: 'Total Queries',
                value: isLoading ? '...' : totalQueries.toLocaleString(),
                icon: 'search',
                iconColor: 'text-primary',
                badge: <span className="text-secondary text-caption flex items-center font-bold"><span className="material-symbols-outlined text-sm">trending_up</span> 12%</span>,
              },
              {
                label: 'Data Compliant',
                value: '100%',
                icon: 'check_circle',
                iconColor: 'text-secondary',
                badge: <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold">VERIFIED</span>,
              },
              {
                label: 'Audit Events',
                value: isLoading ? '...' : totalAuditEvents.toLocaleString(),
                icon: 'history',
                iconColor: 'text-primary-container',
                badge: <div className="w-full h-1.5 bg-surface-container rounded-full mt-2"><div className="w-3/4 h-full bg-primary rounded-full" /></div>,
              },
              {
                label: 'Retention Status',
                value: 'On Schedule',
                icon: 'schedule',
                iconColor: 'text-secondary',
                badge: <span className="material-symbols-outlined text-secondary">verified</span>,
              },
            ].map((card, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-text-secondary font-label-md text-label-md">{card.label}</p>
                  <span className={`material-symbols-outlined text-xl ${card.iconColor}`}>{card.icon}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-headline-md font-bold text-on-surface">{card.value}</h3>
                  {card.badge}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
            {/* Retention Chart */}
            <div className="xl:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6 overflow-hidden relative">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Data Retention Over Time</h3>
                  <p className="text-caption text-text-secondary">Document lifecycle volume tracking</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-caption">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-danger" />
                    <span className="text-caption">Red Zone</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-1 relative px-4">
                <svg className="absolute inset-x-0 bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q20,60 40,75 T80,40 T100,20" fill="none" stroke="#2563EB" strokeWidth={2} />
                  <rect fill="rgba(239, 68, 68, 0.05)" height={100} width={20} x={80} y={0} />
                </svg>
                <div className="absolute right-0 top-0 bottom-0 w-1/5 bg-danger/5 border-l-2 border-dashed border-danger flex items-center justify-center">
                  <span className="text-danger font-bold text-[10px] rotate-90 whitespace-nowrap">RETENTION THRESHOLD</span>
                </div>
                <div className="w-full flex justify-between items-end h-full z-10">
                  {[0.75, 0.5, 0.67, 0.8, 0.5, 0.65, 0.33].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 mx-0.5 rounded-t transition-all hover:opacity-80 ${i >= 5 ? 'bg-danger/30' : 'bg-primary/20'}`}
                      style={{ height: `${h * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4 px-4 text-caption text-text-secondary">
                <span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span className="text-danger font-bold">Jul (Near Term)</span>
              </div>
            </div>

            {/* Audit Timeline */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 overflow-y-auto max-h-[460px] custom-scrollbar">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Recent Audit Events</h3>
              <div className="relative space-y-8 timeline-line">
                {MOCK_EVENTS.map((event, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div className={`z-10 w-6 h-6 rounded-full ${event.color} flex items-center justify-center ring-4 ring-white flex-shrink-0`}>
                      <span className="material-symbols-outlined text-white text-[14px]">{event.icon}</span>
                    </div>
                    <div className="flex-1 -mt-1">
                      <div className="flex justify-between">
                        <p className="font-bold text-body-md text-on-surface">{event.label}</p>
                        <span className="text-caption text-text-secondary">{event.time}</span>
                      </div>
                      <p className="text-caption text-text-secondary">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Log Table */}
            <div className="xl:col-span-3 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Access Log</h3>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-secondary">filter_list</span>
                  <select
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                    value={actionFilter}
                    onChange={e => setActionFilter(e.target.value)}
                  >
                    <option>All</option>
                    <option>READ</option>
                    <option>WRITE</option>
                    <option>DELETE</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low">
                    <tr>
                      {['Timestamp', 'User ID', 'Action', 'Resource', 'IP Address', 'Status'].map(h => (
                        <th key={h} className="px-6 py-4 font-bold text-body-md text-text-secondary">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredLog.map((row, i) => (
                      <tr key={i} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-6 py-4 font-body-md">{row.ts}</td>
                        <td className="px-6 py-4 font-body-md font-bold">{row.user}</td>
                        <td className="px-6 py-4 font-body-md">
                          <span className={`px-2 py-0.5 rounded text-[12px] font-bold ${ACTION_COLORS[row.action] || 'bg-surface text-text-secondary'}`}>
                            {row.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-body-md text-text-secondary">{row.resource}</td>
                        <td className="px-6 py-4 font-body-md text-text-secondary">{row.ip}</td>
                        <td className="px-6 py-4 font-body-md">
                          {row.status === 'success' ? (
                            <span className="text-secondary flex items-center gap-1 font-bold">
                              <span className="material-symbols-outlined text-sm">check_circle</span> Success
                            </span>
                          ) : (
                            <span className="text-danger flex items-center gap-1 font-bold">
                              <span className="material-symbols-outlined text-sm">error</span> Denied
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-border bg-surface-container-lowest">
          <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-page w-full max-w-container-max mx-auto gap-4">
            <div className="flex items-center gap-stack-lg">
              <span className="font-label-md text-label-md font-bold text-on-surface">GDPR Compliant ✓</span>
              <div className="h-4 w-px bg-border hidden md:block" />
              <p className="font-caption text-caption text-text-secondary">ISO 27001 Certified</p>
            </div>
            <div className="flex items-center gap-stack-lg text-text-secondary font-caption text-caption">
              <span>Last Audit: <strong className="text-on-surface">2024-07-02</strong></span>
              <span className="hidden md:inline">•</span>
              <span>Next Audit: <strong className="text-primary font-bold">2024-08-02</strong></span>
            </div>
            <div className="flex items-center gap-gutter">
              <a className="text-caption text-text-secondary hover:text-primary transition-colors underline" href="#">Privacy Policy</a>
              <a className="text-caption text-text-secondary hover:text-primary transition-colors underline" href="#">Audit Documentation</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
