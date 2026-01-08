'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function TransformationGallery() {
    const { content } = useLanguage();
    const { gallery } = content;
    const { TRANSFORMATIONS } = content.data;

    const [activeTab, setActiveTab] = useState(0);


    return (
        <div style={{ marginTop: '80px' }}>
            {/* TABS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                {TRANSFORMATIONS.map((t, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={activeTab === index ? 'btn-chip active' : 'btn-chip'}
                    >
                        {t.category}
                    </button>
                ))}
            </div>

            {/* SLIDER COMPONENT */}
            <div className="glass-panel" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0', overflow: 'hidden', position: 'relative' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px' }}
                        className="transformation-grid"
                    >
                        {/* BEFORE */}
                        <div style={{ position: 'relative', borderRight: '1px solid #fff' }}>
                            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '5px 10px', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '2px', zIndex: 10 }}>
                                {gallery.initial}
                            </div>
                            <Image
                                src={TRANSFORMATIONS[activeTab].before}
                                alt="Before"
                                fill
                                style={{ objectFit: 'cover', filter: 'grayscale(1) contrast(1.1)' }} // Clinical feel
                            />
                        </div>

                        {/* AFTER */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--color-brand-dark)', color: '#fff', padding: '5px 10px', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '2px', zIndex: 10 }}>
                                {gallery.post}
                            </div>
                            <Image
                                src={TRANSFORMATIONS[activeTab].after}
                                alt="After"
                                fill
                                style={{ objectFit: 'cover' }}
                            />

                            {/* METRIC OVERLAY */}
                            <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', background: 'rgba(255,255,255,0.9)', padding: '30px', backdropFilter: 'blur(10px)' }}>
                                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>{gallery.resultLabel}</h4>
                                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-brand-dark)', lineHeight: 1 }}>
                                    {TRANSFORMATIONS[activeTab].metric}
                                </div>
                                <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.8 }}>
                                    {TRANSFORMATIONS[activeTab].title} {gallery.protocol}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

