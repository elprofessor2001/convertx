// app/lib/convert.ts

// Définition de la structure de données attendue
type ConversionData = {
  result: string;
  conversion_rates: Record<string, number>;
};


// Nouvelle fonction de récupération qui appelle le Route Handler
async function getRates(from: string): Promise<ConversionData> {
    // Appel au Route Handler: /api/convert?from=EUR
    const url = `/api/convert?from=${from}`; 
    
    // C'est ici que l'appel HTTP est fait
    const response = await fetch(url);

    if (!response.ok) {
        // Notre Route Handler retourne un objet { error: "..." } en cas d'échec
        const errorData = await response.json(); 
        throw new Error(errorData.error || "Impossible de charger les taux de change.");
    }
    
    // Le Route Handler retourne directement le JSON de l'API externe
    return response.json();
}


export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  if (!amount || amount <= 0) {
    // Utiliser une exception pour gérer l'erreur de montant
    throw new Error("Le montant doit être supérieur à zéro.");
  }

  // 1. Récupération des taux via notre Route Handler sécurisé
  const data = await getRates(from);

  // 2. Extraction du taux
  const rate = data?.conversion_rates?.[to];
  
  if (!rate) {
    throw new Error(`Impossible de trouver le taux de conversion pour ${to}`);
  }

  // 3. Calcul de la conversion
  return amount * rate;
}