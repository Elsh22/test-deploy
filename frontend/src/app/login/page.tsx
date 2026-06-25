import { Suspense } from "react";
import AuthShell from "../../components/Auth/AuthShell";
import LoginForm from "../../components/Auth/LoginForm";
import { isLocalPortalEnabled } from "../../lib/localPortal";

export default function LoginPage() {
  if (!isLocalPortalEnabled()) {
    return null;
  }

  return (
    <AuthShell
      eyebrow="Member Portal"
      title="Welcome back"
      description="Log in to view your DMC profile, event activity, member resources, and recognition earned through the organization."
      footerText="Need a member account?"
      footerHref="/signup"
      footerLink="Sign up"
    >
      <Suspense fallback={<p className="text-sm text-zinc-400">Loading login...</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
