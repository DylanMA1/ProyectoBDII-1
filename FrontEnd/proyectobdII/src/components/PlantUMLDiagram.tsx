import React, { useEffect, useState } from "react";
import {
  Box,
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
  return plantumlEncoder.encode(uml);
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
      let entities = "@startuml\n !theme carbon-gray";
      let relationships = "";

      const tableColumns: { [key: string]: any[] } = {};
      data.columns.forEach((column: any) => {
        if (!tableColumns[column.table_name]) {
          tableColumns[column.table_name] = [];
        }
        tableColumns[column.table_name].push(column);
      });

      Object.keys(tableColumns).forEach((tableName) => {
        entities += `
        entity ${tableName} {
          ${tableColumns[tableName]
            .map((col: any) => `${col.column_name} : ${col.data_type}`)
            .join("\n")}
        }
        `;
      });

      data.foreignKeys.forEach((fk: any) => {
        relationships += `${fk.table_name} --> ${fk.referenced_table} : ${fk.column_name} -> ${fk.referenced_column}\n`;
      });

      const uml = `${entities}\n${relationships}\n@enduml`;
      setUmlCode(uml);
    }
  }, [data]);

  const encodedUML = encodePlantUML(umlCode);
  const plantUMLServerUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

  return (
    <>
      <Card p={4} borderRadius="md" shadow="md" maxWidth={710} bg="lightblue">
        <Heading marginBottom={4}>{dbName}</Heading>
        {umlCode && (
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
          <ModalHeader>{dbName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <Image src={plantUMLServerUrl} alt="Diagrama completo" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlantUMLDiagram;
