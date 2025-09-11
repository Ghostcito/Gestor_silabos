import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { silabos } from "./schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "❌ DATABASE_URL no está configurada en las variables de entorno"
  );
}

// Crear cliente PostgreSQL con configuración optimizada para Supabase
const client = postgres(process.env.DATABASE_URL, {
  prepare: false, // Requerido por Supabase
  max: 10, // Máximo 10 conexiones concurrentes
});

// Crear instancia de Drizzle (equivalente a tu JpaRepository en Spring)
export const db = drizzle(client, {
  schema: { silabos },
});

// Función para probar la conexión (útil para debugging)
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log("🔄 Probando conexión a Supabase...");

    // Hacer una query simple para verificar conectividad
    const result =
      await client`SELECT NOW() as timestamp, version() as pg_version`;

    console.log("✅ Conexión exitosa a PostgreSQL");

    // Probar que la tabla silabos existe
    const tableTest = await db.select().from(silabos).limit(1);
    console.log('✅ Tabla "silabos" accesible');

    return true;
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
    throw error;
  }
};

// Función para cerrar la conexión correctamente (para cleanup)
export const closeConnection = async (): Promise<void> => {
  try {
    await client.end();
    console.log("✅ Conexión cerrada correctamente");
  } catch (error) {
    console.error("❌ Error cerrando la conexión:", error);
  }
};

// Función para inicializar datos de ejemplo (solo en desarrollo)
export const initializeSampleData = async (): Promise<void> => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return; // Solo en desarrollo
    }

    // Verificar si ya existen datos
    const existingData = await db.select().from(silabos).limit(1);

    if (existingData.length === 0) {
      console.log("🌱 Insertando datos de ejemplo...");

      await db.insert(silabos).values([
        {
          codigo: "CS101",
          nombre: "Programación I",
          creditos: 4,
          ciclo: 1,
          descripcion:
            "Introducción a la programación con JavaScript y TypeScript",
          profesor: "Dr. García López",
        },
        {
          codigo: "CS102",
          nombre: "Estructuras de Datos",
          creditos: 4,
          ciclo: 2,
          descripcion: "Arrays, listas, árboles y algoritmos básicos",
          profesor: "Dra. María Pérez",
        },
        {
          codigo: "WEB201",
          nombre: "Desarrollo Web Full Stack",
          creditos: 5,
          ciclo: 3,
          descripcion: "React, Node.js, TypeScript y bases de datos",
          profesor: "Ing. Carlos Mendoza",
        },
      ]);

      console.log("✅ Datos de ejemplo insertados");
    } else {
      console.log("ℹ️  Los datos ya existen, omitiendo inserción");
    }
  } catch (error) {
    console.error("❌ Error insertando datos de ejemplo:", error);
  }
};
