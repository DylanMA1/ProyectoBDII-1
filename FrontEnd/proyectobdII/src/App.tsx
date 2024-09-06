import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PlantUML from "./components/plantUML";

function App() {
  const [postgresData, setPostgresData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    user: "",
    host: "",
    database: "",
    password: "",
    port: "",
  });

  const [connectionUrl, setConnectionUrl] = useState<string>("");

  // Maneja los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Enviar los datos de conexión al servidor
      await axios.post("http://localhost:5000/api/set-connection", formData);
      // Ahora obtenemos los datos desde PostgreSQL
      setConnectionUrl("http://localhost:5000/api/postgresql-data");
    } catch (error) {
      console.error("Error al establecer la conexión:", error);
    }
  };

  // Función para obtener datos de PostgreSQL
  const fetchPostgresData = async () => {
    try {
      const response = await axios.get(connectionUrl);
      setPostgresData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de PostgreSQL:", error);
    }
  };

  useEffect(() => {
    if (connectionUrl) {
      fetchPostgresData();
    }
  }, [connectionUrl]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <PlantUML />

      <form onSubmit={handleSubmit}>
        <h2>Conexión a PostgreSQL:</h2>
        <label>
          Usuario:
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Host:
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Base de Datos:
          <input
            type="text"
            name="database"
            value={formData.database}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Puerto:
          <input
            type="text"
            name="port"
            value={formData.port}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Conectar</button>
      </form>
      <div>
        <h2>Tablas en PostgreSQL:</h2>
        <ul>
          {postgresData.map((item, index) => (
            <li key={index}>{item.table_name}</li> // Muestra el nombre de la tabla
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
