import React from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change app language dynamically
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          TechSquad
        </a>
        <div className="space-x-4">
          <a href="/plantdisease" className="hover:text-green-300">{t("navbar.home")}</a>
          <a href="/signup" className="hover:text-green-300">{t("navbar.signup")}</a>
          <a href="/" className="hover:text-green-300">{t("navbar.login")}</a>
        </div>
        <select
          className="bg-green-700 text-white p-2 rounded"
          onChange={(e) => changeLanguage(e.target.value)}
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
