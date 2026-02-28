import { useTranslation } from "react-i18next";

interface ISteps {
    n: string;
    title: string;
    desc: string;
}

function ThreeStepSection() {
    const { t } = useTranslation();

    const steps: ISteps[] = [
        { n: "01", title: t("how_it_works.step1.title"), desc: t("how_it_works.step1.desc") },
        { n: "02", title: t("how_it_works.step2.title"), desc: t("how_it_works.step2.desc") },
        { n: "03", title: t("how_it_works.step3.title"), desc: t("how_it_works.step3.desc") },
    ]
    return (
        <section className="dark:bg-gray-900 px-6 py-20" id="how-it-works" aria-label="How it works">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">{t("how_it_works.badge")}</p>
                    <h2 className="font-serif-display text-4xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight tracking-tight">
                        {t("how_it_works.title_main")}<br />{t("how_it_works.title_sub")}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <div
                            key={step.n}
                            className={`flex md:flex-col gap-6 py-8 md:p-8 border-b border-gray-100 last:border-b-0 md:border-b-0 animate-fade-up ${i < 2 ? "md:border-r md:border-gray-100" : ""}`}
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <p className="font-serif-display text-6xl font-normal text-gray-200 dark:text-gray-400 leading-none shrink-0 w-16 md:w-auto">
                                {step.n}
                            </p>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ThreeStepSection;