'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const STEPS = [
    {
        id: 'disconnect',
        title: "1. The Disconnect",
        description: "Begin in our sound-isolated suites. Ambient frequencies lower your heart rate while aromatherapy signals your mind to release the outside world.",
        image: '/sensory_atmosphere_candles_1767825821539.png',
        align: 'center'
    },
    {
        id: 'elixir',
        title: "2. The Elixir",
        description: "Your skin is prepped with our 24k Gold Radiance Serum, infused with rare saffron and peptides to awaken cellular luminosity.",
        image: '/sensory_elixir_serum_1767825839387.png',
        align: 'center'
    },
    {
        id: 'touch',
        title: "3. The Artistry",
        description: "Every brushstroke is deliberate. Our master artists use feather-light techniques to sculpt light and shadow onto your features.",
        image: '/sensory_touch_brush_1767825856305.png',
        align: 'center'
    },
    {
        id: 'reveal',
        title: "4. The Reveal",
        description: "The moment you meet your most radiant self. A transformation that isn't just seen, but felt deeply.",
        image: '/indian_bridal_makeup_closeup_1767824825455.png',
        align: 'center'
    }
];

export default function SensoryJourney() {
    const { content } = useLanguage();
    const { sensoryJourney } = content;

    // Merge localized text with static images
    const activeSteps = sensoryJourney.steps.map(step => {
        const original = STEPS.find(s => s.id === step.id);
        return {
            ...step,
            image: original?.image || STEPS[0].image, // Fallback
            align: original?.align || 'center'
        };
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeStep, setActiveStep] = useState(0);

    // Update active step based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const stepIndex = Math.floor(latest * activeSteps.length);
        // Clamp index to valid range
        const confinedIndex = Math.min(Math.max(stepIndex, 0), activeSteps.length - 1);
        setActiveStep(confinedIndex);
    });

    return (
        <section ref={containerRef} style={{ height: `${activeSteps.length * 100}vh`, position: 'relative' }}>

            {/* BACKGROUND LAYER (Sticky) */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 1 }}>
                {activeSteps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: activeStep === index ? 1 : 0,
                            scale: activeStep === index ? 1 : 1.1
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    >
                        <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                        />
                        {/* Cinematic Overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.4) 50%, rgba(18,18,18,0.2) 100%)' }} />
                    </motion.div>
                ))}
            </div>

            {/* CONTENT LAYER (Scrollable Overlay) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10, pointerEvents: 'none' }}>
                {activeSteps.map((step, index) => (
                    <div
                        key={step.id}
                        style={{
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                textAlign: 'center',
                                maxWidth: '600px',
                                color: '#fff',
                                padding: '40px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '4px'
                            }}
                            className="sensory-text-panel"
                        >
                            <span style={{
                                display: 'block',
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                color: 'var(--color-brand)',
                                marginBottom: '15px'
                            }}>
                                {sensoryJourney.label}
                            </span>
                            <h3 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                marginBottom: '20px',
                                lineHeight: 1.1
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                opacity: 0.9,
                                lineHeight: 1.8,
                                fontFamily: 'var(--font-sans)',
                                color: '#e0e0e0'
                            }}>
                                {step.description}
                            </p>
                        </motion.div>
                    </div>
                ))}
            </div>

        </section>
    );
}
