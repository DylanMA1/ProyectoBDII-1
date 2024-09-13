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
      onClose();
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
          <Box mt={8}>
            Tablas en PostgreSQL:
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

//###########################################################################################################################

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

interface DatabaseData {
  columns: any[];
  foreignKeys: any[];
}

function App() {
  const [databaseData, setDatabaseData] = useState<DatabaseData>({
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
  const [dbType, setDbType] = useState<string>("");  // Tipo de DB seleccionada
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
      const endpoint =
        dbType === "postgresql"
          ? "http://localhost:5000/api/set-connection"
          : "http://localhost:5000/api/set-connection-mysql";

      await axios.post(endpoint, formData);
      setConnectionUrl(
        dbType === "postgresql"
          ? "http://localhost:5000/api/postgresql-data"
          : "http://localhost:5000/api/mysql-data"
      );
      setConnected(true);
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

  const fetchDatabaseData = async () => {
    try {
      const response = await axios.get<DatabaseData>(connectionUrl);
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
      <Form
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDisconnect={handleDisconnect}
        connected={connected}
        dbType={dbType}  // Prop adicional para saber qué DB se está usando
      />
      <Grid templateColumns="0.8fr 3fr">
        <GridItem>
          <DatabaseButtons onOpen={(dbType: string) => { setDbType(dbType); onOpen(); }} />
        </GridItem>

        <GridItem>
          <PlantUMLDiagram data={databaseData} />
          <Box mt={8}>
            Tablas en {dbType === "postgresql" ? "PostgreSQL" : "MySQL"}:
            <List spacing={3}>
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

export default App;*/

//################################Importante####################################################################

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

interface DatabaseData {
  columns: any[];
  foreignKeys: any[];
}

function App() {
  const [databaseData, setDatabaseData] = useState<DatabaseData>({
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
  const [dbType, setDbType] = useState<string>(""); // Tipo de DB seleccionada
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
      // Verificar si es PostgreSQL o MySQL para usar el endpoint correcto
      const endpoint =
        dbType === "postgresql"
          ? "http://localhost:5000/api/set-connection"
          : "http://localhost:5000/api/set-connection-mysql";

      // Realizar la solicitud de conexión al backend
      await axios.post(endpoint, formData);

      // Establecer la URL de los datos en función de la base de datos seleccionada
      setConnectionUrl(
        dbType === "postgresql"
          ? "http://localhost:5000/api/postgresql-data"
          : "http://localhost:5000/api/mysql-data"
      );
      setConnected(true);

      // Mostrar un toast de éxito
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
      const response = await axios.get<DatabaseData>(connectionUrl);
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

  // Función para desconectar la base de datos
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
      <Form
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDisconnect={handleDisconnect}
        connected={connected}
        dbType={dbType} // Prop adicional para saber qué DB se está usando
      />
      <Grid templateColumns="0.8fr 3fr">
        <GridItem>
          {/* Componente de los botones de selección de bases de datos */}
          <DatabaseButtons
            onOpen={(dbType: string) => {
              setDbType(dbType);
              onOpen();
            }}
          />
        </GridItem>

        <GridItem>
          {/* Componente que muestra el diagrama UML basado en los datos */}
          <PlantUMLDiagram data={databaseData} />
          <Box mt={8}>
            Tablas en {dbType === "postgresql" ? "PostgreSQL" : "MySQL"}:
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

