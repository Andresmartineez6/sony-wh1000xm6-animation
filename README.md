# Sony WH-1000XM6 · Rediseño web cinematográfico
 
 <p align="center">
   <img src="./public/assets/cascos%20wh1000%20mejora%20visual.png" alt="Vista principal del proyecto Sony WH-1000XM6" width="100%" />
 </p>
 
 ## Qué es este proyecto
 
 Este proyecto es una reinterpretación visual de una landing de producto para los Sony WH-1000XM6.
 
 La idea no era hacer una página “bonita” y ya. Quería construir una experiencia con más presencia, más ritmo y una narrativa visual que hiciera justicia al producto: silenciosa, tecnológica y claramente premium.
 
 El resultado es una web con estética cinematográfica, transiciones cuidadas, scroll narrativo y una composición mucho más editorial que la típica ficha comercial plana.
 
 ## Qué he querido conseguir
 
 - **Sensación premium real**
   No un diseño genérico con cristales y sombras porque sí, sino una dirección visual con peso, contraste y presencia.
 
 - **Narrativa por secciones**
   Cada bloque cuenta una parte distinta del producto: impacto inicial, detalle técnico, cancelación de ruido, uso diario y cierre personal.
 
 - **Movimiento con intención**
   Animaciones suaves, microinteracciones y una secuencia de frames sincronizada al scroll para reforzar la sensación de producto vivo.
 
 - **Uso de material visual real**
   El rediseño aprovecha imágenes y vídeos incluidos en `public` para evitar que la web se sienta maqueta o placeholder.
 
 ## Vista previa visual
 
 <table>
   <tr>
     <td>
       <img src="./public/assets/cascos%20wh1000%20mejora%20visual.png" alt="Vista principal del producto" width="100%" />
     </td>
     <td>
       <img src="./public/assets/cascos%20wh%201000%20mejora%20visual%20sin%20fondo.png" alt="Producto en negro con iluminación azul" width="100%" />
     </td>
   </tr>
   <tr>
     <td>
       <img src="./public/assets/almoadilla%20wh%2010000.png" alt="Detalle macro de la almohadilla" width="100%" />
     </td>
     <td>
       <img src="./public/assets/enganche%20cascos%20wh%201000.png" alt="Detalle macro de la articulación" width="100%" />
     </td>
   </tr>
   <tr>
     <td colspan="2">
       <img src="./public/assets/cascos%20wh%201000%20conector%20usb%203.0.png" alt="Detalle del puerto USB-C" width="100%" />
     </td>
   </tr>
 </table>
 
 ## Puntos fuertes a nivel técnico
 
 - **Next.js 14 con App Router**
   Estructura moderna, limpia y preparada para export estático.
 
 - **TypeScript**
   Tipado sólido para mantener el proyecto controlado a medida que crece.
 
 - **Tailwind CSS**
   Sistema visual propio con utilidades para superficies glass, divisores, botones premium y capas ambientales.
 
 - **Framer Motion**
   Animación de entrada, transiciones de scroll y microinteracciones en prácticamente toda la experiencia.
 
 - **Canvas + secuencia de frames**
   El bloque principal de scroll utiliza una secuencia de 145 frames para dar una sensación más cinematográfica y precisa.
 
 - **Compatibilidad con export estático**
   El proyecto está preparado para desplegarse como sitio estático.
 
 ## Estructura principal
 
 - **`app/page.tsx`**
   Orquesta toda la experiencia y compone las secciones principales.
 
 - **`components/Navbar.tsx`**
   Navegación flotante con estética más editorial y premium.
 
 - **`components/sections/Hero.tsx`**
   Apertura principal con vídeo, copy de impacto y CTA.
 
 - **`components/ScrollScene.tsx`**
   Núcleo narrativo del proyecto con canvas, secuencia de frames y beats editoriales.
 
 - **`components/sections/Showcase.tsx`**
   Presentación visual del producto y su anatomía.
 
 - **`components/sections/SilentEngineering.tsx`**
   Bloque técnico centrado en materiales, cancelación de ruido y detalle constructivo.
 
 - **`components/sections/Experience.tsx`**
   Escenarios de uso real con apoyo visual y cierre de producto.
 
 - **`components/sections/Crafted.tsx`**
   Cierre personal sobre el creador del proyecto.
 
 - **`lib/frames.ts`**
   Configuración de la secuencia de imágenes usada por el canvas.
 
 ## Cómo arrancarlo en local
 
 ```bash
 npm install
 npm run dev
 ```
 
 El proyecto levanta en:
 
 ```bash
 http://localhost:3010
 ```
 
 Para generar la versión de producción:
 
 ```bash
 npm run build
 ```
 
 ## Sobre la secuencia de frames
 
 La animación principal trabaja con los frames almacenados en `public/frames/`.
 
 Si quieres ajustar el número total de imágenes o cambiar el formato, puedes hacerlo desde `lib/frames.ts`.
 
 ## Autor
 
 **Andrés Lorente Martínez**
 
 Desarrollo, diseño de interacción y dirección visual.
 
 - **Portfolio**: [andreslorentemartinez.dev](https://andreslorentemartinez.dev)
 - **GitHub**: [Andresmartineez6](https://github.com/Andresmartineez6)
 - **Email**: [andres.martinez@impulsatelecom.com](mailto:andres.martinez@impulsatelecom.com)
 
 ## Nota
 
 Este proyecto es una pieza experimental de diseño y desarrollo frontend.
 
 No es una web oficial de Sony ni pretende representar material comercial definitivo de la marca.
