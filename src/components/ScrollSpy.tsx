import Link from "next/link";

export default function ScrollSpy({ activeSection }: { activeSection: string }) {
  // Determine background color based on active section
  const bgColor =
    activeSection === "my-story"
      ? "bg-[#27272780]" // Dark background at 60% opacity for the middle section
      : "bg-[#E1E1E133]"; // Light background at 15% opacity for the first and last sections

  return (
    <nav
      className={`fixed left-4 top-[calc(56.5vh)] transform -translate-y-1/2 flex flex-col justify-between h-[80vh] z-40 px-4 py-20 rounded-lg transition-all duration-500 ${bgColor}`}
    >
      {[
        { id: "welcome", label: "Welcome" },
        { id: "my-story", label: "My Story" },
        { id: "skills-passions", label: <>Skills/<br />Passions</> },
      ].map(({ id, label }) => (
        <Link key={id} href={`#${id}`} className="flex items-center space-x-2">
          <span
            className={`w-3 h-3 mr-[3px] rounded-full transition-all duration-300 ${
              activeSection === id ? "bg-[var(--accent-blue)] scale-125" : "bg-[var(--light-gray)]"
            }`}
          />
          <span
            className={`text-[18px] transition-all duration-300 ${
              activeSection === id ? "text-[var(--accent-blue)] font-medium" : "text-[var(--light-gray)] font-light"
            }`}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
