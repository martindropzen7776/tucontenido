import { Nav, Footer, WaFab } from "@/components/site/chrome";
import { Hero } from "@/components/site/hero";
import { Diff } from "@/components/site/diff";
import { Incluye, Semana, Trabajos, Precio, Preguntas, Cierre } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Diff />
      <Incluye />
      <Semana />
      <Trabajos />
      <Precio />
      <Preguntas />
      <Cierre />
      <Footer />
      <WaFab />
    </>
  );
}
