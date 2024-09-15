import { Button, Card, Heading, List } from "@chakra-ui/react";
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
{/*           <Button
    leftIcon={<BiLogoPostgresql color="red" />}
    onClick={onOpen} // Ajusta la lógica de apertura si es necesario
    width="100%"
>
  SQL Server
</Button> */}
      </List>
    </Card>
  );
};

export default DatabaseButtons;
