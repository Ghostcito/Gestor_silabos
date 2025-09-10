import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Silabo } from "../models/silabo.js";

// Variables de entorno (equivalente a application.properties en Spring)
const DATABASE_URL = process.env.DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL no está configurada en las variables de entorno"
  );
}

// Crear la conexión a PostgreSQL
const queryClient = postgres(DATABASE_URL);

// Crear la instancia de Drizzle (equivalente a tu DataSource en Spring)
export const db = drizzle(queryClient);

// Función para inicializar la base de datos
export const initDatabase = async () => {
  try {
    console.log("🔄 Inicializando base de datos con Supabase...");

    // Ejecutar migraciones si existen
    try {
      await migrate(db, { migrationsFolder: "./drizzle" });
      console.log("✅ Migraciones aplicadas correctamente");
    } catch (error) {
      console.log("⚠️ Error con migraciones, verificando conexión...");

      // Probar conexión básica
      const result = await queryClient`SELECT NOW()`;
      console.log("✅ Conexión a Supabase establecida:", result[0].now);
    }

    // Verificar si existen datos de ejemplo
    try {
      const count = await db.select().from(Silabo).limit(1);

      if (count.length === 0) {
        console.log("🌱 Insertando datos de ejemplo...");
        await db.insert(Silabo).values([
          {
            codigo: "CS101",
            nombre: "Programación I",
            creditos: 4,
            ciclo: 1,
            descripcion: "Introducción a la programación con JavaScript",
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
      }
    } catch (error) {
      console.log("⚠️ La tabla aún no existe, se creará con las migraciones");
    }

    console.log("🚀 Base de datos lista con Supabase");
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error);
    throw error;
  }
};

// Función para cerrar la conexión limpiamente
export const closeDatabase = async () => {
  await queryClient.end();
};
