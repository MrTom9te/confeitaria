import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { users } from "../../db";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        error: "Email and password are required",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  const user = users.find((user) => user.email === email);

  // Compara a senha enviada com a senha armazenada
  if (!user || user.password !== password) {
    return NextResponse.json(
      {
        success: false,
        error: "Email ou senha incorretos",
        code: "INVALID_CREDENTIALS",
      },
      { status: 401 },
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "your-secret-key",
    { expiresIn: "7d" },
  );

  // Retorna o usuário sem a senha
  const userToReturn = { ...user };
  delete userToReturn.password;

  return NextResponse.json({
    success: true,
    message: "Login realizado com sucesso",
    data: {
      token,
      user: userToReturn,
    },
  });
}
