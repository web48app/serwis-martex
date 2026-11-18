export function Stars({ value = 5, className = '' }: { value?: number; className?: string }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className={`stars ${className}`.trim()} role="img" aria-label={`Ocena ${full} na 5`}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </span>
  );
}
