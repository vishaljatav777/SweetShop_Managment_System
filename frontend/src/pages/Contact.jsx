// 1. You would import icons like this:
// import { 
//   PhoneIcon, 
//   EnvelopeIcon, 
//   MapPinIcon 
// } from '@heroicons/react/24/outline';

const Contact = () => {
  return (
    // 2. Page background
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-sm">
          Contact Us
        </h1>
        {/* 3. Updated subtext */}
        <p className="text-gray-700 mt-4 text-lg">
          Have a question or a comment? Use the form below or contact us 
          directly. We're happy to help.
        </p>
      </div>

      {/* 4. Single unified card layout */}
      <div className="max-w-5xl mx-auto mt-14 bg-white rounded-lg shadow-lg 
                    overflow-hidden grid md:grid-cols-2">

        {/* 5. CONTACT DETAILS (Left Column) */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Contact Information</h2>

          <div className="space-y-6">
            
            {/* Phone */}
            <div className="flex items-start gap-4">
              {/* <PhoneIcon className="w-6 h-6 text-blue-600 flex-shrink-0" /> */}
              <span className="text-2xl">📞</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                {/* 6. Updated phone number */}
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              {/* <EnvelopeIcon className="w-6 h-6 text-blue-600 flex-shrink-0" /> */}
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                {/* 7. Updated email */}
                <p className="text-gray-700">hello@mitha_dukan.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              {/* <MapPinIcon className="w-6 h-6 text-blue-600 flex-shrink-0" /> */}
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                {/* 8. Updated address */}
                <p className="text-gray-700">
                  123 Main Street,
                  <br />
                  Bhopal, MP 462001
                </p>
              </div>
            </div>
          </div>

          {/* 9. Updated response time text */}
          <p className="mt-8 text-gray-500 text-sm">
            We typically respond to inquiries within 1-2 business days.
          </p>
        </div>

        {/* 10. CONTACT FORM (Right Column) */}
        <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-200">
          {/* 11. Updated form title */}
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Leave a Message</h2>

          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {/* 12. Updated placeholder */}
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              {/* 13. Updated placeholder */}
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              {/* 14. Updated placeholder */}
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* 15. Updated button text */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                         hover:bg-blue-700 transition"
            >
              Submit Form
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;