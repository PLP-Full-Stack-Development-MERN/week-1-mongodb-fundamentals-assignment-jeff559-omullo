//Database and Collection Creation
   //Open the MongoDB shell:

     mongo
//Create the library database:

    use library
//Create the books collection (MongoDB creates it when you insert the first document).
   //insert Data
   //Insert five book records into the books collection:

db.books.insertMany([
  { title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, genre: "Fantasy", ISBN: "1234567890" },
  { title: "1984", author: "George Orwell", publishedYear: 1949, genre: "Dystopian", ISBN: "2345678901" },
  { title: "The Da Vinci Code", author: "Dan Brown", publishedYear: 2003, genre: "Thriller", ISBN: "3456789012" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960, genre: "Fiction", ISBN: "4567890123" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", publishedYear: 1951, genre: "Fiction", ISBN: "5678901234" }
])
// Retrieve Data
//Get all books:

db.books.find()
//Find books by a specific author:

db.books.find({ author: "Dan Brown" })
//Find books published after 2000:

db.books.find({ publishedYear: { $gt: 2000 } })
// Update Data
//Update the publishedYear of a specific book:

db.books.updateOne({ ISBN: "1234567890" }, { $set: { publishedYear: 1950 } })
//Add a rating field to all books with a default value of 4:

db.books.updateMany({}, { $set: { rating: 4 } })
// Delete Data
//Delete a book by ISBN:

db.books.deleteOne({ ISBN: "5678901234" })
//Remove all books of a particular genre:

db.books.deleteMany({ genre: "Fiction" })
// Data Modeling for E-Commerce
//A basic e-commerce model with users, orders, and products:

//Users Collection

{
  _id: ObjectId(),
  name: "John Doe",
  email: "johndoe@example.com",
  password: "hashed_password",
  address: "123 Main St",
  orders: [ObjectId()]  // References orders collection
}
//Products Collection

{
  _id: ObjectId(),
  name: "Laptop",
  category: "Electronics",
  price: 1200,
  stock: 10,
  ratings: [5, 4, 3]
}
//Orders Collection


{
  _id: ObjectId(),
  userId: ObjectId(),  // References users collection
  products: [
    { productId: ObjectId(), quantity: 2 }
  ],
  totalAmount: 2400,
  status: "Shipped"
}
//Embedding: Orders contain product details inside the document.
//Referencing: Users reference orders.
// Aggregation Pipeline
//Find total books per genre:

db.books.aggregate([
  { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
])
//Calculate average published year:
db.books.aggregate([
  { $group: { _id: null, avgYear: { $avg: "$publishedYear" } } }
])
//Find top-rated book:

db.books.find().sort({ rating: -1 }).limit(1)
// Indexing
//Create an index on the author field:

db.books.createIndex({ author: 1 })

