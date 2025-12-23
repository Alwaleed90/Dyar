'use client'

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { login } from '@/actions/auth';
import { useActionState } from 'react';

const initialState: { error?: string } = {};

export default function LoginPage() {
    const t = useTranslations('Auth');
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{t('login')}</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form action={formAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('password')}</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? "Loading..." : t('submitLogin')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground text-center w-full">
                        {t('noAccount')}{" "}
                        <Link href="/signup" className="underline text-primary">
                            {t('signup')}
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
