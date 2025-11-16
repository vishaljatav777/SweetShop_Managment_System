// 1. You would import icons like this:
// import { 
//   ShieldCheckIcon, 
//   UserGroupIcon, 
//   GlobeAltIcon 
// } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24 px-6">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-sm">
          About Mitha_Dukan
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Your daily destination for premium quality and delightful tastes.
        </p>
      </div>

      {/* "WHO WE ARE" SECTION */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 md:p-12 border border-gray-200">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Mitha_Dukan was founded on a simple idea: to provide exceptional products 
              that blend modern innovation with timeless quality. We are a team of passionate 
              creators dedicated to excellence.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              From our humble beginnings, our focus has always been on integrity, 
              craftsmanship, and building a community. We believe in making every
              interaction a positive one.
            </p>
          </div>

          {/* 2. Image Placeholder Replaced with a Real Image */}
          <div className="mt-8 md:mt-0">
            <img 
              className="h-64 w-full object-cover rounded-lg shadow-md"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=871&auto=format&fit=crop" 
              alt="Our team working at Mitha_Dukan"
            />
          </div>

        </div>
      </div>

      {/* "WHAT WE STAND FOR" SECTION */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1: Quality */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
            {/* <ShieldCheckIcon className="w-10 h-10 text-blue-500 mb-4" /> */}
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Unmatched Quality</h3>
            <p className="text-gray-600">
              We meticulously source the best materials and hold our products
              to the highest standards of quality and durability.
            </p>
          </div>

          {/* Card 2: Customers */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
            {/* <UserGroupIcon className="w-10 h-10 text-blue-500 mb-4" /> */}
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Customer-First</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We're 
              committed to providing responsive and helpful support.
            </p>
          </div>

          {/* Card 3: Sustainability */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition hover:shadow-lg">
            {/* <GlobeAltIcon className="w-10 h-10 text-blue-500 mb-4" /> */}
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Sustainable Sourcing</h3>
            <p className="text-gray-600">
              We believe in growing responsibly. We actively seek
              eco-friendly partners and sustainable practices.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;