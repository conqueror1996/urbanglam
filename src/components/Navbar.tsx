import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo">
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-brand-dark)', letterSpacing: '4px', fontWeight: '900', textTransform: 'uppercase' }}>UrbanGlam</span>
                </Link>

                <div className="nav-menu flex items-center desktop-only">
                    <Link href="#services" className="nav-link">Rituals</Link>
                    <Link href="#experience" className="nav-link">Journey</Link>
                    <Link href="#memberships" className="nav-link">Circle</Link>
                    <Link href="#book" className="nav-link" style={{ border: '1px solid var(--color-brand-dark)', padding: '10px 24px', color: 'var(--color-brand-dark)', borderRadius: '2px', marginLeft: '30px' }}>
                        Request Access
                    </Link>
                </div>

                <div className="mobile-only">
                    <span style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: '900', border: '1px solid var(--color-brand-dark)', padding: '6px 15px' }}>MENU</span>
                </div>
            </div>
        </nav>
    );
}
