import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  imageUrl,
  badge,
}) => {
  const [zoom, setZoom] = React.useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-zinc-100 font-display">
                {title}
              </h3>
              {badge && (
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Body with smooth zoom & scroll */}
        <div className="p-6 overflow-auto flex items-center justify-center min-h-[320px] max-h-[75vh] bg-zinc-950/60">
          <img
            src={imageUrl}
            alt={title}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg transition-transform duration-150 cursor-zoom-in"
            onClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
          />
        </div>

        {/* Bottom hint */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/60 text-xs text-zinc-400 flex items-center justify-between">
          <span>Click image to toggle zoom · High-resolution official document</span>
          <a
            href={imageUrl}
            download
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Copy</span>
          </a>
        </div>
      </div>
    </div>
  );
};
