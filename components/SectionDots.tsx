"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "stay", label: "Stay" },
  { id: "experience", label: "Experience" },
  { id: "dining", label: "Dining" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Location" },
];

export default function SectionDots() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <aside className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 md:block lg:right-7">
      <div className="flex flex-col items-center gap-2 rounded-full border border-white/20 bg-ink/45 px-2.5 py-3 shadow-2xl backdrop-blur-xl">
        <div className="mb-1 grid h-5 w-5 place-items-center text-gold/80">
          <MoreHorizontal size={16} strokeWidth={2.2} />
        </div>

        <div className="flex flex-col items-center gap-3">
          {sections.map((section, index) => {
            const isActive = active === section.id;

            return (
              <button
                key={section.id}
                type="button"
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => scrollTo(section.id)}
                className="group relative flex h-4 w-4 items-center justify-center"
              >
                <span
                  className={`block rounded-full border transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 border-gold bg-gold shadow-[0_0_14px_rgba(214,177,91,.75)]"
                      : "h-1.5 w-1.5 border-white/70 bg-white/55 group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-gold"
                  }`}
                />

                <span className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 translate-x-1 opacity-0 whitespace-nowrap border border-white/15 bg-ink/90 px-3 py-2 text-[9px] uppercase tracking-[.2em] text-white shadow-xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  {String(index + 1).padStart(2, "0")} · {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
