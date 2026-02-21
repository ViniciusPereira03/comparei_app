import { apiRequest, SERVICES_URL } from '../api';

const BASE_URL = SERVICES_URL.LISTS;

export interface Lista {
    id: number;
    user_id: string;
    nome: string;
    status: string;
    total_previsto: number;
    total_final: number;
    itens: ListaItem[];
    created_at: string;
    modified_at: string;
}

export interface ListaItem {
    id: number;
    lista_id: number;
    produto_id: number;
    mercado_id: number;
    quantidade: number;
    preco_unitario: number;
    checked: boolean;
}

export const getListas = async (): Promise<Lista[]> => {
    const endpoint = `/listas`;
    return apiRequest<Lista[]>(BASE_URL, endpoint, 'GET');
};

export const createList = async (nome: string): Promise<Lista> => {
    const endpoint = `/listas`;
    const body = {
        nome: nome,
    };
    return apiRequest<Lista>(BASE_URL, endpoint, 'POST', body);
};

export const getListaById = async (listaId: number): Promise<Lista> => {
    const endpoint = `/listas/${listaId}`;
    return apiRequest<Lista>(BASE_URL, endpoint, 'GET');
};

export const addItemToLista = async (
    listaId: number,
    produtoId: number,
    mercadoId: number,
    quantidade: number,
    precoUnitario: number
): Promise<ListaItem> => {
    const endpoint = `/listas/${listaId}/itens`;
    const body = {
        produto_id: produtoId,
        mercado_id: mercadoId,
        quantidade: quantidade,
        preco_unitario: precoUnitario,
    };
    return apiRequest<ListaItem>(BASE_URL, endpoint, 'POST', body);
};

export const checkItem = async (
    itemId: number,
    checked: boolean
): Promise<ListaItem> => {
    const endpoint = `/itens/${itemId}/check`;
    const body = {
        checked: checked,
    };
    return apiRequest<ListaItem>(BASE_URL, endpoint, 'PUT', body);
};

export const removeItemToList = async (itemID: number) => {
    return apiRequest(BASE_URL, `/listas/${itemID}/itens`, 'DELETE');
}

export const fecharLista = async (
    listId: number
) => {
    const endpoint = `/listas/${listId}/finalizar`;
    const body = {};
    return apiRequest(BASE_URL, endpoint, 'PUT', body);
};