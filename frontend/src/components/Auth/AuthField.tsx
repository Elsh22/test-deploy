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
        className="mt-2 w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-white transition placeholder:text-zinc-600 focus:border-yellow-400"
        {...props}
      />
    </label>
  );
}
