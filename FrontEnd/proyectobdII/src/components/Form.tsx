import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";

interface ConnectionFormProps {
  formData: {
    user: string;
    server: string; // Cambiado de 'host' a 'server'
    database: string;
    password: string;
    port: string;
    dbType: string; // Tipo de base de datos (PostgreSQL o SQL Server)
    authType: string; // Tipo de autenticación (SQL Server o Windows Auth)
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDisconnect: () => void;
  connected: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<ConnectionFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handleDisconnect,
  connected,
  isOpen,
  onClose,
}) => {
  const isSqlServer = formData.dbType === "sqlserver";
  const isPostgres = formData.dbType === "postgresql";
  const needsPassword = (isSqlServer && formData.authType === "sqlserver-auth") || isPostgres;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" borderRadius="md" overflow="hidden">
        <ModalCloseButton />
        <ModalBody padding={2}>
          <Box as="form" onSubmit={handleSubmit} mt={4}>
            {/* Selector de tipo de base de datos */}
            <FormControl id="dbType" mb={4} isRequired>
              <FormLabel>Tipo de Base de Datos</FormLabel>
              <Select
                name="dbType"
                value={formData.dbType}
                onChange={handleChange}
              >
                <option value="postgresql">PostgreSQL</option>
                <option value="sqlserver">SQL Server</option>
              </Select>
            </FormControl>

            {/* Si SQL Server está seleccionado, mostrar la opción de autenticación */}
            {isSqlServer && (
              <FormControl id="authType" mb={4} isRequired>
                <FormLabel>Tipo de Autenticación</FormLabel>
                <Select
                  name="authType"
                  value={formData.authType}
                  onChange={handleChange}
                >
                  <option value="windows-auth">Windows Authentication</option>
                  <option value="sqlserver-auth">SQL Server Authentication</option>
                </Select>
              </FormControl>
            )}

            <FormControl id="user" mb={4} isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder={isSqlServer && formData.authType === "windows-auth" ? "Ej: LAPTOP-ANDRES\\andre" : ""}
              />
            </FormControl>

            <FormControl id="server" mb={4} isRequired>
              <FormLabel>Servidor (Server)</FormLabel>
              <Input
                type="text"
                name="server" // Cambiado de 'host' a 'server'
                value={formData.server} // Actualizado para usar 'server' del estado
                onChange={handleChange}
                placeholder={isSqlServer ? "Ej: LAPTOP-ANDRES" : ""}
              />
            </FormControl>

            <FormControl id="database" mb={4} isRequired>
              <FormLabel>Base de Datos</FormLabel>
              <Input
                type="text"
                name="database"
                value={formData.database}
                onChange={handleChange}
              />
            </FormControl>

            {/* Mostrar el campo de contraseña si es necesario (para PostgreSQL y SQL Server Authentication) */}
            {needsPassword && (
              <FormControl id="password" mb={4} isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
            )}

            <FormControl id="port" mb={4}>
              <FormLabel>Puerto (Opcional)</FormLabel>
              <Input
                type="text"
                name="port"
                value={formData.port}
                onChange={handleChange}
                placeholder="5432 para PostgreSQL, 1433 para SQL Server"
              />
            </FormControl>

            {!connected && (
              <Button colorScheme="teal" type="submit" mr={3}>
                Conectar
              </Button>
            )}
            {connected && (
              <Button colorScheme="red" onClick={handleDisconnect}>
                Desconectar
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Form;
