// CyberPortfolio.jsx
import React, { useState, useEffect } from 'react';
import {
  Shield, Terminal, Code, Award, MapPin, Mail, Phone,
  Github, Linkedin, Database, Network, User,
  Trophy, BookOpen, Briefcase, Star, Users, Menu
} from 'lucide-react';

const DOT_COUNT = 50;
function generateDots() {
  return Array.from({ length: DOT_COUNT }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`
  }));
}

const NavButton = ({ id, icon, label, active, onClick }) => (
  <button
    aria-label={`Navigate to ${label}`}
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 relative
      ${active
        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
      }`}
  >
    {icon}
    <span className="font-mono text-sm">{label}</span>
    {active && (
      <span className="absolute left-0 bottom-0 h-1 w-full bg-cyan-400 rounded-full"></span>
    )}
  </button>
);

const SkillBar = React.memo(({ skill, index, isLoaded }) => (
  <div className="mb-4" style={{ animationDelay: `${index * 0.2}s` }}>
    <div className="flex justify-between mb-2">
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">{skill.icon}</span>
        <span className="text-white font-mono">{skill.name}</span>
      </div>
      <span className="text-cyan-400 font-mono">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: isLoaded ? `${skill.level}%` : '0%' }}
      />
    </div>
  </div>
));

const CertificationCard = React.memo(({ cert, index }) => (
  <div
    className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 transition-colors duration-200 hover:border-cyan-400 hover:bg-gray-800"
    style={{ animationDelay: `${index * 0.1}s` }}
    tabIndex={0}
    aria-label={cert.title}
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-cyan-400 font-bold text-lg">{cert.title}</h3>
      {cert.verified && <Shield className="w-5 h-5 text-green-400" />}
    </div>
    <p className="text-gray-300 font-mono text-sm mb-2">{cert.issuer}</p>
    <p className="text-cyan-300 text-sm mb-3">{cert.date}</p>
    <p className="text-gray-400 text-sm mb-4">{cert.description}</p>
    {cert.certificateId && (
      <p className="text-xs text-gray-500 font-mono mb-3">ID: {cert.certificateId}</p>
    )}
    <div className="flex flex-wrap gap-2">
      {cert.verifyUrl && cert.verifyUrl !== "#" && (
        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
          className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-green-500/30 transition-colors flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Verify</span>
        </a>
      )}
      {cert.hasCertificate && cert.certificateUrl && cert.certificateUrl !== "#" && (
        <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer"
          className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-cyan-500/30 transition-colors flex items-center space-x-1">
          <Award className="w-3 h-3" />
          <span>Certificate</span>
        </a>
      )}
      {cert.hasOfferLetter && cert.offerLetterUrl && cert.offerLetterUrl !== "#" && (
        <a href={cert.offerLetterUrl} target="_blank" rel="noopener noreferrer"
          className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-purple-500/30 transition-colors flex items-center space-x-1">
          <Mail className="w-3 h-3" />
          <span>Offer Letter</span>
        </a>
      )}
      {cert.hasGroupPhoto && cert.groupPhotoUrl && cert.groupPhotoUrl !== "#" && (
        <a href={cert.groupPhotoUrl} target="_blank" rel="noopener noreferrer"
          className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-yellow-500/30 transition-colors flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>Group Photo</span>
        </a>
      )}
    </div>
  </div>
));

const CyberPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dots, setDots] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => { setDots(generateDots()); }, []);

  const fullText = "Manikanta Reddy > Cybersecurity Enthusiast";
  useEffect(() => {
    setIsLoaded(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else clearInterval(timer);
    }, 100);
    const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => { clearInterval(timer); clearInterval(cursorTimer); };
  }, []);

  const skills = [
    { name: 'Python', level: 85, icon: <Code /> },
    { name: 'C/C++', level: 80, icon: <Terminal /> },
    { name: 'Cybersecurity', level: 90, icon: <Shield /> },
    { name: 'Linux', level: 75, icon: <Terminal /> },
    { name: 'SQL', level: 70, icon: <Database /> },
    { name: 'Network Security', level: 85, icon: <Network /> }
  ];

  const certifications = {
    academic: [
      {
        title: "Cyber Security 101",
        issuer: "TryHackMe",
        date: "Aug 11, 2025",
        description: "Completed the Cyber Security 101 learning path (45 hours, 53 minutes): foundational cyber security skills and hands-on labs.",
        verified: true,
        certificateId: "THM-UBNNQINHST",
        hasCertificate: true,
        certificateUrl: "/THM-UBNNQINHST.pdf"
      },
      {
        title: "Google Cybersecurity Professional Certificate",
        issuer: "Google/Coursera",
        date: "Nov 5, 2024",
        description: "8-course specialization covering SIEM, IDS, Python automation. Competent in beginner-level Python, Linux, SQL, SIEM tools, and IDS.",
        verified: true,
        verifyUrl: "https://coursera.org/verify/professional-cert/N883D5NUXN9N",
        hasCertificate: false
      }
      // ... rest of your academic certifications ...
    ],
    internships: [
      {
        title: "Cybersecurity Virtual Internship",
        issuer: "Palo Alto Networks (AICTE)",
        date: "10 weeks (June - August 2024)",
        description: "Enterprise security solutions and threat analysis.",
        verified: true,
        certificateId: "d2c36de0f87999604913bb8b0dd9ac3f",
        hasCertificate: true,
        certificateUrl: "/PaloaltoVirtualIntership.pdf"
      },
      {
        title: "Cyber Security & Digital Forensics",
        issuer: "Cyber Secured India",
        date: "3 months (March - May 2024)",
        description: "3-Month CYBER SECURITY & DIGITAL FORENSICS INTERNSHIP. Certificate No.: 70692ffc5dd90279. Completion Date: 06-07-2025.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/CyberSecIndiaCert_Completion.pdf",
        hasOfferLetter: true,
        offerLetterUrl: "#"
      }
    ],
    workshops: [
      // your workshops array unchanged
    ]
  };

  const projects = [
    {
      title: "Referral Hub Platform",
      status: "Under Development",
      description: "A comprehensive platform for managing and monetizing referral codes with payment integration, reviews, and notifications.",
      tech: ["React", "Node.js", "MongoDB", "Payment Gateway"],
      achievement: "Shortlisted at Techthon 2024"
    }
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  {terminalText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                B.Tech IT Student | Ethical Hacker | Security Researcher
              </p>
              <div className="flex justify-center mb-6">
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4">
                  <iframe
                    src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=2855948"
                    className="border-none rounded-lg"
                    width="400"
                    height="120"
                    title="TryHackMe Profile Badge"
                  />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Current Year", value: "3rd Year B.Tech", icon: <BookOpen /> },
                { label: "Certifications", value: "20+", icon: <Award /> },
                { label: "Hackathons", value: "5+", icon: <Trophy /> },
                { label: "Projects", value: "Active", icon: <Code /> }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 text-center transition-colors duration-200 hover:border-cyan-400 hover:bg-gray-800">
                  <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-cyan-400 flex items-center mb-8">
              <Award className="mr-3" /> Achievement Unlocked
            </h2>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="mr-3 text-cyan-400" /> Academic Certifications
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {certifications.academic.map((cert, index) => (
                  <CertificationCard key={index} cert={cert} index={index} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Briefcase className="mr-3 text-cyan-400" /> Internships
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {certifications.internships.map((cert, index) => (
                  <CertificationCard key={index} cert={cert} index={index} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="mr-3 text-cyan-400" /> Workshops & Competitions
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {certifications.workshops.map((cert, index) => (
                  <CertificationCard key={index} cert={cert} index={index} />
                ))}
              </div>
            </div>
          </div>
        );
      // Implement other sections as in your original
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {dots.map((dot, i) => (
            <div key={i} className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                animationDuration: dot.duration
              }}
            />
          ))}
        </div>
      </div>
      <nav className="relative z-10 p-6 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="md:hidden bg-gray-800 p-2 rounded" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <Menu />
          </button>
          <div className={`flex-col md:flex md:flex-row md:gap-4 ${mobileNavOpen ? 'flex' : 'hidden'} md:!flex`}>
            <NavButton id="home" icon={<Terminal />} label="~/home" active={currentSection === 'home'} onClick={() => setCurrentSection('home')} />
            <NavButton id="about" icon={<User />} label="~/about" active={currentSection === 'about'} onClick={() => setCurrentSection('about')} />
            <NavButton id="certifications" icon={<Award />} label="~/certs" active={currentSection === 'certifications'} onClick={() => setCurrentSection('certifications')} />
            <NavButton id="projects" icon={<Code />} label="~/projects" active={currentSection === 'projects'} onClick={() => setCurrentSection('projects')} />
          </div>
        </div>
      </nav>
      <main className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
        {renderSection()}
      </main>
      <footer className="relative z-10 text-center p-6 border-t border-cyan-500/30 mt-12">
        <p className="text-gray-400 font-mono">
          <span className="text-cyan-400">[SECURE CONNECTION ESTABLISHED]</span> © 2025 Manikanta Reddy Nanchary
        </p>
      </footer>
    </div>
  );
};

export default CyberPortfolio;
