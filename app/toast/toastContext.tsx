import { createContext, useContext, useState, useEffect } from "react";
import Toast from "./toast";


type ToastContextType = {
  showToast: (title: string, message: string, color?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState<string | undefined>(undefined);
  const [toastColor, setToastColor] = useState<string | undefined>(undefined);
  const [toastFading, setToastFading] = useState(true);

  const showToast = (title: string, message: string, color?: string) => {
    setToastTitle(title);
    setToastMessage(message);
    setToastVisible(true);
    color && setToastColor(color);
  };


  useEffect(() => {
		if (!toastVisible) return;

    const fadeTimer = setTimeout(() => {
      setToastFading(true);
    }, 2500)

		const removeTimer = setTimeout(() => {
		setToastVisible(false);
    setToastFading(false);
		}, 3000);

		return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);

      setToastMessage("");
      setToastTitle(undefined);
      setToastColor(undefined);
    };
	}, [toastVisible]);


  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toastVisible && (
        <Toast
          bgColor={toastColor}
          title={toastTitle}
          message={toastMessage}
          fadeOut={toastFading}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
    
    return context;
}

