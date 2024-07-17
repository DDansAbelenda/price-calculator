import { useCallback } from "react";

//const baseUrl = 'http://localhost:3000'; //local 
const baseUrl = 'https://price-calculator-api.vercel.app'; //api vercel 

/**
 * Este hook devuelve funciones que te permiten conectar con la API y realizar
 * acciones
 */
export const useApiProduct = () => {
    // Función request genérica que a partir de una url y un cuerpo de opciones
    // realiza una petición a la api
    const request = async (url, options = {}) => {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;

    }

    //Obtener todos los videos
    const getProducts = useCallback(async () => {
        const response = await request(
            `${baseUrl}/products`,
            { method: 'GET' }
        );
        return response;
    }, []);


    const postProduct = useCallback(async (product) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await request(`${baseUrl}/products`, options);
        return response
    }, []);

    const putProduct = useCallback(async (product) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await request(`${baseUrl}/products/${product.id}`, options);
        return response;
    }, []);

    const deleteProduct = useCallback(async (id) => {
        const options = {
            method: 'DELETE',
        }
        const response = await request(`${baseUrl}/products/${id}`, options);
        return response;
    }, []);


    return { getProducts, postProduct, putProduct, deleteProduct }
}

