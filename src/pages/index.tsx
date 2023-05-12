import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>YonicBoom</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Yonic<span className="text-[hsl(280,100%,70%)]">Boom</span>
          </h1>
          <div className="grid grid-cols-1">
            <h3 className="text-2xl font-bold text-white text-center py-5">YonicBoom started construction 5/10/23.</h3>
            <div className="text-med text-white px-2">
              It is a community fed database aimed to amplify musical artists who identify as female, trans, non-binary and beyond.
              YonicBoom originally started as a weekly radio show in 2013, and we are excited to build the next iteration of this project.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://www.hollowearthradio.org/programs/27"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Listen Live →</h3>
              <div className="text-lg">
                Every Thursday 7pm - 9pm PDT
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://soundcloud.com/ssspectre"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Listen to the Arhive →</h3>
              <div className="text-lg">
                Soundcloud bitch
              </div>
            </Link>
          </div>
        </div>
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <SignIn />
    </div>
  );
};
