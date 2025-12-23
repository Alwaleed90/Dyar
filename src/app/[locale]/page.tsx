import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users, Shield, Award, HeartHandshake } from 'lucide-react';
import { FeaturedListings } from '@/components/listings/featured-listings';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('heroSubtitle')}
            </p>

            {/* Search Bar */}
            <Card className="p-6 mt-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('location')}
                  </label>
                  <Input placeholder="Where are you going?" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t('checkIn')}
                  </label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t('checkOut')}
                  </label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t('guests')}
                  </label>
                  <Input type="number" min="1" defaultValue="2" />
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                <Search className="h-5 w-5 me-2" />
                {t('searchButton')}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FeaturedListings />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Dyar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best in property rentals with our trusted platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Prime Locations</h3>
              <p className="text-muted-foreground">
                Discover properties in the best neighborhoods and destinations
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Verified Hosts</h3>
              <p className="text-muted-foreground">
                All hosts are verified to ensure your safety and comfort
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Booking</h3>
              <p className="text-muted-foreground">
                Simple and secure booking process with instant confirmation
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Your Trust is Our Priority
              </h2>
              <p className="text-lg text-muted-foreground">
                We're committed to providing a safe, secure, and seamless experience for both guests and hosts.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">
                      Every property is reviewed and verified before listing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Secure Payments</h4>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is always protected
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team is always here to help you
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Trust Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to host?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Share your space and earn extra income
            </p>
            <Button size="lg" asChild>
              <a href="/signup">Get Started</a>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
