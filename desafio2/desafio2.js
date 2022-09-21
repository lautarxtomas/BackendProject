// --------------- DESAFIO 2 ---------------

const fs = require('fs');

class Container {
    constructor(file){
        this.file = file
    }

    async save(product){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)

        let newId
        // newId = contObj.length > 0 ? contObj.length + 1 : 1; --> sirve pero no es recomendado.
        newId = contObj.length ? contObj[contObj.length - 1].id + 1 : 1 // Si hay aunque sea 1 objeto en contObj, busca el último objeto del array y le suma 1 al newId, sino, queda en 1.
        product.id = newId;

        contObj.push(product)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    async getAll(){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)
        return contObj
    }

    async getById(id){
        let contObj = await this.getAll()
        let result = contObj.find(obj => obj.id == id)
        console.log(result)
        return(result)
    }

    async deleteById(id){
        let contObj = await this.getAll()
        let newObj = contObj.filter(obj => obj.id != id)
        await fs.promises.writeFile(this.file, JSON.stringify(newObj))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

let container = new Container('productos.txt')

// container.save({ "name": "jaggermeister", "price": 10000 })
// container.save({"name": "fernet", "price": 1500 })
// container.getById(2)
// container.deleteById(2)
// container.deleteById(4)
// container.deleteById(5)
// container.deleteAll()

// PROBE TODOS Y ANDAN, NO PUEDO TIRAR MUCHOS SAVE AL MISMO TIEMPO PORQUE SOLO PUSHEA EL ULTIMO, E IGUAL CON LOS DELETE

// const usarContenedor = async () => {
//     await productos.save(producto1)
//     await productos.save(producto2)
//     await productos.save(producto3)

// } --------> algo asi tendria que hacer para guardar muchos a la vez

// usarContenedor() 