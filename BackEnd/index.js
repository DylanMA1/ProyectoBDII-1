const express = require('express');
const { Pool } = require('pg');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let pgPool;

// Configuración de la conexión a SQL Server
let sqlPool;

app.post('/api/set-sqlserver-connection', (req, res) => {
  const { user, password, server, database } = req.body;
  
  console.log('Received SQL Server connection parameters:', req.body);

  // Verifica que todos los campos necesarios estén presentes
  if (!user || !password || !server || !database) {
    return res.status(400).send('Faltan parámetros de conexión');
  }

  // Configuración de la conexión con los valores de req.body
  const sqlServerConfig = {
    user: user,
    password: password,
    server: server, // Ejemplo: 'localhost' o la dirección de tu servidor SQL
    database: database,
    options: {
      encrypt: true, // True si necesitas una conexión segura (Azure, etc.)
      trustServerCertificate: true // Para conexiones locales o pruebas
    }
  };

  // Conectar a SQL Server y asignar la conexión a sqlPool
  sql.connect(sqlServerConfig).then(pool => {
    if (pool.connected) {
      console.log('Conectado a SQL Server');
      sqlPool = pool; // Asignar la conexión a la variable global sqlPool

      // Ejecutar consulta para obtener las tablas
      return pool.request().query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);
    }
  }).then(result => {
    // Enviar las tablas como respuesta
    res.json(result.recordset);
  }).catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    res.status(500).send('Error al conectar a SQL Server');
  });
}); 

app.get('/api/sqlserver-data', async (req, res) => {
  if (!sqlPool) {
    return res.status(500).send('Conexión no establecida');
  }

  const columnsQuery = `
    SELECT 
      TABLE_NAME as table_name,
      COLUMN_NAME as column_name,
      DATA_TYPE as data_type,
      IS_NULLABLE as is_nullable,
      COLUMN_DEFAULT as column_default
    FROM INFORMATION_SCHEMA.COLUMNS
  `;

  try {
    const columnsResult = await sqlPool.request().query(columnsQuery);
    console.log('Resultados de las columnas:', columnsResult.recordset);

    res.json({
      columns: columnsResult.recordset
    });
  } catch (err) {
    console.error('Error en la consulta a SQL Server:', err);
    res.status(500).send('Error en la consulta a SQL Server');
  }
});

  
// Configuración de la conexión a MySQL
//const mysqlConnection = mysql.createConnection({
//  host: 'localhost',
//  user: 'mysql-user', // Cambia estos valores por los tuyos
//  password: 'mysql-password',
//  database: 'mysql-database'
//});

// Ruta para configurar la conexión a PostgreSQL
app.post('/api/set-connection', (req, res) => {
  const { user, host, database, password, port } = req.body;

// Configura la conexión
  pgPool = new Pool({
    user,
    host,
    database,
    password,
    port: parseInt(port, 10),
  });

// Configuración de la conexión a SQL Server
//const sqlServerConfig = {
//  user: '',    // Cambia estos valores por los tuyos
//  password: 'sqlserver-password',
//  server: 'localhost',       // O el host de tu servidor SQL
//  database: 'sqlserver-database',
//  options: {
//    encrypt: true,           // True si usas Azure o requiere encriptación
//    trustServerCertificate: true // Solo si trabajas en local
//  }
//};

// Verificar conexión a MySQL
//mysqlConnection.connect(err => {
//  if (err) {
//    console.error('Error al conectar a MySQL:', err);
// } else {
//    console.log('Conectado a MySQL');
//  }
//});

  // Verifica la conexión
  pgPool.connect(err => {
    if (err) {
      console.error('Error al conectar a PostgreSQL:', err);
      res.status(500).send('Error al conectar a PostgreSQL');
    } else {
      console.log('Conectado a PostgreSQL');
      res.send('Conexión establecida');
    }
  });
});

// Verificar conexión a SQL Server
//sql.connect(sqlServerConfig).then(() => {
//  console.log('Conectado a SQL Server');
//}).catch(err => {
//  console.error('Error al conectar a SQL Server:', err);
//});

// Ruta para obtener datos desde MySQL
//app.get('/api/mysql-data', (req, res) => {
//  mysqlConnection.query('SELECT * FROM your_mysql_table', (err, results) => {
//    if (err) {
//      return res.status(500).send('Error en la consulta a MySQL');
//   }
//    res.json(results);
//  });
//});

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
    WHERE table_schema = 'public'`;

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
    pgPool.query(foreignKeysQuery)
  ]).then(([columnsResult, foreignKeysResult]) => {
    res.json({
      columns: columnsResult.rows,
      foreignKeys: foreignKeysResult.rows
    });
  }).catch(err => {
    console.error('Error en la consulta a PostgreSQL:', err);
    res.status(500).send('Error en la consulta a PostgreSQL');
  });
});






// Ruta para obtener datos desde SQL Server
//app.get('/api/sqlserver-data', async (req, res) => {
//  try {
//    const result = await sql.query('SELECT * FROM your_sqlserver_table');
//    res.json(result.recordset); // Los resultados de SQL Server se devuelven en `recordset`
// } catch (err) {
//    res.status(500).send('Error en la consulta a SQL Server');
//  }
//});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});