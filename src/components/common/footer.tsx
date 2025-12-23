'use client'

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
    const t = useTranslations('Navigation');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            ديار - Dyar
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your home away from home
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/listings" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('listings')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Account</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('login')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('signup')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/host" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t('host')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} Dyar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
