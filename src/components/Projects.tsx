import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Play, ExternalLink, X, ChevronDown, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { staggerContainer, cardReveal, viewportOnce } from "@/lib/motion";
import { DecorativeBlob } from "@/components/DecorativeBlob";

/** 3D mouse-tilt interaction for a card (rotated more subtly for light theme). */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mxs = useSpring(x, { stiffness: 100, damping: 30 });
  const mys = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mys, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mxs, [-0.5, 0.5], ["-5deg", "5deg"]);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return {
    onMove,
    onLeave,
    style: { rotateX, rotateY, transformStyle: "preserve-3d" as const },
    parentStyle: { perspective: "1000px" },
  };
}

function ProjectCard({
  project,
  onShowVideo,
  onShowComingSoon,
  onShowImage,
}: {
  project: Project;
  onShowVideo: (url: string) => void;
  onShowComingSoon: () => void;
  onShowImage: (src: string) => void;
}) {
  const tilt = useTilt();
  const [open, setOpen] = useState(false);
  const Icon = getIcon(project.icon);
  const hasLink = !!project.videoUrl;
  const hasImage = !!project.image;
  const coming = project.comingSoon;
  const actionable = coming || hasLink || hasImage;

  return (
    <motion.div
      variants={cardReveal}
      data-cursor
      whileHover={{ y: -6 }}
      className="group/card overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-elevated"
      style={tilt.parentStyle}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
    >
      <motion.div className="flex h-full w-full flex-col" style={tilt.style}>
        <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

        {/* Demo picture banner */}
        {hasImage && (
          <motion.button
            type="button"
            onClick={() => onShowImage(project.image!)}
            className="relative block w-full overflow-hidden"
            style={{ z: 40 }}
            whileHover={{ scale: 1.01 }}
            aria-label={`View demo for ${project.title}`}
          >
            <img
              src={project.image}
              alt={`${project.title} demo`}
              className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-white/90 uppercase tracking-wider">
              <ImageIcon size={11} />
              demo
            </div>
          </motion.button>
        )}

        <div className="flex-1 flex flex-col space-y-4 p-6">
          <motion.div
            className={`h-14 w-14 rounded-xl bg-gradient-to-br ${project.gradient} p-3`}
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon className="text-white" size={28} />
          </motion.div>

          <div className="flex items-start justify-between gap-3" style={{ transform: "translateZ(25px)" }}>
            <div>
              <h3 className="mb-1 text-2xl font-bold">{project.title}</h3>
              <p className="eyebrow text-coral-700">{project.period}</p>
            </div>
            <ArrowUpRight className="text-foreground/30 transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/card:text-coral-500" size={22} />
          </div>

          <p
            className="leading-relaxed text-foreground/70"
            style={{ transform: "translateZ(15px)" }}
          >
            {project.summary}
          </p>

          {/* expandable details */}
          <motion.div
            className="overflow-hidden"
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(10px)" }}
          >
            <ul className="space-y-2 pt-2">
              {project.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="eyebrow flex items-center gap-1 self-start text-foreground/50 hover:text-foreground transition-colors"
          >
            {open ? "less" : "blueprint"}
            <ChevronDown
              size={14}
              className={open ? "rotate-180 transition-transform" : "transition-transform"}
            />
          </button>

          <div className="flex-grow" />

          <div
            className="flex flex-wrap gap-2 pt-2"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.button
            className="mt-4 w-full rounded-lg bg-foreground py-2.5 text-sm font-medium text-background flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
            whileHover={actionable ? { scale: 1.02 } : {}}
            whileTap={actionable ? { scale: 0.98 } : {}}
            style={{ z: 20 }}
            disabled={!actionable}
            onClick={() => {
              if (coming) onShowComingSoon();
              else if (hasLink) {
                if (project.embeddable) onShowVideo(project.videoUrl!);
                else window.open(project.videoUrl!, "_blank", "noopener,noreferrer");
              } else if (hasImage) {
                onShowImage(project.image!);
              }
            }}
          >
            <span>{coming ? "Coming Soon" : actionable ? "View Demo" : "Details"}</span>
            {coming ? (
              <Sparkle />
            ) : hasLink && project.embeddable ? (
              <Play size={16} />
            ) : hasLink ? (
              <ExternalLink size={16} />
            ) : hasImage ? (
              <ImageIcon size={16} />
            ) : null}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// tiny inline sparkle so we don't add another import line noise
const Sparkle = () => (
  <motion.span
    className="inline-block"
    animate={{ rotate: [0, 180, 360] }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  >
    ✦
  </motion.span>
);

export const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.title}
            project={p}
            onShowVideo={setActiveVideo}
            onShowComingSoon={() => setComingSoon(true)}
            onShowImage={setActiveImage}
          />
        ))}
      </motion.div>

      {/* Image (demo pic) lightbox */}
      <Dialog open={!!activeImage} onOpenChange={(o) => !o && setActiveImage(null)}>
        <DialogContent className="p-0 border border-border bg-card max-w-5xl w-full rounded-2xl overflow-hidden shadow-elevated">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {activeImage && (
            <img
              src={activeImage}
              alt="project demo"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Video dialog */}
      <Dialog
        open={!!activeVideo}
        onOpenChange={(o) => !o && setActiveVideo(null)}
      >
        <DialogContent className="p-0 border border-border bg-card max-w-4xl w-full aspect-video rounded-2xl shadow-elevated">
          <iframe
            src={activeVideo || ""}
            className="h-full w-full rounded-2xl"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title="project demo"
          />
        </DialogContent>
      </Dialog>

      {/* Coming soon dialog — colored blob replaces the R3F starfield. */}
      <Dialog open={comingSoon} onOpenChange={setComingSoon}>
        <DialogContent className="relative overflow-hidden p-0 border border-border bg-card max-w-lg w-full rounded-2xl shadow-elevated">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="relative h-96">
            <DecorativeBlob
              variant="purple"
              size="lg"
              position="absolute inset-0 m-auto"
              opacity={0.55}
              animate={false}
            />
            <DecorativeBlob
              variant="pink"
              size="md"
              position="absolute right-4 top-4"
              opacity={0.45}
              animate={false}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
              <motion.h2
                className="gradient-text mb-4 text-4xl font-bold"
                animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Coming Soon...
              </motion.h2>
              <p className="text-lg text-foreground/80">
                The demo for <span className="font-semibold text-coral-700">Optimus AI</span> is being
                polished and will arrive shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
