import React from "react";

const SectionTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <h2 className="lg:text-xl text-lg font-bold flex items-center gap-2 justify-center">
      <span className="text-primary">{icon}</span>
      {title}
    </h2>
  );
};

export default SectionTitle;
