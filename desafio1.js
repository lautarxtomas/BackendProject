// --------------- DESAFIO 1 ---------------

class User {
    constructor(name, surname, books, pets){
        this.name = name,
        this.surname = surname,
        this.books = books,
        this.pets = pets
    }

    getFullName() {
        console.log(`Hola! Mi nombre es ${this.name} ${this.surname}`)
    }

    addPet(pet){
        this.pets.push(pet);
    }

    countPets(){
        console.log(`La cantidad de mascotas es: ${this.pets.length}`);
    }

    addBook(title, author){
        this.books.push({title: title, author: author});
    }

    getBookNames(){
        let titles = [];
        this.books.forEach(book => {
            titles.push(book.title)
        });
        console.log('Nombres de libros:', titles);
    }
}

const user = new User('Lautaro', 'Martinez', [], []);

user.getFullName();
user.addPet('Perro');
user.addPet('Gato')
user.countPets();
user.addBook('El Resplandor', 'Stephen King');
user.addBook('El Cine Según Hitchcock', 'Francois Truffaut');
user.getBookNames();
