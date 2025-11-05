import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"; // Import new hooks
import { useInView } from "framer-motion";
import React, { useRef } from "react"; // Import React
import { Eye, Brain, Shield, ExternalLink } from "lucide-react";

// --- Reusable Card Interaction Logic ---
// We create this hook once and reuse it for each card
const useCardInteraction = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Smaller tilt angle for cards
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
    // Set perspective on the card's parent
    parentStyle: {
      perspective: "1000px",
    },
  };
};

// --- Project Card Component ---
// We create a sub-component to easily apply the hook
const ProjectCard = ({ project, isInView, index }) => {
  const interaction = useCardInteraction();
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="glass rounded-2xl overflow-hidden group"
      // Apply perspective to the card itself
      style={interaction.parentStyle}
      // Apply mouse events
      onMouseMove={interaction.handleMouseMove}
      onMouseLeave={interaction.handleMouseLeave}
    >
      {/* Apply the tilt style to an inner div */}
      <motion.div 
        className="h-full w-full"
        style={interaction.style}
      >
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="p-6 space-y-4">
          {/* We can "pop" elements out by adding translateZ */}
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

          <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(40px)" }}>
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
            className="w-full mt-4 py-2 glass rounded-lg flex items-center justify-center gap-2 group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ transform: "translateZ(20px)" }}
          >
            <span>View Details</span>
            <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Projects Component ---
export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      icon: Eye,
      title: "Vision AI Suit",
      period: "May 2025 - June 2025",
      description: "A Real-time Image Captioning and Segmentation Model with Object Detection using stacked architecture with  different models working simultaneously to caption, segment instances, detect objects and identify and provide output.",
      technologies: ["CNN + LSTM","U-Net","Various edge detection algorithms", "Mask R-CNN","Faster R-CNN", "Python", "PyTorch", "OpenCV", "Streamlit"],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Fraud Guard AI",
      period: "June 2025 - July 2025",
      description: "ML Powered AI Based Fraud Detection System with high accuracy and real-time fraud transaction alerts. Features dashboard, email alerts, and weekly self-retraining.",
      technologies: ["Supervised ML", "Unsupervised ML", "Graph Models", "React", "Email API","Kafka"],
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "Optimus AI",
      period: "July 2025 - Present",
      description: "AI Powered PC Voice Assistant with ability to understand user intent, open/close apps, and perform PC tasks through voice commands. More advanced than Siri and Bixby.",
      technologies: ["TTS", "STT", "Automation", "Gemini API", "Python", "Ollama Models"],
      gradient: "from-green-500 to-cyan-500",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              isInView={isInView} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
