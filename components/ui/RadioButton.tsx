export interface RadioButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function RadioButton({ label, selected, onClick }: RadioButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={
        "w-full py-3.5 px-6 font-mono text-[13px] tracking-[0.12em] uppercase transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink/40 focus-visible:outline-offset-2 border " +
        (selected
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-ink border-rule hover:bg-ink/5")
      }
    >
      {label}
    </button>
  );
}
