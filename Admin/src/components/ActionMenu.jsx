import { useEffect, useRef, useState } from "react";

const ActionMenu = ({ actions, label = "Open actions" }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-flex justify-center">
      <button type="button" onClick={() => setOpen((current) => !current)} aria-label={label} aria-expanded={open} className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 grid place-items-center hover:bg-[#F2F3FF] hover:text-[#5f6FFF] hover:border-indigo-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6FFF]">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-30 min-w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
          {actions.map((action) => (
            <button key={action.label} type="button" disabled={action.disabled} onClick={() => { action.onClick(); setOpen(false); }} className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${action.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-[#F2F3FF] hover:text-[#5f6FFF]"}`}>
              {action.icon === "delete" ? <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3h6m-8 4h10m-9 0 .7 13h6.6L16 7M10 11v5m4-5v5" /></svg> : action.icon === "view" ? <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg> : <img src={action.icon} alt="" className="action-icon w-7 h-7 object-contain shrink-0" />}
              <span className="whitespace-nowrap">{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
