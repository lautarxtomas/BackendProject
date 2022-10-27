import { options } from './options/mariaDB.js'
import SqlClient from './mySql'
import express from 'express'
const app = express();

// websockets
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

const sql = new SqlClient(options)

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    sql.createTable()
      .then(() => {
        return sql.listProducts();
      })
      .then((products) => {
        socket.emit("products", products);
      })
      .then((products) => {
        socket.on("new-product", (product) => {
          io.sockets.emit("products", products)
          sql.insertProducts(product)
        })
      })
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
          sql.close()
      })
    })


// running server
const PORT = process.env.PORT || 8080;

const srv = httpServer.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))
     

// SQL USE METHODS FROM MYSQL.JS

/* ------------- */
/*    Punto 1    */
/* ------------- */
// sql.createTable()
//   .then(() => {
//     console.log("1) table created")

//     /* ------------- */
//     /*    Punto 2    */
//     /* ------------- */
    
//     const products = [
//       { name: 'Leche', price: 23.60, stock: 24 },
//       { name: 'Harina', price: 12.80, stock: 45 },
//       { name: 'DDL', price: 32.30, stock: 16 },
//       { name: 'Fideos', price: 42.70, stock: 34 },
//       { name: 'Crema', price: 67.90, stock: 24 }
//     ]
//     return sql.insertProducts(products)
//   })
//   .then(() => {
//     console.log("2) products inserted")
//     /* ------------- */
//     /*    Punto 3    */
//     /* ------------- */
//     return sql.listProducts()
//   })
//   .then(products => {
//     console.log("3) list of products")
//     console.table(products)
//     /* ------------- */
//     /*    Punto 4    */
//     /* ------------- */
//     return sql.deleteProductById(3)
//   })
//   .then(() => {
//     console.log("4) product deleted")
//     /* ------------- */
//     /*    Punto 5    */
//     /* ------------- */
//     return sql.updateStockById(0, 2)
//   })
//   .then(() => {
//     console.log("5) stock updated")

//     /* --------------------- */
//     /*    resultado total    */
//     /* --------------------- */
//     return sql.listProducts()
//   })
//   .then(articulos => {
//     console.log("final result")
//     console.table(articulos)
//   })
//   .catch((err) => { console.log(err); throw err })
//   .finally(() => {
//     sql.close()
//   })


// ---- 


// REFERENCIA DESAFIO 6

// io.on('connection', async (socket) => {
//     console.log("Nuevo cliente conectado")
//     socket.emit('chats', await containerChats.getAll()) // se emiten TODOS los chats al NUEVO CLIENTE (primer parametro nombre del socket, segundo parametro el array de chats)
//     socket.emit('products', await containerProducts.getAll()) // se emiten TODOS los productos al NUEVO CLIENTE

//     socket.on('new-message', async message => {
//         io.sockets.emit('chats', await containerChats.getAll()); // se emiten TODOS los chats a TODOS los clientes conectados
//         if (containerChats.getLength() == 0){
//             await containerChats.save(chats)
//         }
//         else{
//             await containerChats.save(message);  
//         }
//     })
//     socket.on('new-product', async product => {
//         io.sockets.emit('products', await containerProducts.getAll()); // se emiten TODOS los productos a TODOS los clientes conectados
//         if (containerProducts.getLength() == 0){
//             await containerProducts.save(products)
//         }
//         else{
//             await containerProducts.save(product); // si ya habia productos en el array, pushea SOLO EL NUEVO PRODUCTO para no sobreescribir los que ya estaban en el array
//         }
//     })
// })