import Container from "@/components/Container";

type LegalPageProps = {
  title: string;
  /** Trusted, static policy markup (h2/p/ul/hr). Not user input. */
  html: string;
};

export default function LegalPage({ title, html }: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-16 md:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
        {title}
      </h1>
      <div
        className="legal-prose mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}
