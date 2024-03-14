"use server";
import { NextApiResponse } from "next";
import { getAllUsers } from "@/actions/home";

export default async function amiddleware(
  req: any,
  res: NextApiResponse,
  next: any
) {
  try {
    const users = await getAllUsers();
    if (users.length > 0) {
      next(); // Kullanıcı varsa, isteği devam ettir
    } else {
      res.redirect("/login"); // Kullanıcı yoksa /login sayfasına yönlendir
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
