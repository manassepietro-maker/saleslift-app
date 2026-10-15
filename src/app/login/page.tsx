import { EmailLinkForm } from "@/components/EmailLinkForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <EmailLinkForm mode="login" />;
}
