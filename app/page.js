import { ChevronRight, Car, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import { CarCard } from "@/components/car-card";
import { HomeSearch } from "@/components/home-search";
import Link from "next/link";
import Image from "next/image";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col pt-10">
      {/* Hero Section with Gradient Title */}
      <section className="relative min-h-screen bg-gray-50 flex flex-col justify-between overflow-hidden">
  {/* Background Video */}
  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-none opacity-60 w-[400px] max-w-full">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full"
    >
      <source src="https://videos.ctfassets.net/j20krz61k3rk/1CDqkh4rpazZHjAl1NN8kW/73db9a1ae63cf8aac9fc418a8dbf557d/conveyer-SOLO.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Top Content */}
  <div className="flex-grow flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto relative z-10">
    <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 gradient-title">
      Buy & Sell Your Perfect Ride with <span className="text-red-600">GadiGuru!</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl">
      Nepal Biggest online MarketPlace at your Mobile 
    </p>

    {/* Search Component */}
    <div className="w-full">
      <HomeSearch />
    </div>
  </div>

  {/* Bottom Marquee (Car Makes) */}
  <div className="relative overflow-hidden py-4  shadow-inner z-10 mt-auto mb-8">
    <div className="flex gap-4 animate-marquee px-4">
      {carMakes.concat(carMakes).map((make, index) => (
        <Link
          key={`${make.name}-${index}`}
          href={`/cars?make=${make.name}`}
          className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer w-40 shrink-0"
        >
          <div className="h-10 w-auto mx-auto mb-2 relative">
            <Image
              src={make.imageUrl || `/make/${make.name.toLowerCase()}.webp`}
              alt={make.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h3 className="font-medium">{make.name}</h3>
        </Link>
      ))}
    </div>
  </div>
</section>



      {/* Featured Cars */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Make */}
      <section className="py-12 bg-gray-50 overflow-hidden  ">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">Browse by Make</h2>
      <Button variant="ghost" className="flex items-center" asChild>
        <Link href="/cars">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
    {/* Animated container */}
    <div className="relative overflow-hidden">
      <div className="flex gap-4 animate-marquee whitespace-nowrap">
        {carMakes.concat(carMakes).map((make, index) => (
          <Link
            key={`${make.name}-${index}`}
            href={`/cars?make=${make.name}`}
            className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer w-40 shrink-0"
          >
            <div className="h-16 w-auto mx-auto mb-2 relative">
              <Image
                src={make.imageUrl || `/make/${make.name.toLowerCase()}.webp`}
                alt={make.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h3 className="font-medium">{make.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
              <p className="text-gray-600">
                Book a test drive online in minutes, with flexible scheduling
                options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse by Body Type</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                  <Image
                    src={
                      type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                    }
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2 ">
                    {type.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
