"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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
        <div className="flex flex-col min-h-screen justify-between">
            <div className="space-y-6 p-4 max-w-md mx-auto mt-8">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Montant</label>
                    <Input
                        placeholder="Entrez un montant"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">De</label>
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger>
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

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Vers</label>
                        <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger>
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

                <Button onClick={handleConvert} className="w-full" disabled={isLoading}>
                    {isLoading ? "Conversion en cours..." : "Convertir"}
                </Button>

                {result !== null && (
                    <Card className="p-4 text-center font-medium text-lg">
                        {amount} {fromCurrency} ={" "}
                        <span className="text-blue-600 font-bold">
                            {result.toFixed(2)} {toCurrency}
                        </span>
                    </Card>
                )}
            </div>

            {/* Footer stylé */}
            <footer className="text-center py-4 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 mt-8">
                &copy; {new Date().getFullYear()} Application créée par <strong>Gnawé Parfait</strong>
            </footer>
        </div>
    );
}
