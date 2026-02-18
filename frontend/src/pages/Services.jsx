import { useState, useMemo } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const CATEGORIES = [
    { id: "all", label: "All", icon: "✦" },
    { id: "hair", label: "Hair Salon", icon: "✂" },
    { id: "doctor", label: "Doctor & Clinic", icon: "⚕" },
    { id: "mechanic", label: "Auto Mechanic", icon: "⚙" },
    { id: "spa", label: "Spa & Wellness", icon: "◈" },
];

const SERVICES = [
    {
        id: 1, 
        category: "hair",
        name: "Studio Noir",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
        description: "Precision cuts and artisan color correction in a modern minimalist space.",
        rating: 4.9,
        location: "Downtown, NY",
        price: 45,
        duration: "45 min",
        badge: "Top Rated",
        servicesCount: 12 // Number of specific services they offer (e.g., Cut, Color, Style)
    },
    {
        id: 2, 
        category: "doctor",
        name: "Dr. Amara Chen",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
        description: "Holistic primary care focusing on preventative health and long-term wellness.",
        rating: 4.9,
        location: "Medical District",
        price: 80,
        duration: "30 min",
        badge: "Highly Rated",
        servicesCount: 8
    },
    {
        id: 3, 
        category: "mechanic",
        name: "Apex Auto Works",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400",
        description: "Full-service diagnostics and engine repair by master certified technicians.",
        rating: 4.8,
        location: "Industrial Park",
        price: 60,
        duration: "2–4 hrs",
        badge: "Fast Service",
        servicesCount: 24
    },
    {
        id: 4, 
        category: "spa",
        name: "Serene Ritual",
        image: "https://images.unsplash.com/photo-1544161515-4ae6ce6ea858?auto=format&fit=crop&q=80&w=400",
        description: "Full-body rejuvenation therapies and signature organic facials.",
        rating: 4.9,
        location: "Westside",
        price: 90,
        duration: "60–90 min",
        badge: "Top Rated",
        servicesCount: 15
    },
];

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const categoryTotals = useMemo(() => {
        const counts = { all: SERVICES.length };
        SERVICES.forEach(s => {
            counts[s.category] = (counts[s.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredServices = useMemo(() => {
        let list = SERVICES;
        if (activeCategory !== "all") list = list.filter(s => s.category === activeCategory);
        
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            list = list.filter(s => 
                s.name.toLowerCase().includes(q) || 
                s.description.toLowerCase().includes(q) ||
                s.location.toLowerCase().includes(q)
            );
        }
        return list;
    }, [activeCategory, searchQuery]);

    return (
        <div className="font-dm-sans bg-white text-gray-900 antialiased min-h-screen">
            <Header />

            <main>
                {/* Search & Filter Bar */}
                <section className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-gray-100">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="search"
                                placeholder="Search name or location..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                                        activeCategory === cat.id 
                                        ? "bg-gray-900 text-white border-gray-900" 
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    <span>{cat.icon}</span> 
                                    {cat.label}
                                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                                        activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                                    }`}>
                                        {categoryTotals[cat.id] || 0}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results Area */}
                <section className="px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-2 mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Available Providers</h2>
                            <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                {filteredServices.length}
                            </span>
                        </div>

                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredServices.map((service, i) => (
                                    <ServiceCard key={service.id} service={service} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h3 className="text-xl font-serif-display text-gray-400">No providers found</h3>
                                <button onClick={() => {setSearchQuery(""); setActiveCategory("all");}} className="mt-4 text-sm font-semibold text-gray-900 underline">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ServiceCard({ service, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Header Image */}
            <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {service.badge && (
                    <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {service.badge}
                    </span>
                )}
                {/* servicesCount Badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-900 border border-gray-200">
                    {service.servicesCount} Services
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif-display text-lg text-gray-900 leading-tight">{service.name}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        <span className="text-[11px] font-bold">★</span>
                        <span className="text-[11px] font-bold">{service.rating}</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {service.description}
                </p>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                        <span>{service.location}</span>
                        <span>{service.duration}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">From</p>
                            <p className="text-lg font-semibold text-gray-900">${service.price}</p>
                        </div>
                        <button className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                            hovered ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
                        }`}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}