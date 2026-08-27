import type { Metadata } from "next";
import { TITULAR, DIAS_ARREPENTIMIENTO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones — Tu Contenido",
  description: "Condiciones del servicio de diseño web de Tu Contenido.",
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return (
    <>
      <h1>Términos y condiciones</h1>

      <p>
        Este sitio y el servicio de diseño web que se ofrece en él pertenecen a{" "}
        <strong>{TITULAR.nombre}</strong>, CUIT {TITULAR.cuit}, con domicilio en{" "}
        {TITULAR.domicilio}, que opera bajo el nombre comercial {TITULAR.marca}.
        Para cualquier consulta o reclamo: <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>.
      </p>
      <p>
        Contratar el servicio implica aceptar estas condiciones. Si no estás de
        acuerdo con alguna, no contrates: es preferible discutirlo antes.
      </p>

      <h2>Qué incluye el servicio</h2>
      <p>
        Por el precio publicado de <strong>USD 500</strong> entregamos un sitio web
        de hasta seis secciones, con diseño propio, adaptado a teléfono y
        computadora, con los textos redactados por nosotros, configuración básica
        para buscadores, integración de WhatsApp y formulario de contacto, y hasta{" "}
        <strong>dos rondas de ajustes</strong>.
      </p>
      <p>
        <strong>No incluye:</strong> tienda online con carrito o pagos, sistemas de
        turnos o reservas, más de seis secciones, blog con carga de contenidos,
        producción fotográfica ni gestión de campañas publicitarias. Cualquiera de
        esas cosas se cotiza aparte y se acuerda por escrito antes de empezar.
      </p>

      <h2>Plazos</h2>
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

      <h2>Precio y forma de pago</h2>
      <p>
        El precio es de USD 500, o su equivalente en pesos al tipo de cambio del día
        de pago. Se abona <strong>50% para comenzar y 50% contra entrega</strong>.
        Aceptamos transferencia bancaria, Mercado Pago y USDT.
      </p>
      <p>
        El precio publicado puede cambiar en cualquier momento, pero{" "}
        <strong>nunca para un trabajo ya iniciado</strong>: el que rige es el
        vigente al momento de aceptar el presupuesto.
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

      <h2>Cambios posteriores</h2>
      <p>
        Después de la entrega hacemos sin cargo los cambios menores: textos, fotos,
        precios, horarios y datos de contacto. Secciones nuevas, rediseños o
        funcionalidades que no estaban en el alcance original se presupuestan aparte.
        Esto es una práctica comercial, no una obligación contractual, y podemos
        discontinuarla avisando.
      </p>

      <h2>Qué no prometemos</h2>
      <p>
        Entregamos un sitio funcional, con diseño propio y correctamente configurado.{" "}
        <strong>No garantizamos resultados comerciales</strong>: ni una cantidad
        determinada de clientes, consultas o ventas, ni una posición específica en
        Google. Eso depende de tu rubro, tu competencia, tu zona y muchas variables
        que no controlamos, y desconfiá de quien te lo prometa.
      </p>

      <h2>Uso de inteligencia artificial</h2>
      <p>
        Usamos herramientas de inteligencia artificial en partes del proceso de
        diseño, redacción y programación. El resultado siempre lo revisa y aprueba
        una persona antes de entregártelo, y respondemos por él como si estuviera
        hecho enteramente a mano. Te lo contamos porque nos parece que corresponde
        saberlo, no porque cambie lo que recibís.
      </p>
      <p>
        Los textos que redactamos son originales para tu proyecto. Si nos entregás
        contenido, imágenes o marcas de terceros, la responsabilidad por su uso es
        tuya.
      </p>

      <h2>No tenemos relación con Meta, Google ni ninguna plataforma</h2>
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

      <h2>Responsabilidad</h2>
      <p>
        Respondemos por la correcta ejecución del trabajo contratado. No respondemos
        por caídas, cambios de precio o discontinuación de servicios de terceros
        (plataforma de alojamiento, registrador de dominios, WhatsApp, Google), ni
        por el uso que hagas del sitio después de la entrega, ni por daños indirectos
        o lucro cesante.
      </p>
      <p>
        En cualquier caso, nuestra responsabilidad máxima está limitada al importe
        que nos hayas pagado por el trabajo en cuestión.
      </p>

      <h2>Arrepentimiento y baja</h2>
      <p>
        Si el servicio fue contratado a distancia y te alcanza la Ley 24.240 de
        Defensa del Consumidor, tenés <strong>{DIAS_ARREPENTIMIENTO} días corridos</strong>{" "}
        para arrepentirte sin dar explicaciones, y podés hacerlo desde el{" "}
        <a href="/legal/arrepentimiento">botón de arrepentimiento</a>, sin registrarte
        ni hacer ningún trámite previo.
      </p>

      <h2>Ley aplicable</h2>
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
