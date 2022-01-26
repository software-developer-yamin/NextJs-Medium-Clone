import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 max-w-7xl mx-auto" >
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="data:image/png;base64,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"
            alt=""
            className="w-44 object-contain cursor-pointer bg-transparent"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5 font-semibold">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full cursor-pointer" >Follow</h3>
        </div>
            </div>
            <div className="flex items-center space-x-5 text-green-600">
                 <h3>Sign In</h3>
                 <h3 className="border px-4 py-1 rounded-full border-green-600 cursor-pointer">Get Started</h3>
            </div>
    </header>
  );
};

export default Header;
