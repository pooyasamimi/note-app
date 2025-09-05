import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
<section className="py-16 md:py-32">
  <div className="mx-auto max-w-5xl px-6">
    <div className="text-center">
      <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
        🛠️ ذهن خود را مانند یک توسعه‌دهنده بسازید
      </h2>
      <p className="mt-4">
        سریع، مبتنی بر لوکال و ساخته شده برای کدنویسی. نوت‌هایی که مطابق با نحوه تفکر شما کار می‌کنند.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard">
            <span>شروع کنید</span>
          </Link>
        </Button>
      </div>
    </div>
  </div>
</section>

  );
}
