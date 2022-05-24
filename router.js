const Contenedor = require("./contenedor")
const producto = new Contenedor("productos.txt")

const express = require("express");
const userRouter = express.Router();

//GET__________________________________

userRouter.get("/",(req, res) => {
    producto.getAll().then(resp => res.send(resp))
}); 

userRouter.get("/:id", (req, res) => {
    producto.getById(parseInt(req.params.id)).then(resp => res.send(resp))
});

//_____________________________________

const app = express();

app.use("/api/productos", userRouter);

//POST_________________________________

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));//--> middleware que transforma el body en JSON
app.use(express.json());//--> middleware que devuelve los datos del servidor en json

app.post("/datos", (req, res) => {
    producto.save(req.body).then(resp => res.send(resp));
});

//PUT__________________________________

app.put("/api/productos/:id", (req, res) => {
    const newObj = req.body
    producto.putById(parseInt(req.params.id), newObj.title, newObj.price, newObj.thumbnail).then(resp => res.json(resp))
});

//DELETE_______________________________

userRouter.delete("/:id", (req, res) => {
    producto.deleteById(parseInt(req.params.id)).then(resp => res.send(resp))
});

//SERVER_______________________________

app.listen(8080, () => {
    console.log("Server listening in port 8080...")
});

//http://localhost:8080/form.html

//http://localhost:8080/

//http://localhost:8080/api/productos/