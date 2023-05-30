/* eslint-disable import/no-anonymous-default-export */
import {
    AÑADIR_PRODUCTO, 
    AÑADIR_PRODUCTO_EXITO,
    AÑADIR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODRUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR  
} from '../types'

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default function(state = initialState, action){
    switch(action.type) {
        case COMENZAR_DESCARGA_PRODRUCTOS:
        case AÑADIR_PRODUCTO: 
            return {...state, loading: action.payload};

        case AÑADIR_PRODUCTO_EXITO: 
            return {...state, loading: false, productos: [...state.productos, action.payload]};
        
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR: 
        case DESCARGA_PRODUCTOS_ERROR:
        case AÑADIR_PRODUCTO_ERROR:
            return {...state, loading: false, error: action.payload}

        case DESCARGA_PRODUCTOS_EXITO:
            return {...state, loading: false, error: null, productos: action.payload}

        case OBTENER_PRODUCTO_ELIMINAR:
            return {...state, productoEliminar: action.payload}

        case PRODUCTO_ELIMINADO_EXITO:  
            return {...state, productos: state.productos.filter(producto => producto.id !== state.productoEliminar), productoEliminar: null}

        case OBTENER_PRODUCTO_EDITAR:
            return {...state, productoEditar: action.payload}

        case PRODUCTO_EDITADO_EXITO:
            return {...state, productos: state.productos.map((producto) => 
                producto.id === action.payload.id ? producto = action.payload : producto
            ) ,productoEditar: null}

        default: 
            return state;
    }
}