import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-blue-900 font-sans">

      {/* Top Taskbar */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-700">📱 MobileFix</div>

          <div className="flex-1 mx-8 max-w-xl">
            <input
              type="text"
              placeholder="Search mobile models to repair..."
              className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-x-4">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition">Login</Link>
            <Link href="/signup" className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md transition">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center lg:text-left max-w-xl">
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-4 text-sm font-medium">
            Get Instant Repair Quotes Online!
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-blue-800">
            Trusted Mobile Repair at Your Fingertips
          </h1>

          <p className="text-lg text-blue-700 mb-6">
            Cracked screen? Battery issues? Water damage? We provide doorstep pickup & delivery with quality service. Book now & get your phone fixed hassle-free!
          </p>

          <Link
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition shadow-md"
          >
            🚀 Book Repair
          </Link>

          <div className="flex justify-center lg:justify-start gap-6 mt-6">
            {["twitter", "facebook", "instagram"].map((platform) => (
              <a key={platform} href="#" aria-label={platform} className="hover:scale-110 transition">
                <Image
                  src={`/images/${platform}-icon.png`}
                  alt={`${platform} icon`}
                  width={32}
                  height={32}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl border-4 border-blue-300 animate-pulse">
          <Image
            src="/images/1.1img.JPG"
            alt="Repair Image"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-800">Why Choose MobileFix?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "⚡", title: "Fast Turnaround", desc: "Get your phone repaired within hours, not days." },
            { icon: "🔒", title: "Secure & Reliable", desc: "Certified technicians with warranty-backed services." },
            { icon: "💸", title: "Affordable Pricing", desc: "Transparent quotes. No hidden charges." },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-blue-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mt-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 text-blue-800">Our Work Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {["1.2.png", "1.3.png", "1.4.png", "1.6.png", "1.5.png"].map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
            >
              <Image
                src={`/images/${img}`}
                alt={`Repair ${idx + 1}`}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-20 bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Fast, Reliable Mobile Repair?</h2>
        <p className="text-lg mb-6">Let our certified technicians handle it with care. Schedule your repair now!</p>
        <Link href="/services" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-blue-100 transition">
          Book a Servicedhbfdhb
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-blue-600 px-6 py-4 border-t">
        &copy; {new Date().getFullYear()} MobileFix. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
