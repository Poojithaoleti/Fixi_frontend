import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (user === undefined) return null; // or loader

  return <Redirect href={user ? "/home" : "/welcome"} />;
}