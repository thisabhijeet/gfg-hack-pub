const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const app = express();
dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(cookieParser());
const jwtSecret = process.env.JWT_SECRET;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const serviceAccount = require("./firebaseKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.listen(4000);
app.get("/api/test", async (req, res) => {
  res.json("test ok");
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "", { sameSite: "none", secure: true }).json(true);
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const data = {
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  };
  const createdDoc = await db.collection("users").doc(email).set(data);
  res.json(createdDoc);
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(422).json("user not found");
  } else {
    const userRef = db.doc("users/" + email);
    const doc = await userRef.get();
    if (!doc.exists) {
      res.status(422).json("user not found");
    } else {
      const docData = doc.data();
      const passOk = bcrypt.compareSync(password, docData.password);
      if (passOk) {
        jwt.sign(
          {
            id: docData.id,
            email: docData.email,
            name: docData.name,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { sameSite: "none", secure: true })
              .json(docData);
          }
        );
        // console.log("Document data:", doc.data());
      } else {
        res.status(422).json("pass not ok");
      }
    }
  }
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userRef = db.doc("users/" + userData.email);
      const doc = await userRef.get();
      // console.log(doc.data());
      res.json(doc.data());
    });
  } else {
    res.json(null);
  }
});

app.post("/api/new", (req, res) => {
  const { token } = req.cookies;
  const data = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const createdDoc = await db
      .collection("users")
      .doc(userData.email)
      .collection("products")
      .doc(data.title)
      .set(data);
    // console.log(createdDoc);
    res.json(createdDoc);
  });
});

app.get("/api/userProducts/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const docu = db
      .collection("users")
      .doc(userData.email)
      .collection("products")
      .doc(id);
    const docum = await docu.get();
    res.json(docum.data());
  });
});

app.get("/api/userProducts", (req, res) => {
  const allProductsData = [];
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const usersRef = db
      .collection("users")
      .doc(userData.email)
      .collection("products");
    const snapshot = await usersRef.get();
    snapshot.forEach((product) => {
      const data = product.data();
      data.owner = userData.name;
      data.ownerEmail = userData.email;
      // console.log(data);
      allProductsData.push(data);
    });
    res.json(allProductsData);
  });
});

app.get("/api/allProducts", async (req, res) => {
  const allProductsData = [];
  // console.log(db.data());
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();
  snapshot.forEach(async (user) => {
    const productsRef = db
      .collection("users")
      .doc(user.id)
      .collection("products");
    const snapshot2 = await productsRef.get();
    snapshot2.forEach((product) => {
      const data = product.data();
      data.owner = user.data().name;
      data.ownerEmail = user.data().email;
      data.qty = 0;
      // console.log(data);
      allProductsData.push(data);
    });
  });
  setTimeout(() => {
    res.json(allProductsData);
  }, 2000);
});

app.delete("/api/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    await db
      .collection("users")
      .doc(userData.email)
      .collection("products")
      .doc(id)
      .delete();
    res.json("deleted");
  });
});

app.post("/api/processOrder", async (req, res) => {
  const resp = [];
  const id = req.body.id;
  const cart = req.body.cart;
  // console.log(req.body);
  await db
    .collection("users")
    .doc(cart[0].buyerEmail)
    .collection("placedOrders")
    .doc(id.toString())
    .set(req.body);
  resp.push(req.body);
  const m = new Map();
  const mp = new Map();
  await cart.forEach(async (item) => {
    const seller = item.ownerEmail;
    // console.log(seller);
    if (m.has(seller)) {
      const prev = m.get(seller);
      // console.log(prev);
      prev.push(item);
      m.set(seller, prev);
      item.addedPhotos.forEach((link) => {
        const arr = mp.get(seller);
        arr.push(link);
        mp.set(seller, arr);
      });
    } else {
      // console.log("yes");
      const arr = [];
      arr.push(item);
      m.set(seller, arr);
      mp.set(seller, []);
      item.addedPhotos.forEach((link) => {
        const a = mp.get(seller);
        a.push(link);
        mp.set(seller, a);
      });
    }
  });

  for (const x of m.keys()) {
    // console.log(m.get(x));
    const data = {};
    data.photos = mp.get(x);
    let sum = 0;
    data.orders = m.get(x);
    const p = await db
      .collection("users")
      .doc(x)
      .collection("recievedOrders")
      .doc(id.toString())
      .set(data);
    // resp.push(p);
    // console.log(m.get(x));
    resp.push(m.get(x));
  }
  // console.log(resp);
  res.json(resp);
});

app.get("/api/placedOrders", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const resp = [];
    const allOrders = await db
      .collection("users")
      .doc(userData.email)
      .collection("placedOrders")
      .get();
    // console.log(allOrders);
    allOrders.forEach((order) => {
      // console.log("yes");
      // console.log(order.data());
      resp.push(order.data());
    });
    res.json(resp);
  });
});

app.get("/api/placedOrders/:id", (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    // console.log("yes");
    const order = await db
      .collection("users")
      .doc(userData.email)
      .collection("placedOrders")
      .doc(id)
      .get();
    // console.log(order.data());
    res.json(order.data());
  });
});
