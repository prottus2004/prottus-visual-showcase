import { useEffect } from "react";
import { FileText, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/**
 * In-page popup viewer for a single PDF (or image) credential. Renders the
 * file in an <iframe> overlay — the same pattern the Certifications lightbox
 * uses — so certificates open inside the portfolio instead of jumping to a
 * bare browser tab. A header carries the title and an "open in new tab"
 * fallback; Esc / overlay-click / the close button dismiss it.
 */
export function PdfLightbox({
  open,
  url,
  title,
  onClose,
}: {
  open: boolean;
  url: string | null;
  title?: string;
  onClose: () => void;
}) {
  // Mirror the Certifications lightbox key handling for parity.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isImage = url ? /\.(png|jpe?g|webp|gif|svg)$/i.test(url) : false;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 border border-border bg-background max-w-6xl w-[96vw] h-[92vh] rounded-2xl overflow-hidden shadow-elevated">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/40 p-4">
            <div className="shrink-0 rounded-lg bg-secondary p-2">
              <FileText className="text-foreground/80" size={20} />
            </div>
            <h3 className="min-w-0 flex-1 truncate font-bold text-foreground">
              {title ?? "Certificate"}
            </h3>

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
                title="Open in new tab"
              >
                New tab <ExternalLink size={13} />
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-foreground/80 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body — the document. PDFs render on a white canvas (left white on
              purpose) so the file reads naturally in both light and dark mode. */}
          <div className="relative flex-1 bg-muted">
            {url && isImage ? (
              <div className="flex h-full w-full items-center justify-center overflow-auto p-4">
                <img
                  src={url}
                  alt={title ?? "Certificate"}
                  className="max-h-full max-w-full object-contain shadow-elevated"
                />
              </div>
            ) : (
              <iframe
                src={url ? `${url}#zoom=page-width` : undefined}
                title={title ?? "Certificate"}
                className="h-full w-full border-0 bg-white"
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2 text-[10px] uppercase tracking-wider text-foreground/40">
            <span>certificate</span>
            <span>click outside or press Esc to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}