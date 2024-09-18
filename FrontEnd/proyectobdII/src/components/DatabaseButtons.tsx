/*import { Button, Card, Heading, List } from "@chakra-ui/react";
import { BiLogoPostgresql } from "react-icons/bi";

interface DatabaseButtonsProps {
  onOpen: () => void;
}

const DatabaseButtons: React.FC<DatabaseButtonsProps> = ({ onOpen }) => {
  return (
    <Card
      padding={4}
      boxShadow="md"
      backgroundColor="gray.700"
      borderRadius={10}
      maxWidth={300}
      // height="100%"
      minHeight={730}
    >
      <Heading marginBottom={2}>Bases de Datos</Heading>
      <List alignContent="center">
        <Button
          leftIcon={<BiLogoPostgresql color="lightblue" />}
          onClick={onOpen}
          width="100%"
        >
          PostgreSQL
        </Button>
          <Button
    leftIcon={<BiLogoPostgresql color="red" />}
    onClick={onOpen} // Ajusta la lógica de apertura si es necesario
    width="100%"
>
  SQL Server
</Button>
      </List>
    </Card>
  );
};

export default DatabaseButtons;*/

//#################################Todo###########################################

/*import React from "react";
import { Button, VStack, Box, Heading } from "@chakra-ui/react";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMicrosoftsqlserver } from "react-icons/si";
import { DiMysql } from "react-icons/di";

interface DatabaseButtonsProps {
  onOpen: () => void;
}

const DatabaseButtons: React.FC<DatabaseButtonsProps> = ({ onOpen }) => {
  return (
    <Box
      padding={4}
      boxShadow="md"
      backgroundColor="gray.700"
      borderRadius={10}
      maxWidth={300}
      minHeight={730}
    >
      <Heading marginBottom={4} size="md" color="white">
        Bases de Datos
      </Heading>
      
      <VStack spacing={4} align="stretch">
        <Button
          leftIcon={<BiLogoPostgresql color="blue" />}
          onClick={onOpen} // Ajusta la lógica si es necesario
          width="100%"
        >
          PostgreSQL
        </Button>

        <Button
          leftIcon={<SiMicrosoftsqlserver color="red" />}
          onClick={onOpen} // Ajusta la lógica si es necesario
          width="100%"
        >
          SQL Server
        </Button>

        <Button
          leftIcon={<DiMysql color="green" />}
          onClick={onOpen} // Ajusta la lógica si es necesario
          width="100%"
        >
          MySQL
        </Button>
      </VStack>
    </Box>
  );
};

export default DatabaseButtons;*/

//############################Todo2###############################

import { Button, Card, Heading, List } from "@chakra-ui/react";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql, SiMicrosoftsqlserver } from "react-icons/si"; // Logo de MySQL y SQL Server

interface DatabaseButtonsProps {
  onOpen: (dbType: string) => void;
}

const DatabaseButtons: React.FC<DatabaseButtonsProps> = ({ onOpen }) => {
  return (
    <Card
      padding={4}
      boxShadow="md"
      backgroundColor="gray.700"
      borderRadius={10}
      maxWidth={300}
      minHeight={730}
    >
      <Heading marginBottom={2}>Bases de Datos</Heading>
      <List alignContent="center">
        <Button
          leftIcon={<BiLogoPostgresql color="lightblue" />}
          onClick={() => onOpen("postgresql")}
          width="100%"
        >
          PostgreSQL
        </Button>
        <Button
          leftIcon={<SiMysql color="orange" />}
          onClick={() => onOpen("mysql")}
          width="100%"
          mt={4}
        >
          MySQL
        </Button>
        <Button
          leftIcon={<SiMicrosoftsqlserver color="red" />}
          onClick={() => onOpen("sqlserver")}
          width="100%"
          mt={4}
        >
          SQL Server
        </Button>
      </List>
    </Card>
  );
};

export default DatabaseButtons;






