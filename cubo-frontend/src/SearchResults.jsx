export default function SearchResults() {
  return (
<div>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>CUBO | Search Results</title>
  {/* Tailwind CSS */}
  {/* Google Fonts: Inter */}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
  {/* Material Symbols */}
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <style dangerouslySetInnerHTML={{__html: "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n            vertical-align: middle;\n        }\n        .ai-cursor::after {\n            content: '|';\n            animation: blink 1s infinite;\n        }\n        @keyframes blink {\n            0%, 100% { opacity: 1; }\n            50% { opacity: 0; }\n        }\n        .custom-scrollbar::-webkit-scrollbar {\n            width: 6px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-track {\n            background: transparent;\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb {\n            background: #E5E7EB;\n            border-radius: 10px;\n        }\n    " }} />
  {/* TopNavBar */}
  <header className="bg-surface-container-lowest dark:bg-surface-container-low border-b border-border dark:border-outline-variant shadow-sm sticky top-0 z-50">
    <div className="flex justify-between items-center w-full px-margin-page max-w-container-max mx-auto h-14">
      <div className="flex items-center gap-stack-lg">
        <span className="font-headline-sm text-headline-sm font-black text-primary dark:text-primary-fixed-dim">CUBO</span>
        <nav className="hidden md:flex gap-stack-lg items-center">
          <a className="text-on-surface-variant dark:text-on-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#">Dashboard</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#">Workspace</a>
          <a className="text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary dark:border-primary-fixed-dim pb-1 font-body-md text-body-md" href="#">Analytics</a>
          <a className="text-on-surface-variant dark:text-on-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" href="#">Compliance</a>
        </nav>
      </div>
      <div className="flex items-center gap-stack-md">
        <button className="p-2 rounded-full hover:bg-surface-container transition-colors active:opacity-80">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container transition-colors active:opacity-80">
          <span className="material-symbols-outlined text-on-surface-variant">settings</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
          <img className="w-full h-full object-cover" data-alt="A professional headshot of a corporate user in their 30s, featuring soft studio lighting and a clean, blurred office background. The style is modern SaaS photography with high-end clarity and a neutral color palette of grays and blues to match a professional interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR4W_f0yHrhAssqkjUcRWBuVY6LY14aDIR2XnaOoUTAlQsxWl-QQkUYZTgx_vWkdiOz7L15uWzeXM51dmYSAI-wVbKVjPMxjfGw7sB0GG7ktFSXC4q6OutGamawztsT4sBY2xXX-ceNVsHDKm1u3rnKapYfvcnABv0K46jnHhPvNtKCu8XdIPEC4_XZujh3BnJAY3jb6nY6p8AKQeLbiAP39NRv-OrrhKj1KSxwY_0AkgBfur4VMAoJ0qe_xnw3lQMd3IbbtHALP4" />
        </div>
      </div>
    </div>
  </header>
  {/* Search Toolbar */}
  <div className="bg-surface-container-lowest border-b border-border py-4">
    <div className="max-w-container-max mx-auto px-margin-page">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-2xl group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="w-full h-12 pl-12 pr-24 bg-white border-2 border-border rounded-lg focus:ring-0 focus:border-primary-container text-body-lg font-body-lg transition-all shadow-sm" type="text" defaultValue="Quarterly Risk Assessment" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="px-3 py-1 text-primary hover:bg-primary/5 rounded transition-colors text-label-md font-label-md">Edit</button>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 h-12 bg-white border border-border rounded-lg hover:border-primary transition-colors text-on-surface-variant font-label-md text-label-md whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
            <span className="bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">2</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-12 bg-white border border-border rounded-lg hover:border-primary transition-colors text-on-surface-variant font-label-md text-label-md whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">sort</span>
            Relevance
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* Main Content Area */}
  <main className="max-w-container-max mx-auto px-margin-page py-stack-lg flex flex-col lg:flex-row gap-gutter">
    {/* Left Sidebar: Filters */}
    <aside className="w-full lg:w-1/4 flex flex-col gap-stack-lg">
      <div className="bg-white border border-border rounded-lg p-stack-md shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-label-md text-label-md text-on-surface">Refine Search</h2>
          <button className="text-primary hover:underline font-caption text-caption">Clear All</button>
        </div>
        {/* File Type */}
        <div className="mb-6">
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-3">File Format</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input defaultChecked className="rounded border-border text-primary-container focus:ring-primary/20 w-4 h-4" type="checkbox" />
              <span className="text-body-md font-body-md text-on-surface group-hover:text-primary">PDF Documents</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input className="rounded border-border text-primary-container focus:ring-primary/20 w-4 h-4" type="checkbox" />
              <span className="text-body-md font-body-md text-on-surface group-hover:text-primary">DOCX Word</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input className="rounded border-border text-primary-container focus:ring-primary/20 w-4 h-4" type="checkbox" />
              <span className="text-body-md font-body-md text-on-surface group-hover:text-primary">CSV Sheets</span>
            </label>
          </div>
        </div>
        {/* Date Range */}
        <div className="mb-6">
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-3">Date Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-center text-caption font-caption border border-border rounded-lg hover:border-primary-container hover:text-primary transition-all">Last 24h</button>
            <button className="px-3 py-2 text-center text-caption font-caption border border-primary-container text-primary rounded-lg bg-primary/5 transition-all">Last 7d</button>
            <button className="px-3 py-2 text-center text-caption font-caption border border-border rounded-lg hover:border-primary-container hover:text-primary transition-all">Last 30d</button>
            <button className="px-3 py-2 text-center text-caption font-caption border border-border rounded-lg hover:border-primary-container hover:text-primary transition-all">Custom</button>
          </div>
        </div>
        {/* Author Dropdown */}
        <div className="mb-6">
          <h3 className="font-label-md text-label-md text-on-surface-variant mb-3">Author</h3>
          <div className="relative">
            <select className="w-full border-border rounded-lg text-body-md focus:border-primary-container focus:ring-0 appearance-none bg-white py-2 pl-3 pr-10">
              <option>All Authors</option>
              <option>John Doe</option>
              <option>Sarah Jenkins</option>
              <option>Risk Dept</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
        {/* Relevance Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Min. Relevance</h3>
            <span className="text-primary font-bold text-caption">85%</span>
          </div>
          <input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" max={100} min={50} type="range" defaultValue={85} />
          <div className="flex justify-between mt-2 text-caption font-caption text-on-surface-variant opacity-60">
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      {/* Ad/Promo Card */}
      <div className="bg-primary-container text-white rounded-lg p-stack-md relative overflow-hidden">
        <div className="relative z-10">
          <p className="font-label-md text-label-md mb-2">Power User Tip</p>
          <p className="font-caption text-caption opacity-90 mb-4">Combine Boolean operators for 2x faster cross-document correlation.</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-caption font-bold transition-all">Learn More</button>
        </div>
      </div>
    </aside>
    {/* Main Search Results Column */}
    <section className="w-full lg:w-1/2 flex flex-col gap-stack-lg">
      {/* AI Answer Box */}
      <div className="bg-white border-2 border-primary/40 rounded-lg p-stack-lg shadow-md relative overflow-hidden group">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '"FILL" 1'}}>auto_awesome</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">AI-Generated Answer</h2>
        </div>
        <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
          <p>
            Based on the current quarterly evaluation, the <mark className="bg-amber-100 text-on-surface p-0.5 rounded">risk exposure</mark> for the financial sector remains moderate. Primary factors include volatile interest rates and shifting regulatory frameworks. The suggested <mark className="bg-amber-100 text-on-surface p-0.5 rounded">mitigation strategies</mark> involve diversifying liquid assets and increasing the frequency of internal audit cycles to ensure 100% compliance by Year-End 2024.
          </p>
          <p className="ai-cursor">Operational resilience has improved by 12% following the implementation of the new automated monitoring tools.</p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container rounded-lg text-caption font-label-md text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
              Copy
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container rounded-lg text-caption font-label-md text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">format_quote</span>
              Cite
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
              </button>
              <button className="p-1.5 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">thumb_down</span>
              </button>
            </div>
            <button className="text-primary hover:underline font-label-md text-label-md flex items-center gap-1">
              Show Sources
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>
      {/* Results Listing */}
      <div className="space-y-4">
        {/* Result Card 1 */}
        <div className="bg-white border border-border rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>description</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-body-lg text-primary group-hover:underline">Annual Risk Report 2024.pdf</h3>
                <p className="text-caption font-caption text-on-surface-variant opacity-60">Corporate/Finance/Reports/Q1</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded-full border border-green-100">92% Match</span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4 line-clamp-2">
            "...analysis of the <mark className="bg-amber-100 p-0.5 rounded">quarterly risk assessment</mark> highlights several critical areas for improvement in the 2024 fiscal year, specifically relating to asset liquidity and regional market volatility..."
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-caption font-caption text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Mar 14, 2024</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">database</span> 2.4 MB</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1.5 text-caption font-label-md bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">Preview</button>
              <button className="px-3 py-1.5 text-caption font-label-md bg-primary text-white rounded-lg hover:bg-primary-container transition-colors">Download</button>
              <button className="p-1.5 border border-border rounded-lg hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>
        {/* Result Card 2 */}
        <div className="bg-white border border-border rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>table_chart</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-body-lg text-primary group-hover:underline">Market_Volatility_Index_Q1.xlsx</h3>
                <p className="text-caption font-caption text-on-surface-variant opacity-60">Analytics/Indices/2024</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded-full border border-green-100">88% Match</span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4 line-clamp-2">
            "Spreadsheet containing raw data points for the <mark className="bg-amber-100 p-0.5 rounded">Risk Assessment</mark> framework, tracking 45+ indicators across all global territories..."
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-caption font-caption text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Feb 28, 2024</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">database</span> 12.8 MB</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1.5 text-caption font-label-md bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">Preview</button>
              <button className="px-3 py-1.5 text-caption font-label-md bg-primary text-white rounded-lg hover:bg-primary-container transition-colors">Download</button>
              <button className="p-1.5 border border-border rounded-lg hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>
        {/* Result Card 3 */}
        <div className="bg-white border border-border rounded-lg p-stack-md shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>article</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-body-lg text-primary group-hover:underline">Internal_Audit_Policy_V2.docx</h3>
                <p className="text-caption font-caption text-on-surface-variant opacity-60">Legal/Policies/Internal</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[11px] font-bold rounded-full border border-amber-100">76% Match</span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4 line-clamp-2">
            "...mandatory protocols for the <mark className="bg-amber-100 p-0.5 rounded">Quarterly Assessment</mark> of operational risk as defined in section 4.2 of the compliance handbook..."
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-caption font-caption text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Jan 15, 2024</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">database</span> 450 KB</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1.5 text-caption font-label-md bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">Preview</button>
              <button className="px-3 py-1.5 text-caption font-label-md bg-primary text-white rounded-lg hover:bg-primary-container transition-colors">Download</button>
              <button className="p-1.5 border border-border rounded-lg hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-border rounded-lg p-stack-md shadow-sm">
        <span className="text-caption font-caption text-on-surface-variant mb-4 md:mb-0">Showing 1-10 of 247 results</span>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-border rounded hover:bg-surface-container disabled:opacity-30" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex items-center gap-1 mx-2">
            <span className="text-caption font-caption text-on-surface-variant">Page</span>
            <input className="w-10 h-8 text-center border-border rounded text-body-md focus:border-primary focus:ring-0" type="text" defaultValue={1} />
            <span className="text-caption font-caption text-on-surface-variant">of 25</span>
          </div>
          <button className="p-2 border border-border rounded hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
    {/* Right Sidebar: Stats and Extras */}
    <aside className="w-full lg:w-1/4 flex flex-col gap-stack-lg">
      {/* Statistics Card */}
      <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-surface-container px-stack-md py-3 border-b border-border">
          <h2 className="font-label-md text-label-md text-on-surface">Result Statistics</h2>
        </div>
        <div className="p-stack-md space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-caption font-caption text-on-surface-variant">Total Results</span>
            <span className="font-bold text-body-md">247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-caption font-caption text-on-surface-variant">Query Time</span>
            <span className="font-bold text-body-md text-green-600">45ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-caption font-caption text-on-surface-variant">Searched Docs</span>
            <span className="font-bold text-body-md">1.2M</span>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-caption font-caption text-on-surface-variant mb-3">Relevance Distribution</p>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full flex overflow-hidden">
              <div className="h-full bg-primary" style={{width: '65%'}} />
              <div className="h-full bg-primary/40" style={{width: '25%'}} />
              <div className="h-full bg-primary/10" style={{width: '10%'}} />
            </div>
            <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-on-surface-variant opacity-60">
              <span>High</span>
              <span>Med</span>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>
      {/* Related Searches */}
      <div className="bg-white border border-border rounded-lg p-stack-md shadow-sm">
        <h2 className="font-label-md text-label-md text-on-surface mb-4">Related Searches</h2>
        <ul className="space-y-2">
          <li>
            <a className="text-body-md text-primary hover:underline flex items-center gap-2" href="#">
              <span className="material-symbols-outlined text-[18px]">search</span>
              2023 Risk Exposure Summary
            </a>
          </li>
          <li>
            <a className="text-body-md text-primary hover:underline flex items-center gap-2" href="#">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Internal Audit Framework
            </a>
          </li>
          <li>
            <a className="text-body-md text-primary hover:underline flex items-center gap-2" href="#">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Regulatory Compliance 2024
            </a>
          </li>
          <li>
            <a className="text-body-md text-primary hover:underline flex items-center gap-2" href="#">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Mitigation Strategy Templates
            </a>
          </li>
        </ul>
      </div>
      {/* Save Search Action */}
      <button className="w-full py-4 bg-white border border-border rounded-lg hover:bg-surface-container transition-all flex flex-col items-center justify-center gap-2 shadow-sm group">
        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">bookmark</span>
        <span className="font-label-md text-label-md text-on-surface">Save this Search</span>
        <span className="text-caption font-caption text-on-surface-variant opacity-60">Get notified for new results</span>
      </button>
      {/* Map Preview (Contextual Location of Search) */}
      <div className="rounded-lg overflow-hidden border border-border shadow-sm h-48 relative">
        <img className="w-full h-full object-cover" data-location="London" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQd8ELFS85UAhHZON_WbmFqRx5llsP0S1ekwJ50yiFQKElrjb2Sxc3GaeNRDubNyvRNktiBzbv3ojj414JFlT7yudqeymCpQJetQMO5T54O-RhtB5u3QxBsORKAdPeVsJxFr8wIW02ETRXC2aCHmJqtwetthlWVp_R0WIDDID3PN84Xs3prxkEfJO75psqR_lZ49CxLU6w75V63oe3ENkrSBvfwVzpskEygroVNg5hpu4H0A0Pzcg2yOeJ-eQTa75QIO9rYZ2EBEI" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Primary Node</p>
          <p className="font-label-md text-label-md">London Data Center</p>
        </div>
      </div>
    </aside>
  </main>
  {/* Footer */}
  <footer className="bg-surface-container-low dark:bg-surface-dim border-t border-border dark:border-outline-variant mt-12">
    <div className="w-full py-stack-md px-margin-page max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-sm">
      <div className="flex items-center gap-2">
        <span className="font-label-md text-label-md font-bold text-on-surface dark:text-on-surface">CUBO</span>
        <span className="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant">© 2024 CUBO Document Intelligence. All rights reserved.</span>
      </div>
      <nav className="flex gap-stack-md">
        <a className="text-on-surface-variant dark:text-on-surface-variant font-caption text-caption hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-200" href="#">System Status</a>
        <a className="text-on-surface-variant dark:text-on-surface-variant font-caption text-caption hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-200" href="#">Privacy Policy</a>
        <a className="text-on-surface-variant dark:text-on-surface-variant font-caption text-caption hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-200" href="#">Terms of Service</a>
        <a className="text-on-surface-variant dark:text-on-surface-variant font-caption text-caption hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all duration-200" href="#">Security Compliance</a>
      </nav>
    </div>
  </footer>
</div>

  );
}
