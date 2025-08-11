// CyberPortfolio.jsx

import React, { useState, useEffect } from 'react';
import {
  Shield, Terminal, Code, Award, MapPin, Mail,
  Phone, Github, Linkedin, ChevronRight, Lock, Zap,
  Database, Network, User, Calendar, Trophy, BookOpen,
  Briefcase, Star, Users, Menu
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
      }
    `}
    style={{ outline: active ? '2px solid #22d3ee' : 'none' }}
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
    className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400 transition-colors duration-200 hover:bg-gray-800"
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
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-green-500/30 transition-colors flex items-center space-x-1"
        >
          <Shield className="w-3 h-3" />
          <span>Verify</span>
        </a>
      )}
      {cert.hasQRVerify && (
        <button
          aria-label="Scan QR code to verify"
          className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
        >
          <span className="text-xs">📱</span>
          <span>QR Verify</span>
        </button>
      )}
      {cert.hasCertificate && cert.certificateUrl && cert.certificateUrl !== "#" && (
        <a
          href={cert.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-cyan-500/30 transition-colors flex items-center space-x-1"
        >
          <Award className="w-3 h-3" />
          <span>Certificate</span>
        </a>
      )}
      {cert.hasOfferLetter && cert.offerLetterUrl && cert.offerLetterUrl !== "#" && (
        <a
          href={cert.offerLetterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-purple-500/30 transition-colors flex items-center space-x-1"
        >
          <Mail className="w-3 h-3" />
          <span>Offer Letter</span>
        </a>
      )}
      {cert.hasGroupPhoto && cert.groupPhotoUrl && cert.groupPhotoUrl !== "#" && (
        <a
          href={cert.groupPhotoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-mono hover:bg-yellow-500/30 transition-colors flex items-center space-x-1"
        >
          <Users className="w-3 h-3" />
          <span>Group Photo</span>
        </a>
      )}
    </div>
  </div>
));

// Main component
const CyberPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dots, setDots] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Dots: random positions only ONCE
  useEffect(() => {
    setDots(generateDots());
  }, []);

  // Animated typing
  const fullText = "Manikanta Reddy > Cybersecurity Enthusiast";
  useEffect(() => {
    setIsLoaded(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Data
  const skills = [
    { name: 'Python', level: 85, icon: <Code /> },
    { name: 'C/C++', level: 80, icon: <Terminal /> },
    { name: 'Cybersecurity', level: 90, icon: <Shield /> },
    { name: 'Linux', level: 75, icon: <Terminal /> },
    { name: 'SQL', level: 70, icon: <Database /> },
    { name: 'Network Security', level: 85, icon: <Network /> }
  ];

  // Replace this with real data and structure as needed
  const certifications = { academic: [], internships: [], workshops: [] };
  const projects = [];

  // Main render for all sections (simplified for brevity)
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="space-y-12">
            {/* ... Hero etc ... */}
            <div className="text-center space-y-6">
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  {terminalText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
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
            {/* ...Stats... */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Current Year", value: "3rd Year B.Tech", icon: <BookOpen /> },
                { label: "Certifications", value: "20+", icon: <Award /> },
                { label: "Hackathons", value: "5+", icon: <Trophy /> },
                { label: "Projects", value: "Active", icon: <Code /> }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors duration-200">
                  <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      // ... other sections, e.g. About, Certifications, Projects per your original layout ...
      default:
        return null;
    }
  };

  // Main return
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
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
      {/* Responsive Navigation */}
      <nav className="relative z-10 p-6 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {/* Mobile Hamburger */}
          <button
            aria-label="Open navigation"
            className="md:hidden bg-gray-800 p-2 rounded"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Menu />
          </button>
          {/* Full nav list */}
          <div className={`flex-col md:flex md:flex-row md:gap-4 ${mobileNavOpen ? 'flex' : 'hidden'} md:!flex`}>
            <NavButton id="home" icon={<Terminal />} label="~/home" active={currentSection === 'home'} onClick={() => setCurrentSection('home')} />
            <NavButton id="about" icon={<User />} label="~/about" active={currentSection === 'about'} onClick={() => setCurrentSection('about')} />
            <NavButton id="certifications" icon={<Award />} label="~/certs" active={currentSection === 'certifications'} onClick={() => setCurrentSection('certifications')} />
            <NavButton id="projects" icon={<Code />} label="~/projects" active={currentSection === 'projects'} onClick={() => setCurrentSection('projects')} />
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
        {renderSection()}
      </main>
      {/* Footer */}
      <footer className="relative z-10 text-center p-6 border-t border-cyan-500/30 mt-12">
        <p className="text-gray-400 font-mono">
          <span className="text-cyan-400">[SECURE CONNECTION ESTABLISHED]</span>
          {' '} © 2025 Manikanta Reddy Nanchary
        </p>
      </footer>
    </div>
  );
};

export default CyberPortfolio;
