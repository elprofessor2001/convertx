import CurrencyConverter from "./components/CurrencyConverter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold gradient-title tracking-tight">
          ConvertX
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Conversions de devises mondiales simples et rapides
        </p>
      </header>

      {/* Container */}
      <div className="w-full max-w-2xl card-elevated">
        <CurrencyConverter />
      </div>
    </main>
  );
}
