const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection('products').updateOne({
        _id: this._id
      }, {
        $set: this
      })
    } else {
      return db
        .collection('products')
        .insertOne(this)
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({
      _id: new mongodb.ObjectId(prodId)
    }).next();
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({
      _id: new mongodb.ObjectId(prodId)
    })
  }
}

module.exports = Product;