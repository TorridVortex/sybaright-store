import { getProducts } from "@/lib/fourthwall";
import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-10" />
        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-[family-name:var(--font-geist-sans)] mt-8">
            The Vault
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl font-[family-name:var(--font-inter)]">
            Exclusive drops available for a strictly limited time. Uncompromising quality.
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* Scroll Triggered Featured Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase font-[family-name:var(--font-geist-sans)]">Featured</h2>
          <Link href="/lookbook" className="text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition border-b border-black pb-1">
            View Lookbook
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {featured.map((item: any) => (
             <Link href="/lookbook" key={item.id} className="group cursor-pointer">
                <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                    {item.images?.[0]?.url && (
                        <Image 
                            src={item.images[0].url} 
                            alt={item.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
                        />
                    )}
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-bold tracking-tight uppercase">{item.name}</h3>
                </div>
             </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/lookbook" className="inline-block bg-[#050505] text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black/80 transition w-full md:w-auto">
            Access The Lookbook
          </Link>
        </div>
      </section>
    </>
  );
}
