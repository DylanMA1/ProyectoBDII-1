import { Button, Card, List } from "@chakra-ui/react";
import { useState } from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import Form from "./Form";

interface DatabaseButtonsProps {
  formData: any; // Ajusta el tipo según tu estado en `App`
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  connected: boolean;
  handleDisconnect: () => void;
}

const DatabaseButtons: React.FC<DatabaseButtonsProps> = ({
  formData,
  setFormData,
  connected,
  handleDisconnect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Card padding={4} borderRadius="md" boxShadow="md">
        <List>
          <Button
            leftIcon={<BiLogoPostgresql color="lightblue" />}
            onClick={handleOpen}
          >
            PostgreSQL
          </Button>
        </List>
      </Card>

      {isOpen && (
        <Form
          isOpen={isOpen}
          onClose={handleClose}
          formData={formData}
          setFormData={setFormData}
          connected={connected}
          handleDisconnect={handleDisconnect}
        />
      )}
    </>
  );
};

export default DatabaseButtons;
