import knexLib from 'knex'

class SqlClient {
  constructor(config) {
    this.knex = knexLib(config)
  }

  createTable() {
    return this.knex.schema.dropTableIfExists('products')
      .finally(() => {
        return this.knex.schema.createTable('products', table => {
          table.increments('id').primary();
          table.string('name', 50).notNullable();
          table.float('price');
          table.integer('stock');
        })
      })
  }

  insertProducts(products) {
    return this.knex('products').insert(products)
  }

  listProducts() {
    return this.knex('products').select('*')
  }

  deleteProductById(id) {
    return this.knex.from('products').where('id', id).del()
  }

  updateStockById(stock, id) {
    return this.knex.from('products').where('id', id).update({ stock: stock })
  }

  close() {
    this.knex.destroy();
  }
}

export default SqlClient