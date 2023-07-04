import "~/styles/globals.css";
import { api } from "~/utils/api";
import { type AppType, AppProps } from "next/app";
import { useRouter } from "next/router";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Navbar from '~/components/Navbar';

const publicPages = [
  '/' ,
  '/sign-in/[[...index]]',
  '/sign-up/[[...index]]',
  '/about/[[...index]]',
  '/data/[[...index]]'
];
 
const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname)
  return (
    <ClerkProvider {...pageProps} navigate={'/'}>
      { isPublicPage ? (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
        ) : (
        <>
          <SignedIn>
            <Navbar />
            <Component {...pageProps} />
          </SignedIn>
          {/* <SignedOut>
            <RedirectToSignIn />
          </SignedOut> */}
        </>
      )}
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);