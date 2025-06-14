// PageValidator.jsx
import { useEffect } from 'react';

const PageValidator = ({ pageUrl, selector, onValidationResult }) => {
  useEffect(() => {
    if (!pageUrl || !selector) return;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pageUrl;

    iframe.onload = () => {
      try {
        const content = iframe.contentDocument || iframe.contentWindow.document;
        const selectorFound = content.querySelector(selector) !== null;

        onValidationResult({
          urlValid: true,
          selectorValid: selectorFound,
        });
      } catch (err) {
        // CORS or other error
        onValidationResult({
          urlValid: false,
          selectorValid: false,
        });
      }
      document.body.removeChild(iframe);
    };

    iframe.onerror = () => {
      onValidationResult({
        urlValid: false,
        selectorValid: false,
      });
      document.body.removeChild(iframe);
    };

    document.body.appendChild(iframe);
  }, [pageUrl, selector, onValidationResult]);

  return null;
};

export default PageValidator;
