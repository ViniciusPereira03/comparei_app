// services/products/promer.ts
import { apiRequest, SERVICES_URL } from '../api';

const BASE_URL = SERVICES_URL.PROMER;

export interface Produto {
  id: number;
  nome: string;
  marca: string;
  quantidade: number;
  unidade: string;
  bar_code: string;
  latitude: number;
  longitude: number;
  preco: number;
  foto: string;
  created_at: string; // ISO Date
  modified_at: string; // ISO Date
  deleted_at: string | null;
}

export interface Mercado {
  id: number;
  place_id: string;
  nome: string;
  endereco: string;
  cidade: string;
  bairro: string;
  numero: number;
  latitude: number;
  longitude: number;
  status: number;
}

export interface MercadoProduto {
  id_mercado_produtos: number;
  produto: Produto;
  mercado: Mercado;
  preco_unitario: number;
  nivel_confianca: number;
  created_at: string; // ISO Date
  modified_at: string; // ISO Date
  deleted_at: string | null;
}

export type MercadoProdutoResponse = MercadoProduto[];

export interface FiltroSearchProduct {
    texto: string,
    ordem: boolean,
    categoria: string
}


export const searchProduct = async (
  filtro: FiltroSearchProduct,
  coords?: { latitude: number; longitude: number }
): Promise<MercadoProdutoResponse> => {

  let endpoint = `/produto/search?text=${filtro.texto}`;

  if (coords) {
    endpoint += `&lat=${coords.latitude}&lng=${coords.longitude}`;
  }

  if (filtro.ordem) {
    endpoint += `&order=${filtro.ordem}`;
  }

  if (filtro.categoria) {
    endpoint += `&category=${filtro.categoria}`;
  }

  return apiRequest<MercadoProdutoResponse>(
    BASE_URL,
    endpoint,
    'GET'
  );
};

export const validaImage = async (imageBase64: string): Promise<Produto> => {
  return apiRequest<Produto>(
    BASE_URL,
    `/produto/identificar`,
    'POST',
    {
      foto: imageBase64
    }
  );
}

export const createProduct = async (productData: Partial<Produto>): Promise<Produto> => { 
  return apiRequest<Produto>(
    BASE_URL,
    `/produto`,
    'POST',
    productData
  );
}
