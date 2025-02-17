// Footer.js
const Footer = () => {
    return (
        
        <div
        className="w-full h-10 bottom-0 fixed text-center text-white"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 105, 148, 0.9) 10%, rgba(0, 110, 137, 0.7) 50%, rgba(0, 77, 94, 0.6) 90%)`,
          backgroundSize: "cover",
          filter: "brightness(0.95) contrast(1.2)"
        }}
        >
        <p className="text-lg mt-2">Website by Jacob May</p>
    </div>
    );
};

export default Footer;
