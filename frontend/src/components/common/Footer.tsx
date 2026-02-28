import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IPlatform {
    id: number;
    label: string;
    href: string;
}

interface ILegals {
    id: number;
    label: string;
    href: string;
}

interface ISection {
    title: string;
    links: IPlatform[] | ILegals[];
}

function Footer() {
    const { t } = useTranslation();
    const platform: IPlatform[] = [
        { id: 0, label: t("footer.links.services"), href: "/services" },
        { id: 1, label: t("footer.links.how_it_works"), href: "/#how-it-works" },
        { id: 2, label: t("footer.links.about"), href: "/about" }
    ]

    const legals: ILegals[] = [
        { id: 0, label: t("footer.sections.legal"), href: "#" },
        { id: 1, label: t("footer.links.terms"), href: "#" },
        { id: 2, label: t("footer.links.cookie_policy"), href: "#" }
    ]

    const footerSections: ISection[] = [
        { title: t("footer.sections.platform"), links: platform },
        { title: t("footer.sections.legal"), links: legals }
    ];
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 px-6 pt-12 pb-8" role="contentinfo">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8 mb-10">
                    <div>
                        <a href="/" className="flex items-center gap-2.5 no-underline mb-3">
                            <span className="font-serif-display text-lg text-gray-900 dark:text-white">Bookly</span>
                        </a>
                        <p className="text-sm text-gray-400 max-w-xs leading-snug">
                            {t("footer.description")}
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
                                            <Link
                                                to={link.href}
                                                className="text-sm text-gray-500 no-underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-400 transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div> 
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <p className="text-xs text-gray-400">{t("footer.rights")}</p>
                    <div className="flex flex-wrap gap-4">
                        {[t("footer.links.accessibility"), t("footer.links.sitemap"), t("footer.links.contact")].map((item) => (
                            <Link key={item} to="#" className="text-xs text-gray-400 no-underline hover:text-gray-600 transition-colors duration-200">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;