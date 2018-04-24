const sqlite3 = require('sqlite3').verbose();
let db = openDBCon();
getAllSensorID(2);
getSensorStatus(1, 1);
addSensor(3);
updateSensor(2, 3, 'F');
closeDBCon(db);

function addSensor(lotID) { // add a sensor record to the db

    db.run(`INSERT INTO Sensors(lotID) VALUES(?)`, [lotID], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Sensor inserted. ID: ${this.lastID}`);
    });
    return this.lastID;
}

function updateSensor(lotID, sensorID, signal) { // update a sensor record in the db
    let data = [signal, sensorID, lotID];
    let sql = `UPDATE Sensors
            SET Status = ?
            WHERE SensorID = ?
            AND LotID = ?`;

    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

    });
}

function getAllSensorID(lotID) { // log all sensor IDs in the lot
    let sql = `SELECT DISTINCT SensorID FROM Sensors
            WHERE LotID = `+ lotID + `
           ORDER BY SensorID`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.SensorID);
        });
    });
}

function getSensorStatus(lotID, sensorID) { // get status of a sensor record
    let sql = `SELECT DISTINCT Status FROM Sensors
            WHERE LotID = `+ lotID + `
            AND SensorID = ` + sensorID + `
           ORDER BY SensorID`;
    let response;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            response = row.Status;
        });
    });
    return response;
}

function openDBCon() { // open database in memory
    let db = new sqlite3.Database('db/testServer.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    return db;
}

function closeDBCon(db) { // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Database connection closed.');
    });
}

