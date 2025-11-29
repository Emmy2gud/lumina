import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AITimestampModal({ open, onClose, title, loading, error, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true"></div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
              </div>
            ) : error ? (
              <div className="text-sm text-red-600">{error}</div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
