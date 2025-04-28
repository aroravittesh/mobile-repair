// src/components/Footer.tsx

const Footer = () => {
    return (
      <footer className="bg-white py-6 shadow-inner mt-auto">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Mobile Repair Delhi. All rights reserved.</p>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mt-2">
            <a href="https://instagram.com" className="hover:text-blue-600">Instagram</a>
            <a href="https://linkedin.com" className="hover:text-blue-600">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  