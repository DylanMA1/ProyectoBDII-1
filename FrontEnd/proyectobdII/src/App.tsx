import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import PlantUMLDiagram from "./components/PlantUMLDiagram";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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
  const [connected, setConnected] = useState<boolean>(false);
  const toast = useToast();

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

  const handleDisconnect = () => {
    setConnectionUrl("");
    setPostgresData([]);
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
    <Container maxW="container.md" p={4}>
      <Box mb={8}>
        <img
          src={viteLogo}
          alt="Vite logo"
          style={{ width: "50px", marginRight: "10px" }}
        />
        <img src={reactLogo} alt="React logo" style={{ width: "50px" }} />
      </Box>

      <PlantUMLDiagram data={postgresData} />

      <Box as="form" onSubmit={handleSubmit} mt={8}>
        <Text fontSize="2xl" mb={4}>
          Conexión a PostgreSQL:
        </Text>
        <FormControl id="user" mb={4} isRequired>
          <FormLabel>Usuario</FormLabel>
          <Input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="host" mb={4} isRequired>
          <FormLabel>Host</FormLabel>
          <Input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="database" mb={4} isRequired>
          <FormLabel>Base de Datos</FormLabel>
          <Input
            type="text"
            name="database"
            value={formData.database}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" mb={4} isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="port" mb={4} isRequired>
          <FormLabel>Puerto</FormLabel>
          <Input
            type="text"
            name="port"
            value={formData.port}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mr={4}>
          Conectar
        </Button>
        {connected && (
          <Button onClick={handleDisconnect} colorScheme="red">
            Desconectar
          </Button>
        )}
      </Box>

      <Box mt={8}>
        <Text fontSize="2xl" mb={4}>
          Tablas en PostgreSQL:
        </Text>
        <List spacing={3}>
          {postgresData.map((item, index) => (
            <ListItem key={index}>{item.table_name}</ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
