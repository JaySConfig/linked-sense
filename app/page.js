import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeaturesCard from "@/components/FeaturesCard";
import ButtonSignin from "@/components/ButtonSignin";



export default function Page() {
  return (
    <>
      <header className="p-4 flex max-w-3xl mx-auto items-center justify-center">
        {/* <Head/> */}
        {/* <ButtonSignin text="Login" /> */}
        <Header />
        
      </header>
      <main>
        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 pt-12">
          <Hero/>
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 ">
        <Problem />
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 ">
        <FeaturesCard/>
        <ButtonSignin />
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 pb-24">
        <FAQ />
        </section>

        <section>
          <Footer/>
        </section>



      </main>
    </>
  );
}
