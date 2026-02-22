// Función para obtener la URL de una imagen local de forma segura
const getLocalImage = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const products = {
  collares: [
    { id: 1, name: 'Collar Dorado Elegante', price: '$150', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.36.04.jpeg') },
    { id: 2, name: 'Collar de Plata Moderna', price: '$120', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.38.04.jpeg') },
    { id: 3, name: 'Collar con Piedras', price: '$200', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.38.34.jpeg') },
    { id: 4, name: 'Collar Minimalista', price: '$90', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.39.09.jpeg') },
    { id: 5, name: 'Collar Vintage', price: '$180', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.39.41.jpeg') },
    { id: 6, name: 'Collar Boho', price: '$110', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.40.30.jpeg') },
    { id: 7, name: 'Colar mamá', price: '$130', image: getLocalImage('Colar mamá.jpeg') },
    { id: 8, name: 'Collar amor', price: '$140', image: getLocalImage('Collar amor.jpeg') },
    { id: 9, name: 'Collar tulipan', price: '$150', image: getLocalImage('Collar tulipan.jpeg') },
    { id: 10, name: 'Collar trebol dorado', price: '$135', image: getLocalImage('Collar trebol dorado.jpeg') },
    { id: 11, name: 'Collar oasis', price: '$160', image: getLocalImage('Collar oasis.jpeg') },
    { id: 12, name: 'Collar magic', price: '$125', image: getLocalImage('Collar magic.jpeg') },
  ],
  pulseras: [
    { id: 13, name: 'Pulsera de Oro', price: '$80', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.40.59.jpeg') },
    { id: 14, name: 'Pulsera de Plata', price: '$70', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.42.28.jpeg') },
    { id: 15, name: 'Pulsera con Dijes', price: '$95', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.43.00.jpeg') },
    { id: 16, name: 'Pulsera trebol', price: '$85', image: getLocalImage('Pulsera trebol.jpeg') },
  ],
  aros: [
    { id: 17, name: 'Aros de Oro', price: '$50', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.45.25.jpeg') },
    { id: 18, name: 'Aros de Plata', price: '$45', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.45.47.jpeg') },
    { id: 19, name: 'Aros Dubai', price: '$65', image: getLocalImage('Aros Dubai.jpeg') },
    { id: 20, name: 'Aros Venecia', price: '$55', image: getLocalImage('Aros Venecia.jpeg') },
    { id: 21, name: 'Aros santorini', price: '$48', image: getLocalImage('Aros santorini.jpeg') },
    { id: 22, name: 'Aros mar', price: '$40', image: getLocalImage('Aros mar.jpeg') },
    { id: 23, name: 'Aros gota', price: '$35', image: getLocalImage('Aros gota.jpeg') },
    { id: 24, name: 'Aros cuadraditos', price: '$42', image: getLocalImage('Aros cuadraditos.jpeg') },
    { id: 25, name: 'Aros doble', price: '$38', image: getLocalImage('Aros doble.jpeg') },
    { id: 26, name: 'Arargollitas plata', price: '$30', image: getLocalImage('Arargollitas plata.jpeg') },
  ],
  anillos: [
    { id: 27, name: 'Anillo de Oro', price: '$100', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.51.20.jpeg') },
    { id: 28, name: 'Anillo con Diamante', price: '$250', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.52.49.jpeg') },
    { id: 29, name: 'Anillo regulable black', price: '$95', image: getLocalImage('Anillo regulable black.jpeg') },
    { id: 30, name: 'Anillo trebol', price: '$85', image: getLocalImage('Anillo trebol.jpeg') },
    { id: 31, name: 'Anillo aura', price: '$110', image: getLocalImage('Anillo aura.jpeg') },
    { id: 32, name: 'Anillo gleam', price: '$98', image: getLocalImage('Anillo gleam.jpeg') },
    { id: 33, name: 'Anillo imperial', price: '$120', image: getLocalImage('Anillo imperial.jpeg') },
    { id: 34, name: 'Anillo rayo', price: '$92', image: getLocalImage('Anillo rayo.jpeg') },
    { id: 35, name: 'Anillo alma de plata', price: '$105', image: getLocalImage('Anillo alma de plata.jpeg') },
    { id: 36, name: 'Anillo gaia de plata', price: '$105', image: getLocalImage('Anillo gaia de plata.jpeg') },
    { id: 37, name: 'Anillo xen', price: '$115', image: getLocalImage('Anillo xen.jpeg') },
  ],
  tobilleras: [
    { id: 38, name: 'Tobillera de Oro', price: '$40', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.59.18.jpeg') },
  ],
  esclavas: [
    { id: 39, name: 'Esclava brillo', price: '$50', image: getLocalImage('Esclava brillo.jpeg') },
    { id: 40, name: 'Esclava clara', price: '$60', image: getLocalImage('Esclava clara.jpeg') },
    { id: 41, name: 'Esclava dorada Paris', price: '$70', image: getLocalImage('Esclava dorada Paris.jpeg') },
    { id: 42, name: 'Esclava roma', price: '$55', image: getLocalImage('Esclava roma.jpeg') },
  ],
  conjuntos: [
    { id: 43, name: 'Conjunto amor dorado', price: '$200', image: getLocalImage('Conjunto amor dorado.jpeg') },
    { id: 44, name: 'Conjunto amor plateado', price: '$180', image: getLocalImage('Conjunto amor plateado.jpeg') },
    { id: 45, name: 'Conjunto Roma', price: '$190', image: getLocalImage('Conjunto Roma.jpeg') },
    { id: 46, name: 'Conjunto mar', price: '$210', image: getLocalImage('Conjunto mar.jpeg') },
    { id: 47, name: 'Conjunto esmeralda', price: '$250', image: getLocalImage('Conjunto esmeralda.jpeg') },
    { id: 48, name: 'Conjunto golden', price: '$230', image: getLocalImage('Conjunto golden.jpeg') },
    { id: 49, name: 'Conjunto trebol negro', price: '$195', image: getLocalImage('Conjunto trebol negro.jpeg') },
    { id: 50, name: 'conjunto eterna', price: '$220', image: getLocalImage('conjunto eterna.jpeg') },
  ],
  sets: [
    { id: 51, name: 'Set centella', price: '$150', image: getLocalImage('Set centella.jpeg') },
    { id: 52, name: 'Set margarita', price: '$140', image: getLocalImage('Set margarita.jpeg') },
  ],
  destacados: [
    { id: 13, name: 'Pulsera de Oro', price: '$80', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.40.59.jpeg') },
    { id: 17, name: 'Aros de Oro', price: '$50', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.45.25.jpeg') },
    { id: 27, name: 'Anillo de Oro', price: '$100', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.51.20.jpeg') },
    { id: 38, name: 'Tobillera de Oro', price: '$40', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.59.18.jpeg') },
    { id: 28, name: 'Anillo con Diamante', price: '$250', image: getLocalImage('WhatsApp Image 2025-10-13 at 19.52.49.jpeg') },
    { id: 43, name: 'Conjunto amor dorado', price: '$200', image: getLocalImage('Conjunto amor dorado.jpeg') },
    { id: 39, name: 'Esclava brillo', price: '$50', image: getLocalImage('Esclava brillo.jpeg') },
  ]
};

export default products;
