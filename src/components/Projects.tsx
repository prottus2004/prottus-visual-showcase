import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Play, ExternalLink, X, ChevronDown, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { PROJECTS, type Project } from "@/data/chronicle";
import { getIcon } from "@/lib/icons";
import { staggerContainer, cardReveal, viewportOnce } from "@/lib/motion";

/** 3D mouse-tilt interaction for a card. */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mxs = useSpring(x, { stiffness: 100, damping: 30 });
  const mys = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mys, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mxs, [-0.5, 0.5], ["-8deg", "8deg"]);
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

/* Shared reveal variants live in @/lib/motion (staggerContainer / cardReveal). */

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
      className="glass-era group/card rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-era"
      style={tilt.parentStyle}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
    >
      <motion.div className="h-full w-full flex flex-col" style={tilt.style}>
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
              className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 flex items-center gap-1.5 chrono-mono text-[10px] text-foreground/80">
              <ImageIcon size={11} className="text-era" />
              demo
            </div>
          </motion.button>
        )}

        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-3`}
            style={{ transform: "translateZ(50px)" }}
          >
            <Icon className="text-white" size={28} />
          </motion.div>

          <div className="flex items-start justify-between gap-3" style={{ transform: "translateZ(30px)" }}>
            <div>
              <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
              <p className="text-sm text-era chrono-mono">{project.period}</p>
            </div>
            <ArrowUpRight className="text-foreground/40 transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/card:text-era" size={22} />
          </div>

          <p
            className="text-foreground/70 leading-relaxed"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.summary}
          </p>

          {/* expandable details */}
          <motion.div
            className="overflow-hidden"
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(15px)" }}
          >
            <ul className="space-y-2 pt-2">
              {project.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <div className="w-1.5 h-1.5 bg-era rounded-full mt-2 flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="self-start text-xs chrono-mono text-foreground/50 hover:text-era transition-colors flex items-center gap-1"
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
            style={{ transform: "translateZ(40px)" }}
          >
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-era-soft rounded-full text-xs border border-era/20"
              >
                {t}
              </span>
            ))}
          </div>

          <motion.button
            className="w-full mt-4 py-2.5 glass rounded-lg flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
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
        <DialogContent className="glass p-0 border-era/30 bg-black/80 max-w-5xl w-full rounded-lg overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {activeImage && (
            <img
              src={activeImage}
              alt="project demo"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Video dialog */}
      <Dialog
        open={!!activeVideo}
        onOpenChange={(o) => !o && setActiveVideo(null)}
      >
        <DialogContent className="glass p-0 border-era/30 bg-black/70 max-w-4xl w-full aspect-video rounded-lg">
          <iframe
            src={activeVideo || ""}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title="project demo"
          />
        </DialogContent>
      </Dialog>

      {/* Coming soon dialog */}
      <Dialog open={comingSoon} onOpenChange={setComingSoon}>
        <DialogContent className="glass p-0 border-era/30 bg-background/80 max-w-lg w-full rounded-lg overflow-hidden backdrop-blur-md">
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="relative w-full h-96">
            <div className="absolute inset-0 z-0 opacity-40">
              <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
                <ambientLight intensity={1} />
                <Stars radius={50} depth={20} count={3000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.4}
                  minPolarAngle={Math.PI / 2}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
              <motion.h2
                className="text-4xl font-bold gradient-text mb-4"
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Coming Soon...
              </motion.h2>
              <p className="text-lg text-foreground/80">
                The demo for <span className="text-era font-semibold">Optimus AI</span> is being
                polished and will arrive in this timeline shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};