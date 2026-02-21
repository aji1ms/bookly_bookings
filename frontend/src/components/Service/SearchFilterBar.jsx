import { useDispatch, useSelector } from "react-redux";
import { FilterShimmer } from "../Shimmer-UI/ServicePageShimmer";
import { getAllBusinessesThunk } from "../../Redux/slices/businessSlice";
import { useState, useEffect, useRef } from "react";
import { FaSlidersH, FaTimes, FaCheck } from "react-icons/fa";

function SearchFilterBar() {
    const dispatch = useDispatch();
    const { loading, serviceTypes } = useSelector((state) => state.serviceType);
    const { activeSlug } = useSelector((state) => state.business);

    const [searchQuery, setSearchQuery] = useState("");
    const [sheetOpen, setSheetOpen] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            dispatch(getAllBusinessesThunk({ slug: activeSlug, search: searchQuery }));
        }, 400);
        return () => clearTimeout(debounceRef.current);
    }, [searchQuery]);

    const handleFilterClick = (slug) => {
        const newSlug = activeSlug === slug ? null : slug;
        dispatch(getAllBusinessesThunk({ slug: newSlug, search: searchQuery }));
        setSheetOpen(false);
    };

    const activeLabel = activeSlug
        ? serviceTypes.find(s => s.slug === activeSlug)?.name
        : null;

    return (
        <>
            <section className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-100">
                <div className="max-w-6xl mx-auto flex items-center gap-3">

                    <div className="relative flex-1">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                        />
                    </div>

                    {/* Mobile: Filter pill button */}
                    <button
                        onClick={() => setSheetOpen(true)}
                        className={`sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all shrink-0 cursor-pointer ${activeSlug
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                    >
                        <FaSlidersH size={12} />
                        {activeLabel ?? "Filter"}
                    </button>

                    <div className="hidden sm:block">
                        {loading ? (
                            <FilterShimmer />
                        ) : (
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                <button
                                    onClick={() => handleFilterClick(null)}
                                    className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer ${!activeSlug
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    All
                                </button>
                                {serviceTypes.map((srv) => (
                                    <button
                                        key={srv?._id}
                                        onClick={() => handleFilterClick(srv?.slug)}
                                        className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer ${activeSlug === srv?.slug
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        {srv?.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Mobile bottom sheet ── */}

            <div
                onClick={() => setSheetOpen(false)}
                className={`sm:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            <div
                className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${sheetOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Filter by Category</h3>
                    <button
                        onClick={() => setSheetOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 cursor-pointer"
                    >
                        <FaTimes size={12} />
                    </button>
                </div>

                {/* Options */}
                <div className="px-4 py-3 space-y-1.5 max-h-72 overflow-y-auto">
                    <button
                        onClick={() => handleFilterClick(null)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${!activeSlug ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 active:bg-gray-100"
                            }`}
                    >
                        All Categories
                        {!activeSlug && <FaCheck size={11} />}
                    </button>

                    {serviceTypes.map((srv) => (
                        <button
                            key={srv?._id}
                            onClick={() => handleFilterClick(srv?.slug)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${activeSlug === srv?.slug
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-50 text-gray-700 active:bg-gray-100"
                                }`}
                        >
                            {srv?.name}
                            {activeSlug === srv?.slug && <FaCheck size={11} />}
                        </button>
                    ))}
                </div>

                <div className="h-6" />
            </div>
        </>
    );
}

export default SearchFilterBar;