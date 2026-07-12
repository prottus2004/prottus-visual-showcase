import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/PageWrapper";
import { DecorativeBlob } from "@/components/DecorativeBlob";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: lost in the chrono-stream:", location.pathname);
  }, [location.pathname]);

  return (
    <PageWrapper>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <DecorativeBlob
          variant="coral"
          size="lg"
          position="absolute -left-32 top-1/4"
          opacity={0.4}
        />
        <DecorativeBlob
          variant="purple"
          size="md"
          position="absolute -right-24 bottom-10"
          opacity={0.35}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <p className="eyebrow text-coral-700 mb-4">temporal anomaly</p>
          <h1 className="gradient-text mb-4 text-7xl font-bold md:text-9xl">404</h1>
          <p className="mb-2 text-xl text-foreground/70">
            This coordinate does not exist in the timeline.
          </p>
          <p className="eyebrow text-foreground/40 mb-8 text-sm">
            {location.pathname}
          </p>
          <Link
            to="/"
            data-cursor
            className="inline-block rounded-full bg-foreground text-background px-6 py-3 font-medium hover:shadow-elevated transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
          >
            Return to the Present
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
