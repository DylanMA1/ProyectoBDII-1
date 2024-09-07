import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { setConnection } from "../hooks/useNodeApi";

interface FormProps {
  formData: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      user: string;
      host: string;
      database: string;
      password: string;
      port: string;
    }>
  >;
  isOpen: boolean;
  onClose: () => void;
  connected: boolean;
  handleDisconnect: () => void;
}

const Form: React.FC<FormProps> = ({
  formData,
  setFormData,
  isOpen,
  onClose,
  connected,
  handleDisconnect,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = await setConnection(formData);
      toast({
        title: "Conexión exitosa.",
        description:
          "La conexión con PostgreSQL se ha establecido correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error al establecer la conexión:", error);
      toast({
        title: "Error de conexión.",
        description:
          "Hubo un problema al intentar establecer la conexión con PostgreSQL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent borderRadius="md" p={4}>
        <HStack padding={4} bg="normal" marginBottom={1}>
          <Box fontSize="lg" fontWeight="normal">
            Conexión a PostgreSQL
          </Box>
          <ModalCloseButton _hover={{ color: "red.500" }} size="lg" />
        </HStack>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="user" isRequired>
                <FormLabel>Usuario</FormLabel>
                <Input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="host" isRequired>
                <FormLabel>Host</FormLabel>
                <Input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="database" isRequired>
                <FormLabel>Base de Datos</FormLabel>
                <Input
                  type="text"
                  name="database"
                  value={formData.database}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="port" isRequired>
                <FormLabel>Puerto</FormLabel>
                <Input
                  type="text"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
            <ModalFooter>
              <Button
                colorScheme="teal"
                type="submit"
                mr={3}
                isLoading={loading}
              >
                Conectar
              </Button>
              {connected && (
                <Button colorScheme="red" onClick={handleDisconnect}>
                  Desconectar
                </Button>
              )}
              <Button onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Form;
