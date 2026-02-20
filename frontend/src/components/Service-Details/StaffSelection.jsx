import { FaUserFriends } from "react-icons/fa";
import { StaffCardShimmer } from "../Shimmer-UI/ServiceDetailsPageShimmer";

export default function StaffSelection({ staff, staffLoading, selectedStaffId, onSelect }) {
    return (
        <section className="animate-fade-up border-t border-gray-100 pt-12">
            <div className="flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold">2</span>
                <h2 className="text-2xl font-semibold tracking-tight">Select Professional</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {staffLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <StaffCardShimmer key={i} />)
                ) : (
                    <>
                        <button
                            onClick={() => onSelect({ _id: "", name: "", role: "Professional" })}
                            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all text-center flex flex-col items-center ${selectedStaffId === "any"
                                ? "border-gray-900 bg-white ring-1 ring-gray-900"
                                : "border-gray-100 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-500">
                                <FaUserFriends size={24} />
                            </div>
                            <p className="font-bold text-sm">Any Professional</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">First Available</p>
                        </button>

                        {staff.map((person) => (
                            <button
                                key={person._id}
                                onClick={() => onSelect(person)}
                                className={`p-6 cursor-pointer border-2 rounded-2xl transition-all text-center flex flex-col items-center ${selectedStaffId === person._id
                                    ? "border-gray-900 bg-white ring-1 ring-gray-900"
                                    : "border-gray-100 bg-white hover:border-gray-300"
                                    }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 text-lg font-bold">
                                    {person.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>

                                <p className="font-bold text-sm">{person.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{person.role}</p>
                            </button>
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}