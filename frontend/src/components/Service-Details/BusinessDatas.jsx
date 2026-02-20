import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function BusinessDatas({ data }) {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Location & Contact
                </h3>
                <div className="h-px flex-1 bg-gray-100 ml-4"></div>
            </div>

            <div className="space-y-7">
                {/* Address Section */}
                <div className="flex items-start gap-4 group cursor-default">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                        <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                            {data?.location}
                        </p>
                        <button className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors flex items-center gap-1">
                            Open in Maps <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* Contact Items */}
                <div className="grid grid-cols-1 gap-4 pt-2">
                    <a
                        href={`tel:+919655884848`}
                        className="flex items-center gap-4 p-3 -ml-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                            <FaPhoneAlt size={12} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">+91 9148653214</span>
                    </a>

                    <a
                        href={`mailto:bookkly@gmail.com`}
                        className="flex items-center gap-4 p-3 -ml-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                            <IoMdMail size={14} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">bookly@gmail.com</span>
                    </a>
                </div>
            </div>
        </div>
    )
}