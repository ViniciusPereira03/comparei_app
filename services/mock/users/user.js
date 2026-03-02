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

export const uploadProfilePhoto = async (payload) => {
    const fileData = payload._parts[0][1]
    return {
        photoUrl: fileData.uri
    }


    // try {
    //     const response = await axios.post(API_URL, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     })

    //     if (response.status === 200) {
    //         return {
    //             success: true,
    //             photoUrl: response.data.photoUrl,
    //         }
    //     } else {
    //         return { success: false, error: 'Erro ao enviar a imagem' }
    //     }
    // } catch (error) {
    //     console.error('Erro no upload da foto:', error)
    //     return { success: false, error: error.message }
    // }
}