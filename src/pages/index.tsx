import Head from "next/head";
import { type NextPage } from "next";
import Discover from '~/components/Discover';
import Navbar from '~/components/Navbar';

const Home: NextPage = () => {
  return ( 
    <>
      <Head>
        <title>YonicBoom</title>
        <meta name="description" content="women, nonbinary, and trans artists in dance" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFEFE7]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Discover />
        </div>
      </main>
    </>
  );
};

export default Home;