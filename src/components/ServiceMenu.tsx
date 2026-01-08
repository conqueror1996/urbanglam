'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuServiceItem } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function ServiceMenu() {
    const { content } = useLanguage();
    const { serviceMenu } = content;
    const { SALON_MENU } = content.data;

    const [activeCategory, setActiveCategory] = useState<string>("");

    useEffect(() => {
        if (SALON_MENU && SALON_MENU.length > 0 && !activeCategory) {
            setActiveCategory(SALON_MENU[0].category);
        }
    }, [SALON_MENU, activeCategory]);

    // Find the active section data
    const activeSection = SALON_MENU.find(s => s.category === activeCategory) || SALON_MENU[0];

    // Filter out maintenance items for the public view
    const displayItems = activeSection?.items.filter(i => !i.isMaintenance) || [];

    if (!activeSection) return null;

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '20px',
                        color: 'var(--color-brand-dark)',
                        fontWeight: 700
                    }}>
                        {serviceMenu.label}
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#000' }}>{serviceMenu.title}</h2>
                </div>

                <div className="flex flex-column" style={{ width: '100%' }}>

                    {/* CATEGORY TABS */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '80px',
                        borderBottom: '1px solid #eee',
                        paddingBottom: '0'
                    }}>
                        {SALON_MENU.map((section, idx) => (
                            <button
                                key={section.category}
                                onClick={() => setActiveCategory(section.category)}
                                style={{
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    color: activeCategory === section.category ? '#000' : '#999',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: activeCategory === section.category ? '2px solid #000' : '2px solid transparent',
                                    padding: '20px 30px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                {section.category}
                            </button>
                        ))}
                    </div>

                    {/* ACTIVE CATEGORY CONTENT */}
                    <div style={{ minHeight: '600px' }}>
                        <AnimatePresence mode="wait">
                            {activeSection && (
                                <motion.div
                                    key={activeSection.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="service-grid">
                                        {/* LEFT: CONTEXT CARD */}
                                        <div className="context-card">
                                            <div style={{
                                                width: '40px', height: '40px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '30px',
                                                fontSize: '0.8rem',
                                                color: '#d4a373'
                                            }}>
                                                {(SALON_MENU.findIndex(s => s.category === activeCategory) + 1).toString().padStart(2, '0')}
                                            </div>
                                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginBottom: '20px', color: '#fff' }}>
                                                {activeSection.category}
                                            </h3>
                                            <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '40px', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
                                                {serviceMenu.contextDesc}
                                            </p>

                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                <div style={{ fontSize: '0.7rem', color: '#d4a373', border: '1px solid #d4a373', padding: '8px 16px', borderRadius: '100px' }}>{serviceMenu.tag1}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#666', border: '1px solid #333', padding: '8px 16px', borderRadius: '100px' }}>{serviceMenu.tag2}</div>
                                            </div>
                                        </div>

                                        {/* RIGHT: SERVICE LIST */}
                                        <div className="service-list">
                                            {displayItems.map((item, i) => (
                                                <ServiceItemRow key={item.name + i} item={item} index={i} />
                                            ))}

                                            {/* Maintenance Note */}
                                            <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
                                                <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.6 }}>
                                                    <strong style={{ color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{serviceMenu.noteLabel}</strong> {serviceMenu.noteText}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
            <style jsx>{`
                .service-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: flex-start;
                }
                .context-card {
                    padding: 50px;
                    background: #0a0a0a;
                    color: #fff;
                    position: sticky;
                    top: 120px;
                    border-radius: 4px;
                    border: 1px solid #222;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .service-list {
                    padding-left: 40px;
                }
                @media (max-width: 768px) {
                    .service-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .context-card {
                        position: relative;
                        top: 0;
                        padding: 30px;
                        margin-bottom: 30px;
                    }
                    .service-list {
                        padding-left: 0;
                    }
                }
            `}</style>
        </section>
    );
}

function ServiceItemRow({ item, index }: { item: MenuServiceItem, index: number }) {
    const isInvest = typeof item.price === 'string' && item.price.includes('Invest');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 10, backgroundColor: 'rgba(0,0,0,0.02)' }}
            style={{
                padding: '30px 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <h4 style={{
                    fontSize: '1.4rem',
                    color: '#000',
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '-0.5px'
                }}>
                    {item.name}
                    {item.isPremium && <sup style={{ fontSize: '0.6rem', color: '#d4a373', marginLeft: '5px' }}>✦</sup>}
                </h4>
                <span style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-sans)',
                    color: isInvest ? '#d4a373' : '#000',
                    fontWeight: isInvest ? 700 : 400
                }}>
                    {item.price}
                </span>
            </div>

            {item.description && (
                <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    lineHeight: 1.6,
                    maxWidth: '90%',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300
                }}>
                    {item.description}
                </p>
            )}
        </motion.div>
    );
}
