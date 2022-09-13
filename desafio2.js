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
        newId = contObj.length > 0 ? contObj.length + 1 : 1;
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
// container.save({ "name": "fernet branca", "price": 1300 })
// container.save({ "name": "gancia red bitter", "price": 900 })
// container.save({ "name": "quilmes 1lt", "price": 300 })
// container.save({ "name": "aperol", "price": 800 })
// container.save({ "name": "jack daniels", "price": 10000 })
