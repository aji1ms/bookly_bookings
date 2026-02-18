import { useCounter } from "../../hooks/useCounter";

const StatCard = ({ value, suffix = "", label, delay }) => {
    const { count, ref } = useCounter(value, 1600);

    return (
        <div
            ref={ref}
            className="bg-white p-8 animate-fade-up"
            style={{ animationDelay: delay }}
        >
            <p className="font-serif-display text-5xl font-normal text-gray-900 leading-none mb-2">
                {count}<span className="text-2xl text-gray-400">{suffix}</span>
            </p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
};

export default StatCard;