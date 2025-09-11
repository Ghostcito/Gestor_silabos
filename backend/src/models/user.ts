import { z } from "zod";

//VALIDACION SIMPLE CON ZOD
const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  age: z.number().optional(),
});

// Inferir el tipo TypeScript
type User = z.infer<typeof UserSchema>;

// Validar datos
const validateUser = (data: unknown) => {
  try {
    return UserSchema.parse(data);
  } catch (error) {
    console.error("Datos inválidos:", error);
    throw error;
  }
};

const userData = {
  id: 1,
  name: "Juan",
  email: "juan@ejemplo.com",
  age: 25,
};

const validUser = validateUser(userData);
console.log(validUser); // Datos validados

// 2. Validación con transformaciones
// Transformar string a número
const NumberStringSchema = z.string().transform((val) => parseInt(val, 10));

// Fecha desde string
const DateSchema = z.string().transform((val) => new Date(val));

// Esquema con transformaciones
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string().transform(parseFloat),
  createdAt: z.string().transform((val) => new Date(val)),
});

// 3. Validación de formularios
const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Usuario debe tener al menos 3 caracteres")
      .max(20, "Usuario muy largo"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "Contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string(),
    age: z.number().min(18, "Debes ser mayor de edad"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
type RegisterForm = z.infer<typeof RegisterSchema>;

// Función de validación
const validateForm = (formData: unknown) => {
  try {
    return RegisterSchema.parse(formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Formatear errores para mostrar al usuario
      const errors = error.flatten();
      throw errors;
    }
    throw error;
  }
};

// VALIDACION DE APIS

// Esquemas para API
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Contraseña requerida"),
});

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
  createdAt: z.string().datetime(),
});

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

// Uso en una API route
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar el request
    const loginData = LoginRequestSchema.parse(body);

    // Lógica de autenticación...
    const user = await authenticateUser(loginData);

    // // Validar la respuesta
    const validUser = UserResponseSchema.parse(user);

    return Response.json({
      success: true,
      data: validUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          error: "Datos inválidos",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}

function authenticateUser(data: { email: string; password: string }) {
  // Simulación de autenticación
  return Promise.resolve({
    id: 1,
    name: "John Doe",
    email: data.email,
    role: "user",
    createdAt: new Date().toISOString(),
  });
}
