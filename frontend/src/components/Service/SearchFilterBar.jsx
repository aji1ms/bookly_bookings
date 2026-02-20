import { useDispatch, useSelector } from "react-redux";
import { FilterShimmer } from "../Shimmer-UI/ServicePageShimmer";
import { getAllBusinessesThunk } from "../../Redux/slices/businessSlice";
import { useState } from "react";

function SearchFilterBar() {
    const dispatch = useDispatch();
    const { loading, serviceTypes } = useSelector((state) => state.serviceType);
    const { activeSlug } = useSelector((state) => state.business);
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilterClick = (slug) => {
        if (activeSlug === slug) {
            dispatch(getAllBusinessesThunk());
        } else {
            dispatch(getAllBusinessesThunk(slug));
        }
    };

    return (
        <section className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-gray-100">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search name or location..."
                        value=""
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                    />
                </div>

                <div className="max-w-6xl mx-auto px-6 py-4">
                    {loading ? (
                        <FilterShimmer />
                    ) : (

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                            <button
                                onClick={() => dispatch(getAllBusinessesThunk())}
                                className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer
                                    ${!activeSlug
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                All
                            </button>
                            {serviceTypes.map(srv => (
                                <button
                                    key={srv?.id}
                                    onClick={() => handleFilterClick(srv?.slug)}
                                    className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all whitespace-nowrap bg-white text-gray-600 border-gray-200 hover:border-gray-400 cursor-pointer"
                                >

                                    {srv?.slug}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SearchFilterBar;