const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Register Provider
app.post("/api/register/provider", (req, res) => {
  const {
    org_name,
    org_type,
    gst,
    name,
    mobile,
  } = req.body;
  const insertProvider =
    "INSERT INTO providers (org_name, org_type, gst, name, mobile) VALUES (?, ?, ?, ?, ?)";
  const insertUser =
    "INSERT INTO users (mobile, pin, role) VALUES (?, ?, ?)";

  db.query(
    insertProvider,
    [org_name, org_type, gst, name, mobile],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, error: err });

      db.query(
        insertUser,
        [mobile, "4321", "provider"],
        (err2) => {
          if (err2)
            return res
              .status(500)
              .json({
                success: false,
                error: err2,
              });
          res.json({ success: true });
        }
      );
    }
  );
});

// Register Consumer
app.post("/api/register/consumer", (req, res) => {
  const {
    org_name,
    org_type,
    address,
    name,
    mobile,
  } = req.body;
  const insertConsumer =
    "INSERT INTO consumers (org_name, org_type, address, name, mobile) VALUES (?, ?, ?, ?, ?)";
  const insertUser =
    "INSERT INTO users (mobile, pin, role) VALUES (?, ?, ?)";

  db.query(
    insertConsumer,
    [org_name, org_type, address, name, mobile],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, error: err });

      db.query(
        insertUser,
        [mobile, "1234", "consumer"],
        (err2) => {
          if (err2)
            return res
              .status(500)
              .json({
                success: false,
                error: err2,
              });
          res.json({ success: true });
        }
      );
    }
  );
});

// Sign In
app.post("/api/signin", (req, res) => {
  const { mobile, pin, role } = req.body;
  const sql =
    "SELECT * FROM users WHERE mobile = ? AND pin = ? AND role = ?";
  db.query(
    sql,
    [mobile, pin, role],
    (err, result) => {
      if (err) {
        console.error(
          "Error checking credentials:",
          err
        );
        return res
          .status(500)
          .json({ success: false });
      }
      res.json({ success: result.length > 0 });
    }
  );
});

app.listen(5000, () =>
  console.log(
    "Server running on http://localhost:5000"
  )
);
