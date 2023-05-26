import Head from "next/head";
import { type NextPage } from "next";
import { useUser, SignIn } from '@clerk/nextjs';
import Search from '~/components/Search';
import Navbar from '~/components/Navbar';

const Home: NextPage = () => {
  // const user = useUser();

  return ( 
    <>
      <Head>
        <title>YonicBoom</title>
        <meta name="description" content="women, nonbinary, and trans artists in dance" /> 
        <link rel="icon" href="/favicon.ico" />
        <Navbar />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFEFE7]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Search />
        </div>
      </main>
    </>
  );
};

export default Home;