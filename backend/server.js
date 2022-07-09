const express = require('express')
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db_setting = {
host : "database",
user : "ais",
password : "ais",
database : "test",
}

app.get('/visits', async (req, res) => {
    let connection
    try {
        connection = await mysql.createConnection(db_setting)
        await connection.beginTransaction();
        const [row1] = await connection.query( 'select v_name, v_datetime from visits')
        await connection.commit();
        console.log(row1)
        res.send(row1)
    } catch (err) {
        await connection.rollback();
        res.json({
        status: "error",
        error: "fail to uplord data"
    })
    } finally {
        connection.end()
    return
    }
});

app.listen(8001, (err) => {
    if (err) {
        console.log('Error');
    }
        console.log('Connected 8001');
});