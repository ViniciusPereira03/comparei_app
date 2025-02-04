
export const getLists = async () => {

    return [
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 1",
            created: "03/02/2025",
            status: 1
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
        {
            id: 'ao97458nrtylac7tacp48m9y',
            title: "Lista 6",
            created: "20/01/2025",
            status: 0
        },
        {
            id: 'ao97458nrtylac7tacp48m9y',
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
            image: "https://example.com/images/arroz.jpg",
            market: "Supermercado 123",
            product: "Feijão 1kg",
            confidence: 70,
            price: 23.99,
            updatedAt: "2025-01-25"
        },
        {
            image: "https://example.com/images/arroz.jpg",
            market: "Supermercado ABC",
            product: "Arroz 5kg",
            confidence: 95,
            price: 23.99,
            updatedAt: "2025-01-25"
        },
        {
            image: "https://example.com/images/arroz.jpg",
            market: "Supermercado 123",
            product: "Feijão 1kg",
            confidence: 70,
            price: 23.99,
            updatedAt: "2025-01-25"
        },
    ]
}
