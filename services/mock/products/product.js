export const searchProduct = async (filtro) => {
    console.log(filtro);
    return [
        {
          image: "https://example.com/images/arroz.jpg",
          market_id: 123,
          market: "Supermercado ABC",
          product: "Arroz 5kg",
          product_id: 321,
          confidence: 95,
          price: 23.99,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/feijao.jpg",
          market_id: 123,
          market: "Mercado XYZ",
          product: "Feijão Carioca 1kg",
          product_id: 321,
          confidence: 30,
          price: 8.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/leite.jpg",
          market_id: 123,
          market: "Hipermercado Delta",
          product: "Leite Integral 1L",
          product_id: 321,
          confidence: 65,
          price: 4.99,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/oleo.jpg",
          market_id: 123,
          market: "Supermercado ABC",
          product: "Óleo de Soja 900ml",
          product_id: 321,
          confidence: 100,
          price: 7.29,
          updatedAt: "2025-01-22"
        },
        {
          image: "https://example.com/images/acucar.jpg",
          market_id: 123,
          market: "Mercado da Esquina",
          product: "Açúcar Refinado 1kg",
          product_id: 321,
          confidence: 57,
          price: 3.89,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/cafe.jpg",
          market_id: 123,
          market: "Mercado XYZ",
          product: "Café em Pó 500g",
          product_id: 321,
          confidence: 96,
          price: 12.49,
          updatedAt: "2025-01-26"
        },
        {
          image: "https://example.com/images/macarrao.jpg",
          market_id: 123,
          market: "Hipermercado Delta",
          product: "Macarrão Espaguete 500g",
          product_id: 321,
          confidence: 10,
          price: 4.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/detergente.jpg",
          market_id: 123,
          market: "Supermercado ABC",
          product: "Detergente Líquido 500ml",
          product_id: 321,
          confidence: 2,
          price: 2.39,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/sabonete.jpg",
          market_id: 123,
          market: "Mercado da Esquina",
          product: "Sabonete Neutro 90g",
          product_id: 321,
          confidence: 20,
          price: 1.79,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/frango.jpg",
          market_id: 123,
          market: "Hipermercado Delta",
          product: "Peito de Frango Resfriado 1kg",
          product_id: 321,
          confidence: 71,
          price: 14.99,
          updatedAt: "2025-01-26"
        }
    ]
} 

export const confirmProductValue = async (payload) => {
  console.log("confirmProductValue: ", payload)
}

export const getProductById = async (payload) => {
  console.log("getProductById");
  console.log("PRODUTO_ID: ", payload.product_id);
  console.log("MERCADO_ID: ", payload.market_id)
  
  return {
    image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
    market: "Supermercado ABC",
    market_id: 321,
    product: "Arroz",
    brand: "Camil",
    amount: 1,
    unity: 'Kg',
    product_id: 123,
    price: 23.99,
    confidence: 70,
    updatedAt: "2025-01-25",
    confirmed: false,
  }
}


export const updateProduct = async (payload) => {
  console.log("updateProduct");
  console.log("PRODUTO_ID: ", payload.product_id);
  console.log("MERCADO_ID: ", payload.market_id)

  return {
    image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
    market_id: 321,
    product_id: 123,
    product: payload.product,
    brand: payload.branc,
    amount: payload.amount,
    unity: payload.unity,
    price: payload.price,
  }
}