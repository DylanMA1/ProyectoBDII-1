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

interface SqlServerConnectionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    user: string;
    server: string;
    database: string;
    password: string;
    port: string;
    authType: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleDisconnect: () => void;
  connected: boolean;
}

const SqlServerConnectionManager: React.FC<SqlServerConnectionManagerProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  handleDisconnect,
  connected,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Conectar a SQL Server</ModalHeader>
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
              name="server"
              value={formData.server}
              onChange={handleChange}
              placeholder="Servidor"
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
            
            {/* Campo adicional solo para SQL Server: método de autenticación */}
            <Select
              name="authType"
              value={formData.authType}
              onChange={handleChange}
              mb={3}
            >
              <option value="sqlserver-auth">Autenticación SQL Server</option>
              <option value="windows-auth">Autenticación Windows</option>
            </Select>
            <Button type="submit" colorScheme="blue" mr={3}>
              {connected ? "Conectado" : "Conectar"}
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

export default SqlServerConnectionManager;
