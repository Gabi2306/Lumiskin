// Datos de productos
const products = [
    {
      id: 1,
      name: "The Ordinary Squalane Cleanser Limpiador",
      category: "cleansers",
      price: 79400,
      image: "images/Squalane.jpeg",
      description: "Limpiador suave que elimina impurezas sin resecar la piel.",
      skinType: ["all", "sensitive", "dry"],
      featured: true,
    },
    {
      id: 2,
      name: "Serum de Niacinamida 10%",
      category: "serums",
      price: 41600,
      image: "images/Niacinamida.webp",
      description: "Reduce la apariencia de los poros y mejora el tono de la piel.",
      skinType: ["all", "oily", "combination"],
      featured: true,
    },
    {
      id: 3,
      name: "Ácido Hialurónico + B5 Serum",
      category: "serums",
      price: 64000,
      image: "images/hyaluronic.webp",
      description: "Hidratación intensa para una piel más jugosa y radiante.",
      skinType: ["all", "dry", "normal"],
      featured: true,
    },
    {
      id: 4,
      name: "Tratamiento Anti-Acné",
      category: "treatments",
      price: 138900,
      image: "images/Acne.jpeg",
      description: "Combate el acné y previene nuevas erupciones.",
      skinType: ["oily", "combination"],
      featured: false,
    },
    {
      id: 5,
      name: "Crema Hidratante Natural",
      category: "moisturizers",
      price: 102000,
      image: "images/Hidratante.webp",
      description: "Hidratación ligera para todo el día sin sensación grasa.",
      skinType: ["all", "oily", "combination", "normal"],
      featured: true,
    },
    {
      id: 6,
      name: "Tónico Exfoliante",
      category: "toners",
      price: 84150,
      image: "images/exfoliante.webp",
      description: "Exfolia suavemente y prepara la piel para los siguientes productos.",
      skinType: ["all", "normal", "combination"],
      featured: false,
    },
    {
      id: 7,
      name: "Mascarilla de Arcilla Purificante",
      category: "masks",
      price: 101000,
      image: "images/arcilla.webp",
      description: "Purifica los poros y elimina impurezas profundas para una piel más clara.",
      skinType: ["oily", "combination"],
      featured: false,
    },
    {
      id: 8,
      name: "Protector Solar Mineral",
      category: "treatments",
      price: 51335,
      image: "images/sunscreen.webp",
      description: "Protección de amplio espectro contra los rayos UVA y UVB.",
      skinType: ["all"],
      featured: true,
    },
    {
      id: 9,
      name: "Exfoliante Facial Enzimático",
      category: "exfoliants",
      price: 48675,
      image: "images/enzimatico.jpg",
      description: "Exfoliación suave con enzimas naturales para una piel renovada.",
      skinType: ["all", "sensitive"],
      featured: false,
    },
    {
      id: 10,
      name: "Crema Antiarrugas",
      category: "moisturizers",
      price: 96500,
      image: "images/anti-aging.webp",
      description: "Combate los signos visibles del envejecimiento y mejora la elasticidad.",
      skinType: ["dry", "normal"],
      featured: true,
    },
    {
      id: 11,
      name: "Aceite Facial Nutritivo",
      category: "treatments",
      price: 39829,
      image: "images/oil.webp",
      description: "Nutrición profunda con aceites naturales para una piel radiante.",
      skinType: ["dry", "normal"],
      featured: false,
    },
    {
      id: 12,
      name: "Contorno de Ojos",
      category: "treatments",
      price: 84900,
      image: "images/eye-cream.webp",
      description: "Reduce ojeras, bolsas y líneas finas alrededor de los ojos.",
      skinType: ["all"],
      featured: true,
    },
  ]
  
  // Get category name in Spanish
  function getCategoryName(category) {
    const categories = {
      cleansers: "Limpiadores",
      toners: "Tónicos",
      exfoliants: "Exfoliantes",
      serums: "Serums",
      moisturizers: "Hidratantes",
      treatments: "Tratamientos",
      masks: "Mascarillas",
    }
  
    return categories[category] || category
  }
  
  // Exportar funciones y datos
  export { products, getCategoryName }
  
  