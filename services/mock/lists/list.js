
export const getLists = async () => {

    return [
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 1",
            created: "03/02/2025",
            status: 1
        },
        {
            id: 'ao97458nrtylac7tacp48123',
            title: "Lista 2",
            created: "02/02/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48312',
            title: "Lista 3",
            created: "01/02/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp49474',
            title: "Lista 4",
            created: "30/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp49vjf',
            title: "Lista 5",
            created: "25/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp40fjdf',
            title: "Lista 6",
            created: "20/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp4837u3',
            title: "Lista 7",
            created: "13/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 1",
            created: "03/02/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 2",
            created: "02/02/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 3",
            created: "01/02/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 4",
            created: "30/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 5",
            created: "25/01/2025",
            status: 0
        },
    ]
}

export const postList = async (data) => {

    const response = {
        id: 'q87tn5438dntbwfj9ymn',
        title: data.title,
        created: "03/02/2025",
        status: 1
    }

    return response;
}

export const getListProducts = async (id) => {
    const list = {
        id: '0q9nwry09n8nxp',
        name: 'Nome da lista',
        products: [
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado ABC",
                market_id: 321,
                product: "Arroz 5kg",
                product_id: 123,
                confidence: 95,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: true,
            },
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado 123",
                market_id: 321,
                product: "Feijão 1kg",
                product_id: 123,
                confidence: 70,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: false,
            },
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado ABC",
                market_id: 321,
                product: "Arroz 5kg",
                product_id: 123,
                confidence: 95,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: false,
            },
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado 123",
                market_id: 321,
                product: "Feijão 1kg",
                product_id: 123,
                confidence: 70,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: false,
            },
        ]
    }
    return list
}

export const removeItem = async (payload) => {
    console.log("removeItem")
    console.log("id: ", payload.list_id)
    console.log("product_id: ", payload.product_id)
    console.log("market_id: ", payload.market_id)

    const list = {
        id: '0q9nwry09n8nxp',
        name: 'Nome da lista',
        products: [
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado ABC",
                market_id: 321,
                product: "Arroz 5kg",
                product_id: 123,
                confidence: 95,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: true,
            },
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado 123",
                market_id: 321,
                product: "Feijão 1kg",
                product_id: 123,
                confidence: 70,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: false,
            },
            {
                image: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg",
                market: "Supermercado ABC",
                market_id: 321,
                product: "Arroz 5kg",
                product_id: 123,
                confidence: 95,
                price: 23.99,
                updatedAt: "2025-01-25",
                confirmed: false,
            }
        ]
    }
    return list
}
