import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Heart } from "lucide-react";

// Variants for each card
const cardVariantsLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 } 
  }
};
const cardVariantsBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.4 } 
  }
};
const cardVariantsRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.6 } 
  }
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    // ... (Your education data is unchanged)
    {
      degree: "B.Tech in Information Technology",
      institution: "Institute of Engineering and Management, Kolkata",
      grade: "SGPA: 8.01",
      year: "Expected Oct 2025",
    },
    {
      degree: "XII (ISC)",
      institution: "National Gems Higher Secondary School, Behala",
      grade: "76%",
      year: "2022",
    },
    {
      degree: "X (ICSE)",
      institution: "National Gems Higher Secondary School, Behala",
      grade: "86%",
      year: "2020",
    },
  ];

  const achievements = [
    // ... (Your achievements data is unchanged)
    "Secured 83% score and recognized as the best intern by Zidio Development",
    "Selected for visit to NUS National University of Singapore based on 1st Year performance",
    "Training provided on AI/ML, IoT and Data Analytics at NUS",
  ];

  const hobbies = [
    // ... (Your hobbies data is unchanged)
    "Augmented Reality Development",
    "Cyber Security Techniques",
    "Painting ",
    "Playing Guitar & Singing",
  ];

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-xl text-foreground/70">Get to know me better</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Education */}
          <motion.div
            variants={cardVariantsLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <GraduationCap className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="border-l-2 border-accent/30 pl-4 space-y-1"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <h4 className="font-semibold text-accent">{edu.degree}</h4>
                <p className="text-sm text-foreground/70">{edu.institution}</p>
                <p className="text-sm text-foreground/60">{edu.grade} • {edu.year}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Card 2: Achievements */}
          <motion.div
            variants={cardVariantsBottom}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Award className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Achievements</h3>
            </div>
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/80">{achievement}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Card 3: Hobbies */}
          <motion.div
            variants={cardVariantsRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Heart className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Hobbies</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-primary/10 rounded-lg border border-accent/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--accent))" }}
                >
                  <p className="text-sm text-center">{hobby}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
