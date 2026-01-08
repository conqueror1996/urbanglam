import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { content, language, setLanguage } = useLanguage();
    const { nav } = content;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className="navbar">
                <div className="container flex justify-between items-center">
                    <Link href="/" className="logo" style={{ zIndex: 1200, position: 'relative' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: isMenuOpen ? '#fff' : 'var(--color-brand-dark)', letterSpacing: '4px', fontWeight: '900', textTransform: 'uppercase', transition: 'color 0.3s' }}>UrbanGlam</span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="nav-menu flex items-center desktop-only">
                        <Link href="#services" className="nav-link">{nav.rituals}</Link>
                        <Link href="#experience" className="nav-link">{nav.journey}</Link>
                        <Link href="#memberships" className="nav-link">{nav.circle}</Link>
                        <Link href="#book" className="nav-link" style={{ border: '1px solid var(--color-brand-dark)', padding: '10px 24px', color: 'var(--color-brand-dark)', borderRadius: '2px', marginLeft: '30px' }}>
                            {nav.requestAccess}
                        </Link>

                        {/* Language Switcher */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            style={{ marginLeft: '20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                            title="Switch Language"
                        >
                            {language === 'en' ? '🇮🇳 HI' : '🇺🇸 EN'}
                        </button>
                    </div>

                    {/* MOBILE TOGGLES */}
                    <div className="mobile-only flex items-center gap-4" style={{ zIndex: 1200, position: 'relative' }}>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            {language === 'en' ? '🇮🇳' : '🇺🇸'}
                        </button>
                        <button
                            onClick={toggleMenu}
                            style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: '900', border: isMenuOpen ? '1px solid #fff' : '1px solid var(--color-brand-dark)', color: isMenuOpen ? '#fff' : 'var(--color-brand-dark)', padding: '6px 15px', background: 'transparent', transition: 'all 0.3s' }}
                        >
                            {isMenuOpen ? 'CLOSE' : nav.menu}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE FULLSCREEN MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#121212', // Dark luxury theme for menu
                            zIndex: 1150,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '40px'
                        }}
                    >
                        <div className="flex flex-column gap-4 text-center">
                            {[
                                { href: '#services', label: nav.rituals },
                                { href: '#experience', label: nav.journey },
                                { href: '#memberships', label: nav.circle },
                                { href: '#book', label: nav.requestAccess },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '2rem',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ position: 'absolute', bottom: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '2px' }}
                        >
                            EST. 2024 • MUMBAI
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
