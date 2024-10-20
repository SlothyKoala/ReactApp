import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../css/styles.css';

interface NavBarProps {
  brandName: string;
  imageUrl: string;
  navItems: string[];
  onNavItemClick: (item: string) => void;
}

function NavBar({ brandName, imageUrl, navItems, onNavItemClick }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (index: number, item: string) => {
    setSelectedIndex(index);
    onNavItemClick(item);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <a className="flex items-center text-white" href="#">
          <img
            src={imageUrl}
            width="60"
            height="60"
            className="inline-block"
            alt="Logo"
          />
          <span className="font-bold text-2xl ml-2">{brandName}</span>
        </a>
        <div className="hidden md:flex md:items-center md:space-x-4">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`text-white hover:text-blue-400 transition duration-300 py-2 px-4 rounded-md ${selectedIndex === index ? "bg-blue-600" : ""}`}
              onClick={() => handleNavClick(index, item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          className="text-white focus:outline-none md:hidden"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`md:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col space-y-2 p-4">
          {navItems.map((item, index) => (
            <li key={item}>
              <button
                className={`text-white hover:text-blue-400 transition duration-300 py-2 px-4 rounded-md ${selectedIndex === index ? "bg-blue-600" : ""}`}
                onClick={() => handleNavClick(index, item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
