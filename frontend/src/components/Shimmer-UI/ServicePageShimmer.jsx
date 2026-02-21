const BusinessCardShimmer = () => {
    return (
        <div>
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-200 animate-pulse mb-3">
                <div className="absolute top-3 right-3 w-14 h-6 bg-gray-300 rounded-lg" />
            </div>

            <div className="px-0.5 space-y-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded-md animate-pulse" />
                </div>
                <div className="h-3 w-28 bg-gray-200 rounded-md animate-pulse" />
            </div>
        </div>
    );
};

export const RecentBusinessesShimmer = ({ count = 4 }) => {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <div className="h-6 w-56 bg-gray-200 rounded-md animate-pulse" />
                        <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                    <div className="h-4 w-14 bg-gray-200 rounded-md animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: count }).map((_, i) => (
                        <BusinessCardShimmer key={i} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export const FilterShimmer = () => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="animate-pulse w-24 h-[34px] rounded-full bg-gray-200 border border-gray-200"
                />
            ))}
        </div>
    );
};

export const ServiceCardShimmer = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div className="rounded-2xl overflow-hidden bg-white shadow-md w-full">

                    <div className="relative w-full h-44 bg-gray-200 animate-pulse">
                        <div className="absolute bottom-3 left-3 w-24 h-6 bg-gray-300 rounded-full" />
                    </div>

                    <div className="p-4 space-y-3">

                        <div className="flex justify-between items-center">
                            <div className="h-5 w-3/5 bg-gray-200 rounded-md animate-pulse" />
                            <div className="h-5 w-14 bg-gray-200 rounded-md animate-pulse" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-3.5 w-full bg-gray-200 rounded-md animate-pulse" />
                            <div className="h-3.5 w-4/5 bg-gray-200 rounded-md animate-pulse" />
                        </div>

                        <div className="flex justify-between items-center pt-1">
                            <div className="h-3.5 w-1/3 bg-gray-200 rounded-md animate-pulse" />
                            <div className="h-3.5 w-1/4 bg-gray-200 rounded-md animate-pulse" />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="space-y-1.5">
                                <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
                                <div className="h-6 w-20 bg-gray-300 rounded-md animate-pulse" />
                            </div>
                            <div className="h-10 w-24 bg-gray-300 rounded-xl animate-pulse" />
                        </div>

                    </div>
                </div>
            ))}
        </>
    );
}