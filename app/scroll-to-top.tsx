import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const scrollSelectors = ".portal-content, .reports-content, .account-content, .technician-main";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const containers = Array.from(document.querySelectorAll<HTMLElement>(scrollSelectors));
      setVisible(window.scrollY > 120 || containers.some((container) => container.scrollTop > 120));
    }

    document.addEventListener("scroll", updateVisibility, true);
    window.addEventListener("scroll", updateVisibility);
    updateVisibility();
    return () => {
      document.removeEventListener("scroll", updateVisibility, true);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelectorAll<HTMLElement>(scrollSelectors).forEach((container) => container.scrollTo({ top: 0, behavior: "smooth" }));
  }

  return <button className={`scroll-top${visible ? "" : " is-hidden"}`} type="button" aria-label="Scroll to top" onClick={scrollToTop}><ArrowUp size={17} /></button>;
}
