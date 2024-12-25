import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Static Translations for UI Elements
const translations = {
  en: {
    title: "Detection Result",
    backHome: "Back to Home",
    readMore: "Read More",
    showLess: "Show Less",
    loading: "Translating...",
    error: "Something went wrong. Unable to detect a plant."
  },
  hi: {
    title: "रोग का पता",
    backHome: "होम पर वापस जाएं",
    readMore: "अधिक पढ़ें",
    showLess: "कम दिखाएं",
    loading: "अनुवाद हो रहा है...",
    error: "कुछ गलत हो गया। पौधे का पता नहीं लगा सके।"
  },
  mr: {
    title: "रोगाचे निदान",
    backHome: "मुख्यपृष्ठावर परत जा",
    readMore: "अधिक वाचा",
    showLess: "कमी दाखवा",
    loading: "भाषांतर चालू आहे...",
    error: "काहीतरी चूक झाली आहे. वनस्पती ओळखता आली नाही."
  }
};

const Result = ({ result }) => {
  const [language, setLanguage] = useState('en');
  const [translatedResult, setTranslatedResult] = useState(result);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = 'AIzaSyDqdzKwRVWlVDZ-yxluMqaIst8IKQ1aups';
  
  useEffect(() => {
    if (language !== 'en') {
      translateText(result, language);
    } else {
      setTranslatedResult(result);
    }

    // Check for "not a plant" error
    if (result.toLowerCase().includes('not a plant')) {
      setError(true);
    } else {
      setError(false);
    }
  }, [language, result]);

  const translateText = async (text, targetLang) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    
    setLoading(true);
    try {
      const response = await axios.post(url, {
        q: text,
        target: targetLang,
        format: 'text'
      });

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedResult(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedResult(result);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = () => setExpanded(!expanded);
  const handleLanguageChange = (event) => setLanguage(event.target.value);

  const { title, backHome, readMore, showLess, loading: loadingText, error: errorText } = translations[language];
  const splitResult = translatedResult.split('\n');
  const shortPreview = splitResult.slice(0, 3).join('\n');
  const fullResult = splitResult.join('\n');

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl text-left leading-relaxed">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">{title}</h2>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-4">{loadingText}</div>
        ) : error ? (
          <div className="text-red-500 font-semibold text-center py-4">{errorText}</div>
        ) : (
          <div
            className="mb-6"
            dangerouslySetInnerHTML={{
              __html: (expanded ? fullResult : shortPreview)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br />')
            }}
          ></div>
        )}

        {!loading && !expanded && !error && (
          <div className="text-blue-600 hover:underline cursor-pointer text-sm" onClick={toggleExpand}>
            {readMore}
          </div>
        )}

        {!loading && expanded && !error && (
          <div className="text-blue-600 hover:underline cursor-pointer text-sm" onClick={toggleExpand}>
            {showLess}
          </div>
        )}

        <button
          onClick={() => (window.location.href = '/plantdisease')}
          className="mt-8 w-full bg-green-500 text-white py-3 rounded"
        >
          {backHome}
        </button>
      </div>
    </div>
  );
};

export default Result;
