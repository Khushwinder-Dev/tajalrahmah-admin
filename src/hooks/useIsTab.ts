import { useState, useEffect } from "react";

const useIsTab = () => {
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const checkTab = () => {
      console.log("window.innerWidth", window.innerWidth);
      setIsTab(window.innerWidth < 900); // md breakpoint
    };

    checkTab();
    window.addEventListener("resize", checkTab);
    return () => window.removeEventListener("resize", checkTab);
  }, []);

  return isTab;
};

export default useIsTab;
