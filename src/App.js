import React, { useState, useEffect, memo } from "react";
import {
  Shield, Terminal, Code, Award, MapPin, Mail,
  Github, Linkedin, Database, Network, User,
  Trophy, BookOpen, Briefcase, Menu
} from "lucide-react";

/* ---------------- Background Dots ---------------- */
const generateDots = (count) =>
  Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
  }));

/* ---------------- Reusable Components ---------------- */

const NavButton = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm
      transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400
      ${active
        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
        : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
      }`}
  >
    {icon}
    {label}
  </button>
);

const SkillBar = memo(({ skill, isLoaded }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400">{skill.icon}</span>
        <span className="font-mono text-white">{skill.name}</span>
      </div>
      <span className="font-mono text-cyan-400">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-800 h-2 rounded-full">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-1000"
        style={{ width: isLoaded ? `${skill.level}%` : "0%" }}
      />
    </div>
  </div>
));

/* ---------------- Certificate Modal ---------------- */
const CertificateModal = ({ open, file, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg max-w-4xl w-full h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <iframe
          src={file}
          title="Certificate Viewer"
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

/* ---------------- Main App ---------------- */

export default function App() {
  const [section, setSection] = useState("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [cursor, setCursor] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [dots, setDots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFile, setModalFile] = useState("");

  const fullText = "Manikanta Reddy > Cybersecurity Enthusiast";

  useEffect(() => {
    let i = 0;
    setLoaded(true);
    const t = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else clearInterval(t);
    }, 90);

    const c = setInterval(() => setCursor(v => !v), 500);
    return () => { clearInterval(t); clearInterval(c); };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) setDots(generateDots(40));
  }, []);

  const skills = [
    { name: "Python", level: 85, icon: <Code /> },
    { name: "C / C++", level: 80, icon: <Terminal /> },
    { name: "Cybersecurity", level: 90, icon: <Shield /> },
    { name: "Linux", level: 75, icon: <Terminal /> },
    { name: "SQL", level: 70, icon: <Database /> },
    { name: "Network Security", level: 85, icon: <Network /> },
  ];

  const internships = [
    {
      organization: "Palo Alto Networks (AICTE – EduSkills)",
      role: "Cybersecurity Virtual Intern",
      duration: "10 Weeks (Jan – Mar 2025)",
      focus: "Enterprise cybersecurity fundamentals and threat analysis",
      certificateId: "d2c36de0f87999604913bb8b0dd9ac3f",
      certificateFile: "/certificates/internships/paloalto_virtual_internship.pdf",
    },
    {
      organization: "Cyber Secured India",
      role: "Cyber Security & Digital Forensics Intern",
      duration: "3 Months (Completed July 2025)",
      focus: "Hands-on cybersecurity and digital forensics fundamentals",
      certificateId: "70692ffc5dd90279",
      certificateFile: "/certificates/internships/CyberSecIndiaCert_Completion.pdf",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">

      {/* Navbar */}
      <nav className="relative z-10 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <button className="md:hidden bg-gray-800 p-2 rounded" onClick={() => setMobileNav(v => !v)}>
            <Menu />
          </button>

          <div className={`w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row gap-3 md:gap-4
            ${mobileNav ? "flex" : "hidden"} md:flex`}>
            <NavButton label="~/home" icon={<Terminal />} active={section==="home"} onClick={()=>setSection("home")} />
            <NavButton label="~/about" icon={<User />} active={section==="about"} onClick={()=>setSection("about")} />
            <NavButton label="~/achievements" icon={<Trophy />} active={section==="achievements"} onClick={()=>setSection("achievements")} />
            <NavButton label="~/internships" icon={<Briefcase />} active={section==="internships"} onClick={()=>setSection("internships")} />
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 flex-grow max-w-6xl mx-auto p-6 pt-12">

        {/* ================= HOME (UNCHANGED) ================= */}
        {section === "home" && (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {terminalText}
                <span className={cursor ? "opacity-100" : "opacity-0"}>|</span>
              </h1>

              <p className="text-xl text-gray-300">
                B.Tech IT Student | Ethical Hacker | Security Researcher
              </p>

              <div className="flex justify-center">
                <iframe
                  className="w-full max-w-[400px] h-[120px] rounded-lg border-none"
                  src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=2855948"
                  title="TryHackMe Badge"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Current Year", value: "3rd Year B.Tech", icon: <BookOpen /> },
                { label: "Certifications", value: "20+", icon: <Award /> },
                { label: "Hackathons", value: "5+", icon: <Trophy /> },
                { label: "Projects", value: "Active", icon: <Code /> },
              ].map((s, i) => (
                <div key={i} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 text-center">
                  <div className="text-cyan-400 flex justify-center mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ABOUT (UNCHANGED) ================= */}
        {section === "about" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-cyan-400 flex items-center">
              <User className="mr-3" /> User Profile
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">About Me</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am a cybersecurity enthusiast and B.Tech student with a strong
                    foundation in C, C++, Python, and Linux. I am actively pursuing
                    hands-on experience in ethical hacking, vulnerability assessment,
                    penetration testing, and system security.
                  </p>
                </div>

                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Education</h3>
                  <p className="text-white font-semibold">BV Raju Institute of Technology</p>
                  <p className="text-cyan-300">B.Tech in Information Technology</p>
                  <p className="text-green-400 text-sm font-mono">CGPA: 8.12</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
  <h3 className="text-xl font-bold text-cyan-400 mb-4">
    Contact Information
  </h3>

  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <MapPin className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300">
        Hyderabad, Telangana, India
      </span>
    </div>

    <a
      href="mailto:2311a12b1@bvrit.ac.in"
      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition"
    >
      <Mail className="w-5 h-5 text-cyan-400" />
      <span>2311a12b1@bvrit.ac.in</span>
    </a>

    <a
      href="https://www.linkedin.com/in/manikanta-reddy-nanchary-44aa792b0"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition"
    >
      <Linkedin className="w-5 h-5 text-cyan-400" />
      <span>LinkedIn Profile</span>
    </a>

    <a
      href="https://github.com/manikantareddyn"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition"
    >
      <Github className="w-5 h-5 text-cyan-400" />
      <span>GitHub Profile</span>
    </a>
  </div>
</div>


                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Skills Matrix</h3>
                  {skills.map(skill => (
                    <SkillBar key={skill.name} skill={skill} isLoaded={loaded} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ACHIEVEMENTS ================= */}
        {section === "achievements" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["TryHackMe", "Top 4% in rank"],
              ["Hands-on Labs in TryHackMe and Portswigger", "100+ Completed"],
              ["Garuda Cybersecurity Team", "Member"],
              ["CTF Challenges", "Multiple Solved"],
              ["Workshops Conducted", "Ethical Hacking"],
              ["CEH Practical", "In Preparation"],
              ["AWS CTF Top performer with Global Rank 166","Awarded SANS Netwars Course"],
            ].map(([t, v], i) => (
              <div key={i} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 text-center">
                <div className="text-white font-semibold">{t}</div>
                <div className="text-cyan-400 text-sm">{v}</div>
              </div>
            ))}
          </div>
        )}

        {/* ================= INTERNSHIPS ================= */}
        {section === "internships" && (
          <div className="space-y-6">
            {internships.map((intern, i) => (
              <div key={i} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                <div className="text-xl font-semibold">{intern.organization}</div>
                <div className="text-cyan-300">{intern.role}</div>
                <div className="text-gray-400 text-sm">{intern.duration}</div>
                <p className="mt-2">{intern.focus}</p>
                <p className="text-xs text-gray-500 font-mono mt-2">
                  Certificate ID: {intern.certificateId}
                </p>

                <button
                  onClick={() => { setModalFile(intern.certificateFile); setModalOpen(true); }}
                  className="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg"
                >
                  View Certificate
                </button>
              </div>
            ))}
          </div>
        )}

      </main>

      <CertificateModal open={modalOpen} file={modalFile} onClose={() => setModalOpen(false)} />

      <footer className="relative z-10 mt-auto text-center p-6 border-t border-cyan-500/30">
        <p className="text-gray-400 font-mono">
          <span className="text-cyan-400">[SECURE CONNECTION ESTABLISHED]</span> © 2025 Manikanta Reddy Nanchary
        </p>
      </footer>
    </div>
  );
}
