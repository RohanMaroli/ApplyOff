type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; hint?: string };

// A labelled text input.
export function Field({ label, name, hint, ...input }: Props) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <input
        id={name}
        name={name}
        className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        {...input}
      />
      {hint && <span className="block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
