const {denormalizeData, denormalizeData} = require('./normalizer');

const socket = io();
socket.emit('allProducts');
socket.emit('allMsg')

socket.on('producto', (prod) =>{
    attachRow(prod);
})
socket.on('mensaje', (msg)=>{
    console.log(msg);
    console.log('denormalized data');
    const denormalizeData = denormalizeData(msg)
    nvoMensaje(denormalizeData)
})

const boxMensajes = document.getElementById('messages')
const btnMensajes = document.getElementById('btnMensajes')
const mensaje = document.getElementById('mensaje')
const email = document.getElementById('email')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const edad = document.getElementById('edad')
const alias = document.getElementById('alias')
const avatar = document.getElementById('avatar')


const nvoMensaje = (array) => {
    array.forEach(elem =>{
        const fila = document.createElement('div');
        fila.innerHTML = `<img src="${elem.author.avatar}" />
                        <strong id="author"> ${elem.author.alias}</strong>
                        <em id="msg"> ${elem.text}</em>`;
        boxMensajes.appendChild(fila)
    })
}

btnMensajes.addEventListener('click', async (e) =>{
    e.preventDefault()
    try {
        const data = {
            email: email.value,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            alias: alias.value,
            avatar: avatar.value,
            mensaje: mensaje.value
        }
        const url = 'http://localhost:8080/api/mensajes'
        response = await postData(url, data);
        mensaje.value = '';
    } catch (err) {
        console.log(err)
    };
})

const botonGuardarProducto = document.getElementById('botonGuardarProducto')
const precio = document.getElementById('precio')
const nombreProd = document.getElementById('nombreProd')
const thumbnail = document.getElementById('thumbnail')
const tabla = document.getElementById('tableContent')

const attachRow = (elem) => {
    const fila = document.createElement('tr')
    fila.innerHTML = `<td><img id="img" src="${elem.thumbnail}" alt=""></td>
    <td id="id">${elem.id}</td>
    <td id="nombre">${elem.nombre}</td>
    <td id="nombre">${elem.precio}</td>`;

    tabla.appendChild(fila);
}

botonGuardarProducto.addEventListener('click', async (e) =>{
    e.preventDefault();
    try {
        const data = {
            nombre: nombreProd.value,
            precio: precio.value,
            thumbnail: thumbnail.value
        }
        const url = 'http://localhost:8080/api/productos';
        response = await postData(url, data)

        precio.value = '', nombreProd.value = '', thumbnail.value = '';
    } catch (err) {
        throw err
    };
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data), 
    });
    return response.json();
  }