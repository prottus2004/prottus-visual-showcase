import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experience = {
    company: "Zidio Developments",
    role: "Machine Learning Intern",
    period: "May 2025 - August 2025",
    location: "Remote",
    description: [
      "Worked as a solo intern on three comprehensive Machine Learning projects",
      "Gained expertise in using LLMs efficiently and developing new architectures",
      "Trained and evaluated model accuracy, created stacked ensembles",
      "Worked extensively with APIs and fine-tuned pre-existing model weights",
      "Achieved 83% score and recognized as the best intern",
    ],
    skills: ["LLMs", "Model Training", "API Integration", "Model Evaluation", "Architecture Design"],
  };

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Work Experience</h2>
          <p className="text-xl text-foreground/70">My professional journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative pl-8 border-l-2 border-accent/30">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-accent rounded-full animate-pulse" />
            
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-accent mb-2">{experience.role}</h3>
                  <h4 className="text-xl font-semibold">{experience.company}</h4>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {experience.description.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-foreground/80">{item}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-accent/20">
                <p className="text-sm text-foreground/60 mb-3">Key Skills Developed:</p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-primary/20 rounded-full text-sm border border-accent/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, borderColor: "hsl(var(--accent))" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

