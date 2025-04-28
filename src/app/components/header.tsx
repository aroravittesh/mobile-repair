// src/components/Header.tsx

import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full py-4 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo or Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">Mobile Repair Delhi</span>
        </Link>
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
            <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-600">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
