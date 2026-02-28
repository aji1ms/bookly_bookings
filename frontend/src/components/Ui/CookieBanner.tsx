import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-100 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 justify-between">

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Cookie Policy 🍪
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        We use cookies to enhance your booking experience and analyze our traffic.
                        By clicking "Accept", you consent to our use of cookies in accordance with
                        EU GDPR regulations. <Link to="#" className="underline hover:text-blue-600 dark:hover:text-blue-400">Read Policy</Link>.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={acceptCookies}
                        className="flex-1 md:flex-none px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-sm shadow-lg"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        aria-label="Close"
                    >
                        <HiXMark size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}