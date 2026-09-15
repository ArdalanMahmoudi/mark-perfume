import { Variants } from "framer-motion";

export const containerVariants:Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // فاصله بین شروع انیمیشن هر آیتم
      delayChildren: 0.1, // قبل از شروع اولین آیتم چقدر صبر کنه
    },
  },
};

export const itemVariants:Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const itemVariantsRTL:Variants = {
  hidden: { opacity: 0, x: 24, scale: 0.93 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const fadeInVariants:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
