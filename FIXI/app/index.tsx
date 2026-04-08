import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  if (!user?.isProfileComplete) {
    return <Redirect href={"/complete-profile" as any} />;
  }

  return <Redirect href="/(tabs)/home" />;
}