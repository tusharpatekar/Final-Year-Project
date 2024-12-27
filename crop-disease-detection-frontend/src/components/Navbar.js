import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn'));
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // State to manage language

  // Set default language to the value in localStorage or 'en' on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage or default to 'en'
    i18n.changeLanguage(savedLanguage); // Change language using i18n
    setLanguage(savedLanguage); // Update language state
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language using i18n
    localStorage.setItem("language", lang); // Store the selected language in localStorage
    setLanguage(lang); // Update language state
    window.dispatchEvent(new Event("languageChange")); // Dispatch language change event
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Clear login state
    setIsLoggedIn(false); 
    alert('Logged out successfully!');
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          TechSquad
        </a>
        <div className="space-x-4">
          <a href="/home" className="hover:text-green-300">{t("navbar.home")}</a>
          <a href="/aboutus" className="hover:text-green-300">{t("navbar.about")}</a>

          {isLoggedIn ? (
            <>
              <a href="/plantdisease" className="hover:text-green-300">{t("navbar.detect")}</a>
              <a href="/" className="hover:text-green-300" onClick={handleLogout}>
                {t("navbar.logout")}
              </a>
            </>
          ) : (
            <>
              <a href="/signup" className="hover:text-green-300">{t("navbar.signup")}</a>
              <a href="/" className="hover:text-green-300">{t("navbar.login")}</a>
            </>
          )}
        </div>

        {/* Language selection dropdown */}
        <select
          className="bg-green-700 text-white p-2 rounded"
          value={language} // Bind the dropdown value to the state
          onChange={(e) => changeLanguage(e.target.value)} // Handle language change
        >
          <option value="en">English</option>
          <option value="mr">मराठी</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
