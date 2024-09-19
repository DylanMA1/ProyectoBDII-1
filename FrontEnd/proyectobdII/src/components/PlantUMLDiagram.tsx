/*import React, { useEffect, useState } from "react";
import {
  Card,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import plantumlEncoder from "plantuml-encoder";

const encodePlantUML = (uml: string): string => {
  try {
    return plantumlEncoder.encode(uml);
  } catch (error) {
    console.error("Error encoding PlantUML:", error);
    return "";
  }
};

interface PlantUMLProps {
  data: {
    columns: any[];
    foreignKeys: any[];
  };
  dbName: string;
}

const PlantUMLDiagram: React.FC<PlantUMLProps> = ({ data, dbName }) => {
  const [umlCode, setUmlCode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal

  useEffect(() => {
    if (data.columns.length > 0) {
      let entities = "@startuml\n !theme mars";
      let relationships = "";

      const tableColumns: { [key: string]: any[] } = {};
      data.columns.forEach((column: any) => {
        if (!tableColumns[column.table_name]) {
          tableColumns[column.table_name] = [];
        }
        tableColumns[column.table_name].push(column);
      });

      Object.keys(tableColumns).forEach((tableName) => {
        entities += `\nentity ${tableName} {\n  ${tableColumns[tableName]
          .map((col: any) => `${col.column_name} : ${col.data_type}`)
          .join("\n  ")}\n}`;
      });

      data.foreignKeys.forEach((fk: any) => {
        relationships += `\n${fk.table_name} --> ${fk.referenced_table} : ${fk.column_name} -> ${fk.referenced_column}`;
      });

      const uml = `${entities}\n${relationships}\n@enduml`;
      setUmlCode(uml);
    }
  }, [data]);

  const encodedUML = encodePlantUML(umlCode);
  const plantUMLServerUrl = encodedUML
    ? `http://www.plantuml.com/plantuml/svg/${encodedUML}`
    : "";

  return (
    <>
      <Card p={4} borderRadius="md" shadow="md" maxWidth={710}>
        <Heading marginBottom={4}>{dbName}</Heading>
        {encodedUML && (
          <Image
            src={plantUMLServerUrl}
            alt="Diagrama de PlantUML"
            borderRadius="md"
            boxShadow="sm"
            cursor="pointer"
            onClick={onOpen}
          />
        )}
      </Card>

      {/* Modal para mostrar la imagen completa 
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
        <ModalContent bg="transparent">
          <ModalHeader>{dbName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Image
              src={plantUMLServerUrl}
              alt="Diagrama completo"
              maxWidth="100%"
              maxHeight="90vh"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlantUMLDiagram;*/

//##################################################################################################################

import React, { useEffect, useState } from "react";
import {
  Card,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,  // Importamos Button
  useDisclosure,
} from "@chakra-ui/react";
import plantumlEncoder from "plantuml-encoder";
import { MdDownload } from "react-icons/md";

const encodePlantUML = (uml: string): string => {
  try {
    return plantumlEncoder.encode(uml);
  } catch (error) {
    console.error("Error encoding PlantUML:", error);
    return "";
  }
};

interface PlantUMLProps {
  data: {
    columns: any[];
    foreignKeys: any[];
  };
  dbName: string;
}

const PlantUMLDiagram: React.FC<PlantUMLProps> = ({ data, dbName }) => {
  const [umlCode, setUmlCode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal

  useEffect(() => {
    if (data.columns.length > 0) {
      let entities = "@startuml\n !theme mars";
      let relationships = "";

      const tableColumns: { [key: string]: any[] } = {};
      data.columns.forEach((column: any) => {
        if (!tableColumns[column.table_name]) {
          tableColumns[column.table_name] = [];
        }
        tableColumns[column.table_name].push(column);
      });

      Object.keys(tableColumns).forEach((tableName) => {
        entities += `\nentity ${tableName} {\n  ${tableColumns[tableName]
          .map((col: any) => `${col.column_name} : ${col.data_type}`)
          .join("\n  ")}\n}`;
      });

      data.foreignKeys.forEach((fk: any) => {
        relationships += `\n${fk.table_name} --> ${fk.referenced_table} : ${fk.column_name} -> ${fk.referenced_column}`;
      });

      const uml = `${entities}\n${relationships}\n@enduml`;
      setUmlCode(uml);
    }
  }, [data]);

  const encodedUML = encodePlantUML(umlCode);
  const plantUMLServerUrl = encodedUML
    ? `http://www.plantuml.com/plantuml/png/${encodedUML}` // Cambiamos a PNG
    : "";

  // Función para descargar la imagen en formato PNG
  const downloadImage = async () => {
    try {
      const response = await fetch(plantUMLServerUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${dbName}-diagram.png`; // Cambiamos a formato PNG
      document.body.appendChild(a);  // Requerido para que funcione en Firefox
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error descargando la imagen:", error);
    }
  };

  return (
    <>
      <Card p={4} borderRadius="md" shadow="md" maxWidth={710}>
        <Heading marginBottom={4}>{dbName}</Heading>
        {encodedUML && (
          <Image
            src={plantUMLServerUrl}
            alt="Diagrama de PlantUML"
            borderRadius="md"
            boxShadow="sm"
            cursor="pointer"
            onClick={onOpen}
          />
        )}
      </Card>

      {/* Modal para mostrar la imagen completa */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
  <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
  <ModalContent bg="transparent">
    <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
      {dbName}
      <Button 
        colorScheme="blue" 
        onClick={downloadImage} 
        marginRight="30px"  // Añadimos un margen para separar el botón del cierre
        padding="12px"      // Aumentamos el padding para agrandar el botón
      >
        <MdDownload fontSize="20px" /> {/* Aumentamos el tamaño del ícono */}
      </Button>
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody display="flex" justifyContent="center" alignItems="center">
      <Image
        src={plantUMLServerUrl}
        alt="Diagrama completo"
        maxWidth="100%"
        maxHeight="90vh"
        objectFit="contain"
      />
    </ModalBody>
  </ModalContent>
</Modal>
    </>
  );
};

export default PlantUMLDiagram;

