'use client'

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DollarSign } from 'lucide-react';
import { useCurrency, currencies } from '@/contexts/currency-context';
import { useTranslations } from 'next-intl';

export function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const t = useTranslations('Common');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{currency.code}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {currencies.map((curr) => (
                    <DropdownMenuItem
                        key={curr.code}
                        onClick={() => setCurrency(curr)}
                        className={currency.code === curr.code ? 'bg-accent' : ''}
                    >
                        <span className="w-8">{curr.symbol}</span>
                        <span className="font-medium">{curr.code}</span>
                        <span className="text-muted-foreground ms-2">- {curr.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
