import AuthShell from "../../components/Auth/AuthShell";
import SignupForm from "../../components/Auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="DMC Member Access"
      title="Create your account"
      description="Build your DMC profile so future member tools can connect events, resources, badges, mentorship, and career support to your account."
      footerText="Already have an account?"
      footerHref="/login"
      footerLink="Log in"
    >
      <SignupForm />
    </AuthShell>
  );
}
