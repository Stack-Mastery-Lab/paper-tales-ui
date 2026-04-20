const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto text-center px-4">
                {/* Texto de Copyright */}
                <p className="text-sm">
                    © {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
                </p>

                {/* Enlaces secundarios */}
                <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Términos</a>
                    <a href="#" className="hover:text-white transition-colors">Contacto</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;