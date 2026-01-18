import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ProfileClient user={session.user} />;
}

