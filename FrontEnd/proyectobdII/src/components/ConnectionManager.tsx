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
    host?: string;
    server?: string;
    database: string;
    password: string;
    port: string;
    authType?: string;
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
            {dbType === "sqlserver" ? (
              <>
                <Input
                  name="server"
                  value={formData.server || ''} // Manejo de valor opcional
                  onChange={handleChange}
                  placeholder="Servidor"
                  mb={3}
                />
                <Select
                  name="authType"
                  value={formData.authType || ''} // Manejo de valor opcional
                  onChange={handleChange}
                  mb={3}
                >
                  <option value="windows">Autenticación de Windows</option>
                  <option value="sql">Autenticación de SQL Server</option>
                </Select>
              </>
            ) : (
              <Input
                name="host"
                value={formData.host || ''} // Manejo de valor opcional
                onChange={handleChange}
                placeholder="Host"
                mb={3}
              />
            )}
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

export default ConnectionManager;
