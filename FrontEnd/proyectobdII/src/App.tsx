import React, { useState } from "react";
import {
  Grid,
  GridItem,
  useToast,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import PlantUMLDiagram from "./components/PlantUMLDiagram";
import DatabaseButtons from "./components/DatabaseButtons";
import axios from "axios";
import ConnectionManager from "./components/ConnectionManager";

interface DatabaseData {
  columns: any[];
  foreignKeys: any[];
}

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

interface ConnectionState {
  formData: FormData;
  databaseData: DatabaseData;
  connectionUrl: string;
  connected: boolean;
}

function App() {
  const [connections, setConnections] = useState<Map<string, ConnectionState>>(
    new Map()
  );
  const [currentDbType, setCurrentDbType] = useState<string>("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setConnections((prevConnections) => {
      const updatedConnections = new Map(prevConnections);
      const currentConnection = updatedConnections.get(currentDbType);
      if (currentConnection) {
        currentConnection.formData = {
          ...currentConnection.formData,
          [e.target.name]: e.target.value,
        };
        updatedConnections.set(currentDbType, currentConnection);
      }
      return updatedConnections;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentDbType) {
      const currentConnection = connections.get(currentDbType);
      if (!currentConnection) return;
      try {
        const endpoint =
          currentConnection.formData.dbType === "postgresql"
            ? "http://localhost:5000/api/set-connection-postgresql"
            : currentConnection.formData.dbType === "mysql"
            ? "http://localhost:5000/api/set-connection-mysql"
            : "http://localhost:5000/api/set-connection-sqlserver";
        await axios.post(endpoint, currentConnection.formData);
        const dataUrl =
          currentConnection.formData.dbType === "postgresql"
            ? "http://localhost:5000/api/postgresql-data"
            : currentConnection.formData.dbType === "mysql"
            ? "http://localhost:5000/api/mysql-data"
            : "http://localhost:5000/api/sqlserver-data";
        const updatedConnection: ConnectionState = {
          ...currentConnection,
          connectionUrl: dataUrl,
          connected: true,
        };
        updatedConnection.databaseData = await axios
          .get<DatabaseData>(
            `${dataUrl}?database=${currentConnection.formData.database}`
          )
          .then((res) => res.data);
        setConnections(
          new Map(connections).set(currentDbType, updatedConnection)
        );
        toast({
          title: "Conexión exitosa.",
          description: `La conexión con ${currentDbType} se ha establecido correctamente.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        console.error(
          `Error al establecer la conexión a ${currentDbType}:`,
          error
        );
        toast({
          title: "Error de conexión.",
          description: `Hubo un problema al intentar establecer la conexión con ${currentDbType}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleDisconnect = () => {
    if (currentDbType) {
      setConnections((prevConnections) => {
        const updatedConnections = new Map(prevConnections);
        const currentConnection = updatedConnections.get(currentDbType);
        if (currentConnection) {
          currentConnection.connectionUrl = "";
          currentConnection.databaseData = { columns: [], foreignKeys: [] };
          currentConnection.connected = false;
          updatedConnections.set(currentDbType, currentConnection);
        }
        return updatedConnections;
      });
      toast({
        title: "Desconectado.",
        description: `La conexión con ${currentDbType} ha sido cerrada.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ConnectionManager
        isOpen={isOpen}
        onClose={onClose}
        formData={connections.get(currentDbType)?.formData || {}} //No  afecta en nada
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDisconnect={handleDisconnect}
        connected={connections.get(currentDbType)?.connected || false}
        dbType={currentDbType}
      />
      <Grid templateColumns="0.8fr 3fr">
        <GridItem>
          <DatabaseButtons
            onOpen={(selectedDbType: string) => {
              setCurrentDbType(selectedDbType);
              const existingConnection = connections.get(selectedDbType);
              if (!existingConnection) {
                setConnections(
                  new Map(connections).set(selectedDbType, {
                    formData: {
                      user: "",
                      host: "",
                      server: "",
                      database: "",
                      password: "",
                      port: "",
                      authType: "",
                      dbType: selectedDbType,
                    },
                    databaseData: { columns: [], foreignKeys: [] },
                    connectionUrl: "",
                    connected: false,
                  })
                );
              }
              onOpen();
            }}
          />
        </GridItem>
        <GridItem>
          <VStack
            overflow="scroll"
            spacing={4}
            paddingY={4}
            minHeight={720}
          >
            {Array.from(connections.values()).map(
              (connection, index) =>
                connection.connected && (
                  <PlantUMLDiagram
                    key={index}
                    data={connection.databaseData}
                    dbName={connection.formData.dbType}
                  />
                )
            )}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
