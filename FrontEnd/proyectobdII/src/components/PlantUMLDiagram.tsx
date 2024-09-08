import React, { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import plantumlEncoder from "plantuml-encoder";

const encodePlantUML = (uml: string): string => {
  return plantumlEncoder.encode(uml);
};

interface PlantUMLProps {
  data: {
    columns: any[];
    foreignKeys: any[];
  };
}

const PlantUMLDiagram: React.FC<PlantUMLProps> = ({ data }) => {
  const [umlCode, setUmlCode] = useState("");

  useEffect(() => {
    if (data.columns.length > 0) {
      let entities = "@startuml\n";
      let relationships = "";

      // Agrupa columnas por tabla
      const tableColumns: { [key: string]: any[] } = {};
      data.columns.forEach((column: any) => {
        if (!tableColumns[column.table_name]) {
          tableColumns[column.table_name] = [];
        }
        tableColumns[column.table_name].push(column);
      });

      // Genera entidades
      Object.keys(tableColumns).forEach((tableName) => {
        entities += `
        entity ${tableName} {
          ${tableColumns[tableName]
            .map((col: any) => `${col.column_name} : ${col.data_type}`)
            .join("\n")}
        }
        `;
      });

      // Genera relaciones
      data.foreignKeys.forEach((fk: any) => {
        relationships += `${fk.table_name} --> ${fk.referenced_table} : ${fk.column_name} -> ${fk.referenced_column}\n`;
      });

      // Completa el código UML
      const uml = `${entities}\n${relationships}\n@enduml`;
      setUmlCode(uml);
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
