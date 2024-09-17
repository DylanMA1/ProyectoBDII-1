const express = require('express');
const { Pool } = require('pg');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let pgPool;
let mysqlConnection;

app.post('/api/set-connection-postgresql', (req, res) => {
  const { user, host, database, password, port } = req.body;

  pgPool = new Pool({
    user,
    host,
    database,
    password,
    port: parseInt(port, 10),
  });

  pgPool.connect((err) => {
    if (err) {
      console.error('Error al conectar a PostgreSQL:', err);
      res.status(500).send('Error al conectar a PostgreSQL');
    } else {
      console.log('Conectado a PostgreSQL');
      res.send('Conexión establecida');
    }
  });
});

app.post('/api/set-connection-mysql', (req, res) => {
  const { user, host, database, password, port } = req.body;

  mysqlConnection = mysql.createConnection({
    host,
    user,
    database,
    password,
    port: parseInt(port, 10),
  });

  mysqlConnection.connect((err) => {
    if (err) {
      console.error('Error al conectar a MySQL:', err);
      res.status(500).send('Error al conectar a MySQL');
    } else {
      console.log('Conectado a MySQL');
      res.send('Conexión a MySQL establecida');
    }
  });
});

// Ruta para obtener datos desde PostgreSQL
app.get('/api/postgresql-data', (req, res) => {
  if (!pgPool) {
    return res.status(500).send('Conexión no establecida');
  }

  const columnsQuery = `
    SELECT
      table_name, 
      column_name, 
      data_type, 
      is_nullable, 
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
  `;

  const foreignKeysQuery = `
    SELECT
      tc.table_name,
      kcu.column_name,
      ccu.table_name AS referenced_table,
      ccu.column_name AS referenced_column
    FROM
      information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
  `;

  Promise.all([
    pgPool.query(columnsQuery),
    pgPool.query(foreignKeysQuery),
  ]).then(([columnsResult, foreignKeysResult]) => {
    res.json({
      columns: columnsResult.rows,
      foreignKeys: foreignKeysResult.rows,
    });
  }).catch(err => {
    console.error('Error en la consulta a PostgreSQL:', err);
    res.status(500).send('Error en la consulta a PostgreSQL');
  });
});

// Ruta para obtener datos desde MySQL
app.get('/api/mysql-data', (req, res) => {
  if (!mysqlConnection) {
    return res.status(500).send('Conexión no establecida');
  }

  const database = req.query.database;

  const columnsQuery = `
    SELECT
      TABLE_NAME as table_name, 
      COLUMN_NAME as column_name, 
      DATA_TYPE as data_type, 
      IS_NULLABLE as is_nullable, 
      COLUMN_DEFAULT as column_default
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = ?;
  `;

  const foreignKeysQuery = `
    SELECT
      TABLE_NAME as table_name,
      COLUMN_NAME as column_name,
      REFERENCED_TABLE_NAME as referenced_table,
      REFERENCED_COLUMN_NAME as referenced_column
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE REFERENCED_TABLE_NAME IS NOT NULL
    AND TABLE_SCHEMA = ?;
  `;

  Promise.all([
    mysqlConnection.promise().query(columnsQuery, [database]),
    mysqlConnection.promise().query(foreignKeysQuery, [database]),
  ]).then(([columnsResult, foreignKeysResult]) => {
    res.json({
      columns: columnsResult[0],
      foreignKeys: foreignKeysResult[0],
    });
  }).catch(err => {
    console.error('Error en la consulta a MySQL:', err);
    res.status(500).send('Error en la consulta a MySQL');
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});






