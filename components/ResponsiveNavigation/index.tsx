import React from "react";
import { FaBars } from "react-icons/fa";

interface ResponsiveNavigationProps {
  onClick: () => void;
}

export const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  onClick,
}) => {
  return (
    <div className="absolute right-0 top-0 p-4">
      <FaBars color="white" size={35} onClick={onClick} />
    </div>
  );
};
