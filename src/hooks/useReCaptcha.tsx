import { useEffect, useState } from "react";
import { REACT_RECAPTCHA_KEY } from "../assets/locales/constant";

const useReCaptcha = () => {
  const [reCaptchaToken, setReCaptchaToken] = useState("");

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let tokenRefreshInterval: NodeJS.Timeout | null = null;

    const loadReCaptcha = async () => {
      try {
        console.log("Executing reCAPTCHA...");
        const token = await window.grecaptcha.execute(REACT_RECAPTCHA_KEY, {
          action: "submit",
        });
        setReCaptchaToken(token);
        // Clear the previous interval if it exists
        if (tokenRefreshInterval) {
          clearInterval(tokenRefreshInterval);
        }

        // Set a new interval to refresh the token every 1 minute
        tokenRefreshInterval = setInterval(loadReCaptcha, 60 * 1000);
      } catch (error) {
        console.error("Error executing reCAPTCHA:", error);
      }
    };

    const initializeReCaptcha = () => {
      script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${REACT_RECAPTCHA_KEY}`;
      script.async = true;
      script.onload = () => {
        console.log("reCAPTCHA script loaded.");
        if (window.grecaptcha) {
          console.log("grecaptcha is defined on window.");
          window.grecaptcha.ready(() => {
            console.log("grecaptcha is ready.");
            loadReCaptcha();
          });
        } else {
          console.warn("grecaptcha is not loaded even after script.onload");
        }
      };
      script.onerror = () => {
        console.error("Failed to load reCAPTCHA script");
      };
      document.body.appendChild(script);
    };

    if (!window.grecaptcha) {
      console.log("Initializing reCAPTCHA...");
      initializeReCaptcha();
    } else {
      console.log("grecaptcha is already defined on window.");
      loadReCaptcha();
    }

    return () => {
      //   toggleReCaptcha();
    };
  }, []);

  return reCaptchaToken;
};

export default useReCaptcha;
