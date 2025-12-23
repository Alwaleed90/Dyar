'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = {
    code: string;
    symbol: string;
    name: string;
    rate: number; // Exchange rate relative to USD
};

export const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
    { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', rate: 3.75 },
    { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound', rate: 30.90 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
];

type CurrencyContextType = {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    convertPrice: (priceInUSD: number) => number;
    formatPrice: (priceInUSD: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>(currencies[0]); // Default to USD

    const convertPrice = (priceInUSD: number): number => {
        return Math.round(priceInUSD * currency.rate);
    };

    const formatPrice = (priceInUSD: number): string => {
        const converted = convertPrice(priceInUSD);
        return `${currency.symbol}${converted.toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within CurrencyProvider');
    }
    return context;
}
