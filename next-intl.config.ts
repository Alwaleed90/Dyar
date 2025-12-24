import { NextIntlConfig } from 'next-intl';

const config: NextIntlConfig = {
    locales: ['en', 'ar'],    // اللغات المدعومة
    defaultLocale: 'en',      // اللغة الافتراضية
    messagesDirectory: './messages',  // مسار مجلد الرسائل
};

export default config;
