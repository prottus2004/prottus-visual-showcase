import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/PageWrapper";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: lost in the chrono-stream:", location.pathname);
  }, [location.pathname]);

  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="chrono-mono text-era text-sm mb-4">temporal anomaly</p>
          <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl text-foreground/60 mb-2">
            This coordinate does not exist in the timeline.
          </p>
          <p className="text-foreground/40 mb-8 mono text-sm chrono-mono">
            {location.pathname}
          </p>
          <Link
            to="/"
            data-cursor
            className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-white"
          >
            Return to the Present
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;