// Decorador para propiedades readonly
function readonly(target: any, propertyKey: string): void {
  const descriptor: PropertyDescriptor = {
    writable: false,
    enumerable: true,
    configurable: true,
  };

  Object.defineProperty(target, propertyKey, descriptor);
}

// Decorador para validación
function validateEmail(target: any, propertyKey: string) {
  let value: string;

  const getter = () => value;
  const setter = (newValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newValue)) {
      throw new Error(`Invalid email: ${newValue}`);
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

// Decorador para logging de cambios
function logChanges(target: any, propertyKey: string) {
  let value: any;

  const getter = () => value;
  const setter = (newValue: any) => {
    console.log(`Changing ${propertyKey} from ${value} to ${newValue}`);
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class User {
  @readonly
  id: number = Date.now();

  @validateEmail
  email: string = "";

  @logChanges
  name: string = "";

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
