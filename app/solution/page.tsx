import { redirect } from "next/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Design Coordination Software",
  description:
    "The standalone solution page now redirects to the homepage solution section.",
  path: "/solution",
  noIndex: true,
});

export default function SolutionPage() {
  redirect("/#solution");
}
