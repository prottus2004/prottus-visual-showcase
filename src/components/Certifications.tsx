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
import { getAccentColor } from "@/lib/accent";

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
  const accent = getAccentColor(hue);
  return (
    <div className="mb-16 last:mb-0">
      <motion.div
        className="mb-8 flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`rounded-xl p-3 shadow-soft ${accent.bg}`}
        >
          <SectionIcon size={26} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h3>
          <p className="text-sm text-foreground/60">{subtitle}</p>
        </div>
        <div className="divider ml-2 hidden flex-1 sm:block" />
        <div className="hidden rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-foreground/60 sm:flex">
          {certificates.length} items
        </div>
      </motion.div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
  const accent = getAccentColor(cert.hue);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={card}
      data-cursor
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group/cert relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft hover:shadow-elevated transition-shadow"
      aria-label={`View certificate: ${cert.title}`}
    >
      <div className={`h-1 ${accent.bg}`} />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`rounded-lg p-2.5 transition-transform group-hover/cert:scale-110 ${accent.soft}`}
          >
            <Icon className={accent.text} size={20} />
          </div>
          <span
            className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-wider ${accent.border} ${accent.text} ${accent.soft}`}
          >
            {cert.kind === "pdf" ? "PDF" : "IMAGE"}
          </span>
        </div>

        <div>
          <h4 className="line-clamp-2 text-base font-bold leading-snug">{cert.title}</h4>
          <p className="mt-1 line-clamp-1 text-xs text-foreground/60">{cert.issuer}</p>
        </div>

        {cert.blurb && (
          <p className="line-clamp-3 text-xs leading-relaxed text-foreground/55">
            {cert.blurb}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="text-[10px] uppercase tracking-wider text-foreground/50">{cert.date}</span>
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${accent.text}`}>
            <ZoomIn size={12} />
            view
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/**
 * In-page lightbox that opens a single certificate. White on light theme.
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
  const accent = cert ? getAccentColor(cert.hue) : null;

  return (
    <Dialog open={!!cert} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 border border-border bg-card max-w-6xl w-[96vw] h-[92vh] rounded-2xl overflow-hidden shadow-elevated">
        {cert && accent && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div
              className={`flex items-center gap-3 border-b border-border p-4 ${accent.soft}`}
            >
              <div
                className={`shrink-0 rounded-lg p-2 ${accent.soft}`}
              >
                <Icon className={accent.text} size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-foreground">{cert.title}</h3>
                <p className="truncate text-xs text-foreground/60">
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              <button
                onClick={onPrev}
                aria-label="Previous certificate"
                className="rounded-lg p-2 text-foreground/80 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={onNext}
                aria-label="Next certificate"
                className="rounded-lg p-2 text-foreground/80 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-2 text-foreground/80 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body — the certificate itself */}
            <div className="relative flex-1 bg-muted">
              {cert.kind === "pdf" ? (
                <iframe
                  src={`${cert.file}#zoom=page-width`}
                  title={cert.title}
                  className="h-full w-full border-0 bg-white"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center overflow-auto p-4">
                  <img
                    src={cert.file}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain shadow-elevated"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] uppercase tracking-wider text-foreground/40">
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
        hue={210}
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
