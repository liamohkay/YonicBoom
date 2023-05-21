import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Search from '~/components/Search';

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
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">Yonic<span className="text-[hsl(280,100%,70%)]">Boom</span></span>
          </h1>
          <div className="grid grid-cols-1">
            <h3 className="text-2xl font-bold text-white text-center py-5">YonicBoom started construction 5/10/23.</h3>
            <div className="text-med text-white px-2">
              {`It is a community fed database aimed to amplify musical artists who identify as female, trans, non-binary and beyond.
              YonicBoom originally started as a weekly radio show in 2013, and we are excited to build the next iteration of this project.`}
            </div>
          </div>
        </div>
        <Link href="/blog">Blog</Link>
        <Search />
      </main>
    </>
  );
};

export default Home;