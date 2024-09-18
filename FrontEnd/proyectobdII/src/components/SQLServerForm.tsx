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

interface SqlServerFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDisconnect: () => void;
  connected: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const SqlServerForm: React.FC<SqlServerFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  handleDisconnect,
  connected,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" borderRadius="md" overflow="hidden">
        <ModalCloseButton />
        <ModalBody padding={2}>
          <Box as="form" onSubmit={handleSubmit} mt={4}>
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

            <FormControl id="user" mb={4} isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder={
                  formData.authType === "windows-auth"
                    ? "Ej: LAPTOP-ANDRES\\andre"
                    : ""
                }
              />
            </FormControl>

            <FormControl id="server" mb={4} isRequired>
              <FormLabel>Servidor (Server)</FormLabel>
              <Input
                type="text"
                name="server"
                value={formData.server}
                onChange={handleChange}
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

            {formData.authType === "sqlserver-auth" && (
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
                placeholder="1433"
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

export default SqlServerForm;
