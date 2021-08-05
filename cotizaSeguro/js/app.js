//Cotizar constructor
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro= function (informacion){
   /*
    1= americano 1.15
    2= asiatico 1.05
    3= europeo 1.35
   */
    let cantidad;
    const base = 2000;
    switch (this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
            
    }
    
    //Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    //cada año de diferencia hay que reducir el 3% del valor del seguro 
    cantidad -= ((diferencia * 3)* cantidad)/100;

    // si es seguro el basico se multiplica el 30% mas
    // si el seguro es completo 50% mas
    if(this.tipo === 'basico'){
        cantidad  *= 1.30;
    }else{
        cantidad *= 1.50;
    }



    return cantidad;
}

// .todo lo que se muestra
function Interfaz() {}

    //mensaje que se imprime en el HTML
    Interfaz.prototype.mostrarMensaje= function(mensaje, tipo){
        const div= document.createElement('div');

        if (tipo === 'error'){
            div.classList.add('mensaje', 'error');

        }else{
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }

    //Imprime el resultado de la cotizacion
    Interfaz.prototype.mostrarResultado = function(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
       switch(seguro.marca){
           case '1':
               marca = 'Americano';
               break;
           case '2':
               marca = 'Asiatico';
               break;
           case '3':
               marca = 'Europeo';
               break;
       }
       //crear un div
       const div = document.createElement('div');
       div.innerHTML = `
            <p class = 'header'>Tu Resumen: </p>
            Marca: ${marca}<br>
            Año: ${seguro.anio}<br>
            Tipo: ${seguro.tipo}<br>
            Total: $ ${total.toFixed(2)}<br>
            
       `;
       const spinner = document.querySelector('#cargando img');
       spinner.style.display = 'block';
       setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
       },250);

      
    }
   



//EvenListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener ('submit', function(e){
    e.preventDefault();


    //Leer marca selecionada del select
    const marca = document.getElementById ('marca');
    const marcaSelecionada = marca.options[marca.selectedIndex].value;

    //Leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSelecionado = anio.options[anio.selectedIndex].value;


    //leer el valor de radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    //Crear instancia de interfaz
    const interfaz = new Interfaz();

    //revisamos que los campos no esten vacios
    if(marcaSelecionada === ''|| anioSelecionado === ''|| tipo=== ''){
        //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Cotizando.....', 'Exito');
    }else{
        //Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }



        //Instancia seguro y mostrando interfaz
        const seguro = new Seguro(marcaSelecionada, anioSelecionado, tipo);

        //Cotizar seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        //mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad );

    }

    
});




const max = new Date().getFullYear(),
     min = max -20;

const selectAnios = document.getElementById('anio');

for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}