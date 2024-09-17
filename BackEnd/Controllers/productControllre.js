const pool = require("../Config/Databasetasksystem");
  
  exports.ProductData = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows); // json تخزين البيانات في ال
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
  };

  //حذف المنج
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        'UPDATE products SET "IsDeleted" = NOT "IsDeleted" WHERE id = $1',
        [id]
      );
      if (result.rowCount > 0) {
        res.send({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  