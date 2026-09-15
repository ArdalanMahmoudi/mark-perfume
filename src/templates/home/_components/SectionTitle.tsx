import React from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/src/lib/animation";

const SectionTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <motion.h2
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="lg:text-xl text-lg font-bold flex items-center gap-2 justify-center"
    >
      <span className="text-primary">{icon}</span>
      {title}
    </motion.h2>
  );
};

export default SectionTitle;
