export function HeroSectionShimmer() {
    return (
        <div className="relative h-[45vh] w-full overflow-hidden bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-t from-gray-300/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-6xl mx-auto w-full space-y-4">
                <div className="h-10 md:h-14 w-2/5 bg-gray-300 rounded-lg animate-pulse" />
                <div className="flex items-center gap-4">
                    <div className="h-4 w-12 bg-gray-300 rounded-md animate-pulse" />
                    <div className="h-4 w-1 bg-gray-300 rounded-md animate-pulse" />
                    <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse" />
                    <div className="h-4 w-1 bg-gray-300 rounded-md animate-pulse" />
                    <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse" />
                </div>

            </div>
        </div>
    );
}

function ServiceListItemShimmer() {
    return (
        <div className="p-6 border-2 border-gray-100 rounded-2xl flex justify-between items-start gap-4 bg-white">
            <div className="flex-1 space-y-3">
                <div className="h-5 w-2/5 bg-gray-200 rounded-md animate-pulse" />
                <div className="space-y-2">
                    <div className="h-3.5 w-full bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-3.5 w-4/5 bg-gray-200 rounded-md animate-pulse" />
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-7 w-16 bg-gray-200 rounded-full animate-pulse" />
                </div>
            </div>
            <div className="shrink-0 h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>
    );
}

export function ServiceListShimmer({ count = 2 }) {
    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-6 w-36 bg-gray-200 rounded-md animate-pulse" />
                </div>
            </div>

            <div className="grid gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <ServiceListItemShimmer key={i} />
                ))}
            </div>
        </section>
    );
}

export function StaffCardShimmer() {
    return (
        <div className="p-6 border-2 border-gray-100 rounded-2xl flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3.5 w-20 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded-md animate-pulse" />
        </div>
    );
}

export function BusinessDatasShimmer() {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-8">
                <div className="h-3 w-32 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-px flex-1 bg-gray-100 ml-4" />
            </div>
            <div className="space-y-7">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 w-3/5 bg-gray-200 rounded-md animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded-md animate-pulse mt-3" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-2">
                    <div className="flex items-center gap-4 p-3 -ml-3">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
                        <div className="h-4 w-36 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 p-3 -ml-3">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
                        <div className="h-4 w-44 bg-gray-200 rounded-md animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}