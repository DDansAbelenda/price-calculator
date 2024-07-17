import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer, actionConst } from "./reducer";
import { useApiProduct } from "../hooks/useApiProduct";
import PropTypes from 'prop-types';

//Contexto Global
export const GlobalContext = createContext();

/*
 * Componente que comparte el contexto. Es engloba todos los componentes
 * que deben recibir el contexto
*/
const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { getProducts } = useApiProduct();
    //Cargar el listado de productos
    useEffect(() => {
        getProducts().then(
            (data) => {
                dispatch({ type: actionConst.FETCH_CATEGORY, payload: data });
                dispatch({
                    type: actionConst.SET_SERVER_NOTIFICATION,
                    payload: { typeError: "", error: false, isLoad: true }
                })
            }
        ).catch((error) => {
            dispatch({
                type: actionConst.SET_SERVER_NOTIFICATION,
                payload: { typeError: error.name, error: true, isLoad: true }
            });
        });
    }, [getProducts]);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;