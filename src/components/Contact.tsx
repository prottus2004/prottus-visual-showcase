import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe, Send, Github, Linkedin, Facebook, Instagram, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { PERSONA, SOCIALS } from "@/data/chronicle";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const SOCIAL_ICONS: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
};

export const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONA.email);
      setCopied(true);
      toast({ title: "Email copied", description: PERSONA.email });
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast({ title: "Couldn't copy", description: PERSONA.email, variant: "destructive" });
    }
  };

  const contactInfo = [
    { icon: Phone, text: PERSONA.phone, href: `tel:${PERSONA.phoneRaw}` },
    { icon: MapPin, text: PERSONA.location, href: "#" },
    { icon: Globe, text: PERSONA.relocation, href: "#" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validated = contactSchema.parse(formData);
      const msg = `*New Contact Form Message*%0A%0A*Name:* ${encodeURIComponent(validated.name)}%0A*Email:* ${encodeURIComponent(validated.email)}%0A*Message:* ${encodeURIComponent(validated.message)}`;
      window.open(`https://wa.me/${PERSONA.phoneRaw}?text=${msg}`, "_blank");
      toast({ title: "Signal transmitted", description: "Opening WhatsApp to deliver your message." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation Error", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Failed to process your message. Please try again.", variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div ref={ref} className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      {/* Left: contact info */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h3 className="mb-2 text-2xl font-bold">Receiver Coordinates</h3>
          <p className="-mt-4 text-sm text-foreground/60">
            Transmit a signal across the spacetime continuum.
          </p>

          <motion.button
            type="button"
            data-cursor
            onClick={copyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-between gap-3 rounded-xl bg-secondary p-4 transition-colors hover:bg-coral-100"
          >
            <span className="flex items-center gap-4">
              <span className="rounded-lg bg-coral-100 p-3 text-coral-700 transition-colors group-hover:bg-coral-200">
                <Mail size={18} />
              </span>
              <span className="text-sm text-foreground/80">{PERSONA.email}</span>
            </span>
            <span className="text-coral-700">{copied ? <Check size={18} /> : <Copy size={18} />}</span>
          </motion.button>

          {contactInfo.map((info, i) => (
            <motion.a
              key={info.text}
              href={info.href}
              className="group flex items-center gap-4 rounded-xl bg-secondary p-4 hover:bg-coral-100 transition-colors"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="rounded-lg bg-coral-100 p-3 text-coral-700 transition-colors group-hover:bg-coral-200">
                <info.icon size={18} />
              </div>
              <span className="text-sm text-foreground/80">{info.text}</span>
            </motion.a>
          ))}

          <div className="pt-2">
            <h4 className="eyebrow mb-4 text-coral-700">open channels</h4>
            <div className="flex gap-3">
              {SOCIALS.map((social, i) => {
                const Icon = SOCIAL_ICONS[social.label];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-lg border border-border bg-card p-3 text-foreground/60 transition-colors hover:border-coral-200 hover:bg-coral-100 hover:text-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-border bg-card p-8 shadow-soft"
      >
        <h3 className="mb-6 text-2xl font-bold">Compose Transmission</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            required
            maxLength={100}
            className="w-full rounded-xl border border-input bg-card px-4 py-3 transition-colors placeholder:text-foreground/40 focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-200"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email"
            required
            maxLength={255}
            className="w-full rounded-xl border border-input bg-card px-4 py-3 transition-colors placeholder:text-foreground/40 focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-200"
          />
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message"
            required
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 transition-colors placeholder:text-foreground/40 focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-200"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 font-medium text-background disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            <span>{isSubmitting ? "Transmitting..." : "Transmit Signal"}</span>
            <Send size={18} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
