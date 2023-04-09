import Image from "next/image";
import { Inter } from "next/font/google";
import { Theme } from "@components/Theme";
import Link from "next/link";

export default function Home() {
  return (
    <Theme>
      <h1>Index</h1>
      <Link className="hover:text-blue-500" href="/Tour">Take the tour</Link>
    </Theme>
  );
}
