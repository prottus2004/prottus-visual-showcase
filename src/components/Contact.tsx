import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Github, Linkedin, Facebook, Instagram, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    { icon: Mail, text: "prottus2004@gmail.com", href: "mailto:prottus2004@gmail.com" },
    { icon: Phone, text: "(+91) 8697736679", href: "tel:+918697736679" },
  ];

  const socialLinks = [
    { icon: Github, url: "https://github.com/prottus2004", label: "GitHub" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/prottus-manna-6b39b2268", label: "LinkedIn" },
    { icon: Facebook, url: "https://www.facebook.com/share/1ZXfdDUd1g/", label: "Facebook" },
    { icon: Instagram, url: "https://www.instagram.com/__pratyush_manna__?igsh=ZWVremdtZHRvaHph", label: "Instagram" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Create WhatsApp message
      const whatsappMessage = `*New Contact Form Message*%0A%0A*Name:* ${encodeURIComponent(validatedData.name)}%0A*Email:* ${encodeURIComponent(validatedData.email)}%0A*Message:* ${encodeURIComponent(validatedData.message)}`;
      
      // WhatsApp URL with phone number
      const whatsappUrl = `https://wa.me/918697736679?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Success!",
        description: "Opening WhatsApp to send your message.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to process your message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Get In Touch</h2>
          <p className="text-xl text-foreground/70">Let's create something amazing together</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <info.icon className="text-accent" size={20} />
                  </div>
                  <span className="text-foreground/80">{info.text}</span>
                </motion.a>
              ))}

              <div className="pt-6">
                <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-lg hover:bg-accent/20 transition-colors group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="text-foreground/70 group-hover:text-accent transition-colors" size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 bg-primary/10 border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 bg-primary/10 border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              
              <div>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  maxLength={1000}
                  className="w-full px-4 py-3 bg-primary/10 border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


