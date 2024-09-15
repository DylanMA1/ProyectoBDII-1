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
  dbType: string; // Prop que indica el tipo de DB
}

const Form: React.FC<FormProps> = ({
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
        <ModalHeader>{`Conectar a ${
          dbType === "postgresql" ? "PostgreSQL" : "MySQL"
        }`}</ModalHeader>
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
            {!connected && (
              <Button colorScheme="teal" type="submit" mr={3}>
                Conectar
              </Button>
            )}
            {connected && (
              <Button colorScheme="red" onClick={handleDisconnect} mr={3}>
                Desconectar
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
