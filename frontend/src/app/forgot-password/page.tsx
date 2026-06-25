import AuthShell from "../../components/Auth/AuthShell";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import { isLocalPortalEnabled } from "../../lib/localPortal";

export default function ForgotPasswordPage() {
  if (!isLocalPortalEnabled()) {
    return null;
  }

  return (
    <AuthShell
      eyebrow="Account Recovery"
      title="Reset password"
      description="Enter your account email and we will send a secure reset link so you can get back into the DMC member portal."
      footerText="Remembered your password?"
      footerHref="/login"
      footerLink="Log in"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
