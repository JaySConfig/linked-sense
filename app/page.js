import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesGrid from "@/components/FeaturesGrid";
import CTA from "@/components/CTA";
import FeaturesListicle from "@/components/FeaturesListicle";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FeaturesAccordion from "@/components/FeaturesAccordion";



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
        <FeaturesListicle/>
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 ">
        <FeaturesGrid/>
        </section>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 ">
        <FeaturesAccordion/>
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
