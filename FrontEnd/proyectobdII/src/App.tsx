/*import React, { useEffect, useState } from "react";
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
import Form from "./components/Form";

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
    server: "",
    database: "",
    password: "",
    port: "",
    dbType: "",
    authType: "",
  });

  const [connectionUrl, setConnectionUrl] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.dbType === "postgresql") {
        // Conectar a PostgreSQL
        await axios.post("http://localhost:5000/api/set-connection", formData);
        setConnectionUrl("http://localhost:5000/api/postgresql-data");
      } else if (formData.dbType === "sqlserver") {
        // Conectar a SQL Server
        await axios.post(
          "http://localhost:5000/api/set-sqlserver-connection",
          formData
        );
        setConnectionUrl("http://localhost:5000/api/sqlserver-data");
      }
      setConnected(true);
      toast({
        title: "Conexión exitosa.",
        description: `La conexión con ${
          formData.dbType === "postgresql" ? "PostgreSQL" : "SQL Server"
        } se ha establecido correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al establecer la conexión:", error);
      toast({
        title: "Error de conexión.",
        description: `Hubo un problema al intentar establecer la conexión con ${
          formData.dbType === "postgresql" ? "PostgreSQL" : "SQL Server"
        }.`,
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
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    if (connectionUrl) {
      fetchPostgresData();
    }
  }, [connectionUrl]);

  useEffect(() => {
    console.log("Postgres Data:", postgresData);
  }, [postgresData]); // Agrega este useEffect para imprimir los datos

  const handleDisconnect = () => {
    setConnectionUrl("");
    setPostgresData({ columns: [], foreignKeys: [] });
    setConnected(false);
    toast({
      title: "Desconectado.",
      description: `La conexión con ${
        formData.dbType === "postgresql" ? "PostgreSQL" : "SQL Server"
      } ha sido cerrada.`,
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
          <Box mt={8}>
            Tablas en{" "}
            {formData.dbType === "postgresql" ? "PostgreSQL" : "SQL Server"}:
            <List spacing={3}>
              {postgresData.columns.map((item, index) => (
                <ListItem key={index}>{item.table_name}</ListItem>
              ))}
            </List>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;*/

//#########################Todo########################

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
import Form from "./components/Form";

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
    server: "",
    database: "",
    password: "",
    port: "",
    dbType: "",
    authType: "",
  });

  const [connectionUrl, setConnectionUrl] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.dbType === "postgresql") {
        // Conectar a PostgreSQL
        await axios.post("http://localhost:5000/api/set-connection", formData);
        setConnectionUrl("http://localhost:5000/api/postgresql-data");
      } else if (formData.dbType === "sqlserver") {
        // Conectar a SQL Server
        await axios.post(
          "http://localhost:5000/api/set-sqlserver-connection",
          formData
        );
        setConnectionUrl("http://localhost:5000/api/sqlserver-data");
      } else if (formData.dbType === "mysql") {
        // Conectar a MySQL
        await axios.post("http://localhost:5000/api/set-mysql-connection", formData);
        setConnectionUrl("http://localhost:5000/api/mysql-data");
      }
      setConnected(true);
      toast({
        title: "Conexión exitosa.",
        description: `La conexión con ${
          formData.dbType === "postgresql"
            ? "PostgreSQL"
            : formData.dbType === "sqlserver"
            ? "SQL Server"
            : "MySQL"
        } se ha establecido correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al establecer la conexión:", error);
      toast({
        title: "Error de conexión.",
        description: `Hubo un problema al intentar establecer la conexión con ${
          formData.dbType === "postgresql"
            ? "PostgreSQL"
            : formData.dbType === "sqlserver"
            ? "SQL Server"
            : "MySQL"
        }.`,
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
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    if (connectionUrl) {
      fetchPostgresData();
    }
  }, [connectionUrl]);

  useEffect(() => {
    console.log("Postgres Data:", postgresData);
  }, [postgresData]);

  const handleDisconnect = () => {
    setConnectionUrl("");
    setPostgresData({ columns: [], foreignKeys: [] });
    setConnected(false);
    toast({
      title: "Desconectado.",
      description: `La conexión con ${
        formData.dbType === "postgresql"
          ? "PostgreSQL"
          : formData.dbType === "sqlserver"
          ? "SQL Server"
          : "MySQL"
      } ha sido cerrada.`,
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
          <Box mt={8}>
            Tablas en{" "}
            {formData.dbType === "postgresql"
              ? "PostgreSQL"
              : formData.dbType === "sqlserver"
              ? "SQL Server"
              : "MySQL"}
            :
            <List spacing={3}>
              {postgresData.columns.map((item, index) => (
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



