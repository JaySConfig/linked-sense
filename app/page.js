// import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";

// import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeaturesCard from "@/components/FeaturesCard";
import ButtonSignin from "@/components/ButtonSignin";



export default function Page() {
  return (
    <>
      <header className="p-4 flex max-w-3xl mx-auto items-center justify-center">
        {/* <Head/> */}
        {/* <ButtonSignin text="Login" /> */}
        <Suspense fallback={<div className="w-full text-center">Loading header...</div>}>
        <Header />
        </Suspense>
        
      </header>
      <main>
        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 pt-12">
          <Hero/>
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 ">
        <Problem />
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-2 px-8 ">
        <FeaturesCard/>    
        </section>

        <section className="flex flex-col items-center justify-center text-center px-8  pb-20 bg-base-100">
        <h2 className="font-extrabold text-3xl md:text-4xl mb-4">
          Ready to Grow Your LinkedIn?
        </h2>
        <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-xl">
          Create your personal LinkedIn strategy and start building your audience — without the guesswork.
        </p>
         <ButtonSignin />  
       </section>


        

        {/* <section className="flex flex-col items-center justify-center text-center gap-12 px-8 pb-24">
        <FAQ />
        </section> */}

        <section>
          <Footer/>
        </section>



      </main>
    </>
  );
}
