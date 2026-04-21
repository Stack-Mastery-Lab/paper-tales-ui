const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto text-center px-4">
            
                <p className="text-sm">
                    © {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;