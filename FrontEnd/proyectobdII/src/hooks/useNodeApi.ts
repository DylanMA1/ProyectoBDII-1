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
};*/

//#################################################################################################################################

/*import axios from "axios";

export const setConnection = async (formData: any, dbType: string) => {
  try {
    let apiUrl;
    if (dbType === "postgresql") {
      apiUrl = "http://localhost:5000/api/set-connection-postgresql";
    } else if (dbType === "mysql") {
      apiUrl = "http://localhost:5000/api/set-connection-mysql";
    }

    await axios.post(apiUrl, formData);
    
    if (dbType === "postgresql") {
      return "http://localhost:5000/api/postgresql-data";
    } else if (dbType === "mysql") {
      return "http://localhost:5000/api/mysql-data";
    }
  } catch (error) {
    throw new Error("Error al establecer la conexión");
  }
};

export const fetchDatabaseData = async (connectionUrl: string) => {
  try {
    const response = await axios.get(connectionUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de la base de datos");
  }
};*/

//#######################################################################################################################

/*import axios from "axios";

export const setConnection = async (formData: any) => {
  try {
    await axios.post("http://localhost:5000/api/set-connection", formData);
    return "http://localhost:5000/api/postgresql-data";
  } catch (error) {
    throw new Error("Error al establecer la conexión");
  }
};

export const fetchPostgresData = async (connectionUrl: string | undefined) => {
  // Usamos ?? para asegurar que siempre haya un string
  const validUrl = connectionUrl ?? '';
  
  try {
    const response = await axios.get(validUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos de PostgreSQL");
  }
};*/

//########################################Importante###########################################

import axios from "axios";

// Función para establecer la conexión, tanto para PostgreSQL como para MySQL
export const setConnection = async (formData: any, dbType: string) => {
  try {
    // Determina el endpoint en función del tipo de base de datos
    const endpoint =
      dbType === "postgresql"
        ? "http://localhost:5000/api/set-connection"
        : "http://localhost:5000/api/set-connection-mysql";

    // Envía los datos de conexión al backend
    await axios.post(endpoint, formData);

    // Retorna la URL de los datos según el tipo de base de datos
    return dbType === "postgresql"
      ? "http://localhost:5000/api/postgresql-data"
      : "http://localhost:5000/api/mysql-data";
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


