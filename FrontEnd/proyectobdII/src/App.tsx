import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  List,
  ListItem,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import PlantUMLDiagram from "./components/PlantUMLDiagram";
import DatabaseButtons from "./components/DatabaseButtons";
import axios from "axios";
import Form from "./components/Form";

// Definimos la interfaz para el tipo de datos que esperamos de la API
interface PostgresData {
  columns: any[];
  foreignKeys: any[];
}

function App() {
  const [postgresData, setPostgresData] = useState<PostgresData>({
    columns: [],
    foreignKeys: [],
  });
  const [formData, setFormData] = useState({
    user: "",
    host: "",
    database: "",
    password: "",
    port: "",
  });
  const [connectionUrl, setConnectionUrl] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/set-connection", formData);
      setConnectionUrl("http://localhost:5000/api/postgresql-data");
      setConnected(true);
      toast({
        title: "Conexión exitosa.",
        description:
          "La conexión con PostgreSQL se ha establecido correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Cierra el modal al conectar
    } catch (error) {
      console.error("Error al establecer la conexión:", error);
      toast({
        title: "Error de conexión.",
        description:
          "Hubo un problema al intentar establecer la conexión con PostgreSQL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchPostgresData = async () => {
    try {
      const response = await axios.get<PostgresData>(connectionUrl);
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

  const handleDisconnect = () => {
    setConnectionUrl("");
    setPostgresData({ columns: [], foreignKeys: [] });
    setConnected(false);
    toast({
      title: "Desconectado.",
      description: "La conexión con PostgreSQL ha sido cerrada.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Form
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDisconnect={handleDisconnect}
        connected={connected}
      />
      <Grid templateColumns="0.8fr 3fr">
        <GridItem>
          <DatabaseButtons onOpen={onOpen} />
        </GridItem>

        <GridItem>
          <PlantUMLDiagram data={postgresData} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
