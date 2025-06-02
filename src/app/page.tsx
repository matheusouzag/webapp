"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/contas"); 
    }, 3000);

    return () => clearTimeout(timeout); 
  }, [router]);
  return (
    <main className="flex bg-black w-screen h-screen font-sans justify-center">
      <div
        className="absolute z-0 -top-[10%]  blur-[60px] bg-[#1f2937] opacity-[0.40] rounded-b-full w-[80%] h-[70%]"
      ></div>

      <div
        className="absolute z-0 bottom-32 left-0  blur-[60px] bg-[#1f2937] opacity-[0.40] rounded-b-full w-full md:w-[24rem] h-[18rem]"
      ></div>
      <div
        className="absolute z-0 bottom-0 left-0  blur-[60px] bg-[#1f2937] opacity-[0.40] rounded-b-full w-full md:w-[30rem] h-full md:h-[18rem]"
      ></div>

      <div
        className="absolute z-0 top-[50%] right-0  blur-[60px] bg-[#1f2937]  opacity-[0.40] rounded-b-full w-full md:w-[23rem] h-[17rem]"
      ></div>
       
       <section className="flex flex-col items-center justify-center w-screen h-screen font-sans z-50 animacao-delay">
        <img className="max-w-[80%]" src="images/controle+.png" alt="Logo Controle +" />
      </section>
    </main>
  );
}
