import type { Metadata } from "next";
import { TITULAR, DIAS_ARREPENTIMIENTO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones — Tu Contenido",
  description:
    "Condiciones del servicio de diseño web de Tu Contenido, con y sin sistema de reservas.",
  robots: { index: true, follow: true },
};

/* Un servicio, diseño web, en dos planes: la web sola y la web con
   sistema de reservas. Hasta el 17/09/2026 había además un servicio de
   publicidad paga (la agencia), que se sacó del sitio. */
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
        Ofrecemos <strong>diseño web</strong> en dos planes: la web y la web con
        sistema de reservas. Contratar cualquiera de ellos implica aceptar estas
        condiciones. Si no estás de acuerdo con alguna, no contrates: es preferible
        discutirlo antes.
      </p>

      <h2>Qué incluye cada plan</h2>

      <h3>Web</h3>
      <p>
        Por el precio publicado de <strong>$500.000</strong> entregamos un sitio web
        de hasta seis secciones, con diseño propio, adaptado a teléfono y
        computadora, con los textos redactados por nosotros, configuración básica
        para buscadores, integración de WhatsApp y formulario de contacto, hasta{" "}
        <strong>dos rondas de ajustes</strong> y una{" "}
        <strong>capacitación para que puedas administrarlo vos</strong>.
      </p>

      <h3>Web con reservas</h3>
      <p>
        Por el precio publicado de <strong>$700.000</strong> entregamos todo lo
        anterior más un <strong>sistema de reservas</strong>: reservas online desde
        el sitio, agenda de turnos, ficha de cada cliente con su historial y
        recordatorios automáticos antes del turno.
      </p>
      <p>
        El mantenimiento del sistema de reservas es <strong>opcional</strong> y
        cuesta <strong>$50.000 por mes</strong>. No es condición para contratar el
        plan, y su alcance se detalla por escrito al contratarlo.
      </p>

      <h3>Lo que no incluye ninguno</h3>
      <p>
        Tienda online con carrito o pagos, más de seis secciones, blog con carga de
        contenidos ni producción fotográfica. Cualquiera de esas cosas se cotiza
        aparte y se acuerda por escrito antes de empezar.
      </p>

      <h2>Plazos</h2>
      <p>
        El plazo de entrega es de <strong>siete días corridos</strong> en los dos
        planes, y empieza a correr cuando recibimos el material completo (logo,
        fotos, datos de contacto y la información del formulario inicial), no desde
        el pago. Si el material llega incompleto o tarde, el plazo se corre en la
        misma medida.
      </p>
      <p>
        Las dos rondas de ajustes incluidas deben pedirse dentro de los quince días
        de entregado el primer boceto. Los cambios de una misma ronda se envían
        juntos.
      </p>

      <h2>Precio y forma de pago</h2>
      <p>
        El precio es de <strong>$500.000 (quinientos mil pesos argentinos)</strong>{" "}
        por la web y de <strong>$700.000 (setecientos mil pesos argentinos)</strong>{" "}
        por la web con reservas, en un único pago por el trabajo. Se abona{" "}
        <strong>50% para comenzar y 50% contra entrega</strong>. Aceptamos
        transferencia bancaria, Mercado Pago y USDT; si pagás en USDT, el importe
        se calcula al tipo de cambio del día de pago.
      </p>
      <p>
        Fuera del mantenimiento opcional del sistema de reservas, no cobramos
        cuotas mensuales. Los precios publicados pueden cambiar en cualquier
        momento, pero <strong>nunca para un trabajo ya iniciado</strong>: el que
        rige es el vigente al momento de aceptar el presupuesto.
      </p>

      <h2>Alojamiento: un costo que no pagás a nosotros</h2>
      <p>
        El sitio se aloja en una plataforma de terceros cuyo costo aproximado es de{" "}
        <strong>USD 10 por mes</strong>. Ese importe{" "}
        <strong>no está incluido en el precio y no se nos paga a nosotros</strong>:
        lo abonás vos, directamente a la plataforma, con tu propia tarjeta habilitada
        para pagos internacionales.
      </p>
      <p>
        Es una decisión deliberada: así el sitio queda a tu nombre y podés
        prescindir de nosotros cuando quieras. También significa que{" "}
        <strong>si dejás de pagarlo, el sitio deja de estar online</strong>, y eso no
        depende de nosotros. El precio de la plataforma lo fija la plataforma y puede
        variar.
      </p>

      <h2>Titularidad y transferencia</h2>
      <p>
        Al completarse el pago te transferimos el proyecto a tu cuenta y el dominio
        se registra a tu nombre. Desde ese momento{" "}
        <strong>el sitio es tuyo</strong>: podés modificarlo, contratar a otro
        proveedor o darlo de baja sin consultarnos.
      </p>
      <p>
        Vos sos responsable de que los textos, imágenes, logos y datos que nos
        entregues sean tuyos o tengas derecho a usarlos. Nos autorizás a mostrar el
        trabajo terminado en nuestro portafolio, salvo que nos pidas lo contrario por
        escrito.
      </p>

      <h2>Mantenimiento y cambios posteriores</h2>
      <p>
        La web no incluye mantenimiento. En su lugar, te entregamos el sitio llave
        en mano y te enseñamos, sin cargo, a administrarlo: cómo cambiar textos,
        fotos, precios, horarios y datos de contacto, y cómo mantenerlo al día. Si
        después de la entrega te surge una duda sobre cómo hacer alguno de esos
        cambios, te lo volvemos a explicar sin costo.
      </p>
      <p>
        Secciones nuevas, rediseños o funcionalidades que no estaban en el alcance
        original se presupuestan aparte y se acuerdan por escrito antes de empezar.
      </p>

      <h2>Condiciones generales</h2>

      <h3>Qué no prometemos</h3>
      <p>
        <strong>No garantizamos resultados comerciales.</strong> Entregamos un sitio
        funcional, con diseño propio y correctamente configurado, pero no una
        cantidad determinada de clientes, consultas, reservas o ventas, ni una
        posición específica en Google.
      </p>
      <p>
        Los resultados dependen de tu producto, tu precio, tu oferta, tu rubro y tu
        competencia, muchas variables que no controlamos. Desconfiá de quien te los
        prometa.
      </p>

      <h3>Uso de inteligencia artificial</h3>
      <p>
        Usamos herramientas de inteligencia artificial en partes del proceso de
        diseño, redacción y programación. El resultado siempre lo revisa y aprueba
        una persona antes de entregártelo o de publicarlo, y respondemos por él como
        si estuviera hecho enteramente a mano. Te lo contamos porque nos parece que
        corresponde saberlo, no porque cambie lo que recibís.
      </p>
      <p>
        Los textos que redactamos son originales para tu proyecto. Si nos entregás
        contenido, imágenes o marcas de terceros, la responsabilidad por su uso es
        tuya.
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
        En la web con reservas, el sistema guarda datos personales de tus clientes:
        los que dejan al reservar y los que cargues en su ficha. Respecto de esos
        datos el responsable sos vos, y nosotros los tratamos por cuenta tuya y
        solo para prestarte el servicio, como se explica en la{" "}
        <a href="/legal/privacidad">política de privacidad</a>.
      </p>

      <h3>Responsabilidad</h3>
      <p>
        Respondemos por la correcta ejecución del trabajo contratado. No respondemos
        por caídas, cambios de precio o discontinuación de servicios de terceros
        (plataforma de alojamiento, registrador de dominios, WhatsApp, Google), ni
        por el uso que hagas del sitio o del sistema de reservas por tu cuenta, ni
        por daños indirectos o lucro cesante.
      </p>
      <p>
        En cualquier caso, nuestra responsabilidad máxima está limitada a los
        honorarios que nos hayas pagado por el servicio en cuestión.
      </p>

      <h3>Arrepentimiento y baja</h3>
      <p>
        Si el servicio fue contratado a distancia y te alcanza la Ley 24.240 de
        Defensa del Consumidor, tenés <strong>{DIAS_ARREPENTIMIENTO} días corridos</strong>{" "}
        para arrepentirte sin dar explicaciones, y podés hacerlo desde el{" "}
        <a href="/legal/arrepentimiento">botón de arrepentimiento</a>, sin registrarte
        ni hacer ningún trámite previo. Desde esa misma página podés dar de baja el
        mantenimiento mensual, si lo contrataste.
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
        se aplican retroactivamente a trabajos ya contratados.
      </p>
    </>
  );
}
