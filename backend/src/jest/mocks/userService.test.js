const UserService = require("./userService");

describe("UserService", () => {
  let userService;
  let mockDatabase;

  beforeEach(() => {
    // Crear mock de la base de datos
    mockDatabase = {
      findUser: jest.fn(),
      saveUser: jest.fn(),
    };
    userService = new UserService(mockDatabase);
  });

  test("getUser retorna usuario", () => {
    const mockUser = { id: 1, name: "Juan" };
    mockDatabase.findUser.mockReturnValue(mockUser);

    const user = userService.getUser(1);

    expect(user).toEqual(mockUser);
    expect(mockDatabase.findUser).toHaveBeenCalledWith(1);
  });

  test("createUser guarda usuario correctamente", () => {
    const userData = { name: "Ana", email: "ana@email.com" };
    mockDatabase.saveUser.mockReturnValue({ id: 2, ...userData });

    const result = userService.createUser(userData);

    expect(result).toEqual({ id: 2, ...userData });
    expect(mockDatabase.saveUser).toHaveBeenCalledWith(userData);
  });

  test("createUser lanza error con datos incompletos", () => {
    expect(() => {
      userService.createUser({ name: "Ana" });
    }).toThrow("Datos incompletos");
  });
});
