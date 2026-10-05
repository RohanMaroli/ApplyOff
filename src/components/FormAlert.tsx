type Props = { error?: string | null; message?: string | null };

// Shows an error (red) or success message (green) above/below a form.
export function FormAlert({ error, message }: Props) {
  if (error) {
    return (
      <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }
  if (message) {
    return (
      <p role="status" className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
        {message}
      </p>
    );
  }
  return null;
}
