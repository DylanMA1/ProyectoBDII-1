import React, { useEffect, useState } from "react";
import { Grid, GridItem, useToast, useDisclosure } from "@chakra-ui/react";
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
  const [databaseData, setDatabaseData] = useState<{
    [key: string]: DatabaseData;
  }>({});
  const [formData, setFormData] = useState<{ [key: string]: FormData }>({
    postgresql: {
      user: "",
      host: "",
      database: "",
      password: "",
      port: "",
      dbType: "postgresql",
    },
    mysql: {
      user: "",
      host: "",
      database: "",
      password: "",
      port: "",
      dbType: "mysql",
    },
    sqlserver: {
      user: "",
      server: "",
      database: "",
      password: "",
      port: "",
      authType: "",
      dbType: "sqlserver",
    },
  });

  const [connectionUrls, setConnectionUrls] = useState<{
    [key: string]: string;
  }>({
    postgresql: "http://localhost:5000/api/postgresql-data",
    mysql: "http://localhost:5000/api/mysql-data",
    sqlserver: "http://localhost:5000/api/sqlserver-data",
  });

  const [connected, setConnected] = useState<{ [key: string]: boolean }>({
    postgresql: false,
    mysql: false,
    sqlserver: false,
  });

  const [dbType, setDbType] = useState<string>(""); // Tipo de DB seleccionada
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [dbType]: {
        ...prevData[dbType],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentFormData = formData[dbType];

    try {
      const endpoint =
        dbType === "postgresql"
          ? "http://localhost:5000/api/set-connection-postgresql"
          : dbType === "mysql"
          ? "http://localhost:5000/api/set-connection-mysql"
          : "http://localhost:5000/api/set-connection-sqlserver";

      await axios.post(endpoint, currentFormData);

      setConnected((prev) => ({ ...prev, [dbType]: true }));
      toast({
        title: "Conexión exitosa.",
        description: `La conexión con ${dbType} se ha establecido correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
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

  const fetchDatabaseData = async (db: string) => {
    try {
      const response = await axios.get<DatabaseData>(connectionUrls[db]);
      console.log(`Datos obtenidos de ${db}:`, response.data); // Agregar esto para depurar
      setDatabaseData((prev) => ({ ...prev, [db]: response.data }));
    } catch (error) {
      console.error(`Error al obtener datos de ${db}:`, error);
    }
  };

  useEffect(() => {
    Object.keys(connected).forEach((db) => {
      if (connected[db]) {
        fetchDatabaseData(db);
      }
    });
  }, [connected]);

  const handleDisconnect = () => {
    setConnected((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((db) => (newState[db] = false));
      return newState;
    });
    setDatabaseData({});
    toast({
      title: "Desconectado.",
      description: `Las conexiones han sido cerradas.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {dbType === "sqlserver" ? (
        <ConnectionManager
          isOpen={isOpen}
          onClose={onClose}
          formData={formData.sqlserver}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDisconnect={handleDisconnect}
          connected={connected.sqlserver}
          dbType={dbType}
        />
      ) : (
        <ConnectionManager
          isOpen={isOpen}
          onClose={onClose}
          formData={formData[dbType === "postgresql" ? "postgresql" : "mysql"]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDisconnect={handleDisconnect}
          connected={connected[dbType]}
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

        <GridItem minHeight={730} maxHeight={730} overflowX="scroll">
          {/* Componente que muestra el diagrama UML basado en los datos */}
          {Object.keys(databaseData).map((db) => (
            <PlantUMLDiagram key={db} data={databaseData[db]} dbName={db} />
          ))}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
