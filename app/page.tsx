import ContextInput from "./components/context-input";
import Header from "./components/header";

export default function Home() {
  return (
    <section className="h-svh flex flex-col px-12">
      <Header />
      {/* main content */}
      <main className="py-8 h-full grow">
        <div className="grid h-full grid-cols-[2fr_6fr] gap-4">
          {/* context feeding */}
          <div className="border p-4 h-full">
            <ContextInput />
          </div>

          {/*  */}
          <div className="border p-4">Column 2</div>
        </div>
      </main>
    </section>
  );
}
