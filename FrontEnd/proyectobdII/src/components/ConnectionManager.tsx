import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";

interface ConnectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: string;
    dbType: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleDisconnect: () => void;
  connected: boolean;
  dbType: string;
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  handleDisconnect,
  connected,
  dbType,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Conectar a {dbType.toUpperCase()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Input
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Usuario"
              mb={3}
            />
            <Input
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="Host"
              mb={3}
            />
            <Input
              name="database"
              value={formData.database}
              onChange={handleChange}
              placeholder="Base de Datos"
              mb={3}
            />
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              mb={3}
            />
            <Input
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="Puerto"
              mb={3}
            />
            <Button type="submit" colorScheme="blue" mr={3}>
              {connected ? "Desconectar" : "Conectar"}
            </Button>
          </form>
        </ModalBody>
        {connected && (
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDisconnect}>
              Desconectar
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConnectionManager;
