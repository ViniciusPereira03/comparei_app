export const getUser = async (id) => {
    return {
        id: id,
        photo: 'https://thispersondoesnotexist.com/',
        name: 'Nome de Usuário',
        username: 'username_03',
        distance_radius: 15,
        level: Math.floor(Math.random() * (99 - 1 + 1) + 1)
    }
}

export const putDistanceRadius = async (distance_radius) => {
    return {
        photo: 'https://thispersondoesnotexist.com/',
        name: 'Nome de Usuário',
        username: 'username_03',
        distance_radius: distance_radius,
        level: Math.floor(Math.random() * (99 - 1 + 1) + 1)
    }
}