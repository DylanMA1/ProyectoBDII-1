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

import axios from "axios";

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
};

