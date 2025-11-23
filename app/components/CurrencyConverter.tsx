"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "XAF", name: "Central African CFA Franc" },
  { code: "XOF", name: "West African CFA Franc" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConvert = async () => {
    if (!amount) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/latest/${fromCurrency}`
      );

      const data = await response.json();

      if (data.result === "error") throw new Error(data["error-type"]);

      const rate = data.conversion_rates[toCurrency];
      const calculatedResult = parseFloat(amount) * rate;

      setResult(calculatedResult);
    } catch (err) {
      console.error("Erreur conversion :", err);
    }

    setIsLoading(false);
  };

  const availableCurrencies = currencies.filter((c) => c.code !== fromCurrency);

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Montant */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Montant</label>
        <Input
          placeholder="Entrez un montant"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Sélections de devises */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">De</label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Vers</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {availableCurrencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bouton convertir */}
      <Button onClick={handleConvert} className="w-full" disabled={isLoading}>
        {isLoading ? "Conversion en cours..." : "Convertir"}
      </Button>

      {/* Résultat */}
      {result !== null && (
        <Card className="p-4 text-center font-medium text-lg">
          {amount} {fromCurrency} ={" "}
          <span className="text-blue-600 font-bold">
            {result.toFixed(2)} {toCurrency}
          </span>
        </Card>
      )}

      {/* Footer */}
      <div className="mt-8 mb-4 text-center text-sm text-gray-500">
        Application créée par <span className="font-semibold">Gnawé Parfait</span>
      </div>
    </div>
  );
}
