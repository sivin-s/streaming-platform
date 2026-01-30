import { ToastifyCreateContext } from '../context/toastifyContext/ToastifyContext'
import { ToastContainer, toast } from 'react-toastify'

export const ToastifyProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const showToast = () => {
       return toast  // not implement  showToast is non usecase
    }
    return (
        <>
            <ToastifyCreateContext.Provider value={{ showToast }} >
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                    limit={2}
                // transition={'Flip'}
                />
            </ToastifyCreateContext.Provider>
        </>
    )
}