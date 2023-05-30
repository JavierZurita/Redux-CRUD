import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrarProductoAction, editarProductosAction, obtenerProductoEditarAction, obtenerProductosAction } from "../actions/productoActions";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Productos () {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productos = useSelector( state => state.productos.productos);
    const error = useSelector ( state => state.productos.error);
    const cargando = useSelector (state => state.productos.loading);

    const confirmarEliminar = (id) => {

        Swal.fire({
            title: "¿Seguro que deseas eliminar el producto?",
            text: "No podrás deshacer esta opción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminalo."
        }).then((result) => {
            if(result.value){
                dispatch(borrarProductoAction(id));
            }
        })
    }

    const toEditar = (producto) => {
        dispatch(obtenerProductoEditarAction(producto));
        navigate(`/productos/editar/${producto.id}`);
    }

    useEffect(()=>{

        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    },[])

    return(
            <Fragment>
                <h2 className="text-center my-5">Listado de Productos</h2>

                {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
                {cargando ? <p className="text-center">Cargando...</p> : null}
                <table className="table table-striped table-bordered table-hover">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col" className="text-center">Nombre</th>
                            <th scope="col" className="text-center">Precio</th>
                            <th scope="col" className="text-center col-3">Acciones</th>
                        </tr>
                    </thead>  
                    <tbody>
                        {productos.length === 0 ? <tr><td>no hay productos</td></tr>: (
                            productos.map(producto => 
                                <tr key={producto.id}>
                                    <td className="align-middle text-center">{producto.nombre}</td>
                                    <td className="align-middle text-center">{producto.precio} €</td>
                                    <td className="acciones text-center">
                                        <button type="button" className="btn btn-primary w-100 w-sm-auto mr-2" onClick={()=>toEditar(producto)}>Editar</button>
                                        <button type="button" className="btn btn-danger w-100 w-sm-auto" onClick={()=>confirmarEliminar(producto.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </Fragment>
    )
}