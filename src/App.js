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
    aria-label={`Maps to ${label}`}
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
        title: "Google Cybersecurity Professional Certificate",
        issuer: "Google/Coursera",
        date: "Nov 5, 2024",
        description: "8-course specialization covering SIEM, IDS, Python automation. Competent in beginner-level Python, Linux, SQL, SIEM tools, and IDS.",
        verified: true,
        verifyUrl: "https://coursera.org/verify/professional-cert/N883D5NUXN9N",
        hasCertificate: false
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "March 2024",
        description: "Foundational cybersecurity concepts and online safety.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/COC_Intro_CS_cisco.pdf"
      },
      {
        title: "Cybersecurity Essentials",
        issuer: "Cisco Networking Academy",
        date: "May 29, 2024",
        description: "Advanced cybersecurity principles and countermeasures.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/COC_CS_Essentials_cisco.pdf"
      },
      {
        title: "Pre Security Learning Path",
        issuer: "TryHackMe",
        date: "Feb 2025",
        description: "Completed in 7h 28m - Foundational security concepts.",
        verified: true,
        certificateId: "THM-LXCZEZDXZO",
        hasCertificate: true,
        certificateUrl: "/tryhackme_THM-LXCZEZDXZO.pdf"
      },
      {
        title: "Fundamentals of Cybersecurity (EDU-102)",
        issuer: "Zscaler Training",
        date: "June 21, 2025",
        description: "Valid until June 21, 2027 - Enterprise security fundamentals.",
        verified: true,
        verifyUrl: "https://verify.skilljar.com/c/7snge9qz9oum",
        hasCertificate: false
      },
      {
        title: "ZTCA - Zscaler Zero Trust Cyber Associate",
        issuer: "Zscaler",
        date: "2024",
        description: "Zero Trust architecture and cybersecurity principles.",
        verified: true,
        verifyUrl: "#" // Replace with actual verify URL if available
      },
      {
        title: "The Joy of Computing using Python",
        issuer: "NPTEL",
        date: "Jan-Apr 2024",
        description: "Scored 71% - Python programming and computational thinking.",
        verified: true,
        certificateId: "NPTEL24CS57S657405335",
        hasCertificate: true,
        certificateUrl: "/Joy_of_Computing_Python_NPTEL.pdf"
      },
      {
        title: "Programming in Modern C++",
        issuer: "NPTEL",
        date: "Jul-Oct 2024",
        description: "Scored 58% - Advanced C++ programming concepts.",
        verified: true,
        certificateId: "NPTEL24CS125S1050206154",
        hasCertificate: true,
        certificateUrl: "/Programming_in_Modern_C++.pdf"
      },
      {
        title: "Cyber Security 101",
        issuer: "TryHackMe",
        date: "Aug 11, 2025",
        description: "Completed the Cyber Security 101 learning path (45 hours, 53 minutes): foundational cyber security skills and hands-on labs.",
        verified: true,
        certificateId: "THM-UBNNQINHST",
        hasCertificate: true,
        certificateUrl: "/THM-UBNNQINHST.pdf"
      }
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
        description: "Hands-on training in forensics and incident response.",
        verified: true,
        hasOfferLetter: true,
        offerLetterUrl: "#" // Placeholder for offer letter PDF/image
      },
    ],
    workshops: [
      {
        title: "Cyber Ninjas: Ethical Hacking Workshop",
        issuer: "Tinkerer's Lab IIT Hyderabad (Techobytes Technologies)",
        date: "September 14-15, 2024 (2-day)",
        description: "2-day intensive workshop focusing on ethical hacking techniques and cybersecurity. Certificate ID: TB-TINKERERSLAB24-L3-EH-028.",
        verified: true,
        certificateId: "TB-TINKERERSLAB24-L3-EH-028",
        hasCertificate: true,
        certificateUrl: "/COP_IITHw_cyberninjas.jpg", // Updated certificate path
        hasGroupPhoto: true, // Added for group photo
        groupPhotoUrl: "/IIT_Hyderabad_Workshop.jpg" // Path for group photo
      },
      {
        title: "PRASUNETHON Hackathon 2024",
        issuer: "48-hour National Hackathon",
        date: "June 29-30, 2024",
        description: "Innovative solutions development competition. Participated for 48 hours.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/prasunethon.pdf"
      },
      {
        title: "Hackfiniti National Hackathon",
        issuer: "24-hour Competition",
        date: "2024",
        description: "National level programming competition.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/Hackfiniti_hackathon.jpg"
      },
      {
        title: "IEEE Quiz Competition - 2nd Prize",
        issuer: "IEEE MTT-S BVRIT",
        date: "Dec 2023",
        description: "Acharya Jagadish Chandra Bose Memorial Quiz.",
        verified: true,
        hasCertificate: true,
        certificateUrl: "/COP_IEEE_MIT-S_BVRIT.jpg"
      }
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
      case 'about':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-cyan-400 flex items-center mb-8">
              <User className="mr-3" /> User Profile
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">About Me</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am a cybersecurity enthusiast and B.Tech student with a strong foundation in C, C++, Python, and Linux,
                    I'm actively pursuing hands-on experience in ethical hacking, vulnerability assessment, and system security.
                    My interests span Android malware detection, cryptographic attack vectors, and algorithmic design enhanced by predictive techniques.
                  </p>
                </div>
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold">BV Raju Institute of Technology</h4>
                      <p className="text-cyan-300">B.Tech in Information Technology</p>
                      <p className="text-green-400 text-sm font-mono">CGPA: 8.12 (3 semesters)</p>
                      <p className="text-gray-400 text-sm">August 2023 - Present | Current: 3rd Year</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sri Chaitanya Jr College</h4>
                      <p className="text-cyan-300">Intermediate - 966/1000</p>
                      <p className="text-gray-400 text-sm">June 2021 - April 2023</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">T.S Residential School, Keesaragutta</h4>
                      <p className="text-cyan-300">SSC (10th Standard) - Grade 10.0</p>
                      <p className="text-gray-400 text-sm">2020 - 2021 | Keesaragutta, Medchal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Hyderabad, Telangana, India</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">+91 7386850193</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">2311a12b1@bvrit.ac.in</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-cyan-400" />
                      <a href="http://bit.ly/3YaqsKr" className="text-cyan-400 hover:text-cyan-300" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-cyan-400" />
                      <a href="https://github.com/manikantareddyn" className="text-cyan-400 hover:text-cyan-300" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                    </div>
                </div>
                </div>
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Skills Matrix</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} isLoaded={isLoaded}/>
                    ))}
                  </div>
                </div>
              </div>
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
      case 'projects':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-cyan-400 flex items-center mb-8">
              <Code className="mr-3" /> Active Operations
            </h2>
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8 transition-colors duration-200 hover:border-cyan-400 hover:bg-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-cyan-400">{project.title}</h3>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-mono">
                      {project.status}
                    </span>
                </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-mono">
                        {tech}
                      </span>
                    ))}
                </div>
                  {project.achievement && (
                    <div className="flex items-center space-x-2 text-green-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-mono">{project.achievement}</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        );
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