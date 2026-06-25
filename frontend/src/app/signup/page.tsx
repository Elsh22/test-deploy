import AuthShell from "../../components/Auth/AuthShell";
import SignupForm from "../../components/Auth/SignupForm";
import { isLocalPortalEnabled } from "../../lib/localPortal";

export default function SignupPage() {
  if (!isLocalPortalEnabled()) {
    return null;
  }

  return (
    <AuthShell
      eyebrow="DMC Member Access"
      title="Create your account"
      description="Create a member profile that connects your academic path, career interests, events, resources, and DMC involvement in one place."
      footerText="Already have an account?"
      footerHref="/login"
      footerLink="Log in"
    >
      <SignupForm />
    </AuthShell>
  );
}
