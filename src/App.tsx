/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin,
  Plus, 
  Trash2,
  Image as ImageIcon,
  ChevronRight,
  Download
} from 'lucide-react';

// Import images
import profileImg from './assets/profile.png';
import networkDefenseImg from './assets/network_defense.jpg';
import networkSecurityImg from './assets/network_security.jpg';
import networkTechnicianImg from './assets/network_technician.jpg';
import comptiaServerImg from './assets/comptia_server.jpg';

// --- Types ---

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

// --- Initial Data ---

const INITIAL_SKILLS = {
  "Hardware & Desktop": ["PC Assembly & Repair", "Hardware Troubleshooting", "OS Deployment", "Peripheral Setup", "BIOS/UEFI"],
  "Networking & Security": ["TCP/IP", "Network Troubleshooting", "LAN/WAN", "Wireless Config", "Network Defense"],
  "IT Operations": ["Active Directory", "Ticketing Systems", "Remote Support", "Backup & Recovery", "M365 Admin"],
  "Software & Tools": ["JavaScript", "Java", "PHP", "SQL", "CSS", "React", "Git"]
};

const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'FGC+ BACOLOD',
    role: 'IT Support (OJT)',
    period: '2024',
    description: [
      'Assisted in hardware and software troubleshooting for office workstations.',
      'Supported network maintenance and basic configuration tasks.',
      'Provided technical assistance to employees and documented support tickets.'
    ]
  },
  {
    id: '2',
    company: 'Cybergate TTEC Bacolod',
    role: 'Customer Service Representative',
    period: '2023',
    description: [
      'Delivered exceptional customer support via multiple channels.',
      'Resolved complex customer inquiries and technical issues efficiently.',
      'Maintained high customer satisfaction ratings through effective communication.'
    ]
  }
];

const INITIAL_EDUCATION: Education[] = [
  {
    id: '1',
    school: 'University of St. La Salle',
    degree: 'Bachelor of Science in Information Technology',
    period: '2019 - 2025'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Portfolio Builder',
    description: 'A web application that generates professional portfolios using AI.',
    tags: ['React', 'OpenAI API', 'Tailwind'],
    link: '#'
  },
  {
    id: '2',
    title: 'Task Management Dashboard',
    description: 'A collaborative task management tool with real-time updates.',
    tags: ['Next.js', 'Firebase', 'TypeScript'],
    link: '#'
  }
];

const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: '1',
    title: 'Network Defense',
    issuer: 'Networking Academy',
    date: '2024',
    imageUrl: networkDefenseImg
  },
  {
    id: '2',
    title: 'Network Support and Security',
    issuer: 'Networking Academy',
    date: '2024',
    imageUrl: networkSecurityImg
  },
  {
    id: '3',
    title: 'Network Technician Career Path',
    issuer: 'Networking Academy',
    date: '2024',
    imageUrl: networkTechnicianImg
  },
  {
    id: '4',
    title: 'CompTIA Server+',
    issuer: 'udemy',
    date: '2026',
    imageUrl: comptiaServerImg
  }
];

// --- Components ---

const SectionHeading = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-zinc-800 rounded-lg text-orange-500">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{title}</h2>
  </div>
);

export default function App() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', imageUrl: '' });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    setCertifications(INITIAL_CERTIFICATIONS);
  }, []);

  const saveCerts = (certs: Certification[]) => {
    setCertifications(certs);
    localStorage.setItem('ceejay_certs', JSON.stringify(certs));
  };

  const handleAddCert = (e: FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.imageUrl) return;
    
    const cert: Certification = {
      id: Date.now().toString(),
      ...newCert
    };
    
    saveCerts([...certifications, cert]);
    setNewCert({ title: '', issuer: '', date: '', imageUrl: '' });
    setIsAddingCert(false);
  };

  const handleDeleteCert = (id: string) => {
    saveCerts(certifications.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-100 tracking-tighter">C.A.</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-orange-500 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-orange-500 transition-colors">Certifications</a>
          </div>
          <button 
            onClick={() => window.location.href = 'mailto:alindog.ceejay29@gmail.com'}
            className="p-2 bg-orange-500 text-zinc-950 rounded-full hover:bg-orange-400 transition-colors"
          >
            <Mail size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-32">
        {/* Hero Section */}
        <section id="about" className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold tracking-widest uppercase rounded-full border border-orange-500/20">
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-100 tracking-tighter leading-none">
              Ceejay J. <br />
              <span className="text-orange-500">Alindog</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
              Dedicated IT professional with a strong foundation in infrastructure support, system administration, and network troubleshooting. 
              Passionate about building and maintaining reliable IT environments, resolving complex technical issues, and delivering efficient, scalable solutions that support overall business operations.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-zinc-400 hover:text-zinc-200 transition-colors group">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                  <Mail size={18} className="text-orange-500" />
                </div>
                <a href="mailto:alindog.ceejay29@gmail.com">alindog.ceejay29@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 hover:text-zinc-200 transition-colors group">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                  <Phone size={18} className="text-orange-500" />
                </div>
                <a href="tel:+639621818972">+639621818972</a>
              </div>
              <div className="flex items-start gap-3 text-zinc-400 hover:text-zinc-200 transition-colors group">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors shrink-0">
                  <MapPin size={18} className="text-orange-500" />
                </div>
                <span className="leading-relaxed">
                  Brgy. Mansilingan, Easthomes 6,<br />
                  Bacolod City, Negros Occidental, 6100
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a 
                href="https://github.com/icechocol8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors text-zinc-100"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ceejay-alindog-a71436343/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors text-zinc-100"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="Ceejay_Alindog_CV.pdf"
                download="Ceejay_Alindog_CV.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-orange-500/20 rounded-[2rem] blur-2xl group-hover:bg-orange-500/30 transition-all duration-500"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-2 border-zinc-800 bg-zinc-900">
              <img 
                src={profileImg} 
                alt="Ceejay J. Alindog" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Profile image failed to load.");
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeading icon={Code} title="Technical Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(INITIAL_SKILLS).map(([category, skills], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-zinc-800 text-xs font-medium rounded-lg text-zinc-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionHeading icon={Briefcase} title="Work Experience" />
          <div className="space-y-12">
            {INITIAL_EXPERIENCE.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-zinc-800 pb-4"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
                    <p className="text-orange-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold text-zinc-400">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed">
                      <ChevronRight size={16} className="text-orange-500 shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <SectionHeading icon={GraduationCap} title="Education" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_EDUCATION.map(edu => (
              <div key={edu.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <h3 className="text-lg font-bold text-zinc-100">{edu.degree}</h3>
                <p className="text-orange-500 font-medium">{edu.school}</p>
                <p className="text-sm text-zinc-500 mt-2">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section - Hidden for now */}
        {false && (
        <section id="projects">
          <SectionHeading icon={User} title="Featured Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIAL_PROJECTS.map(project => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -5 }}
                className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:bg-zinc-900 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-zinc-800 rounded-2xl text-orange-500 group-hover:bg-orange-500 group-hover:text-zinc-950 transition-colors">
                    <Code size={24} />
                  </div>
                  {project.link && (
                    <a href={project.link} className="text-zinc-500 hover:text-zinc-100 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-3">{project.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-800 text-[10px] font-bold tracking-widest uppercase rounded-full text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        )}

        {/* Certifications Section */}
        <section id="certifications">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading icon={Award} title="Certifications" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {certifications.map(cert => (
                <motion.div 
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/50 transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-zinc-800 relative">
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error(`Cert image failed to load: ${cert.imageUrl}`);
                      }}
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        View Certificate
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-zinc-100 line-clamp-1">{cert.title}</h3>
                    <p className="text-sm text-orange-500">{cert.issuer}</p>
                    <p className="text-xs text-zinc-500 mt-1">{cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Image Viewer Modal */}
          <AnimatePresence>
            {selectedCert && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCert(null)}
                  className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
                >
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="absolute -top-12 right-0 text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-2 text-sm font-bold"
                  >
                    Close <Plus className="rotate-45" size={20} />
                  </button>
                  <div className="w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                    <img 
                      src={selectedCert.imageUrl} 
                      alt={selectedCert.title} 
                      className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                    />
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
                      <h3 className="text-xl font-bold text-zinc-100">{selectedCert.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-orange-500 font-medium">{selectedCert.issuer}</p>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                        <p className="text-zinc-500">{selectedCert.date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-top border-zinc-800 py-12 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Ceejay J. Alindog. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-zinc-500">
            <a 
              href="https://github.com/icechocol8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ceejay-alindog-a71436343/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:alindog.ceejay29@gmail.com" 
              className="hover:text-orange-500 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
