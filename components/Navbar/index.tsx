import React from "react";
import { Slider } from "../ResponsiveNavigation/Slider";
import { ResponsiveNavigation } from "../ResponsiveNavigation";
import { Navigation } from "../Navigation";

interface NavbarProps {
  width: number;
  toggleOn: () => void;
  toggleOff: () => void;
  toggle: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  width,
  toggleOn,
  toggleOff,
  toggle,
}) => {
  return (
    <>
      {width < 576 ? (
        <>
          <ResponsiveNavigation onClick={toggleOn} />
          {toggle && <Slider onClick={toggleOff} />}
        </>
      ) : (
        <Navigation />
      )}
    </>
  );
};
