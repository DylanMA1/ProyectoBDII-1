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
            {/* Selector de tipo de base de datos 
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

            {/* Si SQL Server está seleccionado, mostrar la opción de autenticación 
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

            {/* Mostrar el campo de contraseña si es necesario (para PostgreSQL y SQL Server Authentication) 
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

export default Form;*/

//#########################Todo##############################

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
  Select,
} from "@chakra-ui/react";

interface ConnectionFormProps {
  formData: {
    user: string;
    server: string;
    database: string;
    password: string;
    port: string;
    dbType: string; // Tipo de base de datos (PostgreSQL, SQL Server o MySQL)
    authType: string; // Tipo de autenticación (solo para SQL Server)
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
  const isPostgresOrMySQL = formData.dbType === "postgresql" || formData.dbType === "mysql"; // MySQL y PostgreSQL tienen los mismos campos
  const needsPassword = (isSqlServer && formData.authType === "sqlserver-auth") || isPostgresOrMySQL;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" borderRadius="md" overflow="hidden">
        <ModalCloseButton />
        <ModalBody padding={2}>
          <Box as="form" onSubmit={handleSubmit} mt={4}>
            {/* Selector de tipo de base de datos 
            <FormControl id="dbType" mb={4} isRequired>
              <FormLabel>Tipo de Base de Datos</FormLabel>
              <Select
                name="dbType"
                value={formData.dbType}
                onChange={handleChange}
              >
                <option value="postgresql">PostgreSQL</option>
                <option value="sqlserver">SQL Server</option>
                <option value="mysql">MySQL</option> {/* Opción MySQL añadida 
              </Select>
            </FormControl>

            {/* Si SQL Server está seleccionado, mostrar la opción de autenticación 
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
                name="server"
                value={formData.server}
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

            {/* Mostrar el campo de contraseña si es necesario (para PostgreSQL, MySQL y SQL Server Authentication) 
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
                placeholder={
                  formData.dbType === "postgresql"
                    ? "5432 para PostgreSQL"
                    : formData.dbType === "mysql"
                    ? "3306 para MySQL"
                    : "1433 para SQL Server"
                }
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

//############################Todo2###############################

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
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";

interface ConnectionFormProps {
  formData: {
    user: string;
    host: string;
    server: string;
    database: string;
    password: string;
    port: string;
    dbType: string; // Tipo de base de datos (PostgreSQL, MySQL, SQL Server)
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
  const isPostgresOrMySQL = formData.dbType === "postgresql" || formData.dbType === "mysql";
  const needsPassword = (isSqlServer && formData.authType === "sqlserver-auth") || isPostgresOrMySQL;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" borderRadius="md" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader>
          {`Conectar a ${formData.dbType === "postgresql" ? "PostgreSQL" : formData.dbType === "mysql" ? "MySQL" : "SQL Server"}`}
        </ModalHeader>
        <ModalBody padding={4}>
          <Box as="form" onSubmit={handleSubmit} mt={4}>
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
                placeholder={
                  isSqlServer && formData.authType === "windows-auth"
                    ? "Ej: LAPTOP-ANDRES\\andre"
                    : "Usuario"
                }
              />
            </FormControl>

            {isSqlServer ? (
              <FormControl id="server" mb={4} isRequired>
                <FormLabel>Servidor (Server)</FormLabel>
                <Input
                  type="text"
                  name="server"
                  value={formData.server}
                  onChange={handleChange}
                  placeholder="Ej: LAPTOP-ANDRES"
                />
              </FormControl>
            ) : (
              <FormControl id="host" mb={4} isRequired>
                <FormLabel>Host</FormLabel>
                <Input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  placeholder="Host"
                />
              </FormControl>
            )}

            <FormControl id="database" mb={4} isRequired>
              <FormLabel>Base de Datos</FormLabel>
              <Input
                type="text"
                name="database"
                value={formData.database}
                onChange={handleChange}
              />
            </FormControl>

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
                placeholder={
                  formData.dbType === "postgresql"
                    ? "5432"
                    : formData.dbType === "sqlserver"
                    ? "1433"
                    : "3306" // Puerto por defecto para MySQL
                }
              />
            </FormControl>

            <ModalFooter>
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
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Form;




