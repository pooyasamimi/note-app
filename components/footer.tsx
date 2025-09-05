import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto size-fit flex items-center gap-2"
        >
          <Image src="/logo.png" alt="logo" width={60} height={60} />

          <span className="text-2xl font-bold">Note App</span>
        </Link>

        <p className="text-center mt-2">
          Made with💗 by Pooya Samimi
        </p>
      </div>
    </footer>
  );
}
