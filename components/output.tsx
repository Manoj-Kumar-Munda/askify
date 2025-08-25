"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

const Output = () => {
  const [chatInput, setChatInput] = useState("");

  const handleSend = () => {
    // Handle send message
    setChatInput("");
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
      setChatInput("");
    }
  };
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="grow overflow-y-auto h-full no-scrollbar">
        <h2 className="text-lg font-semibold">Output</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo amet
          totam earum et architecto. Voluptas deserunt soluta quis veritatis
          consequuntur! Ipsum ex similique id officia, nobis deleniti
          architecto, nesciunt voluptate tempore voluptates voluptatem tenetur
          veniam, consequatur rerum officiis modi magni rem ullam ad in? Beatae
          delectus distinctio praesentium illo veritatis corporis omnis
          sapiente, iure adipisci eligendi cupiditate est similique quo odit
          doloribus eum, rem error fugiat incidunt quasi fugit minima? Quaerat
          animi hic dolorem suscipit pariatur cum numquam eligendi ut, quo
          architecto vero eum ipsum accusantium doloribus modi culpa! Similique
          laboriosam vel quae consequuntur, atque doloremque porro sit excepturi
          cumque cupiditate, adipisci aut voluptates officiis quos, et fugiat
          placeat dolor distinctio quibusdam? Repellat doloremque ratione
          exercitationem voluptatibus rem nihil quasi neque alias? Explicabo aut
          est molestiae harum eum ea autem tempora a incidunt optio earum
          placeat officia, debitis repellat fuga nemo perferendis veritatis
          atque quasi nam ab sint. Nobis laboriosam deserunt consectetur
          perferendis recusandae maiores quidem eos iusto aliquid nostrum saepe
          ipsam natus error veniam, iste magni ea dolore reiciendis. Ratione
          iure modi dolorum soluta vero voluptas explicabo? Similique nesciunt
          molestiae dolore dolorem voluptate. Dolore assumenda tenetur harum sed
          laboriosam officia aut, illum expedita voluptate laudantium esse,
          alias dolores ex consectetur provident quis. Repudiandae tempora, hic
          in esse facere, eum debitis exercitationem doloribus perferendis
          accusantium illo odit obcaecati possimus a officia sunt harum
          distinctio. Consequatur quod deleniti perferendis necessitatibus
          laborum eaque modi dolorem unde iure ullam, possimus dicta
          exercitationem aliquid error natus perspiciatis nihil sint tempora
          saepe? Nihil incidunt, harum ipsam deserunt consectetur dolorum iure
          nulla dignissimos alias, porro molestias repellat voluptates sint
          laborum sapiente inventore. Numquam molestias mollitia officiis,
          dolores ullam possimus esse totam iusto reprehenderit provident minus
          voluptas labore eveniet repudiandae quidem accusamus, asperiores
          voluptatum, accusantium consequuntur eum hic adipisci veniam
          cupiditate odio. Veniam consectetur magnam nesciunt repudiandae
          distinctio amet ab quam! Nobis recusandae provident, quasi explicabo
          nisi cum sunt distinctio id cumque labore quos quaerat veniam corrupti
          consectetur esse ipsum perspiciatis debitis minus rem, quia vel,
          libero officiis. Quidem rem, non harum reiciendis nam error dolore
          voluptas. Sunt aspernatur, excepturi commodi enim reprehenderit
          inventore est asperiores? Consequuntur nam doloribus ipsa quaerat, cum
          omnis dolorem consectetur, nostrum laudantium deserunt aspernatur
          repellendus magnam ducimus officiis iusto recusandae cumque debitis
          commodi voluptatem labore in harum quas dolorum. Consequatur sed
          doloremque fugiat! Molestias adipisci cupiditate nihil repellat earum
          animi quae, sed sunt reiciendis officia, sequi porro, necessitatibus
          culpa ad! Unde repudiandae dicta ex rem eum! Consequatur iure
          inventore qui ipsa vero, dolore in itaque ex placeat dicta possimus
          laborum explicabo velit maiores impedit corporis magnam quos molestias
          consectetur officiis odit quis rem alias dolorem. Illo facilis alias
          ab sapiente quae? Quisquam architecto explicabo voluptates quidem,
          eius fugit, dicta, ad asperiores excepturi quas modi dignissimos. At
          nemo esse exercitationem, facilis suscipit assumenda magni recusandae
          distinctio vitae! Neque nobis maxime officia numquam aspernatur ipsam?
          Laboriosam nisi vitae rem natus sunt ipsa ipsum quaerat sequi? Fuga
          laudantium ullam explicabo ipsam nihil, animi quam libero labore
          adipisci deserunt quod. Distinctio nesciunt maiores doloremque maxime
          officia!
        </p>
      </div>

      <form className="flex gap-2 items-center border-t py-2">
        <Input
          className="border-none outline-none focus-visible:ring-0"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={keyDownHandler}
        />
        <Button onClick={handleSend}>
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default Output;
