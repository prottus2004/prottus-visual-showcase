import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef, useState } from "react"; // Import useState
import { Eye, Brain, Shield, Play } from "lucide-react"; // Import Play icon
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Import Dialog

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

// --- Project Card Component (Modified) ---
// We add two new props: `onViewDetails` and `hasVideo`
const ProjectCard = ({ project, onViewDetails, hasVideo }) => {
  const interaction = useCardInteraction();
  
  return (
    <motion.div
      variants={cardVariants}
      className="glass rounded-2xl overflow-hidden group"
      style={interaction.parentStyle}
      onMouseMove={interaction.handleMouseMove}
      onMouseLeave={interaction.handleMouseLeave}
    >
      <motion.div 
        className="h-full w-full flex flex-col" // Added flex-col to push button to bottom
        style={interaction.style}
      >
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        {/* Added flex-1 and flex-col to make content fill space */}
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

          <div className="flex-grow" /> {/* Spacer to push content down */}

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
            whileHover={hasVideo ? { scale: 1.02 } : {}}
            whileTap={hasVideo ? { scale: 0.98 } : {}}
            style={{ transform: "translateZ(20px)" }}
            onClick={onViewDetails} // Trigger the function from props
            disabled={!hasVideo} // Disable button if no video
          >
            <span>{hasVideo ? "View Demo" : "Details"}</span>
            {hasVideo && <Play size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
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

  // Add state to track the active video URL
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const projects = [
    {
      icon: Eye,
      title: "Vision AI Suit",
      period: "May 2025 - June 2025",
      description: "A Real-time Image Captioning and Segmentation Model with Object Detection using stacked architecture with  different models working simultaneously to caption, segment instances, detect objects and identify and provide output.",
      technologies: ["CNN + LSTM","U-Net","Various edge detection algorithms", "Mask R-CNN","Faster R-CNN", "Python", "PyTorch", "OpenCV", "Streamlit"],
      gradient: "from-blue-500 to-purple-500",
      // Embeddable LinkedIn URL
      videoUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7347253949453819904",
    },
    {
      icon: Shield,
      title: "Fraud Guard AI",
      period: "June 2025 - July 2025",
      description: "ML Powered AI Based Fraud Detection System with high accuracy and real-time fraud transaction alerts. Features dashboard, email alerts, and weekly self-retraining.",
      technologies: ["Supervised ML", "Unsupervised ML", "Graph Models", "React", "Email API","Kafka"],
      gradient: "from-red-500 to-pink-500",
      // Embeddable Google Drive URL
      videoUrl: "https://drive.google.com/file/d/1bkOfZUWhVQg563-N316FH7ZTb5fGHV9o/preview?autoplay=1",
    },
    {
      icon: Brain,
      title: "Optimus AI",
      period: "July 2025 - Present",
      description: "AI Powered PC Voice Assistant with ability to understand user intent, open/close apps, and perform PC tasks through voice commands. More advanced than Siri and Bixby.",
      technologies: ["TTS", "STT", "Automation", "Gemini API", "Python", "Ollama Models"],
      gradient: "from-green-500 to-cyan-500",
      videoUrl: null, // No video for this one
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
              hasVideo={!!project.videoUrl}
              onViewDetails={() => project.videoUrl && setActiveVideo(project.videoUrl)}
            />
          ))}
        </motion.div>
      </div>

      {/* === VIDEO DIALOG (MODAL) === */}
      <Dialog 
        open={!!activeVideo} // Show dialog if activeVideo is not null
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setActiveVideo(null); // Close dialog and reset state
          }
        }}
      >
        <DialogContent className="glass p-0 border-accent/20 bg-black/50 max-w-4xl w-full aspect-video rounded-lg">
          <iframe
            src={activeVideo || ""}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </section>
  );
};
