import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Keep assets static as paths don't change
const MODEL_ASSETS: Record<string, string> = {
    'fair': '/fair_complexion_makeup_model_1767825107731.png',
    'wheatish': '/glamour_party_makeup_model_1767824844945.png',
    'deep': '/deep_complexion_makeup_model_1767825091185.png'
};

const LOOK_ASSETS: Record<string, Record<string, string>> = {
    'natural': {
        'fair': '/fair_natural_makeup_1767825481909.png',
        'wheatish': '/natural_radiance_makeup_look_1767825299033.png',
        'deep': '/deep_natural_makeup_1767825504448.png'
    },
    'bridal': {
        'fair': '/fair_complexion_makeup_model_1767825107731.png',
        'wheatish': '/indian_bridal_makeup_closeup_1767824825455.png',
        'deep': '/deep_complexion_makeup_model_1767825091185.png'
    },
    'party': {
        'fair': '/fair_party_makeup_1767825522814.png',
        'wheatish': '/glamour_party_makeup_model_1767824844945.png',
        'deep': '/deep_party_makeup_1767825546172.png'
    },
    'engagement': {
        'fair': '/fair_engagement_makeup_1767825561380.png',
        'wheatish': '/soft_engagement_makeup_look_1767825316126.png',
        'deep': '/deep_engagement_makeup_1767825576302.png'
    }
};

export default function VirtualMakeover() {
    const { content } = useLanguage();
    const { virtualMakeover } = content;

    // Construct Localized Data
    const models = useMemo(() => [
        { id: 'fair', name: virtualMakeover.models.fair, image: MODEL_ASSETS['fair'] },
        { id: 'wheatish', name: virtualMakeover.models.wheatish, image: MODEL_ASSETS['wheatish'] },
        { id: 'deep', name: virtualMakeover.models.deep, image: MODEL_ASSETS['deep'] }
    ], [virtualMakeover]);

    const looks = useMemo(() => [
        { id: 'natural', ...virtualMakeover.looks.natural },
        { id: 'bridal', ...virtualMakeover.looks.bridal },
        { id: 'party', ...virtualMakeover.looks.party },
        { id: 'engagement', ...virtualMakeover.looks.engagement }
    ], [virtualMakeover]);

    const [selectedModel, setSelectedModel] = useState(models[1]);
    const [selectedLook, setSelectedLook] = useState(looks[0]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    // Dynamic Metrics
    const [metrics, setMetrics] = useState({ luminosity: 0, symmetry: 'Analyzing...' });

    // Update selection when language changes (names need to update)
    useEffect(() => {
        setSelectedModel(prev => models.find(m => m.id === prev.id) || models[0]);
        setSelectedLook(prev => looks.find(l => l.id === prev.id) || looks[0]);
    }, [models, looks]);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Dynamic Display Image
    const getDisplayImage = () => {
        const specificAsset = LOOK_ASSETS[selectedLook.id]?.[selectedModel.id];
        if (specificAsset) return specificAsset;
        return selectedModel.image;
    };

    const currentImage = getDisplayImage();

    // TRIGGER SCAN ON LOOK CHANGE & CALCULATE METRICS
    useEffect(() => {
        setIsScanning(true);
        setScanProgress(0);

        // Reset metrics
        setMetrics({ luminosity: 0, symmetry: '...' });

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    // Generate pseudo-random metrics based on look
                    const baseLum = selectedLook.id === 'natural' ? 50 : selectedLook.id === 'bridal' ? 40 : 30;
                    const randomLum = Math.floor(Math.random() * 20) + baseLum;
                    setMetrics({
                        luminosity: randomLum,
                        symmetry: 'Optimal'
                    });
                    return 100;
                }
                return prev + 2; // Slower scan for effect
            });
        }, 30);
        return () => clearInterval(interval);
    }, [selectedLook, selectedModel]);

    // SCANNING ANIMATION LOOP
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        let frame = 0;
        let animationFrameId: number;

        // Random landmarks for effect
        const randomPoints = Array.from({ length: 6 }).map(() => ({
            xOffset: (Math.random() - 0.5) * 150,
            yOffset: (Math.random() - 0.5) * 200,
            pulseSpeed: 0.05 + Math.random() * 0.05
        }));

        const animate = () => {
            const w = ctx.canvas.width;
            const h = ctx.canvas.height;
            ctx.clearRect(0, 0, w, h);

            // 1. Scanning Plane
            const scanY = (frame * 2) % (h + 200);
            const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
            gradient.addColorStop(0, 'rgba(212, 163, 115, 0)');
            gradient.addColorStop(0.5, 'rgba(212, 163, 115, 0.4)');
            gradient.addColorStop(1, 'rgba(212, 163, 115, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 50, w, 100);

            // 2. Facial Topography Curves
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            const centerX = w / 2;
            const centerY = h / 2;

            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const yOffset = Math.sin((frame * 0.02) + i) * 15;
                const yBase = centerY + (i - 3) * 35;
                ctx.moveTo(centerX - 120, yBase + yOffset);
                ctx.bezierCurveTo(
                    centerX - 40, yBase - 25 + yOffset,
                    centerX + 40, yBase + 25 + yOffset,
                    centerX + 120, yBase + yOffset
                );
            }
            ctx.stroke();

            // 3. Dynamic Nodes
            randomPoints.forEach((pt, i) => {
                const alpha = (Math.sin(frame * pt.pulseSpeed) + 1) / 3;
                ctx.fillStyle = `rgba(212, 163, 115, ${alpha})`;
                const x = centerX + pt.xOffset;
                const y = centerY + pt.yOffset;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();

                // Connector lines occasionally
                if (frame % 100 < 50 && i > 0) {
                    ctx.strokeStyle = `rgba(212, 163, 115, ${alpha * 0.5})`;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(centerX + randomPoints[i - 1].xOffset, centerY + randomPoints[i - 1].yOffset);
                    ctx.stroke();
                }
            });

            frame++;
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section className="section-padding bg-dark" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212, 163, 115, 0.1), transparent 70%)' }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>

                {/* HEADLINE */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                        <span className="lock-badge" style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.1)', color: '#fae1dd', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span style={{ fontSize: '0.8rem', marginRight: '8px' }}>✦</span> {virtualMakeover.badge}
                        </span>
                        <p style={{ color: '#d4a373', letterSpacing: '5px', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '15px', fontWeight: '900' }}>{virtualMakeover.subtitle}</p>
                        <h2 className="text-display" style={{ color: '#fff', fontSize: '3.5rem', marginBottom: '10px' }}>
                            {virtualMakeover.title}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                            {virtualMakeover.quote}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-2" style={{ alignItems: 'start', minHeight: '600px' }}>

                    {/* COL 1: CONTROLS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* INPUT PANEL */}
                        <div className="glass-panel" style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                            <label style={{ color: 'var(--color-brand)', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', display: 'block', marginBottom: '20px', textTransform: 'uppercase' }}>
                                {virtualMakeover.step1}
                            </label>
                            <div className="flex flex-column gap-2">
                                {models.map(model => (
                                    <button
                                        key={model.id}
                                        onClick={() => setSelectedModel(model)}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '12px 0',
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                            color: selectedModel.id === model.id ? '#fff' : 'rgba(255,255,255,0.5)',
                                            textAlign: 'left',
                                            fontSize: '0.8rem',
                                            fontFamily: 'var(--font-sans)',
                                            letterSpacing: '1px',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <span>{model.name}</span>
                                        <div style={{
                                            width: '10px', height: '10px', borderRadius: '50%',
                                            background: selectedModel.id === model.id ? 'var(--color-brand)' : 'transparent',
                                            border: '1px solid var(--color-brand)'
                                        }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* LOOK SELECTOR */}
                        <div className="glass-panel" style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255,255,255,0.1)', flex: 1 }}>
                            <label style={{ color: 'var(--color-brand)', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', display: 'block', marginBottom: '20px', textTransform: 'uppercase' }}>
                                {virtualMakeover.step2}
                            </label>
                            <div className="flex flex-column gap-2">
                                {looks.map(look => (
                                    <button
                                        key={look.id}
                                        onClick={() => setSelectedLook(look)}
                                        style={{
                                            padding: '15px 20px',
                                            background: selectedLook.id === look.id ? 'rgba(212, 163, 115, 0.1)' : 'transparent',
                                            border: selectedLook.id === look.id ? '1px solid var(--color-brand)' : '1px solid rgba(255,255,255,0.05)',
                                            textAlign: 'left',
                                            transition: 'all 0.3s',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <div style={{ color: selectedLook.id === look.id ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '5px', letterSpacing: '1px' }}>
                                            {look.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COL 2: MAIN VIEWPORT */}
                    <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.1)', background: '#121212', borderRadius: '4px', overflow: 'hidden', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>

                        {/* SCANNER OVERLAY */}
                        <canvas ref={canvasRef} width={600} height={800} style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', opacity: 0.8 }} />

                        {/* MAIN IMAGE */}
                        <div style={{ position: 'relative', width: '100%', flex: 1 }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${selectedModel.id}-${selectedLook.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <Image
                                        src={currentImage}
                                        alt="Simulation"
                                        fill
                                        style={{ objectFit: 'cover', opacity: 0.9 }}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* LOADING EFFECT */}
                            {isScanning && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '60px', height: '60px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'var(--color-brand)', borderRadius: '50%',
                                            animation: 'spin 1s linear infinite', margin: '0 auto 20px'
                                        }}>
                                            <style jsx>{` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}</style>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#fff', letterSpacing: '3px', textTransform: 'uppercase' }}>
                                            {virtualMakeover.generating} {scanProgress}%
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* UI HUD */}
                            <div style={{ position: 'absolute', top: '25px', left: '25px', zIndex: 15 }}>
                                <div style={{ fontSize: '0.65rem', color: 'var(--color-brand)', letterSpacing: '2px', fontWeight: '700' }}>
                                    ● {virtualMakeover.livePreview}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COL 3: TELEMETRY */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        <div className="glass-panel" style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
                            <label style={{ color: 'var(--color-brand)', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', display: 'block', marginBottom: '25px', textTransform: 'uppercase' }}>
                                {virtualMakeover.panelTitle}
                            </label>

                            <div style={{ marginBottom: '30px' }}>
                                <div className="flex justify-between" style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '10px' }}>
                                    <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{virtualMakeover.metric1}</span>
                                    <span style={{ color: 'var(--color-brand)' }}>{metrics.luminosity > 0 ? `+${metrics.luminosity}%` : '...'}</span>
                                </div>
                                <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                                    <motion.div
                                        animate={{ width: isScanning ? '0%' : `${metrics.luminosity * 1.5}%` }}
                                        transition={{ duration: 1.5 }}
                                        style={{ height: '100%', background: 'var(--color-brand)', maxWidth: '100%' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <div className="flex justify-between" style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '10px' }}>
                                    <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{virtualMakeover.metric2}</span>
                                    <span style={{ color: 'var(--color-brand)' }}>{metrics.symmetry}</span>
                                </div>
                                <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', width: '100%' }}>
                                    <motion.div
                                        animate={{ width: isScanning ? '0%' : '99%' }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                        style={{ height: '100%', background: 'var(--color-brand)' }}
                                    />
                                </div>
                            </div>

                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginTop: '30px', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                                <span style={{ color: 'var(--color-brand)', fontWeight: 'bold', fontStyle: 'normal', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{virtualMakeover.noteLabel}</span>
                                {selectedLook.desc}
                            </p>
                        </div>

                        <div className="glass-panel" style={{
                            padding: '30px',
                            background: 'linear-gradient(135deg, rgba(212, 163, 115, 0.15) 0%, rgba(0,0,0,0) 100%)',
                            borderColor: 'var(--color-brand)',
                            flex: 1,
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                        }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '1.6rem', marginBottom: '10px' }}>
                                {virtualMakeover.ctaTitle}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginBottom: '25px', maxWidth: '200px' }}>
                                {virtualMakeover.ctaDesc}
                            </p>
                            <button className="btn btn-primary" style={{ width: '100%', background: 'var(--color-brand)', color: '#2c1a1d', border: 'none', fontWeight: '700' }}>
                                {virtualMakeover.bookBtn} {selectedLook.name.split(':')[1]?.toUpperCase() || selectedLook.name.toUpperCase()}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
