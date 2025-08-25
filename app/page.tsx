import ContextInput from "../components/context-input";
import Header from "../components/header";
import Output from "../components/output";

export default function Home() {
  return (
    <section className="h-screen flex flex-col px-12">
      <Header />
      <main className="grid grid-cols-[2fr_6fr] gap-6 my-4 h-full overflow-hidden">
        <div className="h-full">
          <ContextInput />
        </div>
        <div className="h-full overflow-auto">
          <Output />
        </div>
      </main>
    </section>
  );
}
