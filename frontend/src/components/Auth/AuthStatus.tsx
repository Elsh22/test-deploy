type AuthStatusProps = {
  type: "error" | "success" | "info";
  message: string;
};

export default function AuthStatus({ type, message }: AuthStatusProps) {
  const styles = {
    error: "border-red-400/40 bg-red-500/10 text-red-100",
    success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
    info: "border-yellow-400/40 bg-yellow-400/10 text-yellow-100",
  };

  return (
    <div className={`border px-4 py-3 text-sm leading-6 ${styles[type]}`}>
      {message}
    </div>
  );
}
