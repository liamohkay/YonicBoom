import "~/styles/globals.css";
import { api } from "~/utils/api";
import { type AppType, AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Navbar from '~/components/Navbar';
 
const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <Navbar />
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);