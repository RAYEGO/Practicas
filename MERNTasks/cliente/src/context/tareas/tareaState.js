import React, {useReducer} from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
 } from '../../types';

const TareaState = props => {
    const initialState ={
      
        tareasproyecto: [],
        errortarea: false, 
        tareaseleccionada: null
    }

    // Crear dispatch y state 
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear Funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
       
        console.log(proyecto);

        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            console.log(resultado);

            dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
            
        })
       } catch (error) {
           console.log(error);
       }
    }

    // Agregar uan tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
    
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muesta error en caso de que sea necesario
    const validarTarea = ()=>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por Id
    const eliminarTarea = (id, proyecto) => {
        try {
            clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Editar o Modificar tarea
    const actualizarTarea =  async tarea => {
       
       try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
       } catch (error) {
           console.log(error);
       }
    }

    // Extrae una tarea para edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }



    // Elimina la tarea seleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value= {{

                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas, 
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;