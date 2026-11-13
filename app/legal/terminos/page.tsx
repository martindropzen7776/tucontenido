import type { Metadata } from "next";
import { TITULAR, DIAS_ARREPENTIMIENTO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones — Tu Contenido",
  description:
    "Condiciones del servicio de gestión de publicidad en Meta y Google de Tu Contenido.",
  robots: { index: true, follow: true },
};

/* Un servicio: la gestión de publicidad paga en Meta y Google. Hasta
   el 13/11/2026 el sitio vendía diseño web ($500.000), que se sacó; sus
   condiciones están en el historial de git. Los honorarios no tienen
   precio publicado, así que alcance, honorarios y duración se remiten
   a la propuesta escrita; acá van las reglas por defecto para cuando
   la propuesta no dice nada. */
export default function Terminos() {
  return (
    <>
      <h1>Términos y condiciones</h1>

      <p>
        Este sitio y los servicios que se ofrecen en él pertenecen a{" "}
        <strong>{TITULAR.marca}</strong>, proveedor independiente con actividad en{" "}
        {TITULAR.jurisdiccion}. Para consultas, reclamos o cualquier gestión:{" "}
        <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>.
      </p>
      <p>
        Los datos fiscales completos del titular —razón social, CUIT y domicilio—
        se entregan <strong>a quien los solicite</strong> por esa misma casilla, y
        constan en la factura de cualquier trabajo contratado.
      </p>
      <p>
        Ofrecemos la <strong>gestión de publicidad paga en Meta y Google</strong>.
        Contratarla implica aceptar estas condiciones. Si no estás de acuerdo con
        alguna, no contrates: es preferible discutirlo antes.
      </p>

      <h2>Qué incluye</h2>
      <p>
        Estrategia de publicidad paga, armado y gestión de campañas en Meta
        (Facebook, Instagram, Messenger y WhatsApp) y en Google Ads (Búsqueda,
        Performance Max, YouTube y Display), producción de anuncios y textos,
        configuración de la medición y reportes. Otras plataformas se suman solo
        si se acuerdan.
      </p>
      <p>
        El alcance concreto —qué plataformas, cuántas campañas y anuncios, y cada
        cuánto se reporta— se define en una <strong>propuesta por escrito</strong>{" "}
        antes de empezar. Lo que no figure en la propuesta no está incluido.
      </p>

      <h3>Lo que no incluye</h3>
      <p>
        Diseño o desarrollo de sitios web, manejo de redes sociales y
        publicaciones orgánicas, y producción fotográfica o audiovisual en tu
        negocio. Tampoco la inversión en anuncios, que se explica más abajo.
      </p>

      <h2>Diagnóstico sin cargo</h2>
      <p>
        El diagnóstico inicial es gratuito y <strong>no te obliga a contratar</strong>.
        Para hacerlo podemos pedirte un acceso limitado a tus cuentas publicitarias.
        Usamos esa información únicamente para el diagnóstico, y podés quitarnos el
        acceso cuando quieras.
      </p>

      <h2>Honorarios y forma de pago</h2>
      <p>
        Los honorarios por la gestión son mensuales y su monto se fija en la
        propuesta. Aceptamos transferencia bancaria, Mercado Pago y USDT; si pagás
        en USDT, el importe se calcula al tipo de cambio del día de pago. Los
        honorarios acordados no cambian mientras dure el período ya pactado.
      </p>
      <p>
        Salvo que la propuesta diga otra cosa, el servicio es{" "}
        <strong>mes a mes y sin permanencia</strong>: podés darlo de baja cuando
        quieras, y desde la baja no se generan nuevos cargos.
      </p>

      <h2>La inversión en publicidad no es nuestra</h2>
      <p>
        Lo que se le paga a Meta, a Google o a otra plataforma para mostrar los
        anuncios <strong>no forma parte de nuestros honorarios</strong>. Salvo que
        la propuesta diga otra cosa, lo abonás vos directamente a la plataforma,
        desde una cuenta publicitaria a tu nombre y con tu propio medio de pago. El
        monto lo decidís vos; nosotros te recomendamos cuánto invertir y cómo
        repartirlo.
      </p>

      <h2>Las cuentas son tuyas</h2>
      <p>
        Las cuentas publicitarias, páginas, perfiles, píxeles, etiquetas de
        conversión y audiencias son tuyos. Para trabajar nos das acceso a ellos, y{" "}
        <strong>podés retirarlo en cualquier momento</strong> sin consultarnos. Al
        terminar el servicio dejamos de usar esos accesos y te pedimos que los
        retires, si no lo hiciste antes. El historial de las campañas queda en tus
        cuentas.
      </p>

      <h2>Qué se anuncia</h2>
      <p>
        Vos sos responsable de que lo que se anuncia sea legal y cierto: productos,
        precios, promociones, condiciones y cualquier afirmación sobre tu negocio.
        También, de que los textos, imágenes y marcas que nos entregues sean tuyos o
        tengas derecho a usarlos.
      </p>
      <p>
        Respetamos las políticas publicitarias de cada plataforma, y podemos
        negarnos a publicar un anuncio que las infrinja o que infrinja la ley. Salvo
        que nos pidas lo contrario por escrito, podemos mostrar los anuncios que
        produjimos en nuestro portafolio, pero nunca tus números de rendimiento sin
        tu autorización.
      </p>

      <h2>Las decisiones de las plataformas</h2>
      <p>
        Meta, Google y las demás plataformas pueden rechazar anuncios, limitar su
        alcance, cambiar sus reglas o sus precios, o restringir cuentas por decisión
        propia. Hacemos lo razonable para evitarlo y para apelar cuando corresponde,
        pero <strong>no controlamos esas decisiones ni respondemos por ellas</strong>.
      </p>

      <h2>Condiciones generales</h2>

      <h3>Qué no prometemos</h3>
      <p>
        <strong>No garantizamos resultados comerciales.</strong> Nos comprometemos a
        gestionar las campañas con criterio profesional y a mostrarte los números
        tal como son, pero no una cantidad determinada de clientes, consultas o
        ventas, ni un costo por resultado específico.
      </p>
      <p>
        Los resultados dependen de tu producto, tu precio, tu oferta, tu rubro, tu
        competencia y las propias plataformas, muchas variables que no controlamos.
        Desconfiá de quien te los prometa.
      </p>

      <h3>Uso de inteligencia artificial</h3>
      <p>
        Usamos herramientas de inteligencia artificial en partes del proceso de
        producción de anuncios, redacción y análisis. El resultado siempre lo revisa
        y aprueba una persona antes de publicarlo, y respondemos por él como si
        estuviera hecho enteramente a mano. Te lo contamos porque nos parece que
        corresponde saberlo, no porque cambie lo que recibís.
      </p>

      <h3>No tenemos relación con Meta, Google ni ninguna plataforma</h3>
      <p>
        {TITULAR.marca} es un proveedor independiente.{" "}
        <strong>
          No estamos asociados, patrocinados, avalados ni administrados por Meta
          Platforms (Facebook, Instagram, WhatsApp), Google, ni por ninguna de las
          plataformas que mencionamos o utilizamos.
        </strong>{" "}
        Sus marcas pertenecen a sus respectivos titulares y las nombramos únicamente
        para describir servicios.
      </p>
      <p>
        Si llegaste acá desde un anuncio, ese anuncio es nuestro y no de la
        plataforma donde lo viste. Cualquier reclamo sobre nuestro servicio es con
        nosotros.
      </p>

      <h3>Datos de tus clientes</h3>
      <p>
        Si las campañas usan datos personales de tus clientes —listas para armar
        públicos o los datos que dejan en los formularios de tus anuncios—, el
        responsable de esos datos sos vos, y nosotros los tratamos por cuenta tuya y
        solo para prestarte el servicio, como se explica en la{" "}
        <a href="/legal/privacidad">política de privacidad</a>.
      </p>

      <h3>Responsabilidad</h3>
      <p>
        Respondemos por la correcta ejecución del trabajo contratado. No respondemos
        por caídas, cambios de reglas o de precio, rechazos de anuncios o
        restricciones de cuentas decididos por las plataformas, ni por el uso que
        hagas de las cuentas por tu cuenta, ni por daños indirectos o lucro cesante.
      </p>
      <p>
        En cualquier caso, nuestra responsabilidad máxima está limitada a los
        honorarios que nos hayas pagado por el servicio en cuestión. La inversión en
        anuncios, que se le paga a cada plataforma, no cuenta como honorarios.
      </p>

      <h3>Arrepentimiento y baja</h3>
      <p>
        Si el servicio fue contratado a distancia y te alcanza la Ley 24.240 de
        Defensa del Consumidor, tenés <strong>{DIAS_ARREPENTIMIENTO} días corridos</strong>{" "}
        para arrepentirte sin dar explicaciones, y podés hacerlo desde el{" "}
        <a href="/legal/arrepentimiento">botón de arrepentimiento</a>, sin registrarte
        ni hacer ningún trámite previo. Desde esa misma página podés dar de baja la
        gestión mensual.
      </p>

      <h3>Ley aplicable</h3>
      <p>
        Estas condiciones se rigen por las leyes de la República Argentina. Ante
        cualquier controversia, nos sometemos a los tribunales ordinarios de la
        Ciudad Autónoma de Buenos Aires, sin perjuicio del fuero que corresponda al
        consumidor cuando la ley se lo reconozca.
      </p>
      <p>
        Podemos actualizar estos términos. La versión vigente es siempre la publicada
        en esta página, con su fecha de última actualización al pie. Los cambios no
        se aplican retroactivamente a servicios ya contratados.
      </p>
    </>
  );
}
