const Footer = () => {
  return (
    // We're using bg-amber-50, but you could use
    // bg-rose-50, bg-sky-50, etc.
    <footer className="bg-amber-50 text-amber-900 py-8 mt-6">
      <div className="max-w-6xl mx-auto text-center px-4 opacity-90">
        <p className="text-lg font-medium">
          © {new Date().getFullYear()} Mithai_Dukan. Great Sweets, Great Moments!
        </p>
        {/* A simple decorative divider */}
        <div className="border-t border-amber-200 w-24 mx-auto my-3"></div>
        <p className="text-sm">
          Crafted with ❤️ by Vishal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;