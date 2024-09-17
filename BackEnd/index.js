/*const express = require('express');
const { Pool } = require('pg');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let pgPool;
let sqlPool;

// Configuración de la conexión a SQL Server
app.post('/api/set-sqlserver-connection', (req, res) => {
  const { user, password, server, database } = req.body;

  console.log('Received SQL Server connection parameters:', req.body);

  if (!user || !password || !server || !database) {
    return res.status(400).send('Faltan parámetros de conexión');
  }

  const sqlServerConfig = {
    user: user,
    password: password,
    server: server,
    database: database,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

  sql.connect(sqlServerConfig).then(pool => {
    if (pool.connected) {
      console.log('Conectado a SQL Server');
      sqlPool = pool;

      return pool.request().query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);
    }
  }).then(result => {
    console.log('Resultado de la consulta:', result);
    res.json(result.recordset);
  }).catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    res.status(500).send('Error al conectar a SQL Server');
  });
});

// Ruta para obtener datos desde SQL Server en formato similar a PostgreSQL
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

  const foreignKeysQuery = `
    SELECT 
      fk.name AS constraint_name,
      tp.name AS table_name,
      cp.name AS column_name,
      tr.name AS referenced_table,
      cr.name AS referenced_column
    FROM sys.foreign_keys AS fk
    INNER JOIN sys.tables AS tp ON fk.parent_object_id = tp.object_id
    INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
    INNER JOIN sys.columns AS cp ON tp.object_id = cp.object_id AND cp.column_id = fkc.parent_column_id
    INNER JOIN sys.tables AS tr ON fkc.referenced_object_id = tr.object_id
    INNER JOIN sys.columns AS cr ON tr.object_id = cr.object_id AND cr.column_id = fkc.referenced_column_id
  `;

  try {
    const [columnsResult, foreignKeysResult] = await Promise.all([
      sqlPool.request().query(columnsQuery),
      sqlPool.request().query(foreignKeysQuery)
    ]);

    res.json({
      columns: columnsResult.recordset.map(col => ({
        table_name: col.table_name,
        column_name: col.column_name,
        data_type: col.data_type,
        is_nullable: col.is_nullable,
        column_default: col.column_default
      })),
      foreignKeys: foreignKeysResult.recordset.map(fk => ({
        table_name: fk.table_name,
        column_name: fk.column_name,
        referenced_table: fk.referenced_table,
        referenced_column: fk.referenced_column
      }))
    });
  } catch (err) {
    console.error('Error en la consulta a SQL Server:', err);
    res.status(500).send('Error en la consulta a SQL Server');
  }
});

// Configuración de la conexión a PostgreSQL
app.post('/api/set-connection', (req, res) => {
  const { user, host, database, password, port } = req.body;

  pgPool = new Pool({
    user,
    host,
    database,
    password,
    port: parseInt(port, 10),
  });

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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});*/

//############################Todo#####################################

const express = require('express');
const { Pool } = require('pg');
const sql = require('mssql');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let pgPool;
let sqlPool;

// Configuración de la conexión a SQL Server
app.post('/api/set-sqlserver-connection', (req, res) => {
  const { user, password, server, database } = req.body;

  console.log('Received SQL Server connection parameters:', req.body);

  if (!user || !password || !server || !database) {
    return res.status(400).send('Faltan parámetros de conexión');
  }

  const sqlServerConfig = {
    user: user,
    password: password,
    server: server,
    database: database,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

  sql.connect(sqlServerConfig).then(pool => {
    if (pool.connected) {
      console.log('Conectado a SQL Server');
      sqlPool = pool;

      return pool.request().query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);
    }
  }).then(result => {
    console.log('Resultado de la consulta:', result);
    res.json(result.recordset);
  }).catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    res.status(500).send('Error al conectar a SQL Server');
  });
});

// Ruta para obtener datos desde SQL Server en formato similar a PostgreSQL
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

  const foreignKeysQuery = `
    SELECT 
      fk.name AS constraint_name,
      tp.name AS table_name,
      cp.name AS column_name,
      tr.name AS referenced_table,
      cr.name AS referenced_column
    FROM sys.foreign_keys AS fk
    INNER JOIN sys.tables AS tp ON fk.parent_object_id = tp.object_id
    INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
    INNER JOIN sys.columns AS cp ON tp.object_id = cp.object_id AND cp.column_id = fkc.parent_column_id
    INNER JOIN sys.tables AS tr ON fkc.referenced_object_id = tr.object_id
    INNER JOIN sys.columns AS cr ON tr.object_id = cr.object_id AND cr.column_id = fkc.referenced_column_id
  `;

  try {
    const [columnsResult, foreignKeysResult] = await Promise.all([
      sqlPool.request().query(columnsQuery),
      sqlPool.request().query(foreignKeysQuery)
    ]);

    res.json({
      columns: columnsResult.recordset.map(col => ({
        table_name: col.table_name,
        column_name: col.column_name,
        data_type: col.data_type,
        is_nullable: col.is_nullable,
        column_default: col.column_default
      })),
      foreignKeys: foreignKeysResult.recordset.map(fk => ({
        table_name: fk.table_name,
        column_name: fk.column_name,
        referenced_table: fk.referenced_table,
        referenced_column: fk.referenced_column
      }))
    });
  } catch (err) {
    console.error('Error en la consulta a SQL Server:', err);
    res.status(500).send('Error en la consulta a SQL Server');
  }
});

// Configuración de la conexión a PostgreSQL
app.post('/api/set-connection', (req, res) => {
  const { user, host, database, password, port } = req.body;

  pgPool = new Pool({
    user,
    host,
    database,
    password,
    port: parseInt(port, 10),
  });

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

// Configuración de la conexión a MySQL
app.post('/api/set-connection-mysql', (req, res) => {
  const { user, host, database, password, port } = req.body;

  /*mysqlConnection = mysql.createConnection({
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
});*/

const mysqlConnection = mysql.createConnection({
  host,
  user,
  database,
  password,
  port: parseInt(port, 10),
}).promise();

mysqlConnection.connect()
  .then(() => {
    console.log('Conectado a MySQL');
    res.send('Conexión a MySQL establecida');
  })
  .catch(err => {
    console.error('Error al conectar a MySQL:', err);
    res.status(500).send('Error al conectar a MySQL');
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

  if (!mysqlConnection || !mysqlConnection.connection.stream.writable) {
    return res.status(500).send('Conexión a MySQL no está activa');
  }
  

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

