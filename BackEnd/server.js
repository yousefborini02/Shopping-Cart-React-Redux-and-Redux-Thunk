require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./Config/Databasetasksystem");
const port = process.env.PORT;
const axios = require("axios");
app.use(
  cors({
    credentials: true, // السماح بأرسال المعلومات مثل الكوكيز  والتوكنز
    origin: "http://localhost:5173", // يسمح فقط بأرسال المعلومات لهاذا الرابط هذا رابط الفرونت اند
  })
);

app.use(express.json()); // js الى json  يتم تحويل البيانات من
app.use(cookieParser()); // js الى cookie التحويل من

app.get("/", (req, res) => {
  res.send("Hello World! \n go to http://localhost:3000/alldata");
});

app.post('/api/users/import-products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    for (const product of products) {
      await pool.query(
        `INSERT INTO products (id, title, description, price, image, rating_rate, rating_count,"IsDeleted") 
         VALUES ($1, $2, $3, $4, $5, $6, $7,$8) ON CONFLICT (id) DO NOTHING`,
        [product.id, product.title, product.description, product.price, product.image, product.rating.rate, product.rating.count, false]
      );
    }

    res.status(200).json({ message: 'Data imported successfully!' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ error: 'Failed to import data' });
  }
});

const userRoutes = require("./Routes/userRouters");

app.use("/api/users", userRoutes);

const productRoutes = require("./Routes/productRoutes");

app.use("/api/productdata", productRoutes);
const getUserRoutes = require("./Routes/getUserRoutes");

app.use("/api/getUser", getUserRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
