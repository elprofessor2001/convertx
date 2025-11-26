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

import { convertCurrency } from "@/lib/convert";

/* ------------------------ */
/*   10 DEVISES COMPLÈTES   */
/* ------------------------ */
const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "XAF", name: "Franc CFA Afrique Centrale" },
  { code: "XOF", name: "Franc CFA Afrique de l'Ouest" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "GNF", name: "Guinean Franc" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (value: number, currency: string): string => {
    try {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (e) {
      return `${value.toFixed(2)} ${currency}`;
    }
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Veuillez entrer un montant valide.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const numericAmount = parseFloat(amount);

      const converted = await convertCurrency(
        numericAmount,
        fromCurrency,
        toCurrency
      );

      setResult(converted);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue lors de la conversion.");
      }
      setResult(null);
    }

    setIsLoading(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Montant */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Montant</label>
        <Input
          placeholder="Ex : 100"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError(null);
          }}
          className="h-12 text-lg"
        />
      </div>

      {/* Ligne de sélection */}
      <div className="flex flex-col lg:flex-row items-center gap-4">

        {/* From */}
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">De</label>
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

        {/* Swap */}
        <Button
          onClick={handleSwap}
          variant="secondary"
          size="icon"
          className="lg:mt-6 w-12 h-12 rounded-full shadow-sm hover:shadow transition"
          aria-label="Échanger les devises"
          disabled={isLoading}
        >
          <span className="text-xl">↔</span>
        </Button>

        {/* To */}
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">Vers</label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {currencies
                .filter((c) => c.code !== fromCurrency)
                .map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={handleConvert}
        className="w-full h-12 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Conversion..." : "Convertir"}
      </Button>

      {/* Error */}
      {error && (
        <Card className="p-4 text-center bg-red-50 border border-red-300 text-red-700 font-medium rounded-xl">
          {error}
        </Card>
      )}

      {/* Résultat */}
      {result !== null && !error && (
        <Card className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Montant Converti</p>
          <p className="text-3xl font-extrabold text-blue-600">
            {formatCurrency(result, toCurrency)}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            1 {fromCurrency} ={" "}
            {(result / parseFloat(amount)).toFixed(4)} {toCurrency}
          </p>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-700 pt-2">
        Créé par <span className="font-semibold">Gnawé Parfait</span>
      </div>
    </div>
  );
}
