import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Error() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 mx-auto">
        {/* Text Section */}
        <div className="max-w-md space-y-6">
          <div className="text-6xl font-extrabold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry, we couldn't find this page.
          </p>
          <p className="text-gray-600">
            But don’t worry, you can find plenty of other things on our homepage.
          </p>
          <a
  href="/"
  className="inline-flex items-center px-5 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition no-underline"
>
  <ArrowRightIcon className="h-5 w-5 " />
  Back to homepage
</a>
        </div>
      </div>
    </div>
  );
}
