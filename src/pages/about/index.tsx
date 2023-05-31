import { type NextPage } from 'next';

const About: NextPage = () => {
  return (
    <main className="flex flex-col min-h-screen items-center bg-[#FFEFE7] gap-12 px-5 py-10">
      <div className="md:w-8/12 h-[66vh] outline rounded-lg flex flex-col items-center">
        <span className="text-xl font-bold mt-4">YonicBoom!</span> 
        <br />
        <p className="text-m md:w-8/12">
        YonicBoom! is a radio show based out of Hollow Earth Radio, in Seattle's Capitol Hill area. YB has taken many forms over the years, and currently is run by Andrea Nela. It began as a skill share show in 2014 and has been on air ever since.
        <br />
        <br />
        This database will serve to highlight women and non-binary artists across all sub genres of dance music. If you're interested in adding a name, drop a line! 
        <br />
        <br />
        This space will be used in future to highlight artists and releases. 
        <br />
        <br />
        Cheers! 
        <br />
        YB 
      </p>
      </div>
    </main> 
  )
}

export default About;