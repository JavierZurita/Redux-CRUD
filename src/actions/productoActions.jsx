import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
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
import { type } from '@testing-library/user-event/dist/type';

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( añadirProducto() );

        try {
           await clienteAxios.post('/productos', producto)

            dispatch( añadirProductoExito(producto));
            Swal.fire(
                'Correcto',
                'El producto se añadió correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( añadirProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentalo de nuevo'
            })
        }
    }
}

const añadirProducto = () => ({
    type: AÑADIR_PRODUCTO,
    payload: true
})

const añadirProductoExito = (producto) => ({
    type: AÑADIR_PRODUCTO_EXITO,
    payload: producto
})

const añadirProductoError = (estado) => ({
    type: AÑADIR_PRODUCTO_ERROR,
    payload: estado
})

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch (descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log("Respuesta");
            // console.log(respuesta.data);
            dispatch(descargarProductosExito(respuesta.data))
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODRUCTOS,
    payload: true
})

const descargarProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            Swal.fire(
                "Eliminado!",
                "Tu producto ha sido eliminado.",
                "success"
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError()); 
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export function obtenerProductoEditarAction(producto) {
    return(dispatch) => {
        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductosAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = (producto) => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto
})

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})