import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const navlinks = [
        { id: 0, label: "Services", url: "/services", type: "route" },
        { id: 1, label: "How it works", url: "/#how-it-works", type: "anchor" },
        { id: 2, label: "About", url: "/about", type: "route" }
    ];

    return (
        <>
            <nav
                className={`fixed inset-0 bg-white z-50 flex flex-col p-6 transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-label="Mobile navigation"
            >
                <div className="flex items-center justify-between mb-12">
                    <Link to="/" className="flex items-center gap-2.5 no-underline" onClick={() => setMenuOpen(false)}>
                        <span className="font-serif-display text-2xl text-gray-900 font-bold">
                            Book<span className="text-gray-500">ly</span>
                        </span>
                    </Link>
                    <button
                        className="p-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <ul className="list-none flex-1 flex flex-col gap-2 p-0 m-0">
                    {navlinks.map((nav) => (
                        <li key={nav?.id}>
                            {nav.type === "anchor" ? (
                                <a
                                    href={nav.url}
                                    className="..."
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {nav.label}
                                </a>
                            ) : (
                                <Link
                                    to={nav.url}
                                    className="..."
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {nav.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="pt-8 flex flex-col gap-4">
                    <Link to="/services" className="w-full text-center py-4 bg-gray-900 text-white rounded-xl text-base font-semibold no-underline shadow-lg">
                        Book Now
                    </Link>
                </div>
            </nav>

            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-200">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6" style={{ height: 68 }}>

                    <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0">
                        <span className="font-serif-display text-3xl text-gray-900 font-bold">
                            Book<span className="text-gray-500">ly</span>
                        </span>
                    </Link>

                    <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                        {navlinks.map((nav) => (
                            <li key={nav?.id}>
                                {nav.type === "anchor" ? (
                                    <a
                                        href={nav.url}
                                        className="..."
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {nav.label}
                                    </a>
                                ) : (
                                    <Link
                                        to={nav.url}
                                        className="..."
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {nav.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-gray-900 px-5 py-2.5 rounded-full no-underline hover:bg-gray-800 transition-all">
                            Book Now
                            <FaArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Mobile burger button */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>
        </>
    );
}

export default Header;