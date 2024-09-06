import React, { useEffect, useState } from "react";
import axios from "axios";
import plantumlEncoder from "plantuml-encoder";

const encodePlantUML = (uml: string): string => {
  return plantumlEncoder.encode(uml);
};

const PlantUML = () => {
  const [umlCode, setUmlCode] = useState("");
  const [postgresData, setPostgresData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPostgresData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/postgresql-data"
        );
        setPostgresData(response.data);
      } catch (error) {
        console.error("Error al obtener datos de PostgreSQL:", error);
      }
    };

    fetchPostgresData();
  }, []);

  useEffect(() => {
    if (postgresData.length > 0) {
      const entities =
        postgresData.reduce((umlString, table) => {
          return `${umlString}
          entity ${table.table_name} {
            ${table.column_name} : ${table.data_type}
          }
        `;
        }, "@startuml\n") + "\n@enduml";

      setUmlCode(entities);
    }
  }, [postgresData]);

  const encodedUML = encodePlantUML(umlCode);
  const plantUMLServerUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

  return (
    <div>
      <h1>Diagrama de PlantUML</h1>
      {umlCode && <img src={plantUMLServerUrl} alt="Diagrama de PlantUML" />}
    </div>
  );
};

export default PlantUML;
