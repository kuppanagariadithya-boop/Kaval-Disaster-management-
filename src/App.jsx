import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { LiteratureComparison } from './components/LiteratureComparison';
import { HardwareTopology } from './components/HardwareTopology';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { VivaDefensePrep } from './components/VivaDefensePrep';
import { ProjectDossierModal } from './components/ProjectDossierModal';
import { projectMeta } from './data/reviewData';
import { 
  Radio, 
  Layers, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  HelpCircle, 
  FileText,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [defenseMode, setDefenseMode] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const defenseSteps = [
    { id: 'overview', title: '1. Problem & Gap Analysis' },
    { id: 'architecture', title: '2. 4-Tier System Architecture' },
    { id: 'simulator', title: '3. Live System Demonstration' },
    { id: 'methodology', title: '4. Hardware & Goertzel Math' },
    { id: 'benchmarks', title: '5. Results & Metrics' },
    { id: 'viva', title: '6. Viva Voce Q&A Defense' }
  ];

  const currentStepIdx = defenseSteps.findIndex(s => s.id === activeTab);

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setActiveTab(defenseSteps[currentStepIdx - 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    if (currentStepIdx < defenseSteps.length - 1) {
      setActiveTab(defenseSteps[currentStepIdx + 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        onOpenDossier={() => setIsDossierOpen(true)}
        defenseMode={defenseMode}
        setDefenseMode={setDefenseMode}
      />

      {/* Hero Presentation Header */}
      <HeroBanner 
        onLaunchSimulator={() => {
          setActiveTab('simulator');
          window.scrollTo({ top: 420, behavior: 'smooth' });
        }}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Defense Presentation Mode Ribbon (Sticky when Defense Mode is active) */}
      {defenseMode && (
        <div className="bg-purple-950/80 border-b border-purple-500/30 px-4 py-2 sticky top-[65px] z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-purple-200">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="font-bold">DEFENSE PRESENTATION MODE:</span>
              <span className="text-white font-sans font-bold">
                Slide {currentStepIdx + 1} of {defenseSteps.length} — {defenseSteps[currentStepIdx]?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStepIdx === defenseSteps.length - 1}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-40"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        
        {/* Render Tab Contents */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            <LiteratureComparison />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-fadeIn">
            <ArchitectureExplorer />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-fadeIn">
            <InteractiveSimulator audioEnabled={audioEnabled} />
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className="space-y-8 animate-fadeIn">
            <HardwareTopology />
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-8 animate-fadeIn">
            <PerformanceMetrics />
          </div>
        )}

        {activeTab === 'viva' && (
          <div className="space-y-8 animate-fadeIn">
            <VivaDefensePrep />
          </div>
        )}

      </main>

      {/* Academic Defense Project Footer */}
      <footer className="no-print border-t border-white/10 bg-[#05070a] py-8 px-4 lg:px-8 mt-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-heading font-extrabold text-sm">
              <span className="text-amber-400">KAVAL</span>
              <span>— Last-Mile Disaster Voice Communication & Verification System</span>
            </div>
            <p className="text-slate-500">
              Final Year Capstone Project Defense • Academic Year {projectMeta.academicYear} • {projectMeta.institution}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
            <div>
              <span className="text-slate-500">Candidate:</span>{' '}
              <span className="text-slate-200 font-semibold">{projectMeta.team[0].name}</span>
            </div>
            <div>
              <span className="text-slate-500">Mentor:</span>{' '}
              <span className="text-slate-200 font-semibold">{projectMeta.guide.name}</span>
            </div>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30"
            >
              Evaluation Rubric
            </button>
          </div>
        </div>
      </footer>

      {/* Project Review Dossier Modal */}
      <ProjectDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

    </div>
  );
}
