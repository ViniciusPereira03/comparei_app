export const searchProduct = async (filtro) => {
    console.log(filtro);
    return [
        {
          image: "https://example.com/images/arroz.jpg",
          market: "Supermercado ABC",
          product: "Arroz 5kg",
          confidence: 95,
          price: 23.99,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/feijao.jpg",
          market: "Mercado XYZ",
          product: "Feijão Carioca 1kg",
          confidence: 30,
          price: 8.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/leite.jpg",
          market: "Hipermercado Delta",
          product: "Leite Integral 1L",
          confidence: 65,
          price: 4.99,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/oleo.jpg",
          market: "Supermercado ABC",
          product: "Óleo de Soja 900ml",
          confidence: 100,
          price: 7.29,
          updatedAt: "2025-01-22"
        },
        {
          image: "https://example.com/images/acucar.jpg",
          market: "Mercado da Esquina",
          product: "Açúcar Refinado 1kg",
          confidence: 57,
          price: 3.89,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/cafe.jpg",
          market: "Mercado XYZ",
          product: "Café em Pó 500g",
          confidence: 96,
          price: 12.49,
          updatedAt: "2025-01-26"
        },
        {
          image: "https://example.com/images/macarrao.jpg",
          market: "Hipermercado Delta",
          product: "Macarrão Espaguete 500g",
          confidence: 10,
          price: 4.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/detergente.jpg",
          market: "Supermercado ABC",
          product: "Detergente Líquido 500ml",
          confidence: 2,
          price: 2.39,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/sabonete.jpg",
          market: "Mercado da Esquina",
          product: "Sabonete Neutro 90g",
          confidence: 20,
          price: 1.79,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/frango.jpg",
          market: "Hipermercado Delta",
          product: "Peito de Frango Resfriado 1kg",
          confidence: 71,
          price: 14.99,
          updatedAt: "2025-01-26"
        }
    ]
} 