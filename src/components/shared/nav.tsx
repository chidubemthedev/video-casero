"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
const User = {
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  image: "https://via.placeholder.com/150",
};

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200">
      <Link href="/">
        <h1 className="text-2xl font-bold">Video Casero</h1>
      </Link>

      {User ? (
        <div className="flex items-center gap-4">
          <Avatar
            onClick={() => router.push("/profile/1")}
            className="cursor-pointer"
          >
            <AvatarImage src={User.image} />
            <AvatarFallback>
              {User.firstName.charAt(0)}
              {User.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <LogOut className="cursor-pointer" />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
