import React, { useState } from "react";
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
  FormLabel,
  FormControl,
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
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await handleSubmit(e);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Conectar a {dbType.toUpperCase()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="connection-form" onSubmit={onSubmit}>
            <FormControl id="user" isRequired>
              <FormLabel>User</FormLabel>

              <Input
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Usuario"
                mb={3}
              />
            </FormControl>
            <FormControl id="host" isRequired>
              <FormLabel>Host</FormLabel>

              <Input
                name="host"
                value={formData.host}
                onChange={handleChange}
                placeholder="Host"
                mb={3}
              />
            </FormControl>
            <FormControl id="database" isRequired>
              <FormLabel>DataBase</FormLabel>

              <Input
                name="database"
                value={formData.database}
                onChange={handleChange}
                placeholder="Base de Datos"
                mb={3}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>

              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                mb={3}
              />
            </FormControl>
            <FormLabel>Port</FormLabel>

            <Input
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="Puerto"
              mb={3}
            />
            <ModalFooter>
              {!connected && (
                <Button
                  colorScheme="teal"
                  type="submit"
                  mr={3}
                  isLoading={loading}
                >
                  Conectar
                </Button>
              )}
              {connected && (
                <Button colorScheme="red" onClick={handleDisconnect}>
                  Desconectar
                </Button>
              )}
              <Button onClick={onClose} marginLeft={2}>
                Cerrar
              </Button>
              {connected && (
                <Button colorScheme="blue" onClick={onSubmit}>
                  Actualizar
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectionManager;
