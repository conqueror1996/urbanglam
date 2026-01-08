'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import {
  Tier, Service, CategoryDetails, MenuServiceItem
} from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import ServiceMenu from '@/components/ServiceMenu';
import VirtualMakeover from '@/components/VirtualMakeover';
import SensoryJourney from '@/components/SensoryJourney';
import BridalShowcase from '@/components/BridalShowcase';
import TransformationGallery from '@/components/TransformationGallery';

export default function Home() {
  const { content } = useLanguage();
  const { auth, dashboard } = content;
  const { TIERS, SERVICES, TIME_SLOTS, TESTIMONIALS, MEMBERSHIPS, EXPERIENCE_STEPS, NOT_FOR_SERVICES, MANIFESTO, TRANSFORMATIONS, SANCTUARY_SPACES, HYGIENE_PROTOCOLS, CONCERNS, ARTISTS, SEASONAL_ADVICE, SALON_MENU } = content.data;

  // SMOOTH SCROLL INIT
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // FLOW STATE
  const [view, setView] = useState<'landing' | 'entry' | 'onboarding' | 'app'>('landing');
  const [inviteCode, setInviteCode] = useState('');
  const [onboardingStep, setOnboardingStep] = useState<'scan' | 'concerns' | 'analyzing'>('scan');
  const [userConcerns, setUserConcerns] = useState<string[]>([]);
  const [userTier, setUserTier] = useState<string>('Sovereign');
  const [scanResults, setScanResults] = useState<any>(null);

  // STATE
  const [activeTier, setActiveTier] = useState<Tier>('Premium');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [recommendedService, setRecommendedService] = useState<Service | null>(null);

  /* AI STATE */
  const [aiStep, setAiStep] = useState<'idle' | 'analyzing' | 'report' | 'passport'>('idle');
  const [aiReportData, setAiReportData] = useState<any>(null);

  /* PARALLAX & SCROLL HOOKS */
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 500], [0, 200]);

  const currentTierData = TIERS[activeTier];

  const handleAIConsultation = () => {
    setAiStep('analyzing');
    setTimeout(() => {
      setAiReportData({
        id: "LUMI-" + Math.floor(1000 + Math.random() * 9000),
        hair: { porosity: "Micro-porous (High)", density: "88% Follicular Coverage", scalpHealth: "Optimal" },
        skin: { texture: "Epidermal Refinement Needed", hydration: "41% (Critical Deficit)", sensitivity: "Low Threshold" },
        recommendation: { tier: "Premium", service: SERVICES[1], product: "Prestige Botanical Infusion" }
      });
      setAiStep('report');
    }, 4500);
  };

  const applyAiRecommendation = () => {
    if (aiReportData) {
      setActiveTier(aiReportData.recommendation.tier);
      setSelectedService(aiReportData.recommendation.service);
      setAiStep('idle');
      setView('app');
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.toUpperCase() === 'URBANGLAM2024') {
      setView('onboarding');
    } else {
      alert("Invalid Access Key. Please contact your concierge.");
    }
  };

  return (
    <main style={{ background: 'var(--bg-body)', minHeight: '100vh' }}>
      <Navbar />

      {/* VIEW ROUTER */}
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection
              onAudit={() => setView('onboarding')}
              onMemberLogin={() => setView('entry')}
            />
            <LandingContent />
          </motion.div>
        )}

        {view === 'entry' && (
          <motion.div key="entry" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '60px', width: '100%', maxWidth: '500px', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, var(--color-brand), transparent)' }}></div>
              <button
                onClick={() => setView('landing')}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.5rem' }}
              >
                &times;
              </button>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '10px', color: '#fff' }}>{auth.title}</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>{auth.subtitle}</p>

              <form onSubmit={handleInviteSubmit} className="flex flex-column gap-2">
                <input
                  autoFocus
                  type="text"
                  placeholder={auth.placeholder}
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', fontSize: '1rem', textAlign: 'center', outline: 'none', letterSpacing: '4px', color: '#fff', borderRadius: '4px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', padding: '15px' }}>{auth.button}</button>
              </form>
              <p style={{ marginTop: '30px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{auth.warning}</p>
            </div>
          </motion.div>
        )}

        {view === 'onboarding' && (
          <OnboardingFlow
            key="onboarding"
            step={onboardingStep}
            setStep={setOnboardingStep}
            userConcerns={userConcerns}
            setUserConcerns={setUserConcerns}
            onComplete={() => setView('app')}
            onExit={() => setView('landing')}
            setScanResults={setScanResults}
            setRecommendedService={setRecommendedService}
          />
        )}

        {view === 'app' && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
              {/* DASHBOARD HEADER */}
              <div className="flex justify-between items-end" style={{ marginBottom: '60px', flexWrap: 'wrap', gap: '30px' }}>
                <div style={{ minWidth: '300px' }}>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '10px' }}>{dashboard.welcome}</h1>
                  <p style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-brand-dark)', fontWeight: 'bold' }}>{dashboard.status}: {userTier}</p>
                </div>
                <div style={{ textAlign: 'left', minWidth: '200px' }}>
                  <div style={{ display: 'inline-block', padding: '15px 30px', border: '1px solid var(--color-brand-dark)', background: 'rgba(255,255,255,0.2)' }}>
                    <span style={{ fontSize: '0.6rem', display: 'block', letterSpacing: '2px', opacity: 0.6 }}>{dashboard.valet}</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>05 / 08</span>
                  </div>
                </div>
              </div>

              {/* DASHBOARD GRID */}
              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '80px' }}>
                {/* 1. STATUS CARD */}
                <div className="glass-panel" style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>{dashboard.nextRitual}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Structural Cut</h4>
                      <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>with <strong>{ARTISTS[0].name}</strong> ({ARTISTS[0].role})</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800' }}>02:14:10</div>
                      <div style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>{dashboard.timeToArrival}</div>
                    </div>
                  </div>
                </div>

                {/* 2. RECOMMENDED RITUAL */}
                <div className="glass-panel" style={{ padding: 'min(40px, 8vw)', border: '5px solid #fff', position: 'relative' }}>
                  <span style={{ background: 'var(--color-brand-dark)', color: '#fff', padding: '5px 15px', fontSize: '0.6rem', letterSpacing: '2px', position: 'absolute', top: 0, right: 0, fontWeight: '900' }}>
                    {dashboard.prescribed}
                  </span>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>
                    {dashboard.suggestion}
                  </h3>
                  <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ width: '100px', height: '100px', background: '#fff', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image
                        src={recommendedService?.image || SERVICES[1].image}
                        alt={recommendedService?.name || SERVICES[1].name}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                        {recommendedService?.name || SERVICES[1].name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px', lineHeight: 1.5 }}>
                        {dashboard.basedOn} ({userConcerns.length > 0 ? userConcerns.slice(0, 2).join(', ') : 'Biometric Audit'}):
                        <br />
                        <strong>{recommendedService ? " Clinical indicators verified." : " Cellular Congestion detected in the T-zone."}</strong>
                        {recommendedService && <span style={{ display: 'block', marginTop: '5px', fontStyle: 'italic' }}>Protocol initialized for immediate remediation.</span>}
                      </p>
                      <button onClick={() => { setSelectedService(recommendedService || SERVICES[1]); setIsBookingModalOpen(true); }} className="btn btn-primary" style={{ padding: '12px 25px', fontSize: '0.7rem', marginTop: '20px', letterSpacing: '2px' }}>
                        {dashboard.scheduleBtn}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. DIGITAL HEALTH PASSPORT */}
                <div className="glass-panel span-2" style={{ padding: 'min(40px, 8vw)' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 'bold' }}>{dashboard.passport}</h3>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost" style={{ padding: '8px 20px', fontSize: '0.6rem' }}>{dashboard.recordsBtn}</button>
                      <button className="btn btn-ghost" style={{ padding: '8px 20px', fontSize: '0.6rem' }}>{dashboard.pdfBtn}</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div style={{ padding: '25px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', border: '1px solid rgba(18,18,18,0.05)' }}>
                      <label style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', marginBottom: '15px' }}>HISTORICAL AUDIT (MAY 2024)</label>
                      <div style={{ position: 'relative', height: '180px', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                        <Image src="/services/haircut.png" alt="Before" fill style={{ objectFit: 'cover', filter: 'grayscale(1)' }} />
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--color-brand-dark)', color: '#fff', fontSize: '0.5rem', padding: '4px 8px' }}>{dashboard.archive}</div>
                      </div>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}><strong>{dashboard.result}</strong> 12.4% increase in epidermal hydration index following the Radiance ritual.</p>
                    </div>
                    <div style={{ padding: '25px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', border: '1px solid rgba(18,18,18,0.05)' }}>
                      <label style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', marginBottom: '15px' }}>{SEASONAL_ADVICE.season.toUpperCase()} INTELLIGENCE</label>
                      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px', border: '1px solid var(--color-brand-light)' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '900', color: '#ad1457', marginBottom: '15px' }}>INDIA REGION: {SEASONAL_ADVICE.season.toUpperCase()}</p>
                        <ul style={{ fontSize: '0.75rem', color: 'var(--text-main)', listStyle: 'none', padding: 0 }}>
                          {SEASONAL_ADVICE.advice.map((a: string, i: number) => (
                            <li key={i} style={{ marginBottom: '12px', paddingLeft: '15px', position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--color-brand-dark)' }}>⋄</span> {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div style={{ padding: '25px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', border: '1px solid rgba(18,18,18,0.05)' }}>
                      <label style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', marginBottom: '15px' }}>{dashboard.compatibility}</label>
                      <ul style={{ fontSize: '0.8rem', listStyle: 'none', lineHeight: 2.8 }}>
                        <li style={{ color: '#2e7d32' }}>✓ Kérastase Specifique (Scalp)</li>
                        <li style={{ color: '#2e7d32' }}>✓ Forest Essentials Soundarya</li>
                        <li style={{ color: '#2e7d32' }}>✓ Dyson Supersonic (Low Heat)</li>
                        <li style={{ color: '#c62828', textDecoration: 'line-through' }}>❌ High-Alcohol Styling Gels</li>
                        <li style={{ color: '#c62828', textDecoration: 'line-through' }}>❌ Sulfated Exfoliants</li>
                      </ul>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '20px', fontStyle: 'italic' }}>*Based on your last biometric scan DNA audit.</p>
                    </div>
                  </div>
                </div>

                {/* 4. CIRCLE ACCESS */}
                <div className="glass-panel span-2" style={{ padding: 'min(40px, 8vw)', background: '#121212', color: '#fff' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
                    <div className="flex items-center gap-2">
                      <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 'bold', color: 'var(--color-brand)' }}>{dashboard.circlePrivilege}</h3>
                      <span style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '100px' }}>ESTABLISHED 2024</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '2px' }}>{dashboard.level} {userTier.toUpperCase()} Member</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 10px', background: '#fff', color: '#000', fontSize: '0.6rem', fontWeight: '900' }}>{dashboard.locked}</div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '15px' }}>{dashboard.upgradeTitle}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.8, marginBottom: '30px', maxWidth: '300px' }}>{dashboard.upgradeDesc}</p>
                      <button className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '12px 25px', fontSize: '0.7rem', letterSpacing: '2px' }}>{dashboard.requestUpgrade}</button>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '20px' }}>{dashboard.conciergeTitle}</h4>
                      <div className="flex flex-column gap-1">
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'var(--color-brand)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>C</div>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '4px', flex: 1, fontSize: '0.85rem', lineHeight: 1.5 }}>
                            "Good morning, Partner. I've reserved your valet for 3:00 PM and pre-selected the 88% Humidity Protocol formulations for your session today."
                          </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                          <input type="text" placeholder={dashboard.chatPlaceholder} style={{ width: '100%', padding: '18px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }} />
                          <button style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-brand)', fontWeight: 'bold', fontSize: '0.8rem' }}>{dashboard.send}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}



      </AnimatePresence>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedService || SERVICES[0]}
        slot={selectedSlot}
        tier={userTier}
      />

    </main>
  );
}

// NEW SUB-COMPONENTS
// NEW SUB-COMPONENTS
function HeroSection({ onAudit, onMemberLogin }: { onAudit: () => void, onMemberLogin: () => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const { content } = useLanguage();
  const { hero } = content;

  return (
    <section className="hero" style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
      <motion.div style={{ y: heroY, position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero/luxury_salon_hero_interior_1767824809254.png"
          alt="UrbanGlam Interior"
          fill
          style={{ objectFit: 'cover', opacity: 0.5, filter: 'contrast(1.1) brightness(0.7)' }}
          priority
        />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          {/* CREDIBILITY MARKER */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', marginBottom: '30px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--color-brand)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-brand)' }} />
            <span style={{ fontSize: '0.65rem', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>{hero.intakeCap}</span>
          </div>

          <h1 className="text-display" style={{ color: '#fff', marginBottom: '30px', maxWidth: '900px', lineHeight: 1.1 }}>
            {hero.titleLine1}<br />
            <span style={{ color: 'var(--color-brand)' }}>{hero.titleLine2}</span>.
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '50px', maxWidth: '550px', lineHeight: 1.6, fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
            {hero.subtitle}
            <span style={{ display: 'block', marginTop: '10px', fontSize: '0.9rem', opacity: 0.6 }}>{hero.meta}</span>
          </p>

          <div className="flex items-center gap-2">
            <button onClick={onAudit} className="btn btn-primary" style={{ background: '#fff', color: '#000', border: 'none', padding: '22px 50px', fontSize: '0.85rem' }}>
              {hero.auditBtn}
            </button>
            <button onClick={onMemberLogin} className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '22px 30px', fontSize: '0.85rem' }}>
              {hero.loginBtn}
            </button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginLeft: '5px' }}>
              {hero.waitlist}
            </span>
          </div>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', right: '40px', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', writingMode: 'vertical-rl' }}>
        {hero.scroll}
      </div>
    </section>
  );
}

function OnboardingFlow({ step, setStep, userConcerns, setUserConcerns, onComplete, onExit, setScanResults, setRecommendedService }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [neuralLogs, setNeuralLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ hydration: 0, radiance: 0, suppleness: 0 });
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // Intelligence Engine
  const { content } = useLanguage();
  const { magicMirror } = content;
  const { SALON_MENU, CONCERNS } = content.data;

  const [targetProfile, setTargetProfile] = useState<any>(null);
  const [detectedSolution, setDetectedSolution] = useState<any>(null);

  // Handle Capture Action
  const handleInitiateScan = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setStep('analyzing');
    }, 1200); // Shutter effect duration
  };

  // CAMERA INTEGRATION: Request access on mount/scan step
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        activeStream = stream;
        setStream(stream);
        setCameraError(false);
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError(true);
      }
    };

    if (step === 'scan' && !stream && !cameraError) {
      startCamera();
    }
  }, [step, stream, cameraError]);

  // ATTACH STREAM: Whenever step changes (DOM updates) or stream is ready
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [step, stream]);

  // CLEANUP: Stop tracks when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Define Clinical Profiles & Solutions
  const CLINICAL_PROFILES = [
    {
      id: 'dehydrated',
      label: 'Epidermal Dehydration',
      targetStats: { hydration: 32, radiance: 65, suppleness: 48 }, // Low hydration
      logs: ["Detecting lipid barrier gaps...", "Moisture retention critical...", "Surface texture: Rough", "Identifying solution: Oxygenation..."],
      solution: "High-Pressure Oxygenation"
    },
    {
      id: 'damage',
      label: 'Cortical Stress',
      targetStats: { hydration: 55, radiance: 40, suppleness: 28 }, // Low suppleness
      logs: ["Keratin bonds compromising...", "Elasticity failure detected...", "Cortex structure: Weak", "Identifying solution: Peptide..."],
      solution: "The 90-Minute Reconstruction"
    },
    {
      id: 'pigment',
      label: 'Melanin Irregularity',
      targetStats: { hydration: 60, radiance: 42, suppleness: 70 }, // Low radiance
      logs: ["Chromophore clusters finding...", "UV damage verified...", "Tone uniformity: Low", "Identifying solution: Correction..."],
      solution: "Melanin Correction System"
    }
  ];

  // Initialize Scan Integration
  useEffect(() => {
    if (step === 'analyzing' && !targetProfile) {
      // Randomly select a profile to simulate "Real" detection
      const profile = CLINICAL_PROFILES[Math.floor(Math.random() * CLINICAL_PROFILES.length)];
      setTargetProfile(profile);

      // Find full service details
      // We look through all categories to find the matching service name
      let foundService = null;
      for (const cat of SALON_MENU) {
        const hit = cat.items.find(i => i.name === profile.solution);
        if (hit) foundService = hit;
      }
      setDetectedSolution(foundService);
    }
  }, [step]);

  // Advanced Real-time Canvas Mesh & Logic
  useEffect(() => {
    if (step === 'analyzing' && targetProfile) {
      let frame: number;
      const ctx = canvasRef.current?.getContext('2d');

      // Animation State
      let currentStats = { hydration: 50, radiance: 50, suppleness: 50 }; // Start neutral

      const animate = () => {
        if (!ctx) return;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);

        const time = Date.now() * 0.002;

        // 1. Draw "Facial Meridian" Mesh Simulation
        ctx.strokeStyle = 'rgba(248, 187, 208, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const y = h * 0.3 + (i * 50);
          ctx.moveTo(w * 0.2, y + Math.sin(time + i) * 10);
          ctx.bezierCurveTo(w * 0.5, y + Math.cos(time + i) * 30, w * 0.8, y - Math.sin(time) * 10, w * 0.8, y);
          ctx.stroke();
        }

        // 2. Focused "Analysis Markers"
        ctx.fillStyle = analyzingProgress > 80 ? '#ef4444' : 'var(--color-brand)'; // Red if finding issues
        for (let j = 0; j < 5; j++) {
          const x = w * 0.3 + (Math.sin(time + j) * 80);
          const y = h * 0.4 + (Math.cos(time * 0.5 + j) * 100);
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Crosshairs
          ctx.strokeStyle = 'rgba(248, 187, 208, 0.2)';
          ctx.beginPath();
          ctx.moveTo(x - 20, y); ctx.lineTo(x + 20, y);
          ctx.moveTo(x, y - 20); ctx.lineTo(x, y + 20);
          ctx.stroke();
        }

        frame = requestAnimationFrame(animate);
      };

      animate();

      const progressInterval = setInterval(() => {
        setAnalyzingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 0.5; // Smooth linear progress
        });
      }, 20); // Slightly faster updates for smoother animation

      // Custom logs based on profile
      const logInterval = setInterval(() => {
        setNeuralLogs(prev => {
          const progressIndex = Math.floor((analyzingProgress / 100) * targetProfile.logs.length);
          const nextLog = targetProfile.logs[progressIndex] || "Calibrating resolution...";

          if (prev[prev.length - 1] === nextLog) return prev;
          return [...prev, nextLog].slice(-4);
        });
      }, 800);

      return () => {
        cancelAnimationFrame(frame);
        clearInterval(progressInterval);
        clearInterval(logInterval);
      };
    }
  }, [step, targetProfile, analyzingProgress]);

  // SMOOTH STAT INTERPOLATION
  useEffect(() => {
    if (step === 'analyzing' && targetProfile) {
      // Linearly interpolate from 50 (neutral) to target
      const progress = analyzingProgress / 100;

      // Easing function for "Doctor" feel (starts slow, speeds up, slows down)
      const ease = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const e = ease(progress);

      setStats({
        hydration: Math.round(50 + (targetProfile.targetStats.hydration - 50) * e),
        radiance: Math.round(50 + (targetProfile.targetStats.radiance - 50) * e),
        suppleness: Math.round(50 + (targetProfile.targetStats.suppleness - 50) * e)
      });
    }
  }, [analyzingProgress, targetProfile, step]);

  // Auto-advance
  useEffect(() => {
    if (analyzingProgress >= 100 && step === 'analyzing') {
      // Wait a bit longer to show the solution before moving ("Real Time" suggestion)
      const timer = setTimeout(() => {
        if (setScanResults) setScanResults(stats); // Pass final stats
        if (setRecommendedService) setRecommendedService(detectedSolution); // Pass recommended service
        setStep('concerns');
      }, 3000); // 3 second delay to read the recommendation
      return () => clearTimeout(timer);
    }
  }, [analyzingProgress, step, stats, detectedSolution]);

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', color: 'var(--text-main)', position: 'fixed', inset: 0, zIndex: 5000, overflow: 'hidden' }}>
      {/* EXIT BUTTON */}
      <button
        onClick={onExit}
        style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 6001, background: 'none', border: 'none', color: 'var(--color-brand)', fontSize: '2rem', cursor: 'pointer', opacity: 0.7 }}
        title="Back to Home"
      >
        &times;
      </button>
      {/* SHUTTER EFFECT */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 6000 }} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'scan' && (
          <motion.div key="scan" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center" style={{ width: '100%', maxWidth: '600px', padding: '0 20px' }}>
            <div style={{ position: 'relative', width: 'min(300px, 80vw)', height: 'min(420px, 110vw)', margin: '0 auto 40px', border: '1px solid var(--color-brand)', borderRadius: '150px 150px 30px 30px', overflow: 'hidden', background: '#fff', boxShadow: '0 30px 100px rgba(248, 187, 208, 0.3)' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
              <div className="ai-grid-overlay" style={{ opacity: 0.4 }} />

              {/* FACE GUIDE */}
              <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(200px, 55vw)', height: 'min(280px, 75vw)', border: '1px dashed var(--color-brand)', borderRadius: '100px 100px 140px 140px', pointerEvents: 'none' }}>
                <span style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--color-brand)', fontWeight: '900', background: '#fff', padding: '2px 10px', whiteSpace: 'nowrap' }}>{magicMirror.alignment}</span>
              </div>

              <div className="scan-line" style={{ background: 'var(--color-brand)', height: '1px', opacity: 0.8 }} />
            </div>

            <div style={{ padding: '0 40px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', letterSpacing: '2px' }}>{magicMirror.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{magicMirror.subtitle}</p>
              <button
                onClick={handleInitiateScan}
                className="btn btn-primary"
                style={{ marginTop: '50px', background: 'var(--color-brand-dark)', color: '#fff', padding: '25px 60px', borderRadius: '100px', fontSize: '0.9rem', letterSpacing: '3px' }}
              >
                {cameraError ? magicMirror.simulateBtn : magicMirror.startBtn}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-column container" style={{ maxWidth: '1200px', padding: '120px 20px 60px', alignItems: 'center', height: '100vh', overflowY: 'auto' }}>
            <div className="flex flex-center" style={{ width: '100%', gap: '60px', flexWrap: 'wrap' }}>
              {/* Left: Feed with Live Overlay */}
              <div style={{ position: 'relative', width: 'min(400px, 90vw)', height: 'min(500px, 120vw)', border: '1px solid var(--color-brand)', borderRadius: '200px 200px 10px 10px', overflow: 'hidden', background: '#fff', boxShadow: '0 50px 150px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', opacity: 0.7, filter: 'sepia(0.2) saturate(1.2)' }} />
                <canvas ref={canvasRef} width={450} height={600} style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

                <div style={{ position: 'absolute', top: '30px', right: '30px', background: 'var(--color-brand-dark)', color: '#fff', padding: '8px 15px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', background: 'var(--color-brand)', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                  LIVE SPECTRUM
                </div>

                <div style={{ position: 'absolute', bottom: '50px', left: '40px', right: '40px', zIndex: 3 }}>
                  <div style={{ height: '4px', width: '100%', background: 'rgba(0,0,0,0.05)', marginBottom: '15px', borderRadius: '10px' }}>
                    <motion.div style={{ height: '100%', background: 'var(--color-brand)', width: `${analyzingProgress}%`, borderRadius: '10px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '2px', fontWeight: '900', color: 'var(--color-brand-dark)', textTransform: 'uppercase' }}>
                      {analyzingProgress < 100 ? magicMirror.calculating : magicMirror.complete}
                    </p>
                    <p style={{ fontSize: '0.65rem', fontWeight: '900' }}>{Math.floor(analyzingProgress)}%</p>
                  </div>
                </div>
              </div>

              {/* Right: Modern Telemetry Grid */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ marginBottom: '50px' }}>
                  <h3 style={{ fontSize: '0.75rem', color: 'var(--color-brand)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: '900' }}>{magicMirror.deepScan}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                    {analyzingProgress < 100 ? magicMirror.scanning : magicMirror.issueFound}
                  </p>
                  {/* SPECIFIC DIAGNOSIS SHOWING "WHAT IS WRONG" */}
                  {analyzingProgress >= 100 && targetProfile && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginTop: '10px' }}>
                      <span style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '4px', letterSpacing: '1px' }}>DETECTED</span>
                      <span style={{ color: '#fff', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', display: 'block', marginTop: '8px' }}>{targetProfile.label}</span>
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '60px' }}>
                  <div style={{ padding: '25px', background: '#fff', border: stats.hydration < 40 ? '1px solid #ef4444' : '1px solid var(--color-brand-light)', borderRadius: '10px' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>{magicMirror.hydration}</label>
                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.hydration}%</div>
                    {stats.hydration < 40 && <span style={{ color: '#ef4444', fontSize: '0.6rem', fontWeight: 'bold' }}>{magicMirror.critical}</span>}
                  </div>
                  <div style={{ padding: '25px', background: '#fff', border: stats.radiance < 50 ? '1px solid #ef4444' : '1px solid var(--color-brand-light)', borderRadius: '10px' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>{magicMirror.radiance}</label>
                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.radiance}<span style={{ fontSize: '1rem', opacity: 0.3 }}>/100</span></div>
                  </div>
                  <div style={{ padding: '25px', background: '#fff', border: stats.suppleness < 40 ? '1px solid #ef4444' : '1px solid var(--color-brand-light)', borderRadius: '10px' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>{magicMirror.elasticity}</label>
                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.suppleness}%</div>
                  </div>

                  {/* DYNAMIC RECOMMENDATION CARD SHOWING "WHAT CAN BE DONE" */}
                  <div style={{ padding: '25px', background: '#0a0a0a', color: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {!detectedSolution || analyzingProgress < 80 ? (
                      <>
                        <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '10px' }}></div>
                        <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{magicMirror.formulating}</span>
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>{magicMirror.recommended}</span>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: 1.2, marginBottom: '8px' }}>{detectedSolution.name}</h4>
                        <p style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: 1.5, marginBottom: '15px' }}>
                          {detectedSolution.description}
                        </p>
                        <div style={{ height: '1px', width: '30px', background: 'var(--color-brand)', margin: '10px 0' }}></div>
                        <span style={{ fontSize: '0.8rem', opacity: 1, fontWeight: 'bold' }}>{detectedSolution.price}</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div style={{ height: '100px', overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-brand-dark)', lineHeight: 2, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'monospace' }}>
                    {neuralLogs.map((log: string, i: number) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <span style={{ color: 'var(--color-brand)', marginRight: '15px' }}>{'>'}</span> {log}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'concerns' && (
          <motion.div key="concerns" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container" style={{ maxWidth: '950px' }}>
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.2rem', marginBottom: '15px' }}>{magicMirror.designTransform}</h2>
              <p style={{ color: 'var(--text-muted)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '900' }}>{magicMirror.customizing}</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {CONCERNS.map((c) => {
                const isSelected = userConcerns.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      // @ts-ignore
                      if (isSelected) setUserConcerns(prev => prev.filter(id => id !== c.id));
                      // @ts-ignore
                      else setUserConcerns(prev => [...prev, c.id]);
                    }}
                    style={{
                      padding: '30px',
                      background: isSelected ? 'var(--color-brand-dark)' : '#fff', // Changed default bg to white for better visibility
                      border: isSelected ? '1px solid var(--color-brand)' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      color: isSelected ? '#fff' : 'var(--text-main)',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>{c.icon}</span>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>{c.type}</div>
                    <div style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>{c.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="text-center" style={{ marginTop: '60px' }}>
              <button
                onClick={onComplete}
                disabled={userConcerns.length === 0}
                className="btn btn-primary"
                style={{
                  opacity: userConcerns.length > 0 ? 1 : 0.5,
                  background: 'var(--color-brand-dark)',
                  color: '#fff',
                  padding: '20px 60px',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  letterSpacing: '3px',
                  cursor: userConcerns.length > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                {magicMirror.initiate}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SUB COMPONENTS
function LandingContent() {
  const { content } = useLanguage();
  const { landing } = content;
  const { NOT_FOR_SERVICES, TESTIMONIALS } = content.data;

  return (
    <>
      {/* 0. FILTER: WHO THIS IS NOT FOR */}
      <section style={{ background: '#111', padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '2rem', marginBottom: '20px' }}>{landing.exclusionTitle}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{landing.exclusionDesc}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {NOT_FOR_SERVICES.map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ color: 'var(--color-brand)', fontSize: '1rem', lineHeight: 1 }}>×</span>
                  <p style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1.4 }}>{text.replace('We do not', 'No')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1. MANIFESTO SECTION - DARK (Moved Up for Authority) */}
      <section id="manifesto" className="section-padding bg-dark" style={{ position: 'relative', padding: '140px 0' }}>
        <div className="container text-center">
          <span style={{ color: 'var(--color-brand)', letterSpacing: '4px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '30px' }}>
            {landing.philosophy}
          </span>
          <blockquote style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontFamily: 'var(--font-serif)', lineHeight: 1.3, maxWidth: '1000px', margin: '0 auto 60px', color: '#fff' }} dangerouslySetInnerHTML={{ __html: landing.philosophyQuote }} />
          <div style={{ height: '60px', width: '1px', background: 'var(--color-brand)', margin: '0 auto' }}></div>
        </div>
      </section>

      {/* 2. THE RITUAL (SensoryJourney) */}
      <section id="experience" className="section-padding" style={{ background: '#fff', padding: '0 0 100px 0' }}>
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <SectionHeader title={landing.protocol} subtitle={landing.act1} />
        </div>
        <div style={{ marginBottom: '120px' }}>
          <SensoryJourney />
        </div>
      </section>

      {/* 3. CURATED RITUALS (Service Menu) */}
      <div id="services" style={{ background: 'var(--bg-body)', padding: '100px 0' }}>
        <div className="container">
          <ServiceMenu />
        </div>
      </div>

      {/* 4. ACT II: CLINICAL EVIDENCE */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="container">
          <SectionHeader title={landing.verification} subtitle={landing.act2} />

          <div className="grid grid-cols-3 gap-2" style={{ marginTop: '60px', marginBottom: '100px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="metric-card" style={{ border: 'none', background: 'var(--bg-body)', padding: '50px 40px' }}>
                <div className="metric-label" style={{ marginBottom: '10px', color: 'var(--color-brand)' }}>{t.role}</div>
                <div className="metric-value" style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', lineHeight: 1.4, color: '#000' }}>{t.text.split(':')[0]}</div>
                <p style={{ fontSize: '0.8rem', marginTop: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.text.split(':')[1]}</p>
              </div>
            ))}
          </div>

          <TransformationGallery />
        </div>
      </section>

      {/* ACT III: THE SIMULATION */}
      <VirtualMakeover />

      {/* ACT IV: THE COLLECTION */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="container">
          <SectionHeader title={landing.bridal} subtitle={landing.act4} />
          <BridalShowcase />
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="section-padding bg-dark" style={{ padding: '140px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: '40px' }}>{content.finalCta.title}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 50px', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
            {content.finalCta.desc}
          </p>
          <button className="btn btn-primary" style={{ background: '#fff', color: '#000', padding: '25px 60px' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {content.finalCta.button}
          </button>
        </div>
      </section>
    </>
  );
}

function BookingModal({ isOpen, onClose, service, slot, tier }: any) {
  const { content } = useLanguage();
  const { booking } = content;
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(18,18,18,0.9)', backdropFilter: 'blur(15px)' }} />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ background: 'var(--bg-body)', padding: 'min(80px, 10vw)', width: '100%', maxWidth: '700px', position: 'relative', border: '1px solid var(--color-brand-dark)', borderRadius: '0', maxHeight: '95vh', overflowY: 'auto' }}>
        {!submitted ? (
          <>
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1.5rem', color: 'var(--color-brand-dark)', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '10px' }}>{booking.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px' }}>{service?.name} | {tier} | {slot}</p>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-column" style={{ gap: '30px' }}>
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>{booking.legalName}</label>
                <input required type="text" placeholder="Johnathan Doe" style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
              </div>
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>{booking.contact}</label>
                <input required type="tel" placeholder="+91 00000 00000" style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
              </div>

              {/* MICRO-FRICTION QUESTIONS */}
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>{booking.concern}</label>
                <select style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <option>{booking.selectObjective}</option>
                  <option>Follicular Reconstruction</option>
                  <option>Epidermal Resurfacing</option>
                  <option>Event Metamorphosis</option>
                </select>
              </div>
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>{booking.referral}</label>
                <input type="text" placeholder="Name of referral member (Optional)" style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
              </div>

              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{booking.disclaimer}</p>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '25px', letterSpacing: '5px' }}>{booking.submitButton}</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="success-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '20px' }}>{booking.successTitle}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              {booking.successMsg}
            </p>
            <button onClick={onClose} className="btn btn-primary">{booking.returnButton}</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="text-center" style={{ marginBottom: '100px' }}>
      <p style={{ color: 'var(--color-brand-dark)', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.7rem', marginBottom: '20px', fontWeight: '900' }}>{subtitle}</p>
      <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', letterSpacing: '-1px' }}>{title}</h2>
    </div>
  );
}


