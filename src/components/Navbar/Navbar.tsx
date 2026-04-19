import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    console.log("📐 [Navbar] render");
    const [isOpen, setIsOpen] = useState(false);
    const { t, setLanguage, language } = useLanguage();

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
            <div className="font-bold text-xl text-gray-800">Papel</div>
            <div
                className="md:hidden cursor-pointer text-2xl p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </div>

            {/* Enlaces */}
            <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full bg-white md:w-auto shadow-md md:shadow-none p-4 md:p-0 gap-4`}>
            
                <li><a href="/libros" className="hover:text-blue-600 transition-colors">{t.nav.books}</a></li>
                <li><a href="/acerca" className="hover:text-blue-600 transition-colors">{t.nav.about}</a></li>
                <li><a href="/login" className="hover:text-blue-600 transition-colors">{t.nav.login}</a></li>
                <button className="pl-3" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}>
                {language === 'es' ? '🇺🇸 En' : '🇪🇸 Es'}
            </button>
            </ul>

            
        </nav>
    );
};

export default Navbar;