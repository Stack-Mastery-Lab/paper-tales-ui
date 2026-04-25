import { useLanguage } from "../context/LanguageContext";

export const Loading = () => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-acento"></div>
            <span className="mt-4 text-lg font-semibold text-tinta">{t.common.loading}</span>
        </div>
    );
};