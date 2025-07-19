import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="font-headline text-7xl font-extrabold tracking-tighter text-primary sm:text-8xl md:text-9xl">
          HELLO
        </h1>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="mailto:contact@example.com">Contact Me</Link>
        </Button>
      </div>
    </main>
  );
}
