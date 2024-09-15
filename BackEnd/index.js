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

  if (!user || !password || !server || !database) {
    return res.status(400).send('Faltan parámetros de conexión');
  }

  const sqlServerConfig = {
    user,
    password,
    server,
    database,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  // Cierra la conexión existente si la hay
  if (sqlPool) {
    sqlPool.close();
  }

  // Conectar a SQL Server y asignar la conexión a sqlPool
  sql.connect(sqlServerConfig)
    .then(pool => {
      if (pool.connected) {
        console.log('Conectado a SQL Server');
        sqlPool = pool;
        return pool.request().query(`
          SELECT TABLE_NAME 
          FROM INFORMATION_SCHEMA.TABLES 
          WHERE TABLE_TYPE = 'BASE TABLE'
        `);
      }
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
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
    // Cierra la conexión existente si la hay
    if (pgPool) {
      pgPool.end();
    }

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


// Ruta para desconectar PostgreSQL
app.post('/api/disconnect-postgresql', (req, res) => {
  if (pgPool) {
    pgPool.end()
      .then(() => {
        console.log('Conexión a PostgreSQL cerrada');
        pgPool = null; // Asegúrate de que la conexión se reinicie
        res.send('Desconectado de PostgreSQL');
      })
      .catch(err => {
        console.error('Error al cerrar la conexión de PostgreSQL:', err);
        res.status(500).send('Error al cerrar la conexión de PostgreSQL');
      });
  } else {
    res.status(400).send('No hay conexión activa a PostgreSQL');
  }
});

// Ruta para desconectar SQL Server
app.post('/api/disconnect-sqlserver', (req, res) => {
  if (sqlPool) {
    sqlPool.close()
      .then(() => {
        console.log('Conexión a SQL Server cerrada');
        sqlPool = null; // Asegúrate de que la conexión se reinicie
        res.send('Desconectado de SQL Server');
      })
      .catch(err => {
        console.error('Error al cerrar la conexión de SQL Server:', err);
        res.status(500).send('Error al cerrar la conexión de SQL Server');
      });
  } else {
    res.status(400).send('No hay conexión activa a SQL Server');
  }
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