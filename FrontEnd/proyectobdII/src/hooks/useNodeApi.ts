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
