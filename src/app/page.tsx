'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import {
  TIERS, SERVICES, TIME_SLOTS, TESTIMONIALS, MEMBERSHIPS,
  EXPERIENCE_STEPS, NOT_FOR_SERVICES, MANIFESTO, TRANSFORMATIONS,
  SANCTUARY_SPACES, HYGIENE_PROTOCOLS, CONCERNS, ARTISTS, SEASONAL_ADVICE,
  Tier, Service, CategoryDetails
} from '@/data/mockData';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

export default function Home() {
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
            <HeroSection onBegin={() => setView('entry')} />
            <LandingContent />
          </motion.div>
        )}

        {view === 'entry' && (
          <motion.div key="entry" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '80px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '40px' }}>Exclusive Access</h2>
              <form onSubmit={handleInviteSubmit} className="flex flex-column gap-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="ENTER ACCESS KEY"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--color-brand-dark)', padding: '20px', fontSize: '1.2rem', textAlign: 'center', outline: 'none', letterSpacing: '4px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Validate Key</button>
              </form>
              <p style={{ marginTop: '40px', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>FOR ASSISTANCE, CONTACT YOUR DESIGNATED CONCIERGE.</p>
            </div>
          </motion.div>
        )}

        {view === 'onboarding' && (
          <OnboardingFlow
            step={onboardingStep}
            setStep={setOnboardingStep}
            userConcerns={userConcerns}
            setUserConcerns={setUserConcerns}
            onComplete={() => setView('app')}
          />
        )}

        {view === 'app' && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
              {/* DASHBOARD HEADER */}
              <div className="flex justify-between items-end" style={{ marginBottom: '60px', flexWrap: 'wrap', gap: '30px' }}>
                <div style={{ minWidth: '300px' }}>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '10px' }}>Welcome back, Partner</h1>
                  <p style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-brand-dark)', fontWeight: 'bold' }}>Status: {userTier} Level Member</p>
                </div>
                <div style={{ textAlign: 'left', minWidth: '200px' }}>
                  <div style={{ display: 'inline-block', padding: '15px 30px', border: '1px solid var(--color-brand-dark)', background: 'rgba(255,255,255,0.2)' }}>
                    <span style={{ fontSize: '0.6rem', display: 'block', letterSpacing: '2px', opacity: 0.6 }}>VALET SUITE OCCUPANCY</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>05 / 08</span>
                  </div>
                </div>
              </div>

              {/* DASHBOARD GRID */}
              <div className="grid grid-cols-2 gap-2">
                {/* 1. STATUS CARD */}
                <div className="glass-panel" style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>Next Ritual</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Structural Cut</h4>
                      <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>with <strong>{ARTISTS[0].name}</strong> ({ARTISTS[0].role})</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800' }}>02:14:10</div>
                      <div style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>TIME TO ARRIVAL</div>
                    </div>
                  </div>
                </div>

                {/* 2. RECOMMENDED RITUAL */}
                <div className="glass-panel" style={{ padding: 'min(40px, 8vw)', border: '5px solid #fff', position: 'relative' }}>
                  <span style={{ background: 'var(--color-brand-dark)', color: '#fff', padding: '5px 15px', fontSize: '0.6rem', letterSpacing: '2px', position: 'absolute', top: 0, right: 0, fontWeight: '900' }}>PRESCRIBED FOR YOU</span>
                  <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>Intelligence Suggestion</h3>
                  <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ width: '100px', height: '100px', background: '#fff', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={SERVICES[1].image} alt={SERVICES[1].name} width={100} height={100} style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>{SERVICES[1].name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px', lineHeight: 1.5 }}>
                        Based on your clinical concerns ({userConcerns.slice(0, 2).join(', ')}):
                        <strong> Cellular Congestion</strong> detected in the T-zone.
                      </p>
                      <button onClick={() => setIsBookingModalOpen(true)} className="btn btn-primary" style={{ padding: '12px 25px', fontSize: '0.7rem', marginTop: '20px', letterSpacing: '2px' }}>Schedule Prescribed Ritual</button>
                    </div>
                  </div>
                </div>

                {/* 3. DIGITAL HEALTH PASSPORT */}
                <div className="glass-panel span-2" style={{ padding: 'min(40px, 8vw)' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 'bold' }}>Digital Health Passport</h3>
                    <div className="flex gap-2">
                      <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.6rem' }}>View Clinical Records</button>
                      <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.6rem' }}>Download PDF</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div style={{ padding: '25px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', border: '1px solid rgba(18,18,18,0.05)' }}>
                      <label style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', marginBottom: '15px' }}>HISTORICAL AUDIT (MAY 2024)</label>
                      <div style={{ position: 'relative', height: '180px', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                        <Image src="/services/haircut.png" alt="Before" fill style={{ objectFit: 'cover', filter: 'grayscale(1)' }} />
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--color-brand-dark)', color: '#fff', fontSize: '0.5rem', padding: '4px 8px' }}>ARCHIVE</div>
                      </div>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}><strong>Result:</strong> 12.4% increase in epidermal hydration index following the Radiance ritual.</p>
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
                      <label style={{ fontSize: '0.6rem', opacity: 0.6, display: 'block', marginBottom: '15px' }}>CURATED COMPATIBILITY</label>
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
                      <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 'bold', color: 'var(--color-brand)' }}>The Circle Privilege</h3>
                      <span style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '100px' }}>ESTABLISHED 2024</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '2px' }}>LEVEL: {userTier.toUpperCase()} Member</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 10px', background: '#fff', color: '#000', fontSize: '0.6rem', fontWeight: '900' }}>LOCKED</div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '15px' }}>Isolation Suite Upgrade</h4>
                      <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.8, marginBottom: '30px', maxWidth: '300px' }}>Unlock the glass-morph sensory isolation unit for your next ritual. Sovereign tier required.</p>
                      <button className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff', padding: '12px 25px', fontSize: '0.7rem', letterSpacing: '2px' }}>Request Tier Elevation</button>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '40px' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '20px' }}>Concierge Personal Chat</h4>
                      <div className="flex flex-column gap-1">
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'var(--color-brand)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>C</div>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '4px', flex: 1, fontSize: '0.85rem', lineHeight: 1.5 }}>
                            "Good morning, Partner. I've reserved your valet for 3:00 PM and pre-selected the 88% Humidity Protocol formulations for your session today."
                          </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                          <input type="text" placeholder="Direct request to your concierge..." style={{ width: '100%', padding: '18px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', outline: 'none', fontSize: '0.85rem' }} />
                          <button style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-brand)', fontWeight: 'bold', fontSize: '0.8rem' }}>SEND</button>
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
function HeroSection({ onBegin }: { onBegin: () => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="hero" style={{ height: '110vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-body)' }}>
      <motion.div style={{ y: heroY, position: 'absolute', inset: -20, zIndex: 0 }}>
        <Image src="/hero/pink_salon.png" alt="UrbanGlam" fill style={{ objectFit: 'cover', opacity: 0.7, mixBlendMode: 'multiply' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg-body))' }} />
      </motion.div>

      <motion.div style={{ y: textY, position: 'relative', zIndex: 2, height: '100%', paddingBottom: '100px' }} className="container text-center flex flex-column flex-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} style={{ letterSpacing: '12px', fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--color-brand-dark)', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 900 }}>UrbanGlam</motion.h1>
        <motion.p style={{ fontSize: '1rem', color: 'var(--color-brand-dark)', marginBottom: '30px', letterSpacing: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Sovereign Beauty Vault</motion.p>
        <motion.h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '30px', maxWidth: '700px', lineHeight: 1.6 }}>India’s most restricted <span style={{ fontStyle: 'italic' }}>biometric</span> precision lounge.</motion.h3>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-brand-dark)', marginBottom: '40px' }} />
        <motion.div className="flex flex-center" style={{ gap: '30px' }}>
          <button onClick={onBegin} className="btn btn-primary">Enter the Vault</button>
          <a href="#manifesto" className="btn btn-outline" style={{ border: 'none', borderBottom: '1px solid var(--color-brand-dark)', borderRadius: '0', padding: '10px 0' }}>The Manifesto</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function OnboardingFlow({ step, setStep, userConcerns, setUserConcerns, onComplete, setScanResults }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [neuralLogs, setNeuralLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ hydration: 0, radiance: 0, suppleness: 0 });
  const [isCapturing, setIsCapturing] = useState(false);

  // Beauty Algorithm Logs
  const logSequence = [
    "Mirror Link Established: 4K Spectral",
    "Identifying Facial Meridian Points...",
    "Scanning Epidermal Reflectance...",
    "Calibration: Rose-Gold Serum Path",
    "Measuring Translucent Depth Index...",
    "Detected Area: T-Zone Sensitivity High",
    "Bespoke Framework Finalized."
  ];

  useEffect(() => {
    if (step === 'scan' || step === 'analyzing') {
      const startCamera = async () => {
        try {
          const s = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: 1280, height: 720 }
          });
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        } catch (err) {
          console.error("Camera access denied", err);
        }
      };
      startCamera();
    } else {
      stream?.getTracks().forEach(track => track.stop());
    }
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [step]);

  // Handle Capture Action
  const handleInitiateScan = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setStep('analyzing');
    }, 1200); // Shutter effect duration
  };

  // Advanced Real-time Canvas Mesh & Logic
  useEffect(() => {
    if (step === 'analyzing') {
      let frame: number;
      const ctx = canvasRef.current?.getContext('2d');

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
        }
        ctx.stroke();

        // 2. Focused "Analysis Markers"
        ctx.fillStyle = 'var(--color-brand)';
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

        // 3. Update stats with "Jitter" to feel live
        setStats({
          hydration: Math.floor(42 + Math.random() * 5),
          radiance: Math.floor(88 + Math.random() * 4),
          suppleness: Math.floor(74 + Math.random() * 6)
        });

        frame = requestAnimationFrame(animate);
      };

      animate();

      const progressInterval = setInterval(() => {
        setAnalyzingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            const finalResults = { hydration: 44, radiance: 91, suppleness: 76 };
            setScanResults(finalResults);
            setTimeout(() => setStep('concerns'), 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 60);

      const logInterval = setInterval(() => {
        setNeuralLogs(prev => {
          const nextLog = logSequence[prev.length];
          if (nextLog) return [...prev, nextLog].slice(-5);
          return prev;
        });
      }, 700);

      return () => {
        cancelAnimationFrame(frame);
        clearInterval(progressInterval);
        clearInterval(logInterval);
      };
    }
  }, [step]);

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', color: 'var(--text-main)', position: 'fixed', inset: 0, zIndex: 5000, overflow: 'hidden' }}>
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
                <span style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--color-brand)', fontWeight: '900', background: '#fff', padding: '2px 10px', whiteSpace: 'nowrap' }}>ALIGNMENT REQUIRED</span>
              </div>

              <div className="scan-line" style={{ background: 'var(--color-brand)', height: '1px', opacity: 0.8 }} />
            </div>

            <div style={{ padding: '0 40px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', letterSpacing: '2px' }}>Magic Mirror</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>4K Spectral Beauty Audit Active</p>
              <button
                onClick={handleInitiateScan}
                className="btn btn-primary"
                style={{ marginTop: '50px', background: 'var(--color-brand-dark)', color: '#fff', padding: '25px 60px', borderRadius: '100px', fontSize: '0.9rem', letterSpacing: '3px' }}
              >
                Capture My Radiance
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
                    <p style={{ fontSize: '0.65rem', letterSpacing: '2px', fontWeight: '900', color: 'var(--color-brand-dark)', textTransform: 'uppercase' }}>Synchronizing...</p>
                    <p style={{ fontSize: '0.65rem', fontWeight: '900' }}>{analyzingProgress}%</p>
                  </div>
                </div>
              </div>

              {/* Right: Modern Telemetry Grid */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ marginBottom: '50px' }}>
                  <h3 style={{ fontSize: '0.75rem', color: 'var(--color-brand)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: '900' }}>Deep Scan Analytics</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Identifying epidermal imbalances and luminosity potential.</p>
                </div>

                <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '60px' }}>
                  <div style={{ padding: '35px', background: '#fff', border: '1px solid var(--color-brand-light)', borderRadius: '10px', boxShadow: '0 5px 15px rgba(248, 187, 208, 0.1)' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>LUMINOUS HYDRATION</label>
                    <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.hydration}%</div>
                    <div style={{ height: '2px', width: '40px', background: 'var(--color-brand)', marginTop: '15px' }} />
                  </div>
                  <div style={{ padding: '35px', background: '#fff', border: '1px solid var(--color-brand-light)', borderRadius: '10px', boxShadow: '0 5px 15px rgba(248, 187, 208, 0.1)' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>RADIANCE INDEX</label>
                    <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.radiance}<span style={{ fontSize: '1rem', opacity: 0.3 }}>/100</span></div>
                    <div style={{ height: '2px', width: '40px', background: 'var(--color-brand)', marginTop: '15px' }} />
                  </div>
                  <div style={{ padding: '35px', background: '#fff', border: '1px solid var(--color-brand-light)', borderRadius: '10px', boxShadow: '0 5px 15px rgba(248, 187, 208, 0.1)' }}>
                    <label style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', fontWeight: '900', display: 'block', marginBottom: '12px', letterSpacing: '2px', opacity: 0.5 }}>ELASTICITY CORE</label>
                    <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)' }}>{stats.suppleness}%</div>
                    <div style={{ height: '2px', width: '40px', background: 'var(--color-brand)', marginTop: '15px' }} />
                  </div>
                  <div style={{ padding: '35px', background: '#fff', border: '1px solid var(--color-brand-light)', borderRadius: '10px', boxShadow: '0 5px 15px rgba(248, 187, 208, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontSize: '0.7rem', lineHeight: 1.6, fontWeight: '700', color: 'var(--color-brand-dark)', letterSpacing: '1px' }}>
                      "Molecular structure indicates high responsiveness to Radiance rituals."
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--color-brand-dark)', lineHeight: 2.5, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {neuralLogs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                      <span style={{ color: 'var(--color-brand)', marginRight: '15px' }}>●</span> {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'concerns' && (
          <motion.div key="concerns" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container" style={{ maxWidth: '950px' }}>
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.2rem', marginBottom: '15px' }}>Design Your Transformation</h2>
              <p style={{ color: 'var(--text-muted)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '900' }}>Customizing your unique beauty architecture</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {CONCERNS.map((c: any) => (
                <div
                  key={c.id}
                  onClick={() => setUserConcerns((prev: string[]) => prev.includes(c.label) ? prev.filter(x => x !== c.label) : [...prev, c.label])}
                  style={{
                    padding: '50px 30px', textAlign: 'center', cursor: 'pointer',
                    border: userConcerns.includes(c.label) ? '1px solid var(--color-brand)' : '1px solid var(--color-brand-light)',
                    background: userConcerns.includes(c.label) ? 'rgba(248, 187, 208, 0.08)' : '#fff',
                    transition: '0.4s var(--ease-out-expo)',
                    borderRadius: '8px',
                    boxShadow: userConcerns.includes(c.label) ? '0 20px 40px rgba(248, 187, 208, 0.2)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '25px' }}>{c.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '3px' }}>{c.label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              disabled={userConcerns.length === 0}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '60px', background: 'var(--color-brand-dark)', color: '#fff', padding: '30px', fontSize: '1rem', letterSpacing: '6px', borderRadius: '10px' }}
            >
              INITIALIZE MY VAULT
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SUB COMPONENTS
function LandingContent() {
  return (
    <>
      <section id="manifesto" className="section-padding" style={{ background: '#fff' }}>
        <div className="container text-center">
          <SectionHeader title="The Standards" subtitle="Manifesto" />
          <blockquote className="manifesto-text" style={{ maxWidth: '900px', margin: '0 auto' }}>
            "{MANIFESTO.quote}"
          </blockquote>
          <p style={{ marginTop: '40px', color: 'var(--text-muted)' }}>{MANIFESTO.standard}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeader title="The Isolation" subtitle="Strict Exclusions" />
          <div className="grid grid-cols-2 gap-1" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {NOT_FOR_SERVICES.map((text, i) => (
              <div key={i} className="filter-card">
                <span className="filter-marker" />
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BookingModal({ isOpen, onClose, service, slot, tier }: any) {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(18,18,18,0.9)', backdropFilter: 'blur(15px)' }} />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ background: 'var(--bg-body)', padding: 'min(80px, 10vw)', width: '100%', maxWidth: '700px', position: 'relative', border: '1px solid var(--color-brand-dark)', borderRadius: '0', maxHeight: '95vh', overflowY: 'auto' }}>
        {!submitted ? (
          <>
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1.5rem', color: 'var(--color-brand-dark)', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '10px' }}>Access Petition</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px' }}>{service?.name} | {tier} | {slot}</p>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-column" style={{ gap: '30px' }}>
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>LEGAL NAME</label>
                <input required type="text" placeholder="Johnathan Doe" style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
              </div>
              <div className="flex flex-column" style={{ gap: '10px' }}>
                <label style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--color-brand-dark)', letterSpacing: '2px' }}>SECURE CONTACT</label>
                <input required type="tel" placeholder="+91 00000 00000" style={{ width: '100%', padding: '15px 0', border: 'none', borderBottom: '1px solid rgba(18,18,18,0.1)', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>By petitioning, you agree to a biometric identity verification and adhere to our uncompromised sanitation protocols.</p>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '25px', letterSpacing: '5px' }}>Lodge Access Petition</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="success-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '20px' }}>Petition Received</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              Your request has been securely lodged. Our Artist-in-Chief will review your diagnostic profile and contact you within 4 hours to confirm your sanctuary window.
            </p>
            <button onClick={onClose} className="btn btn-primary">Return to Collection</button>
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

function ServiceCard({ service, index, currentTierData, onClick, isSelected }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} onClick={onClick} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: index * 0.1 }}
      style={{ cursor: 'pointer', border: isSelected ? '1px solid var(--color-brand-dark)' : '1px solid rgba(18,18,18,0.05)', background: 'transparent', position: 'relative' }}>
      <div style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
        <Image src={service.image} alt={service.name} fill style={{ objectFit: 'cover', filter: 'grayscale(0.2)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'rgba(252, 228, 236, 0.95)' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '15px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '2px' }}>{service.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.8 }}>{service.description.substring(0, 120)}...</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(18,18,18,0.05)' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-brand-dark)', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '2px' }}>Audit Start</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{(service.basePrice * currentTierData.priceMultiplier).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
