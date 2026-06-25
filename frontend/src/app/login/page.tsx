import { Suspense } from "react";
import AuthShell from "../../components/Auth/AuthShell";
import LoginForm from "../../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="DMC Portal"
      title="Welcome back"
      description="Log in to view your member dashboard, track event registrations, and prepare for future DMC technology features."
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
