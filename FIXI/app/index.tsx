import { Redirect } from "expo-router";

export default function Index() {
  // Always redirect to welcome screen when app starts
  return <Redirect href="/welcome" />;
}