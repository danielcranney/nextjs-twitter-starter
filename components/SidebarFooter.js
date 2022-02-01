import React from "react";

export const SidebarFooter = () => {
  return (
    <article className="flex-col items-start hidden w-full mt-auto lg:flex">
      <p className="mb-1 text-sm">&copy;2022 Hollr.</p>
      <p className="mb-1 text-sm">
        Built by{" "}
        <a className="font-normal" href="http://www.danielcranney.com">
          Daniel Cranney
        </a>
      </p>
      <div className="flex items-center ml-0">
        <a
          className="flex items-center text-sm font-normal group"
          href="http://www.twitter.com/danielcranney"
        >
          <div className="w-4 h-4 mr-2">
            <svg
              viewBox="0 0 128 128"
              className="transition-all duration-150 ease-in-out fill-brand group-hover:fill-dark"
            >
              <path d="M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422"></path>
            </svg>
          </div>
          Follow me on Twitter
        </a>
      </div>
    </article>
  );
};
