import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const { content, language, setLanguage } = useLanguage();
    const { nav } = content;

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo">
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-brand-dark)', letterSpacing: '4px', fontWeight: '900', textTransform: 'uppercase' }}>UrbanGlam</span>
                </Link>

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

                <div className="mobile-only flex items-center gap-4">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                    >
                        {language === 'en' ? '🇮🇳' : '🇺🇸'}
                    </button>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: '900', border: '1px solid var(--color-brand-dark)', padding: '6px 15px' }}>{nav.menu}</span>
                </div>
            </div>
        </nav>
    );
}
