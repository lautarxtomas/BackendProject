import { options } from './options/mariaDB.js'
import SqlClient from './mySql.js';
const express = require('express');
const app = express();

// websockets
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

const sql = new SqlClient(options)

// SQL USE METHODS FROM MYSQL.JS

/* ------------- */
/*    Punto 1    */
/* ------------- */
sql.createTable()
  .then(() => {
    console.log("1) table created")

    /* ------------- */
    /*    Punto 2    */
    /* ------------- */
    
    const products = [
      { name: 'Leche', price: 23.60, stock: 24 },
      { name: 'Harina', price: 12.80, stock: 45 },
      { name: 'DDL', price: 32.30, stock: 16 },
      { name: 'Fideos', price: 42.70, stock: 34 },
      { name: 'Crema', price: 67.90, stock: 24 }
    ]
    return sql.insertProducts(products)
  })
  .then(() => {
    console.log("2) products inserted")
    /* ------------- */
    /*    Punto 3    */
    /* ------------- */
    return sql.listProducts()
  })
  .then(products => {
    console.log("3) list of products")
    console.table(products)
    /* ------------- */
    /*    Punto 4    */
    /* ------------- */
    return sql.deleteProductById(3)
  })
  .then(() => {
    console.log("4) product deleted")
    /* ------------- */
    /*    Punto 5    */
    /* ------------- */
    return sql.updateStockById(0, 2)
  })
  .then(() => {
    console.log("5) stock updated")

    /* --------------------- */
    /*    resultado total    */
    /* --------------------- */
    return sql.listProducts()
  })
  .then(articulos => {
    console.log("final result")
    console.table(articulos)
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    sql.close()
  })


// ---- 


// opcion A: guardar solo usando los contenedores, sin usar los arrays. Hay que poner await antes de cada metodo del contenedor (creo). Tambien tiene que ser async el message/product, como aca abajo.
io.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('chats', await containerChats.getAll()) // se emiten TODOS los chats al NUEVO CLIENTE (primer parametro nombre del socket, segundo parametro el array de chats)
    socket.emit('products', await containerProducts.getAll()) // se emiten TODOS los productos al NUEVO CLIENTE

    socket.on('new-message', async message => {
        io.sockets.emit('chats', await containerChats.getAll()); // se emiten TODOS los chats a TODOS los clientes conectados
        if (containerChats.getLength() == 0){
            await containerChats.save(chats)
        }
        else{
            await containerChats.save(message);  
        }
    })
    socket.on('new-product', async product => {
        io.sockets.emit('products', await containerProducts.getAll()); // se emiten TODOS los productos a TODOS los clientes conectados
        if (containerProducts.getLength() == 0){
            await containerProducts.save(products)
        }
        else{
            await containerProducts.save(product); // si ya habia productos en el array, pushea SOLO EL NUEVO PRODUCTO para no sobreescribir los que ya estaban en el array
        }
    })
})