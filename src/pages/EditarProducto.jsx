import { useDispatch, useSelector } from "react-redux"
import { editarProductosAction } from "../actions/productoActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditarProducto(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: "",
        precio: 0
    });

    const productoEditar = useSelector( state => state.productos.productoEditar);
    
    useEffect(()=> {
        setProducto(productoEditar);
    },[productoEditar])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(editarProductosAction(producto));
        navigate("/")
    }

    const onChangeForm = (e) => {
        setProducto({...producto, [e.target.name]: e.target.value})
    }

    return(
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">Editar Producto</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nuevo Producto</label>
                            <input type="text" className="form-control" placeholder="Nombre del producto" name="nombre" value={producto.nombre} onChange={onChangeForm}/>   
                        </div>
                        <div className="form-group">
                            <label>Precio Producto</label>
                            <input type="number" className="form-control" placeholder="Precio del producto" name="precio" value={producto.precio} onChange={onChangeForm}/>   
                        </div>
                        <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}