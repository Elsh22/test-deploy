import AuthShell from "../../components/Auth/AuthShell";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account Recovery"
      title="Reset password"
      description="Enter your account email and Supabase Auth will send a secure reset link. Password recovery is handled outside the database tables."
      footerText="Remembered your password?"
      footerHref="/login"
      footerLink="Log in"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
