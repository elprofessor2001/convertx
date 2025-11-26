import { NextResponse } from 'next/server';

// Définition du type de la réponse de l'API externe
type ExchangeRateResponse = {
  result: string;
  time_last_update_unix: number;
  conversion_rates: Record<string, number>;
};

const API_BASE_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY; // Utilisation de la variable d'environnement privée

// Un Route Handler doit exporter une fonction HTTP (GET)
export async function GET(request: Request) {
  // Récupérer les paramètres de l'URL (par exemple, ?from=EUR)
  const { searchParams } = new URL(request.url);
  const baseCurrency = searchParams.get('from');

  if (!baseCurrency) {
    return NextResponse.json({ error: "Le paramètre 'from' est manquant" }, { status: 400 });
  }
  
  // Vérification de la clé API pour le débogage
  if (!API_KEY) {
      console.error("Clé API manquante dans .env.local");
      return NextResponse.json({ error: "Configuration API incomplète." }, { status: 500 });
  }

  try {
    const url = `${API_BASE_URL}${API_KEY}/latest/${baseCurrency}`;
    
    // Appel à l'API externe (pas de cache pour des taux temps réel)
    const res = await fetch(url, { cache: 'no-store' }); 

    if (!res.ok) {
        // Loggez l'erreur pour le serveur, et retournez une réponse générique au client
        const errorDetails = await res.json();
        console.error("Erreur de l'API externe:", errorDetails);
        return NextResponse.json({ error: "Erreur lors de la récupération des taux." }, { status: res.status });
    }

    const data: ExchangeRateResponse = await res.json();
    
    // Retourner les données complètes (conversion_rates) au client
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur interne du serveur lors de l'appel API" }, { status: 500 });
  }
}