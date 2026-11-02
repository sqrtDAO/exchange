import { Footer } from "@/components/Footer";
import { TickerTape } from "@/components/TickerTape";
import { TopBar } from "@/components/TopBar";

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme theme-sqrt version-sqrt">
      <TopBar />
      <TickerTape />
      {children}
      <Footer />
    </div>
  );
}
