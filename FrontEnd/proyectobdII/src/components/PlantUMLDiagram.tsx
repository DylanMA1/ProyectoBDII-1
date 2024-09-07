import React, { useEffect, useState } from "react";
import { Box, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import plantumlEncoder from "plantuml-encoder";

const encodePlantUML = (uml: string): string => {
  return plantumlEncoder.encode(uml);
};

interface PlantUMLProps {
  data: any[];
}

const PlantUMLDiagram: React.FC<PlantUMLProps> = ({ data }) => {
  const [umlCode, setUmlCode] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      const entities =
        data.reduce((umlString, table) => {
          return `${umlString}
          entity ${table.table_name} {
            ${table.column_name} : ${table.data_type}
          }
        `;
        }, "@startuml\n") + "\n@enduml";

      setUmlCode(entities);
    }
  }, [data]);

  const encodedUML = encodePlantUML(umlCode);
  const plantUMLServerUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

  return (
    <Box p={4} borderRadius="md" shadow="md">
      {umlCode && (
        <Image
          src={plantUMLServerUrl}
          alt="Diagrama de PlantUML"
          borderRadius="md"
          boxShadow="sm"
        />
      )}
    </Box>
  );
};

export default PlantUMLDiagram;
