import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../types";
import { users } from "../../db";

export async function POST(request: Request) {
  const { name, email, password, phone } = await request.json();

  if (!name || !email || !password || !phone) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[a-zA-Z]/.test(password)
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  if (users.find((user) => user.email === email)) {
    return NextResponse.json(
      {
        success: false,
        error: "Email already registered",
        code: "DUPLICATE_EMAIL",
      },
      { status: 400 },
    );
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    phone,
    password, // Salva a senha
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  // Retorna o usuário sem a senha
  const userToReturn = { ...newUser };
  delete userToReturn.password;

  return NextResponse.json(
    {
      success: true,
      message: "Usuário registrado com sucesso",
      data: userToReturn,
    },
    { status: 201 },
  );
}
