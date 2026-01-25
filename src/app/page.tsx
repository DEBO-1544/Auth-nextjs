import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    
    <div>
      <main className=" bg-neutral-900 font-sans text-slate-200 h-screen">
        <h1>This is Home Page</h1>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md"><Link href="/login">login</Link></button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md"><Link href="/signup">signup</Link></button>
                  </div>
      </main>
    </div>
  );
}
