const Footer = () => {
    return (
        
        <div
        className="w-full h-10 bottom-0 md:pt-2 fixed text-center text-white"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 105, 148, 0.9) 10%, rgba(0, 110, 137, 0.7) 50%, rgba(0, 77, 94, 0.6) 90%)`,
          backgroundSize: "cover",
          filter: "brightness(0.95) contrast(1.2)"
        }}
        >
        <a href="https://portfolio-tau-two-33.vercel.app/" className="text-lg pt-2 hover:text-blue-900" target="_blank" rel="noopener noreferrer">Website by Jacob May</a>
    </div>
    );
};

export default Footer;
