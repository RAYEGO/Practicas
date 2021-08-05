//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById ('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =document.getElementById('vaciar-carrito');


//Listener
cargarEventListener();

function cargarEventListener(){
    //dispara cuando se presiona carrito
    cursos.addEventListener('click', comprarCursos);

    //Cuendo se elimina un curso de carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, mostar local storage
    document.addEventListener ('DOMContentLoaded',leerLocalStorage);

}


//Funciones
//Funcion de añade el curso al carrito
function comprarCursos(e){
    e.preventDefault();
    //delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviar el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    
    }
}

//lee los datos del curso

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);

}

//Muestra el curso selecionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML=`
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</td>
        </td>
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

//Elimina el Curso del  carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    let curso;
    let cursoId;
    if(e.target.classList.contains('borrar-curso')){

        e.target.parentElement.parentElement.remove();
        curso=e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
    }  

    eliminarCursoLocalStorage(cursoId);
}

//elimina todos los cursos del carrito en el DOM
function vaciarCarrito(){
    //forma lenta 
    //listaCursos.innerHTML = '';
    //Forma rapida (recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

   //Vacias local storage
   vaciarLocalStorage();

   return false;
     
}

const guardarCursoLocalStorage = (curso) => {
    let cursos;
    //toma el valor de un arreglo con datos LS o vacio
    cursos = obtenerLocalStorage();

    //el curso selecionado se agrega
    cursos.push(curso);
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

const obtenerLocalStorage = () => {
    let cursosLS;
    
    //comprobamos si hay algo en localStorage
    if (localStorage.getItem('cursos')=== null){
        cursosLS =[];
    }else{
        cursosLS =JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos de local storage  en el carrito

function leerLocalStorage (){
    let cursosLS;

    cursosLS = obtenerLocalStorage();
    
    cursosLS.forEach(function(curso){
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</td>
            </td>
        `;

        listaCursos.appendChild(row);
    });

    
}

//Elimina curso por el ID en local storage
function eliminarCursoLocalStorage(curso){

    let cursosLS;

    cursosLS = obtenerLocalStorage();
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
         
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
    
}

//Elimina todos los cursos de local storage
const vaciarLocalStorage = () => {
    localStorage.clear();
}