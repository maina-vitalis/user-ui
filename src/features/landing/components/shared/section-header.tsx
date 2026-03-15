interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground md:text-lg">{subtitle}</p>
    </div>
  );
}