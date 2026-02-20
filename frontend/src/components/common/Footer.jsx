function Footer() {
    const platform = [
        { id: 0, label: "Services", href: "/services" },
        { id: 1, label: "How it works", href: "/#how-it-works" },
        { id: 2, label: "About", href: "/about" }
    ]

    const legals = [
        { id: 0, label: "Legal", href: "#" },
        { id: 1, label: "Terms & Conditions", href: "#" },
        { id: 2, label: "Cookie Policy", href: "#" }
    ]

    const footerSections = [
        { title: "Platform", links: platform },
        { title: "Legal", links: legals }
    ];
    return (
        <footer className="bg-gray-50 border-t border-gray-200 px-6 pt-12 pb-8" role="contentinfo">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8 mb-10">
                    <div>
                        <a href="/" className="flex items-center gap-2.5 no-underline mb-3">
                            <span className="font-serif-display text-lg text-gray-900">Bookly</span>
                        </a>
                        <p className="text-sm text-gray-400 max-w-xs leading-snug">
                            Thoughtful booking for the modern professional. Calm by design.
                        </p>
                    </div>
                    {/* Nav columns */}
                    <div className="grid grid-cols-2 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3.5">
                                    {section.title}
                                </p>
                                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-gray-500 no-underline hover:text-gray-900 transition-colors duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <p className="text-xs text-gray-400">© 2026 Bookly. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        {["Accessibility", "Sitemap", "Contact"].map((item) => (
                            <a key={item} href="#" className="text-xs text-gray-400 no-underline hover:text-gray-600 transition-colors duration-200">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;