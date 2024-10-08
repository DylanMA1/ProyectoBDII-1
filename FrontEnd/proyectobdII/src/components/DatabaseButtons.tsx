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
      height="100%"
    >
      <Heading marginBottom={4}>Bases de Datos</Heading>
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
