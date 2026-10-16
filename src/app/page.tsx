import { redirect } from "next/navigation";

// Default locale is pt. (Middleware also redirects "/" -> "/pt".)
export default function RootPage() {
  redirect("/pt");
}
