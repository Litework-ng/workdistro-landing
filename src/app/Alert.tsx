import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type AlertProps = {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

export default function Alert({ show, message, type = "info", onClose }: AlertProps) {
  // Auto-close after 3s
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  const colors = {
    success: "bg-green-500/90 text-white",
    error: "bg-red-500/90 text-white",
    info: "bg-blue-500/90 text-white",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${colors[type]}`}
        >
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-lg leading-none hover:opacity-80"
            aria-label="Close alert"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
