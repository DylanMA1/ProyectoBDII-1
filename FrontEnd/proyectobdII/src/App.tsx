import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  Box,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import PlantUMLDiagram from "./components/PlantUMLDiagram";
import DatabaseButtons from "./components/DatabaseButtons";
import { fetchPostgresData } from "./hooks/useNodeApi";

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

  useEffect(() => {
    if (connectionUrl) {
      const fetchData = async () => {
        try {
          const data = await fetchPostgresData(connectionUrl);
          console.log("Fetched Data:", data); // Verifica los datos obtenidos
          setPostgresData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
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
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <GridItem minHeight="100vh">
        <DatabaseButtons
          formData={formData}
          setFormData={setFormData}
          connected={connected}
          handleDisconnect={handleDisconnect}
        />
      </GridItem>

      <GridItem padding={5}>
        <Container maxW="container.md" p={4}>
          <PlantUMLDiagram data={postgresData} />
        </Container>

        <Box mt={8}>
          <List spacing={3}>
            {postgresData.map((item, index) => (
              <ListItem key={index}>{item.table_name}</ListItem>
            ))}
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
