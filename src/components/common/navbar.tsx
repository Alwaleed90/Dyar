'use client'

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { CurrencySelector } from '@/components/currency-selector';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
    const t = useTranslations('Navigation');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            ديار
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                            {t('home')}
                        </Link>
                        <Link href="/listings" className="text-sm font-medium transition-colors hover:text-primary">
                            {t('listings')}
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                            {t('about')}
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <CurrencySelector />
                            <LanguageSwitcher />
                            <ModeToggle />
                            <Button variant="ghost" asChild>
                                <Link href="/login">{t('login')}</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">{t('signup')}</Link>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/listings"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('listings')}
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('about')}
                        </Link>
                        <div className="pt-4 space-y-2">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/login">{t('login')}</Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/signup">{t('signup')}</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
