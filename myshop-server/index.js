const fs = require("fs");
const express = require("express");
const app = express();
const eta = require("eta");
const bodyParser = require('body-parser');
const dayjs = require('dayjs')
const mysql = require('mysql2/promise');
const cors = require('cors')

app.engine("eta", eta.renderFile);
eta.configure({ views: "./views", cache: false });
app.set("views", "./views");
app.set("view cache", false);
app.set("view engine", "eta");
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

let connection;
async function initMySQL() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myshop'
    });
}

// les fonctions de gestion des produits en base de données
async function loadProducts(where = "1=1", orderBy = "name") {
    const [rows, fields] = await connection.query('SELECT * FROM products');
    return rows;
}

async function loadProduct(id) {
    const [rows, fields] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    console.log(rows);
    return rows[0];

}

async function addProduct(product) {
    let [inserted] = await connection.query('INSERT INTO products (name, description, price) VALUES (?,?,?)', [product.name, product.description, product.price]);
    return inserted.insertId;
}

async function updateProduct(id, product) {
    await connection.query(`UPDATE products SET name=?, description=?, price=? WHERE id=?`, [product.name, product.description, product.price, id]);
    return id;
}
async function removeProduct(id) {
    connection.query(`DELETE FROM products WHERE id=?`, [id]);
}

// les pages du site web
app.get("/", function (req, res) {
    res.redirect("/list");
});
app.get("/list", async function (req, res) {
    let products = await loadProducts()
    res.render("list.eta", { products: products, menu: "liste-manga" });
});


app.get("/details/:id", async function (req, res) {
    let product = await loadProduct(req.params.id)
    if (!product) return res.redirect("/list")
    res.render("details.eta", { product: product });
});

// les requêtes REST du backoffice
app.get("/office/products", async function (req, res) {
    let products = await loadProducts();
    res.send(products);;
});
app.get("/office/products/:id", async function (req, res) {
    let product = await loadProduct(req.params.id)
    if (!product) return res.send({ error: "product not found" })
    res.send({ product });

});
app.post("/office/products", async function (req, res) {
    let id = await addProduct(req.body)
    let product = await loadProduct(id)
    res.send(product);
});
app.put("/office/products/:id", async function (req, res) {
    let product = await loadProduct(req.params.id)
    if (!product) return res.send({ error: "product not found" })
    await updateProduct(req.params.id, req.body)
    product = await loadProduct(req.params.id)
    res.send({ data: product })

});
app.delete("/office/products/:id", async function (req, res) {
    let product = await loadProduct(req.params.id)
    if (!product) return res.send({ error: "product not found" })
    await removeProduct(req.params.id)
    res.send({ data: product })
});


app.listen(8000, async function () {
    console.log("listening on port 8000");
    await initMySQL();
    await loadProducts();
});