// 1. You would import icons like this:
// import { 
//   SparklesIcon, 
//   UserGroupIcon, 
//   TruckIcon,
//   CheckCircleIcon 
// } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">

      {/* 2. HERO SECTION - New Text */}
      <div className="text-center max-w-3xl mx-auto px-6 animate-fadeIn">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-600 drop-shadow-sm leading-tight">
          Experience Pure Indulgence
        </h1>
        <p className="text-gray-700 mt-4 text-xl">
          Discover handcrafted mithai made from age-old family recipes.
        </p>
        <a
          href="/products"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition"
        >
          Discover Our Collection
        </a>
      </div>

      {/* 3. FEATURES GRID - New Text */}
      <div className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center animate-slideUp">
          <div className="text-3xl mb-3">🥛</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">The Purest Ingredients</h3>
          <p className="text-gray-600 mt-2">
            Only the finest: pure ghee, rich milk, premium nuts, and natural sugars.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center animate-slideUp delay-150">
          <div className="text-3xl mb-3">👨‍🍳</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">Master Halwais</h3>
          <p className="text-gray-600 mt-2">
            Our sweets are crafted by master chefs who honor our traditional recipes.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center animate-slideUp delay-300">
          <div className="text-3xl mb-3">☀️</div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">Made Fresh Daily</h3>
          <p className="text-gray-600 mt-2">
            Every single batch is prepared fresh every morning, guaranteed.
          </p>
        </div>
      </div>

      {/* 4. WHY CHOOSE US - New Text */}
      <div className="max-w-4xl mx-auto text-center mt-24 px-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-blue-600">
          A Tradition of Purity
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          For generations, we've shared the simple joy of authentic Indian sweets.
        </p>

        {/* "Why Us" Cards - New Text */}
        <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
          
          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <div className="text-2xl">📖</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Generational Recipes</h3>
              <p className="text-gray-600 mt-1">We follow secret family recipes passed down for decades.</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <div className="text-2xl">🌿</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">100% Natural</h3>
              <p className="text-gray-600 mt-1">Absolutely no preservatives, artificial colors, or flavors.</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <div className="text-2xl">✨</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Impeccable Hygiene</h3>
              <p className="text-gray-600 mt-1">Prepared in a state-of-the-art, spotlessly clean kitchen.</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <div className="text-2xl">🎁</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Perfect for Gifting</h3>
              <p className="text-gray-600 mt-1">Beautifully packaged for your festivals and celebrations.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;