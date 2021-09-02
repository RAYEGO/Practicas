import React, { useContext, useEffect} from 'react';
import Barra from '../layout/barra';
import Sidebar from '../layout/Sliderbar';
import FormTarea from '../tareas/FornTarea';
import ListadoTareas from '../tareas/ListadoTarea';
import AuthContext from '../../context/autentificacion/authContext';

const Proyectos = () => {
    
    // Extraer la information de autentificacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(()=>{
        usuarioAutenticado();

         // eslint-disable-next-line
    }, [])
    return ( 
        <div className="contenedor-app">
            <Sidebar/>    


            <div className="seccion-principal">
                <Barra/>

                <main>
                   <FormTarea/> 
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;