export default function MobileSearch() {
  return (
<div>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport" />
  <title>CUBO | Intelligent Search</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <style dangerouslySetInnerHTML={{__html: "\n        body { font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }\n        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }\n        .active-tab { color: #004ac6 !important; }\n        .skeleton {\n            background: linear-gradient(90deg, #f0f3ff 25%, #e7eefe 50%, #f0f3ff 75%);\n            background-size: 200% 100%;\n            animation: loading 1.5s infinite;\n        }\n        @keyframes loading {\n            0% { background-position: 200% 0; }\n            100% { background-position: -200% 0; }\n        }\n        .bottom-sheet {\n            transform: translateY(100%);\n            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        }\n        .bottom-sheet.open { transform: translateY(0); }\n        .streaming-cursor::after {\n            content: '|';\n            animation: blink 1s step-end infinite;\n            color: #004ac6;\n            margin-left: 2px;\n        }\n        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }\n    " }} />
  {/* TopAppBar */}
  <header className="fixed top-0 w-full bg-surface z-40 flex items-center justify-between px-4 h-14 w-full shadow-sm border-b border-border">
    <div className="flex items-center gap-3">
      <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:opacity-80">
        <span className="material-symbols-outlined text-primary">menu</span>
      </button>
      <div className="flex items-center gap-2">
        <img alt="CUBO" className="h-6 w-auto" src="https://lh3.googleusercontent.com/aida/AP1WRLuzJPFLGaU2nvUkkeHNJOAuClX0BkbPvqZYXc9whLoGcRpqIFHlRNjN6kio_Pjsj8BLmpxA0hgpyxTw8uVoRICJGgnroogHvfI8ETo3atB6JR97SNxdju-JxoC8z43nVVWKB3wG4mrmNhOPcYgeD4pr-xKenxyldDV80538MZ60i5NyhNSXIR5lnX5JtOotkfuPa1U6s7790PF-nc2VFEX8EA3RDbnKRDNgF9Zyoeaw1IXC7O2D00DEaCg" />
        <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">CUBO</span>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <div className="h-8 w-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-[12px] border border-outline-variant ml-2">
        JD
      </div>
    </div>
  </header>
  <main className="pt-16 px-4 max-w-md mx-auto">
    {/* Search Section */}
    <section className="mt-6 mb-8">
      <div className="relative flex items-center">
        <input className="w-full h-14 bg-card border-2 border-border rounded-lg pl-12 pr-24 focus:border-primary focus:ring-0 text-body-lg shadow-sm transition-all" placeholder="Search intelligence, documents..." type="text" defaultValue="Q4 Financial Report analysis" />
        <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
        <div className="absolute right-2 flex items-center gap-2">
          <button className="p-2 text-primary hover:bg-primary-fixed/20 rounded-md">
            <span className="material-symbols-outlined">mic</span>
          </button>
          <button className="p-2 text-primary hover:bg-primary-fixed/20 rounded-md">
            <span className="material-symbols-outlined">photo_camera</span>
          </button>
        </div>
      </div>
    </section>
    {/* AI Answer Box */}
    <section className="mb-8" id="ai-answer-section">
      <div className="bg-card border-2 border-primary rounded-lg p-4 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>auto_awesome</span>
            <span className="font-label-md text-label-md text-primary">AI INSIGHT</span>
          </div>
          <div className="flex gap-2">
            <button className="text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">content_copy</span></button>
            <button className="text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">share</span></button>
          </div>
        </div>
        <p className="text-body-md text-on-surface leading-relaxed streaming-cursor">
          Based on the latest Q4 documents, the revenue growth exceeded projections by 12.4%, primarily driven by the cloud services sector. However, operating expenses rose by 5% due to hardware scaling costs. Key risks include...
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-surface-container text-on-secondary-container px-3 py-1 rounded-full text-caption flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">link</span> Source: Q4_Report.pdf
          </span>
          <span className="bg-surface-container text-on-secondary-container px-3 py-1 rounded-full text-caption flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">link</span> Source: Internal_Memo_Dec.docx
          </span>
        </div>
      </div>
    </section>
    {/* Results List */}
    <section className="space-y-4" id="results-container">
      <h3 className="font-label-md text-label-md text-on-surface-variant flex items-center justify-between">
        DOCUMENT RESULTS (128)
        <span className="material-symbols-outlined text-[18px]">filter_list</span>
      </h3>
      {/* Result Card 1 */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Q4 Financial Summary 2023</h4>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-caption font-bold">98% RELEVANCE</span>
              <span className="text-text-secondary text-caption flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span> PDF
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-caption text-text-secondary">Modified Dec 15, 2023</span>
          <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
            View More <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
      {/* Result Card 2 */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Infrastructure Scaling Costs</h4>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-caption font-bold">85% RELEVANCE</span>
              <span className="text-text-secondary text-caption flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">description</span> DOCX
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-caption text-text-secondary">Modified Jan 02, 2024</span>
          <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
            View More <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
      {/* Skeleton Loader */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm space-y-4 opacity-60">
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="flex gap-2">
          <div className="h-4 w-20 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
        </div>
        <div className="border-t border-border pt-4 flex justify-between">
          <div className="h-4 w-24 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </div>
    </section>
  </main>
  {/* FAB */}
  <button className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center z-50 active:scale-90 transition-transform" id="fab-trigger">
    <span className="material-symbols-outlined text-[28px]" id="fab-icon">add</span>
  </button>
  {/* Bottom Sheet Menu (Simulated) */}
  <div className="fixed inset-0 bg-black/40 opacity-0 pointer-events-none transition-opacity z-[55]" id="overlay" onclick="toggleBottomSheet()" />
  <div className="bottom-sheet fixed bottom-0 left-0 w-full bg-card rounded-t-2xl z-[60] pb-safe shadow-2xl" id="bottom-sheet">
    <div className="flex flex-col p-4">
      <div className="w-12 h-1 bg-outline-variant rounded-full self-center mb-6" />
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4 px-2">CUBO Menu</h2>
      <div className="space-y-1">
        <button className="w-full flex items-center gap-4 p-4 hover:bg-surface-container rounded-lg transition-colors text-primary bg-primary-fixed/20">
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-md">New Search</span>
        </button>
        <button className="w-full flex items-center gap-4 p-4 hover:bg-surface-container rounded-lg transition-colors text-on-surface">
          <span className="material-symbols-outlined">upload_file</span>
          <span className="font-label-md">Upload Document</span>
        </button>
        <button className="w-full flex items-center gap-4 p-4 hover:bg-surface-container rounded-lg transition-colors text-on-surface">
          <span className="material-symbols-outlined">bookmark</span>
          <span className="font-label-md">Saved Searches</span>
        </button>
        <button className="w-full flex items-center gap-4 p-4 hover:bg-surface-container rounded-lg transition-colors text-on-surface">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md">Settings</span>
        </button>
      </div>
      <button className="mt-6 w-full py-4 text-center text-text-secondary font-label-md" onclick="toggleBottomSheet()">Close</button>
    </div>
  </div>
  {/* BottomNavBar */}
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface shadow-[0_-1px_3px_rgba(0,0,0,0.1)] border-t border-border rounded-t-xl pb-safe">
    <button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-2xl p-2 transition-transform active:scale-90">
      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>search</span>
    </button>
    <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container transition-transform active:scale-90">
      <span className="material-symbols-outlined">history</span>
    </button>
    <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container transition-transform active:scale-90">
      <span className="material-symbols-outlined">folder_open</span>
    </button>
    <button className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-container transition-transform active:scale-90">
      <span className="material-symbols-outlined">person</span>
    </button>
  </nav>
</div>

  );
}
