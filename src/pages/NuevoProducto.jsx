import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../actions/productoActions"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

export default function NuevoProducto( {history} ){
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    
    const dispatch = useDispatch();
    
    const cargando = useSelector( (state)=> state.productos.loading );
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector (state => state.alerta.alerta);

    const añadirProducto= (producto) => {
        dispatch( crearNuevoProductoAction(producto) )
    }

    const submitNuevoProducto = (e) => {
        e.preventDefault();
        
        if(nombre.trim() === '' || Number(precio) <= 0){

            const alerta = {
                msg: "Ambos campos son obligatorio",
                classes: "alert alert-danger text-center text-uppercase p3"
            }
            dispatch(mostrarAlerta(alerta));
            return;
        } 
        dispatch(ocultarAlertaAction());
        
        añadirProducto({nombre, precio});

        navigate("/");
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Añadir Nuevo Producto</h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nuevo Producto</label>
                                <input type="text" className="form-control" placeholder="Nombre del producto" name="nombre"
                                 value={nombre} onChange={(e) => setNombre(e.target.value)} />   
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input type="number" className="form-control" placeholder="Precio del producto" name="precio"
                                 value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />   
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Añadir</button>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}