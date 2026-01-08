import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// MOCK DATA: OPERATIONAL RELIABILITY PROTOCOL
const TIMELINE = [
    {
        id: 'audit',
        image: '/sensory_atmosphere_candles_1767825821539.png',
    },
    {
        id: 'correction',
        image: '/sensory_elixir_serum_1767825839387.png',
    },
    {
        id: 'simulation',
        image: '/fair_engagement_makeup_1767825561380.png',
    },
    {
        id: 'execution',
        image: '/indian_bridal_makeup_closeup_1767824825455.png',
    }
];

export default function BridalShowcase() {
    const { content } = useLanguage();
    const { bridal } = content;

    const activeTimeline = bridal.timeline.map(t => {
        const original = TIMELINE.find(o => o.id === t.id);
        return { ...t, image: original?.image || '' };
    });

    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    const [activeStage, setActiveStage] = useState(0);

    return (
        <section ref={containerRef} className="section-padding" style={{ background: '#0a0a0a', color: '#fff', position: 'relative', overflow: 'hidden' }}>

            {/* BACKGROUND ACCENTS (Animated) */}
            <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(163, 21, 56, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div className="container">

                {/* CLINICAL HEADER */}
                <div style={{ textAlign: 'center', marginBottom: '100px', position: 'relative', zIndex: 2 }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={{ display: 'inline-block', border: '1px solid #d4a373', padding: '10px 20px', fontSize: '0.7rem', color: '#d4a373', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '30px', fontWeight: 700 }}
                    >
                        {bridal.zeroFailure}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '20px', background: 'linear-gradient(to right, #fff, #d4a373)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        {bridal.sovereignEvent}
                    </motion.h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: '#ccc', lineHeight: 1.6, fontFamily: 'var(--font-heading)' }}>
                        <span style={{ color: '#fff', fontWeight: 700 }}>{bridal.visibilityRisk}</span><br />
                        {bridal.riskMitigation}
                    </p>
                </div>

                {/* INTERACTIVE TIMELINE */}
                <div className="grid grid-cols-2 gap-4" style={{ alignItems: 'flex-start' }}>

                    {/* LEFT: NAVIGATOR (Sticky Desktop) */}
                    <div className="bridal-nav-desktop" style={{ position: 'sticky', top: '150px' }}>
                        {activeTimeline.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveStage(index)}
                                style={{
                                    marginBottom: '40px',
                                    cursor: 'pointer',
                                    opacity: activeStage === index ? 1 : 0.3,
                                    transition: 'opacity 0.3s'
                                }}
                            >
                                <span style={{ display: 'block', fontSize: '0.65rem', color: '#d4a373', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px', fontWeight: 700 }}>
                                    {item.time}
                                </span>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff' }}>
                                    {item.title}
                                </h3>
                                <div style={{
                                    height: '2px',
                                    width: activeStage === index ? '100px' : '0px',
                                    background: '#d4a373',
                                    marginTop: '15px',
                                    transition: 'width 0.4s ease'
                                }} />
                            </div>
                        ))}

                        <button className="btn btn-ghost" style={{ marginTop: '40px', borderColor: 'rgba(212, 163, 115, 0.5)', color: '#d4a373', letterSpacing: '2px', fontSize: '0.8rem', padding: '15px 30px' }}>
                            {bridal.requestClearance}
                        </button>
                    </div>

                    {/* MOBILE NAV (Horizontal Scroll) */}
                    <div className="bridal-nav-mobile" style={{ display: 'none' }}>
                        {activeTimeline.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveStage(index)}
                                style={{
                                    padding: '10px 20px',
                                    background: activeStage === index ? '#d4a373' : 'rgba(255,255,255,0.1)',
                                    color: activeStage === index ? '#000' : '#fff',
                                    border: 'none',
                                    borderRadius: '100px',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                {item.phase.replace('Phase ', '')}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT: VISUALIZER */}
                    <div style={{ position: 'relative', height: '700px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStage}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                style={{ position: 'relative', width: '100%', height: '100%' }}
                            >
                                {/* Main Image Card */}
                                <div style={{ position: 'relative', height: '85%', width: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Image
                                        src={activeTimeline[activeStage].image}
                                        alt={activeTimeline[activeStage].title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />

                                    {/* Floating Info */}
                                    <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                                        <h4 style={{ color: '#d4a373', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>{activeTimeline[activeStage].phase}</h4>
                                        <p style={{ color: '#ddd', fontSize: '1rem', lineHeight: 1.6 }}>{activeTimeline[activeStage].desc}</p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {activeTimeline[activeStage].tags.map(tag => (
                                        <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px', fontSize: '0.65rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
