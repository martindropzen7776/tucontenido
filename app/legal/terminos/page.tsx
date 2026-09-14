import type { Metadata } from "next";
import { TITULAR, DIAS_ARREPENTIMIENTO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones — Tu Contenido",
  description:
    "Condiciones de los servicios de publicidad paga y de diseño web de Tu Contenido.",
  robots: { index: true, follow: true },
};

/* Tres partes: publicidad paga (la agencia, en la raíz), diseño web
   (/web) y lo que vale para los dos. La agencia no tiene precio
   publicado, así que honorarios, alcance y duración se remiten a la
   propuesta escrita; acá solo van las reglas por defecto para cuando
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
        Ofrecemos dos servicios: la <strong>gestión de publicidad paga</strong> y el{" "}
        <strong>diseño web</strong>. Estas condiciones tienen una parte para cada
        uno y una parte que vale para los dos. Contratar cualquiera de ellos implica
        aceptarlas. Si no estás de acuerdo con alguna, no contrates: es preferible
        discutirlo antes.
      </p>

      {/* ══════════ PUBLICIDAD PAGA ══════════ */}

      <h2>Servicio de publicidad paga</h2>

      <h3>Qué incluye</h3>
      <p>
        Gestión de campañas en Meta (Facebook e Instagram), estrategia de
        publicidad paga, producción de anuncios y textos, campañas de marca
        personal, medición y reportes, y landings para las campañas. Otras
        plataformas se suman solo si se acuerdan.
      </p>
      <p>
        El alcance concreto —qué servicios, en qué plataformas, cuántos anuncios y
        cada cuánto se reporta— se define en una <strong>propuesta por escrito</strong>{" "}
        antes de empezar. Lo que no figure en la propuesta no está incluido.
      </p>

      <h3>Diagnóstico sin cargo</h3>
      <p>
        El diagnóstico inicial es gratuito y <strong>no te obliga a contratar</strong>.
        Para hacerlo podemos pedirte un acceso limitado a tu cuenta publicitaria.
        Usamos esa información únicamente para el diagnóstico, y podés quitarnos el
        acceso cuando quieras.
      </p>

      <h3>Honorarios y forma de pago</h3>
      <p>
        Los honorarios, su periodicidad y la forma de pago se fijan en la propuesta.
        Aceptamos transferencia bancaria, Mercado Pago y USDT; si pagás en USDT, el
        importe se calcula al tipo de cambio del día de pago. Los honorarios
        acordados no cambian mientras dure el período ya pactado.
      </p>

      <h3>La inversión en publicidad no es nuestra</h3>
      <p>
        Lo que se le paga a Meta u otra plataforma para mostrar los anuncios{" "}
        <strong>no forma parte de nuestros honorarios</strong>. Salvo que la
        propuesta diga otra cosa, lo abonás vos directamente a la plataforma, desde
        una cuenta publicitaria a tu nombre y con tu propio medio de pago. El monto
        lo decidís vos; nosotros te recomendamos cuánto invertir y cómo repartirlo.
      </p>

      <h3>Las cuentas son tuyas</h3>
      <p>
        Las cuentas publicitarias, páginas, perfiles, píxeles y audiencias son
        tuyos. Para trabajar nos das acceso a ellos, y{" "}
        <strong>podés retirarlo en cualquier momento</strong> sin consultarnos. Al
        terminar el servicio dejamos de usar esos accesos y te pedimos que los
        retires, si no lo hiciste antes.
      </p>

      <h3>Qué se anuncia</h3>
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

      <h3>Las decisiones de las plataformas</h3>
      <p>
        Meta y las demás plataformas pueden rechazar anuncios, limitar su alcance,
        cambiar sus reglas o restringir cuentas por decisión propia. Hacemos lo
        razonable para evitarlo y para apelar cuando corresponde, pero{" "}
        <strong>no controlamos esas decisiones ni respondemos por ellas</strong>.
      </p>

      <h3>Duración y finalización</h3>
      <p>
        La duración se fija en la propuesta. Si la propuesta no dice nada,
        cualquiera de las dos partes puede terminar el servicio avisando por
        escrito, y se abona lo trabajado hasta la fecha de finalización. La baja
        también se puede pedir desde el{" "}
        <a href="/legal/arrepentimiento">botón de baja</a>, sin trámites previos.
      </p>

      {/* ══════════ DISEÑO WEB ══════════ */}

      <h2>Servicio de diseño web</h2>

      <h3>Qué incluye</h3>
      <p>
        Por el precio publicado de <strong>$500.000</strong> entregamos un sitio web
        de hasta seis secciones, con diseño propio, adaptado a teléfono y
        computadora, con los textos redactados por nosotros, configuración básica
        para buscadores, integración de WhatsApp y formulario de contacto, hasta{" "}
        <strong>dos rondas de ajustes</strong> y una{" "}
        <strong>capacitación para que puedas administrarlo vos</strong>.
      </p>
      <p>
        <strong>No incluye:</strong> tienda online con carrito o pagos, sistemas de
        turnos o reservas, más de seis secciones, blog con carga de contenidos ni
        producción fotográfica. Cualquiera de esas cosas se cotiza aparte y se
        acuerda por escrito antes de empezar. La gestión de campañas publicitarias
        es un servicio distinto, con las condiciones de la parte anterior.
      </p>

      <h3>Plazos</h3>
      <p>
        El plazo de entrega es de <strong>siete días corridos</strong>, y empieza a
        correr cuando recibimos el material completo (logo, fotos, datos de
        contacto y la información del formulario inicial), no desde el pago. Si el
        material llega incompleto o tarde, el plazo se corre en la misma medida.
      </p>
      <p>
        Las dos rondas de ajustes incluidas deben pedirse dentro de los quince días
        de entregado el primer boceto. Los cambios de una misma ronda se envían
        juntos.
      </p>

      <h3>Precio y forma de pago</h3>
      <p>
        El precio es de <strong>$500.000 (quinientos mil pesos argentinos)</strong>,
        en un único pago por el trabajo, sin cuotas mensuales de nuestra parte. Se
        abona <strong>50% para comenzar y 50% contra entrega</strong>. Aceptamos
        transferencia bancaria, Mercado Pago y USDT; si pagás en USDT, el importe
        se calcula al tipo de cambio del día de pago.
      </p>
      <p>
        El precio publicado puede cambiar en cualquier momento, pero{" "}
        <strong>nunca para un trabajo ya iniciado</strong>: el que rige es el
        vigente al momento de aceptar el presupuesto.
      </p>

      <h3>Alojamiento: un costo que no pagás a nosotros</h3>
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

      <h3>Titularidad y transferencia</h3>
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

      <h3>Mantenimiento y cambios posteriores</h3>
      <p>
        El precio <strong>no incluye mantenimiento</strong>. En su lugar, te
        entregamos el sitio llave en mano y te enseñamos, sin cargo, a
        administrarlo: cómo cambiar textos, fotos, precios, horarios y datos de
        contacto, y cómo mantenerlo al día. Si después de la entrega te surge una
        duda sobre cómo hacer alguno de esos cambios, te lo volvemos a explicar sin
        costo.
      </p>
      <p>
        Secciones nuevas, rediseños o funcionalidades que no estaban en el alcance
        original se presupuestan aparte y se acuerdan por escrito antes de empezar.
      </p>

      {/* ══════════ PARA LOS DOS ══════════ */}

      <h2>Condiciones para los dos servicios</h2>

      <h3>Qué no prometemos</h3>
      <p>
        <strong>No garantizamos resultados comerciales.</strong> En diseño web,
        entregamos un sitio funcional, con diseño propio y correctamente
        configurado, pero no una cantidad determinada de clientes, consultas o
        ventas, ni una posición específica en Google. En publicidad paga, no
        garantizamos un retorno sobre la inversión, un costo por resultado ni un
        volumen de ventas.
      </p>
      <p>
        Los resultados dependen de tu producto, tu precio, tu oferta, tu rubro, tu
        competencia, el presupuesto y las decisiones de las plataformas, muchas
        variables que no controlamos. Desconfiá de quien te los prometa.
      </p>

      <h3>Uso de inteligencia artificial</h3>
      <p>
        Usamos herramientas de inteligencia artificial en partes del proceso de
        diseño, redacción, programación y producción de anuncios. El resultado
        siempre lo revisa y aprueba una persona antes de entregártelo o de
        publicarlo, y respondemos por él como si estuviera hecho enteramente a
        mano. Te lo contamos porque nos parece que corresponde saberlo, no porque
        cambie lo que recibís.
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
        Si al prestarte un servicio accedemos a datos personales de tus clientes o
        prospectos, los tratamos por cuenta tuya y solo para prestarte ese servicio,
        como se explica en la{" "}
        <a href="/legal/privacidad">política de privacidad</a>.
      </p>

      <h3>Responsabilidad</h3>
      <p>
        Respondemos por la correcta ejecución del trabajo contratado. No respondemos
        por caídas, cambios de precio o discontinuación de servicios de terceros
        (plataformas de publicidad, plataforma de alojamiento, registrador de
        dominios, WhatsApp, Google), ni por las decisiones de esas plataformas sobre
        tus anuncios o tus cuentas, ni por el uso que hagas del sitio o de las
        cuentas por tu cuenta, ni por daños indirectos o lucro cesante.
      </p>
      <p>
        En cualquier caso, nuestra responsabilidad máxima está limitada a los
        honorarios que nos hayas pagado por el servicio en cuestión. La inversión
        publicitaria abonada a las plataformas no forma parte de ese importe.
      </p>

      <h3>Arrepentimiento y baja</h3>
      <p>
        Si el servicio fue contratado a distancia y te alcanza la Ley 24.240 de
        Defensa del Consumidor, tenés <strong>{DIAS_ARREPENTIMIENTO} días corridos</strong>{" "}
        para arrepentirte sin dar explicaciones, y podés hacerlo desde el{" "}
        <a href="/legal/arrepentimiento">botón de arrepentimiento</a>, sin registrarte
        ni hacer ningún trámite previo. Desde esa misma página podés pedir la baja
        de un servicio en curso.
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
