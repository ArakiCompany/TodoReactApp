'use client';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, children, footer, maxWidth = 'max-w-md' }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl`}
        style={{ animation: 'modalIn 0.2s ease forwards', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
            <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {children}
        </div>

        {footer && (
          <div className="flex gap-2 p-4 border-t border-zinc-800">
            {footer}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}