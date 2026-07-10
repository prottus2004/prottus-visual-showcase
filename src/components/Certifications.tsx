import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Heart,
  FileText,
  type LucideIcon,
} from "lucide-react";
import {
  COURSE_CERTIFICATES,
  EXTRACURRICULAR_CERTIFICATES,
  type Certificate,
} from "@/data/certificates";
import { getIcon } from "@/lib/icons";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const grid = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

/** Section block (Course-Related vs Extra-Curricular). */
function CertSection({
  icon: SectionIcon,
  title,
  subtitle,
  hue,
  certificates,
  inView,
  onOpen,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  hue: number;
  certificates: Certificate[];
  inView: boolean;
  onOpen: (cert: Certificate, list: Certificate[]) => void;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div
          className="p-3 rounded-xl shadow-era"
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 90% 60%), hsl(${(hue + 60) % 360} 80% 55%))`,
            color: "white",
          }}
        >
          <SectionIcon size={26} />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-era">{title}</h3>
          <p className="text-sm text-foreground/60">{subtitle}</p>
        </div>
        <div className="hidden sm:block flex-1 era-rule ml-2" />
        <div className="hidden sm:flex chrono-mono text-[10px] text-foreground/50 px-2 py-1 rounded border border-era/20">
          {certificates.length} items
        </div>
      </motion.div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {certificates.map((cert) => (
          <CertCard
            key={cert.id}
            cert={cert}
            onClick={() => onOpen(cert, certificates)}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Single certificate card. */
function CertCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  const Icon = getIcon(cert.icon);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={card}
      data-cursor
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-era rounded-2xl overflow-hidden text-left group/cert relative cursor-pointer"
      style={{ borderTopColor: `hsl(${cert.hue} 90% 60% / 0.5)` }}
      aria-label={`View certificate: ${cert.title}`}
    >
      <div
        className="h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(90deg, hsl(${cert.hue} 90% 60%), hsl(${(cert.hue + 60) % 360} 80% 55%))`,
        }}
      />
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div
            className="p-2.5 rounded-lg group-hover/cert:scale-110 transition-transform"
            style={{
              background: `hsl(${cert.hue} 90% 60% / 0.18)`,
              color: `hsl(${cert.hue} 90% 65%)`,
            }}
          >
            <Icon size={20} />
          </div>
          <span
            className="chrono-mono text-[10px] px-2 py-1 rounded-full border"
            style={{
              color: `hsl(${cert.hue} 90% 65%)`,
              borderColor: `hsl(${cert.hue} 90% 60% / 0.35)`,
              background: `hsl(${cert.hue} 90% 60% / 0.08)`,
            }}
          >
            {cert.kind === "pdf" ? "PDF" : "IMAGE"}
          </span>
        </div>

        <div>
          <h4 className="font-bold text-base leading-snug line-clamp-2">{cert.title}</h4>
          <p className="text-xs text-foreground/60 mt-1 line-clamp-1">{cert.issuer}</p>
        </div>

        {cert.blurb && (
          <p className="text-xs text-foreground/55 leading-relaxed line-clamp-3">
            {cert.blurb}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-era/15">
          <span className="chrono-mono text-[10px] text-foreground/50">{cert.date}</span>
          <span
            className="inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: `hsl(${cert.hue} 90% 65%)` }}
          >
            <ZoomIn size={12} />
            view
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/**
 * In-page lightbox that opens a single certificate.
 *  - PDFs are rendered inside an iframe (browser's native PDF viewer).
 *  - Images render inside an <img> with object-contain.
 *  - The lightbox itself is non-new-tab: it overlays the same page using
 *    a Radix Dialog (consistent with the rest of the app).
 */
function CertLightbox({
  cert,
  list,
  onClose,
  onPrev,
  onNext,
}: {
  cert: Certificate | null;
  list: Certificate[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // keyboard navigation: Esc closes, arrows step
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose, onPrev, onNext]);

  const Icon = cert ? getIcon(cert.icon) : FileText;

  return (
    <Dialog open={!!cert} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="glass p-0 border-era/30 bg-black/90 max-w-6xl w-[96vw] h-[92vh] rounded-lg overflow-hidden"
      >
        {cert && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div
              className="flex items-center gap-3 p-4 border-b border-white/10"
              style={{
                background: `linear-gradient(90deg, hsl(${cert.hue} 90% 25% / 0.55), transparent)`,
              }}
            >
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{
                  background: `hsl(${cert.hue} 90% 60% / 0.2)`,
                  color: `hsl(${cert.hue} 90% 70%)`,
                }}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">{cert.title}</h3>
                <p className="text-xs text-foreground/60 truncate">
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              <button
                onClick={onPrev}
                aria-label="Previous certificate"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-foreground/80 hover:text-foreground"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={onNext}
                aria-label="Next certificate"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-foreground/80 hover:text-foreground"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-foreground/80 hover:text-foreground"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body — the certificate itself */}
            <div className="flex-1 bg-black/40 relative">
              {cert.kind === "pdf" ? (
                <iframe
                  src={`${cert.file}#zoom=page-width`}
                  title={cert.title}
                  className="w-full h-full border-0 bg-white"
                />
              ) : (
                <div className="w-full h-full overflow-auto p-4 flex items-center justify-center">
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 text-[10px] chrono-mono text-foreground/40 flex items-center justify-between">
              <span>
                {list.findIndex((c) => c.id === cert.id) + 1} / {list.length}
              </span>
              <span>click anywhere outside or press Esc to close</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export const Certifications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // active cert + the list it belongs to (so prev/next stays in the same section)
  const [active, setActive] = useState<{
    cert: Certificate;
    list: Certificate[];
  } | null>(null);

  const open = useCallback((cert: Certificate, list: Certificate[]) => {
    setActive({ cert, list });
  }, []);

  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!active) return;
      const idx = active.list.findIndex((c) => c.id === active.cert.id);
      if (idx < 0) return;
      const nextIdx = (idx + dir + active.list.length) % active.list.length;
      setActive({ cert: active.list[nextIdx], list: active.list });
    },
    [active],
  );

  return (
    <div ref={ref}>
      <CertSection
        icon={Award}
        title="Course-Related Industrial Skill Development"
        subtitle="Certifications in AI/ML, programming, cloud, security, and engineering management"
        hue={189}
        certificates={COURSE_CERTIFICATES}
        inView={inView}
        onOpen={open}
      />

      <CertSection
        icon={Heart}
        title="Extra-Curricular Activities"
        subtitle="NGO internships, volunteering, and on-ground social engagement"
        hue={330}
        certificates={EXTRACURRICULAR_CERTIFICATES}
        inView={inView}
        onOpen={open}
      />

      <CertLightbox
        cert={active?.cert ?? null}
        list={active?.list ?? []}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
};
