import { createContext } from "react";

interface ToastifyContextType {
    showToast: () => any;
}

export const ToastifyCreateContext = createContext<ToastifyContextType | undefined>(undefined)