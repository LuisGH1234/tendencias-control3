const express = require("express");
const auth = require("./sevices/auth");
const Product = require("./entities/product.entity");
const User = require("./entities/usuario.entity");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

const pwd = "$2b$10$/dJpU.tNWH47dZzgpi0e4e8L.rCSccRy/Bn4MIJpMKXHNrpySkpFS"; // felpa

app.set("PORT", process.env.PORT || 3002);

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!password) return res.status(404).send("Password value missing");
    const hash = await auth.hash(password);
    const { insertId } = await User.insert({ username, password: hash });
    const token = jwt.sign({ user: { username, id: insertId } }, "secretkey", {
        expiresIn: "7d",
    });
    return res.send({ token, status: "ok" });
});

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.getByUsername(username, password);
    if (!user) return res.status(404).send({ status: "Invalid credentials 1" });

    const isValid = await auth.compare(password, user.password);
    if (!isValid) return res.status(401).send({ status: "Invalid credentials 2" });

    delete user.password;
    const token = jwt.sign({ user }, "secretkey", { expiresIn: "7d" });
    return res.send({ token, status: "ok" });
});

/*app.use((req, res, next, err) => {
    const auth = req.get("authorization");
    console.log("auth", auth);
    next();
});*/

app.use(auth.verify);

app.get("/me", (req, res) => {
    if (req.user) return res.status(200).send({ data: req.user, status: "ok" });
    return res
        .status(401)
        .send({ status: "Unauthorized" })
        .end();
});

app.get("/pedidos", async (req, res) => {
    const result = await Product.getAll();
    if (result) return res.send({ data: result, status: "OK" });
    else res.status(404).send({ data: [], status: "Database Unrecheable" });
});

app.post("/pedidos", async (req, res) => {
    console.log("rel:", req.body);
    await Product.insert(req.body);
    return res
        .status(201)
        .send({ status: "ok" })
        .end();
});

app.put("/pedidos", async (req, res) => {
    console.log("rel:", req.body);
    await Product.update(req.body);
    return res
        .status(202)
        .send({ status: "ok" })
        .end();
});

app.listen(app.get("PORT"), err => {
    if (err) return console.log(err);
});
