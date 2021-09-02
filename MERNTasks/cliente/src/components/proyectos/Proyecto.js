import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {

    // Obtener el state de proyecto
    const proyectoContext = useContext(ProyectoContext);
    const {proyectoActual} = proyectoContext;

    // Obtener la funcion del context de tarea 
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    // Funcion para agregar el proyecto
    const seleccionarProyecto = id => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTareas(id); //filtrar las tareas cuando se da click a un proyecto
    }

    return (  
        <li>
            <button
                type = "button"
                className = "btn btn-blank"
                onClick = {() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>

   
        </li>
    );
}
 
export default Proyecto;