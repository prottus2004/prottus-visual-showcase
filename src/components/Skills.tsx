import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Brain, Layers } from "lucide-react";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      icon: Code2,
      title: "Languages",
      skills: ["C++", "C", "Java", "Python", "JavaScript", "HTML/CSS"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layers,
      title: "Frameworks & Libraries",
      skills: ["Node.js", "Express.js", "React", "PyTorch", "OpenCV", "Streamlit"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Databases & Tools",
      skills: ["MongoDB", "SQL", "Git", "MS Office", "Cloud Platforms"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "AI & ML",
      skills: ["LLMs", "Ollama", "CNN + LSTM", "U-Net", "Gemini API"],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Skills & Technologies</h2>
          <p className="text-xl text-foreground/70">Tools and technologies I work with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6 space-y-4 group hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} p-3 group-hover:scale-110 transition-transform`}>
                <category.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-xl font-bold">{category.title}</h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-sm text-foreground/80">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
