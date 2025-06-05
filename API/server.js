const express = require("express"); 
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'plantscare_mr'
});

// plants

app.get("/api/plants", (req, res) => {
    pool.query("SELECT * FROM plants", (err, results) => {
        res.send(results);
    });
});

app.get("/api/plants/:id", (req, res) => {
    if (!req.params.id)
    {
        return res.send({message: "Hiányzó id!"});
    }

    pool.query("SELECT * FROM plants WHERE id = ?", [req.params.id], (err, results) => {
        res.send(results);
    });
});

app.post("/api/plants", (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.species)
    {
        return res.send({message: "Hiányzó adatok!"});
    }

    pool.query("INSERT INTO plants (`name`, `species`, `water_interval_days`) VALUES (?, ?, ?)", [req.body.name, req.body.species, req.body.watering_interval_days], (err, results) => {
        res.send({message: "Növény hozzáadva!"});
    });
});

app.patch("/api/plants/:id", (req, res) => {
    if (!req.params.id || !req.body.name || !req.body.species || !req.body.watering_interval_days)
    {
        return res.send({message: "Hiányzó adatok!"});
    }
    console.log(req.params.id, req.body);
    pool.query("UPDATE `plants` SET `name`= ?, `species`= ?, `water_interval_days`= ? WHERE id = ?", [req.body.name, req.body.species, req.body.watering_interval_days, req.params.id], (err, results) => {
        res.send({message: "Növény módosítva!"});
    });
});

app.delete("/api/plants/:id", (req, res) => {
    if (!req.params.id)
    {
        return res.send({message: "Hiányzó id!"});
    }
    console.log(req.params.id);

    pool.query("DELETE FROM plants WHERE id = ?", [req.params.id], (err, results) => {
        res.send({message: "Növény törölve!"});
    });
});


// stats

app.get("/api/plants/stats", (req, res) => {
    pool.query("SELECT * FROM statistics", (err, results) => {
        res.send(results);
    });
});


// watering logs

app.get("/api/plants/:id/waterings", (req, res) => {
    if (!req.params.id)
    {
        return res.send({message: "Hiányzó id!"});
    }

    pool.query("SELECT * FROM watering_logs WHERE plant_id = ?", [req.params.id], (err, results) => {
        res.send(results);
    });
});

app.post("/api/waterings", (req, res) => {
    if (!req.body.plant_id || !req.body.date_watered || !req.body.amount_ml || !req.body.notes)
    {
        return res.send({message: "Hiányzó adatok!"});
    }

    pool.query("INSERT INTO `watering_logs` (`plant_id`, `date_watered`, `amount_ml`, `notes`) VALUES (?, ?, ?, ?)", [req.body.plant_id, req.body.date_watered, req.body.amount_ml, req.body.notes], (err, results) => {
        res.send({message: "Öntözés jegyezve!"});
    });
});

app.delete("/api/waterings/:id", (req, res) => {
    if (!req.params.id)
    {
        return res.send({message: "Hiányzó id!"});
    }

    pool.query("DELETE FROM `watering_logs` WHERE id = ?", [req.params.id], (err, results) => {
        res.send({message: "Öntözési jegyzés törölve!"});
    });
});

//

app.listen(3000, () => {
    console.log("Server is listening on port: 3000");
});