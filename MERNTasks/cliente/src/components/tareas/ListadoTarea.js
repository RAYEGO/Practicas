import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {


     // Extraer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

     // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Seleccina un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
    

    // Eliminar un proyecto
    const onClickEliminar =()=>{
        eliminarProyecto(proyectoActual.id)
    };

    return ( 
        <Fragment>
            <h2>Proyectos: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                       { tareasproyecto.map(tarea=>(
                        <CSSTransition
                            key = {tarea.id}
                            timeout= {200}
                            className="tarea"
                        >
                             <Tarea
                           
                            tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup> 
                }
            </ul>
            <button
                type="button"
                className="btn btn-rliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;