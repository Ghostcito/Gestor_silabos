import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { silabos } from "./database/schema.js"; // Ajusta la ruta según tu estructura

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

async function main() {
  try {
    // Crear un sílabo de prueba
    const nuevoSilabo: typeof silabos.$inferInsert = {
      codigo: "TEST101",
      nombre: "Programación de Prueba",
      creditos: 4,
      ciclo: 1,
      descripcion: "Curso de prueba para validar la conexión",
      profesor: "Prof. Testing",
    };

    // INSERT - Crear sílabo
    await db.insert(silabos).values(nuevoSilabo);
    console.log("✅ Nuevo sílabo creado!");

    // SELECT - Obtener todos los sílabos
    const todosSilabos = await db.select().from(silabos);
    console.log("📚 Todos los sílabos:", todosSilabos);

    // UPDATE - Actualizar sílabo
    await db
      .update(silabos)
      .set({
        creditos: 5, // Cambiar de 4 a 5 créditos
      })
      .where(eq(silabos.codigo, "TEST101"));
    console.log("✅ Sílabo actualizado!");

    // DELETE - Eliminar sílabo de prueba
    // await db.delete(silabos).where(eq(silabos.codigo, "TEST101"));
    // console.log("✅ Sílabo de prueba eliminado!");

    console.log("🎉 ¡Todas las operaciones CRUD funcionaron correctamente!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    // Cerrar conexión
    await client.end();
  }
}

main();
