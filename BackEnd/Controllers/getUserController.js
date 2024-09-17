const pool = require("../Config/Databasetasksystem");


exports.getUser = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE "id" = $1', [
        req.user.id,
    ]);

      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}