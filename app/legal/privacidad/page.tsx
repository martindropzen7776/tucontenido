import type { Metadata } from "next";
import { TITULAR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad — Tu Contenido",
  description: "Qué datos recolectamos, para qué y cómo ejercer tus derechos.",
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return (
    <>
      <h1>Política de privacidad</h1>

      <p>
        Responsable de la base de datos: <strong>{TITULAR.marca}</strong>, con
        actividad en {TITULAR.jurisdiccion}. Contacto para todo lo relativo a datos
        personales: <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>. Los
        datos identificatorios completos del responsable se entregan a quien los
        solicite por esa casilla.
      </p>
      <p>
        Esta política se rige por la <strong>Ley 25.326 de Protección de los Datos
        Personales</strong> y su reglamentación.
      </p>

      <h2>Qué datos recolectamos</h2>
      <p>
        <strong>Los que nos das vos.</strong> Cuando completás el cuestionario o nos
        escribís por WhatsApp o email: tu nombre, tu número de teléfono, tu correo,
        el rubro de tu negocio y las respuestas que elegiste. Si después contratás,
        también los datos necesarios para facturar y el material del sitio (logo,
        fotos, textos, datos de contacto de tu negocio).
      </p>
      <p>
        <strong>Los que se recogen solos.</strong> Si aceptaste las cookies de
        medición, se recopilan datos de navegación: páginas vistas, en qué paso del
        cuestionario estás, si tocaste un botón de contacto, y un identificador que
        el proveedor de publicidad asocia a tu navegador. Sin tu aceptación, esto no
        se activa.
      </p>
      <p>
        <strong>Lo que no recolectamos:</strong> no pedimos ni almacenamos datos de
        tarjetas, contraseñas, datos de salud, ni ninguna categoría de dato sensible
        en los términos del artículo 2 de la Ley 25.326.
      </p>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Responderte y pasarte un presupuesto.</li>
        <li>Prestarte el servicio si lo contratás, y facturarlo.</li>
        <li>
          Medir qué anuncios y qué páginas funcionan, para no gastar en los que no.
          Solo si aceptaste las cookies de medición.
        </li>
        <li>Cumplir obligaciones fiscales y legales.</li>
      </ul>
      <p>
        <strong>No vendemos tus datos.</strong> No los cedemos a terceros para que te
        contacten ni para que armen sus propias bases.
      </p>

      <h2>Con quién se comparten</h2>
      <p>Solamente con los proveedores que hacen falta para que esto funcione:</p>
      <ul>
        <li>
          <strong>Meta Platforms</strong> — si aceptaste las cookies de medición, el
          píxel envía eventos de navegación asociados a un identificador de tu
          navegador, para medir y optimizar los anuncios.
        </li>
        <li>
          <strong>Netlify</strong> — aloja este sitio y procesa los registros
          técnicos habituales de cualquier servidor web, incluida tu dirección IP.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong> — si nos escribís por ahí, la conversación
          queda sujeta además a las políticas de WhatsApp.
        </li>
        <li>
          <strong>La plataforma de alojamiento</strong> del sitio que te entreguemos,
          si contratás, y solo con los datos necesarios para publicarlo.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores están fuera de la Argentina, en países que
        pueden no tener un nivel de protección equivalente. Al usar el sitio y
        contactarnos, prestás conformidad a esa transferencia internacional, que se
        limita a lo indispensable para prestar el servicio.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <ul>
        <li>
          <strong>Consultas que no terminan en contratación:</strong> hasta doce
          meses, y después se eliminan.
        </li>
        <li>
          <strong>Clientes:</strong> mientras dure la relación y luego por el plazo
          que exigen las normas fiscales y comerciales.
        </li>
        <li>
          <strong>Datos de navegación:</strong> según los plazos de cada proveedor.
        </li>
      </ul>

      <h2>Tus derechos</h2>
      <p>
        Tenés derecho a <strong>acceder</strong> a tus datos, a que los{" "}
        <strong>rectifiquemos</strong> si están mal, a que los{" "}
        <strong>actualicemos</strong> y a que los <strong>suprimamos</strong>.
        Escribinos a <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a> y te
        respondemos dentro de los diez días corridos que fija la ley. Es gratis y no
        hace falta que expliques por qué.
      </p>
      <p>
        La <strong>Agencia de Acceso a la Información Pública</strong>, órgano de
        control de la Ley 25.326, tiene la atribución de atender las denuncias y
        reclamos que se interpongan con relación al incumplimiento de las normas
        sobre protección de datos personales.
      </p>

      <h2>Seguridad</h2>
      <p>
        Tomamos medidas razonables para proteger la información: acceso restringido,
        conexión cifrada y proveedores con estándares de seguridad reconocidos. Dicho
        eso, ningún sistema es infalible, y no podemos garantizar seguridad absoluta.
      </p>

      <h2>Menores</h2>
      <p>
        Este servicio está dirigido a personas mayores de 18 años que contratan para
        su actividad comercial. No recolectamos datos de menores a sabiendas.
      </p>

      <h2>Cambios</h2>
      <p>
        Si modificamos esta política, la versión vigente será siempre la publicada
        acá, con su fecha al pie.
      </p>
    </>
  );
}
