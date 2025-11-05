import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { Eye, Brain, Shield, Play, ExternalLink, X } from "lucide-react"; // Import X (ArrowLeft is no longer needed here)
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import DialogClose
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

// --- Reusable Card Interaction Logic (Unchanged) ---
const useCardInteraction = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return {
    handleMouseMove,
    handleMouseLeave,
    style: {
      rotateX,
      rotateY,
      transformStyle: "preserve-3d",
    },
    parentStyle: {
      perspective: "1000px",
    },
  };
};

// --- Animation Variants (Unchanged) ---
const gridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// --- Project Card Component (Unchanged) ---
const ProjectCard = ({ project, onShowModal, onShowComingSoon }) => {
  const interaction = useCardInteraction();
  const hasLink = !!project.videoUrl;
  const isComingSoon = project.comingSoon;

  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl overflow-hidden group"
      style={interaction.parentStyle}
      onMouseMove={interaction.handleMouseMove}
      onMouseLeave={interaction.handleMouseLeave}
    >
      <motion.div 
        className="h-full w-full flex flex-col"
        style={interaction.style}
      >
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="p-6 space-y-4 flex-1 flex flex-col"> 
          <motion.div 
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-3 group-hover:scale-110 transition-transform`}
            style={{ transform: "translateZ(50px)" }}
          >
            <project.icon className="text-white" size={32} />
          </motion.div>

          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-accent">{project.period}</p>
          </div>

          <p 
            className="text-foreground/70 leading-relaxed"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.description}
          </p>

          <div className="flex-grow" /> 

          <div className="flex flex-wrap gap-2 pt-4" style={{ transform: "translateZ(40px)" }}>
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-primary/20 rounded-full text-xs border border-accent/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.button
            className="w-full mt-4 py-2 glass rounded-lg flex items-center justify-center gap-2 group/btn disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={(hasLink || isComingSoon) ? { scale: 1.02 } : {}}
            whileTap={(hasLink || isComingSoon) ? { scale: 0.98 } : {}}
            style={{ transform: "translateZ(20px)" }}
            onClick={() => {
              if (isComingSoon) {
                onShowComingSoon();
              } else if (hasLink) {
                if (project.embeddable) {
                  onShowModal(project.videoUrl);
                } else {
                  window.open(project.videoUrl, '_blank', 'noopener,noreferrer');
                }
              }
            }}
            disabled={!(hasLink || isComingSoon)}
          >
            <span>{(hasLink || isComingSoon) ? "View Demo" : "Details"}</span>
            
            {(hasLink && project.embeddable) || isComingSoon ? (
              <Play size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            ) : null}

            {hasLink && !project.embeddable ? (
              <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            ) : null}
            
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Projects Component (Modified) ---
export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const projects = [
    {
      icon: Eye,
      title: "Vision AI Suit",
      period: "May 2025 - June 2025",
      description: "A Real-time Image Captioning and Segmentation Model with Object Detection using stacked architecture with  different models working simultaneously to caption, segment instances, detect objects and identify and provide output.",
      technologies: ["CNN + LSTM","U-Net","Various edge detection algorithms", "Mask R-CNN","Faster R-CNN", "Python", "PyTorch", "OpenCV", "Streamlit"],
      gradient: "from-blue-500 to-purple-500",
      videoUrl: "https://www.linkedin.com/posts/prottus-manna-6b39b2268_visionaisuit-ai-cnn-activity-7347253949453819904-_06z",
      embeddable: false,
      comingSoon: false,
    },
    {
      icon: Shield,
      title: "Fraud Guard AI",
      period: "June 2025 - July 2025",
      description: "ML Powered AI Based Fraud Detection System with high accuracy and real-time fraud transaction alerts. Features dashboard, email alerts, and weekly self-retraining.",
      technologies: ["Supervised ML", "Unsupervised ML", "Graph Models", "React", "Email API","Kafka"],
      gradient: "from-red-500 to-pink-500",
      videoUrl: "https://drive.google.com/file/d/1bkOfZUWhVQg563-N316FH7ZTb5fGHV9o/preview",
      embeddable: true,
      comingSoon: false,
    },
    {
      icon: Brain,
      title: "Optimus AI",
      period: "July 2025 - Present",
      description: "AI Powered PC Voice Assistant with ability to understand user intent, open/close apps, and perform PC tasks through voice commands. More advanced than Siri and Bixby.",
      technologies: ["TTS", "STT", "Automation", "Gemini API", "Python", "Ollama Models"],
      gradient: "from-green-500 to-cyan-500",
      videoUrl: null,
      embeddable: false,
      comingSoon: true,
    },
  ];

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
          <p className="text-xl text-foreground/70">Showcasing my best work in AI & ML</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              onShowModal={setActiveVideo}
              onShowComingSoon={() => setIsComingSoonOpen(true)}
            />
          ))}
        </motion.div>
      </div>

      {/* Video Dialog (Uses <ArrowLeft> from dialog.tsx) */}
      <Dialog 
        open={!!activeVideo}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setActiveVideo(null);
          }
        }}
      >
        <DialogContent className="glass p-0 border-accent/20 bg-black/50 max-w-4xl w-full aspect-video rounded-lg">
          <iframe
            src={activeVideo || ""}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>

      {/* === MODIFIED COMING SOON DIALOG === */}
      <Dialog open={isComingSoonOpen} onOpenChange={setIsComingSoonOpen}>
        <DialogContent className="glass p-0 border-accent/20 bg-background/80 max-w-lg w-full rounded-lg overflow-hidden backdrop-blur-md">
          
          {/* Manually added close button with "X" icon */}
          <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" /> {/* Changed to X */}
            <span className="sr-only">Close</span>
          </DialogClose>
        
          <div className="relative w-full h-96">
            {/* 3D Background */}
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
            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
              <motion.h2 
                className="text-4xl font-bold gradient-text mb-4"
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Coming Soon...
              </motion.h2>
              <p className="text-lg text-foreground/80">
                The demo for **Optimus AI** is being polished and will be available shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
