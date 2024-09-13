/*import React from "react";
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
} from "@chakra-ui/react";

interface PostgresConnectionFormProps {
  formData: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDisconnect: () => void;
  connected: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<PostgresConnectionFormProps> = ({
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
            <FormControl id="user" mb={4} isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="host" mb={4} isRequired>
              <FormLabel>Host</FormLabel>
              <Input
                type="text"
                name="host"
                value={formData.host}
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
            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="port" mb={4}>
              <FormLabel>Puerto (Opcional)</FormLabel>
              <Input
                type="text"
                name="port"
                value={formData.port}
                onChange={handleChange}
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

export default Form;*/

//#############################################################################################################################

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDisconnect: () => void;
  connected: boolean;
  dbType: string;  // Prop que indica el tipo de DB
}

const Form: React.FC<FormProps> = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  handleDisconnect,
  connected,
  dbType
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Conectar a ${dbType === "postgresql" ? "PostgreSQL" : "MySQL"}`}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                placeholder="Usuario"
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Host</FormLabel>
              <Input
                placeholder="Host"
                name="host"
                value={formData.host}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Base de Datos</FormLabel>
              <Input
                placeholder="Base de datos"
                name="database"
                value={formData.database}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Puerto</FormLabel>
              <Input
                placeholder="Puerto"
                name="port"
                value={formData.port}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {connected ? (
              <Button colorScheme="red" onClick={handleDisconnect} mr={3}>
                Desconectar
              </Button>
            ) : (
              <Button colorScheme="blue" type="submit" mr={3}>
                Conectar
              </Button>
            )}
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Form;

