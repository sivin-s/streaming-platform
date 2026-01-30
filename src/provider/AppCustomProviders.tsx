import { AuthUserProvider } from './auth/AuthUserProvider';
import { ToastifyProvider } from './ToastifyProvider'
import {WatchListStateStatusProvider} from './WatchListStatusProviders'

export const AppCustomProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
   return (
      // provider wrapper
      <WatchListStateStatusProvider>
               <ToastifyProvider>
         <AuthUserProvider>
            {children}
         </AuthUserProvider>
      </ToastifyProvider>
      </WatchListStateStatusProvider>
     
   )
}

