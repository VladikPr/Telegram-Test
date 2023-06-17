"use client";
import { useEffect, useRef } from "react";

interface TelegramLoginButtonProps {
  botName: string;
  buttonSize?: string;
  cornerRadius?: number;
  requestAccess: string;
  usePic?: string;
  dataAuthUrl: string;
  lang?: string;
  widgetVersion: string;
  className?: string;
  children?: React.ReactNode;
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
  botName,
  buttonSize,
  cornerRadius,
  requestAccess,
  usePic,
  dataAuthUrl,
  lang,
  widgetVersion,
  className,
  children,
}) => {
  const instance = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
    script.async = true;

    script.setAttribute("data-telegram-login", botName);

    if (buttonSize != null) {
      script.setAttribute("data-size", buttonSize);
    }

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }

    if (usePic != null) {
      script.setAttribute("data-userpic", `${usePic}`);
    }

    if (lang != null) {
      script.setAttribute("data-lang", lang);
    }

    script.setAttribute("data-request-access", requestAccess);

    script.setAttribute("data-auth-url", dataAuthUrl);

    if (instance.current) {
      instance.current.appendChild(script);
    }

    return () => {
      if (instance.current) {
        instance.current.removeChild(script);
      }
    };
  }, [
    botName,
    buttonSize,
    cornerRadius,
    requestAccess,
    usePic,
    dataAuthUrl,
    lang,
    widgetVersion,
  ]);

  return (
    <div className={className} ref={instance}>
      {children}
    </div>
  );
};

export default TelegramLoginButton;
