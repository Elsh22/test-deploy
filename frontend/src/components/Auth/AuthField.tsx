import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function AuthField({ label, id, ...props }: AuthFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-zinc-300">
        {label}
      </span>
      <input
        id={id}
        className="mt-2 w-full border border-white/10 bg-black/60 px-4 py-3 text-sm text-white transition placeholder:text-zinc-600 focus:border-yellow-400"
        {...props}
      />
    </label>
  );
}
