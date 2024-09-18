import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  useToast,
  useDisclosure,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import PlantUMLDiagram from "./components/PlantUMLDiagram";
import DatabaseButtons from "./components/DatabaseButtons";
import axios from "axios";
import SqlServerConnectionManager from "./components/SqlServerConnectionManager";
import ConnectionManager from "./components/ConnectionManager";

interface DatabaseData {
  columns: any[];
  foreignKeys: any[];
}

// Datos del formulario, diferenciando entre SQL Server y otras DBs
type FormData = {
  user: string;
  host?: string;
  server?: string;
  database: string;
  password: string;
  port: string;
  authType?: string;
  dbType: string;
};

function App() {
  const [databaseData, setDatabaseData] = useState<DatabaseData>({
    columns: [],
    foreignKeys: [],
  });
  const [formData, setFormData] = useState<FormData>({
    user: "",
    host: "",   // Host solo para PostgreSQL y MySQL
    server: "", // Server solo para SQL Server
    database: "",
    password: "",
    port: "",
    authType: "",
    dbType: "", // Tipo de base de datos seleccionada (PostgreSQL, MySQL, SQL Server)
  });
  const [connectionUrl, setConnectionUrl] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [dbType, setDbType] = useState<string>(""); // Tipo de DB seleccionada
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para enviar el formulario de conexión
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Endpoint de conexión según el tipo de base de datos seleccionada
      const endpoint =
        dbType === "postgresql"
          ? "http://localhost:5000/api/set-connection-postgresql"
          : dbType === "mysql"
          ? "http://localhost:5000/api/set-connection-mysql"
          : "http://localhost:5000/api/set-connection-sqlserver";

      // Realizar la solicitud de conexión
      await axios.post(endpoint, formData);

      // Configurar la URL de los datos según la base de datos seleccionada
      setConnectionUrl(
        dbType === "postgresql"
          ? "http://localhost:5000/api/postgresql-data"
          : dbType === "mysql"
          ? "http://localhost:5000/api/mysql-data"
          : "http://localhost:5000/api/sqlserver-data"
      );
      setConnected(true);

      // Mostrar toast de éxito
      toast({
        title: "Conexión exitosa.",
        description: `La conexión con ${dbType} se ha establecido correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      // Manejar errores de conexión
      console.error(`Error al establecer la conexión a ${dbType}:`, error);
      toast({
        title: "Error de conexión.",
        description: `Hubo un problema al intentar establecer la conexión con ${dbType}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Función para obtener los datos de la base de datos
  const fetchDatabaseData = async () => {
    try {
      const response = await axios.get<DatabaseData>(
        `${connectionUrl}?database=${formData.database}`
      );
      setDatabaseData(response.data);
    } catch (error) {
      console.error(`Error al obtener datos de ${dbType}:`, error);
    }
  };

  useEffect(() => {
    if (connectionUrl) {
      fetchDatabaseData();
    }
  }, [connectionUrl]);

  // Función para manejar la desconexión
  const handleDisconnect = () => {
    setConnectionUrl("");
    setDatabaseData({ columns: [], foreignKeys: [] });
    setConnected(false);
    toast({
      title: "Desconectado.",
      description: `La conexión con ${dbType} ha sido cerrada.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {dbType === "sqlserver" ? (
        <SqlServerConnectionManager
          isOpen={isOpen}
          onClose={onClose}
          formData={formData as FormData & { server: string; authType: string }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDisconnect={handleDisconnect}
          connected={connected}
        />
      ) : (
        <ConnectionManager
          isOpen={isOpen}
          onClose={onClose}
          formData={formData as FormData & { host: string }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDisconnect={handleDisconnect}
          connected={connected}
          dbType={dbType}
        />
      )}
      <Grid templateColumns="0.8fr 3fr">
        <GridItem>
          {/* Componente de los botones de selección de base de datos */}
          <DatabaseButtons
            onOpen={(selectedDbType: string) => {
              setDbType(selectedDbType);
              onOpen();
            }}
          />
        </GridItem>

        <GridItem>
          {/* Componente que muestra el diagrama UML basado en los datos */}
          <PlantUMLDiagram data={databaseData} />
          <Box mt={8}>
            Tablas en {dbType === "postgresql" ? "PostgreSQL" : dbType === "mysql" ? "MySQL" : "SQL Server"}:
            <List spacing={3}>
              {/* Listado de tablas de la base de datos */}
              {databaseData.columns.map((item, index) => (
                <ListItem key={index}>{item.table_name}</ListItem>
              ))}
            </List>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;

