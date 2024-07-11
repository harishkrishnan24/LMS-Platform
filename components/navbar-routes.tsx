"use client";

import { UserButton } from "@clerk/nextjs";

export default function NavbarRoutes() {
  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton />
    </div>
  );
}
