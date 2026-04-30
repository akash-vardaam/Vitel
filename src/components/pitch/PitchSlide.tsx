import { useEffect, useRef, useState } from "react";

interface PitchSlideProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function PitchSlide({ children, className = "", id }: PitchSlideProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20 snap-start transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}
