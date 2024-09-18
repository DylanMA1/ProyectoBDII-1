/*import axios from "axios";

export const setConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-connection", formData);
    return "http://localhost:5000/api/postgresql-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión");
  }
};

export const fetchPostgresData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de PostgreSQL");
  }
};

export const setSqlServerConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-sqlserver-connection", formData);
    return "http://localhost:5000/api/sqlserver-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión con SQL Server");
  }
};

export const fetchSqlServerData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de SQL Server");
  }
};*/

//######################################Todo###################################

/*import axios from "axios";

export const setConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-connection", formData);
    return "http://localhost:5000/api/postgresql-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión");
  }
};

export const fetchPostgresData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de PostgreSQL");
  }
};

export const setSqlServerConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-sqlserver-connection", formData);
    return "http://localhost:5000/api/sqlserver-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión con SQL Server");
  }
};

export const fetchSqlServerData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de SQL Server");
  }
};

export const setMySQLConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-connection-mysql", formData);
    return "http://localhost:5000/api/mysql-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión con MySQL");
  }
};

export const fetchMySQLData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de MySQL");
  }
};*/

//############################Todo2###############################

import axios from "axios";

// Función para establecer la conexión según el tipo de base de datos
export const setConnection = async (formData: any, dbType: string) => {
  try {
    // Determina el endpoint en función del tipo de base de datos
    let endpoint = "";
    let dataUrl = "";

    switch (dbType) {
      case "postgresql":
        endpoint = "http://localhost:5000/api/set-connection-postgresql";
        dataUrl = "http://localhost:5000/api/postgresql-data";
        break;
      case "mysql":
        endpoint = "http://localhost:5000/api/set-connection-mysql";
        dataUrl = "http://localhost:5000/api/mysql-data";
        break;
      case "sqlserver":
        endpoint = "http://localhost:5000/api/set-connection-sqlserver";
        dataUrl = "http://localhost:5000/api/sqlserver-data";
        break;
      default:
        throw new Error("Tipo de base de datos no soportado");
    }

    // Envía los datos de conexión al backend
    await axios.post(endpoint, formData);

    // Retorna la URL de los datos según el tipo de base de datos
    return dataUrl;
  } catch (error) {
    throw new Error(`Error al establecer la conexión con ${dbType}`);
  }
};

// Función para obtener los datos desde PostgreSQL
export const fetchPostgresData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de PostgreSQL");
  }
};

// Función para obtener los datos desde MySQL
export const fetchMySQLData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de MySQL");
  }
};

// Función para obtener los datos desde SQL Server
export const fetchSqlServerData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de SQL Server");
  }
};


