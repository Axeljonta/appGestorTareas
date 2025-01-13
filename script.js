const prompt = require('prompt-sync')();
// Array para alamacenar las tareas 

let tareas = [];
let categoriasNombres = [
    'Trabajo',
    'Personal',
    //agregar segun requiera cada usuario
]

//funcion que muestra todas las catergorias 
function mostrarCategorias(){
    console.log('Categorias existentes: ');
    categoriasNombres.forEach(function(categoria,indice){
        console.log(indice+ ': '+categoria);
        
    })
}

//cargar nuevas categorias 
function agregarCategoria(nomCategoria){
    categoriasNombres.push(nomCategoria);
    console.log(`Categoria: ${nomCategoria} agregada correctamente!!!`);
    
}

//Verificando que le fecha sea valida
function solicitarFecha() {
    let fechaValida = false;
    let fechaLimite;

    while (!fechaValida) {
        fechaLimite = prompt('Puede agregar una fecha límite (dd-mm-aa): ');
        if (/^\d{2}-\d{2}-\d{2}$/.test(fechaLimite)) {
            const [dia, mes, anio] = fechaLimite.split('-').map(Number);

            // Verifica si la fecha es válida usando el objeto Date
            const fecha = new Date(`20${anio}-${mes}-${dia}`);
            if (
                fecha.getFullYear() === 2000 + anio &&
                fecha.getMonth() + 1 === mes &&
                fecha.getDate() === dia
            ) {
                fechaValida = true;
            } else {
                console.log('La fecha ingresada no es válida. Inténtelo de nuevo.');
            }
        } else {
            console.log('Formato incorrecto. Use dd-mm-aa.');
        }
    }
    return fechaLimite;
}

// funcion para agregar una nueva tarea al array 
function agregarTarea(nombreTarea, fechaLimiteRecibida = null){
    
    mostrarCategorias();

    let numeroCategoria = parseInt(prompt('Ingrese numero de la categoria para la nueva tarea: '))

    if (numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length) {
        tareas.push({nombre: nombreTarea, completada: false, fechaLimite : fechaLimiteRecibida, categoria: numeroCategoria })
        console.log('Tarea agregada correctamente');
    }
    else{
        console.log('Numero de tarea incorrecto');
        
    }
}

// funcion para eliminar una tarea 
function eliminarTarea(indice){
    (indice >= 0 && indice > tareas.length)?
    (tareas.splice(indice,1), console.log('Tarea eliminada')):
    console.log('Indice invalido');
}

// Funcion para marcar tarea como completada 
function completarTarea(indice){
    (indice >= 0 && indice > tareas.length)?
    (tareas[indice].completada = true, console.log('Tarea completada')):
    console.log('Indice invalido');
}

//funcion para mofificar tarea especifica
function modificarTarea(i, nuevoNombre, nuevaFecha = null, nuevoNumeroCategoria){
    if (i >= 0 && i < tareas.length) {
        // Modificar el nombre si se proporciona
        if (nuevoNombre !== undefined) {
            tareas[i].nombre = nuevoNombre;
        }
        // Modificar la fecha límite si se proporciona
        if (nuevaFecha !== null) {
            tareas[i].fechaLimite = nuevaFecha;
        }
        // Modificar la categoría si se proporciona
        if (nuevoNumeroCategoria !== undefined) {
            tareas[i].categoria = nuevoNumeroCategoria;
        }
    } else {
        console.log('Índice inválido');
    }
}

//funcion filtrar tareas por categoria 
function filtrarTareasPorCategoria(numeroCategoria){
    let tareasFiltradas = tareas.filter(function(tarea){
        return tarea.categoria === numeroCategoria
    });
    return tareasFiltradas;
}

//funcion que muestra tareas filtradas 
function tareasCompletasCategorias(numeroCategoria){
    let  tareasCategoria = filtrarTareasPorCategoria(numeroCategoria);
    let tareasCompletas = tareasCategoria.reduce(function(cont,tarea){
        return tarea.completada ? cont + 1 : cont; 
    },0);

    let totalTareas = tareasCategoria.length;
    
    console.log('Tareas completadas de la categoria '+ numeroCategoria +' - '+tareasCompletas+' de '+ tareasCategoria);
}

//funcion mostrar tareas no completadas 
function mostrarTareasNoCompletadas(){
    console.log('Tareas no completadas: ');
    tareas.forEach(tarea => {
        if (!tarea.completada) {
            console.log(`Nombre ${tarea.nombre}, Categoria ${categoriasNombres[tarea.categoria]}`);
            
            
        }
    });
}

//funcion ordenar tareas por la propiedad nombre utilizando BubbleSort
function ordenarTareasPorNombre(){

    for (let j = 0; j < tareas.length; j++) {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].nombre > tareas[i+1].nombre) {
            let temp = tareas[i];
            tareas[i]= tareas[i+1];
            tareas[i+1]= temp;
            }
        }
    }
}

//funcion ordenar tareas por la propiedad  fecha utilizando BubbleSort
function ordenarTareasPorFeacha(){

    for (let j = 0; j < tareas.length; j++) {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].fechaLimite > tareas[i+1].fechaLimite) {
            let temp = tareas[i];
            tareas[i]= tareas[i+1];
            tareas[i+1]= temp;
            }
        }
    }
}

//funcion que busca tarea por nombre y retorna su posicion
function bucarPorNombre(nombreTarea) {
    
    let inicio = 0;
    let fin = tareas.length -1 ;

    while(inicio <= fin){

        let elementoMedio = Math.round((inicio-fin)/2);

        if(tareas[elementoMedio].nombre === nombreTarea){
            return elementoMedio
        }
        else if(tareas[elementoMedio].nombre < nombreTarea){
            inicio =  elementoMedio+1
        }
        else{
            fin = elementoMedio -1 
        }

    }
    return -1

}


//funcion para mostrar menu 
function mostrarMenu(){
    console.log('-----MENU-----');
    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Marcar tarea como completada');
    console.log('4. Modificar una tarea');
    console.log('5. Mostrar tareas');
    console.log('6. Ver todas las categorias');
    console.log('7. Agregar una nueva categoria');
    console.log('8. Filtrar tareas por categoria');
    console.log('9. Tareas completadas por categoria');
    console.log('10. Visualizar tareas no completadas');
    console.log('11. Ordenar tarea por nombre');
    console.log('12. Ordenar tarea por fecha');
    console.log('13. Buscar tareas por nombre');
    
    
    console.log('0. Salir');
}

//funcion para interactuar con usuario 
function interactuarUsuario(){
    let opcion = -1;

    while(opcion != 0){
        mostrarMenu();
        
        opcion = parseInt(prompt('Ingrese una opcion: '));

        switch(opcion){
            case 1:
                let nombreTareaNueva = prompt('Ingresar el nombre de la tarea a cargar: ');
                let fecha = prompt('Quiere agregar fecha limite? 1-SI 2-NO: ');
                let fechaLimiteNueva = undefined
                if (fecha == 1){
                    fechaLimiteNueva = solicitarFecha()
                }
                agregarTarea(nombreTareaNueva, fechaLimiteNueva);
                break

            case 2:
                let indiceEliminar = parseInt(prompt('Ingresar el indice de la tarea a eliminar: '));
                eliminarTarea(indiceEliminar)
                break

            case 3:
                let indiceCompletar = parseInt(prompt('Ingresar el indice de la tarea a completar: '));
                completarTarea(indiceCompletar);
                break

            case 4:
                let indice = parseInt(prompt('Ingresar el indice a modificar; '));
                if (indice >= 0 && indice < tareas.length) {
                    let opcion = parseInt(prompt('Que propiedad quiere modificar? 1- Nombre 2- Fecha Limite 3-categoria: '));
                    switch (opcion) {
                        case 1:
                            let nuevoNombre = prompt('Ingrese nuevo nombre de su tarea: ');
                            modificarTarea(indice,nuevoNombre);
                            break;

                        case 2:
                            let nuevoFecha = solicitarFecha();
                            modificarTarea(indice, undefined,nuevoFecha);
                            break;

                        case 3:
                            let nuevaCategoria = parseInt(prompt('Ingrese nueva fecha limite: '));
                            if (nuevaCategoria >= 0 && nuevaCategoria < categoriasNombres.length) {
                                modificarTarea(indice, undefined, undefined,nuevaCategoria);
                            }
                            break;
                    
                        default:
                            console.log('Numero erroneo');
                            
                            break;
                    }
                    
                }
                else{
                    console.log('Numero incorrecto.');
                    
                }
                break

            case 5:
                console.log('-----LISTA DE TAREAS-----');
                console.log(tareas);
                break

            case 6:
                mostrarCategorias()
                break 
            
            case 7:
                let nuevaCategoria= prompt('Ingresa nueva categoria: ');
                agregarCategoria(nuevaCategoria);
                break
            
            case 8:
                mostrarCategorias();
                let nroCategoria = parseInt(prompt('Ingrese numero de categoria a filtrar: '));
                let tareasCategoria = filtrarTareasPorCategoria(nroCategoria);
                console.log('Tareas de la categoria seleccionada :' + tareasCategoria);
                break
            
            case 9:
                mostrarCategorias();
                let nroCateg = parseInt(prompt('Ingrese numero de categoria a visualizar: '));
                tareasCompletasCategorias(nroCateg);
                break

            case 10: 
                mostrarTareasNoCompletadas();
                break
            
            case 11: 
                ordenarTareasPorNombre();
                break

            case 12: 
                ordenarTareasPorFeacha;
                break

            case 13:
                ordenarTareasPorNombre();
                let nombreABuscar= prompt('Ingese nombre de la tarea a buscar');
                let indiceTarea  = bucarPorNombre(nombreABuscar);

                if(indiceTarea !== -1){
                    console.log('Tarea encontrade en le inide: '+ indiceTarea );
                }
                else{
                    console.log('Tarea no encontrada');
                    
                }
                break

            default:
                console.log('Opcion Invalida!');
                break
                
        }
    }
}

interactuarUsuario()