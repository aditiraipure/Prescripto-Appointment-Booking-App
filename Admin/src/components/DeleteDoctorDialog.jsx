const DeleteDoctorDialog = ({ doctor, deleting, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-[1px] p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="delete-doctor-title" onMouseDown={(event) => !deleting && event.target === event.currentTarget && onCancel()}>
    <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
      <div className="p-6"><div className="w-12 h-12 rounded-full bg-red-50 text-red-600 grid place-items-center"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3h6m-8 4h10m-9 0 .7 13h6.6L16 7M10 11v5m4-5v5" /></svg></div><h2 id="delete-doctor-title" className="text-xl font-semibold text-gray-900 mt-4">Delete doctor?</h2><p className="text-sm text-gray-500 mt-2 leading-relaxed">This will permanently remove <span className="font-semibold text-gray-700">{doctor?.name || "this doctor"}</span> from Admin and user-facing doctor lists. This action cannot be undone.</p></div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3"><button type="button" disabled={deleting} onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors">Cancel</button><button type="button" disabled={deleting} onClick={onConfirm} className="min-w-28 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">{deleting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}{deleting ? "Deleting..." : "Delete"}</button></div>
    </div>
  </div>
);

export default DeleteDoctorDialog;
