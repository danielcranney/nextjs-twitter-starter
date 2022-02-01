import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoToNextStep } from "../components/GoToNextStep";

import { StateContext } from "../pages/_app";
import { ColorSquare } from "../components/ColorSquare";

import { BasicDefault } from "../components/styles/BasicDefault";
import { BasicAlternative } from "../components/styles/BasicAlt";
import { BannerDefault } from "../components/styles/BannerDefault";
import { BannerAlt } from "../components/styles/BannerAlt";
import { PreviewBasicDefault } from "../components/previews/PreviewBasicDefault";
import { PreviewBasicAlternative } from "../components/previews/PreviewBasicAlt";
import { PreviewBannerDefault } from "../components/previews/PreviewBannerDefault";
import { PreviewBannerAlternative } from "../components/previews/PreviewBannerAlt";

// import MainLayout from "../components/MainLayout";

export default function Home() {
  const { state, dispatch } = useContext(StateContext);
  const searchRef = useRef(null);
  const router = useRouter();
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);

  const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      // height,
      offsetTop,
      offsetBottom,
    };
  };

  const scrollTo = (ele) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const findUserRef = useRef(null);
  const selectStyleRef = useRef(null);
  const editColorsRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "findUser", ref: findUserRef, id: 1 },
      { section: "selectStyle", ref: selectStyleRef, id: 2 },
      { section: "editColors", ref: editColorsRef, id: 3 },
    ];

    const handleScroll = () => {
      // const { height: headerHeight } = getDimensions(findUserRef.current);
      const scrollPosition = window.scrollY;
      // + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 100)
      );
    }
    return () => {
      setScrolling(false);
    };
  }, []);

  function handleColorSelection(bg, text) {
    dispatch({
      type: "set-bg-color",
      payload: bg,
    });
    dispatch({
      type: "set-text-color",
      payload: text,
    });
  }

  const ValidateUser = async (inputValue) => {
    const response = await fetch("/api/twitter-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        twitterHandle: inputValue,
      }),
    });

    if (!response.ok) {
      const resError = await response.json();
      // throw new Error(`Error: ${response.status}`);
      // console.log(response.message);
      console.log(resError.message);
      console.log(response.status);
      dispatch({
        type: "set-user-validity",
        payload: false,
      });
    } else {
      console.log(response.status);
      const validatedUser = await response.json();
      console.log(validatedUser);
      dispatch({
        type: "set-user-validity",
        payload: validatedUser,
      });
      dispatch({
        type: "check-for-errors",
        payload: false,
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-h-screen">
      <div className="flex flex-grow">
        <aside className="fixed top-0 w-20 h-full p-4 bg-white border-r lg:p-8 lg:w-80 border-xlight">
          <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 mr-0 lg:mr-2 rounded-2xl bg-brand">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
              </svg>
            </div>
            <h1 className="hidden mb-0 text-3xl font-semibold lg:block">
              hollr
            </h1>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => {
                scrollTo(findUserRef.current);
                dispatch({
                  type: "set-count",
                  payload: 1,
                });
              }}
              className={`transition-all duration-150 ease-in-out flex group items-center p-3 mb-1 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                visibleSection === "findUser"
                  ? "bg-opacity-5 bg-brand"
                  : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-0 lg:mr-3 ${
                  visibleSection === "findUser"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <p
                className={`mb-0 text-lg hidden lg:inline-flex ${
                  visibleSection === "findUser"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
              >
                Find user
              </p>
            </button>

            <button
              onClick={() => {
                scrollTo(selectStyleRef.current);
                dispatch({
                  type: "set-count",
                  payload: 2,
                });
              }}
              className={`transition-all duration-150 ease-in-out mb-1 flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                visibleSection === "selectStyle"
                  ? "bg-opacity-5 bg-brand"
                  : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-0 lg:mr-3 ${
                  visibleSection === "selectStyle"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                ></path>
              </svg>
              <p
                className={`mb-0 text-lg hidden lg:inline-flex ${
                  visibleSection === "selectStyle"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
              >
                Select Style
              </p>
            </button>

            <button
              onClick={() => {
                scrollTo(editColorsRef.current);
                dispatch({
                  type: "set-count",
                  payload: 3,
                });
              }}
              className={`transition-all duration-150 mb-1 ease-in-out flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                visibleSection === "editColors"
                  ? "bg-opacity-5 bg-brand"
                  : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-0 lg:mr-3 ${
                  visibleSection === "editColors"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
              <p
                className={`mb-0 text-lg hidden lg:inline-flex ${
                  visibleSection === "editColors"
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
              >
                Edit Colors
              </p>
            </button>
            <button
              onClick={() => {
                if (state.userValid) {
                  dispatch({
                    type: "check-for-errors",
                    payload: false,
                  });
                  router.push({
                    pathname: "/generate",
                    query: {
                      searchUser: state.searchUser,
                      cardStyle: state.selectedStyle,
                      textColor: state.cardTextColor,
                      bgColor: state.cardBgColor,
                    },
                  });
                  dispatch({
                    type: "set-count",
                    payload: 4,
                  });
                } else {
                  dispatch({
                    type: "check-for-errors",
                    payload: true,
                  });
                  router.push("/#find-user");
                }
              }}
              className={`relative transition-all duration-150 mb-1 ease-in-out flex group items-center p-3 text-left rounded-md hover:cursor-pointer justify-center lg:justify-start ${
                state.count === 4
                  ? "bg-opacity-5 bg-brand"
                  : "bg-opacity-0 bg-transparent hover:bg-opacity-5 hover:bg-brand"
              }`}
            >
              <svg
                className={`w-5 h-5 mr-0 lg:mr-3 ${
                  state.count === 4
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                ></path>
              </svg>
              <p
                className={`mb-0 text-lg hidden lg:inline-flex ${
                  state.count === 4
                    ? "text-brand"
                    : "text-mid group-hover:text-brand"
                }`}
              >
                Download Shoutout
              </p>
            </button>
          </div>
        </aside>
        <div className="flex flex-col w-full px-4 pb-12 ml-20 lg:px-12 lg:ml-80">
          <main className="w-full">
            <Head>
              <title>hollr | Create a Twitter Shoutout</title>
              <meta name="description" content="Twitter shoutout machine" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Find User Section */}
            <section
              id="find-user"
              ref={findUserRef}
              className="flex flex-col py-4 border-b-2 lg:py-12 border-xlight"
            >
              <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
                Step 1
              </p>
              <h1 className="mb-2 text-4xl">Find User</h1>
              <p className="mb-6 text-lg">
                Using the box below, search for a Twitter user to create a
                shoutout for.
              </p>
              <form className="relative flex flex-col">
                <div className="flex">
                  <label className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white rounded-tl-lg rounded-bl-lg bg-mid">
                    @
                  </label>
                  <input
                    className="w-full h-12 px-3 py-4 text-lg bg-white border rounded-tr-lg rounded-br-lg appearance-none placeholder:text-mid text-dark border-xlight focus:outline-none"
                    placeholder="username"
                    ref={searchRef}
                    onChange={() => {
                      if (
                        searchRef.current.value.length < 2 ||
                        searchRef.current.value.length > 15
                      ) {
                        console.log(
                          "Username is less than 2 or greater than 15"
                        );
                        dispatch({
                          type: "search-user",
                          payload: "",
                        });
                        dispatch({
                          type: "set-user-validity",
                          payload: false,
                        });
                      } else {
                        dispatch({
                          type: "search-user",
                          payload: searchRef.current.value,
                        });
                        ValidateUser(searchRef.current.value);
                      }
                    }}
                  />
                </div>

                {!state.userValid ? (
                  <p className="relative top-auto right-auto flex items-center w-auto h-8 p-2 mt-2 mb-0 text-xs font-semibold tracking-wider text-red-500 uppercase bg-red-500 rounded-md -translate-y-0 sm:mt-0 sm:-translate-y-1/2 sm:absolute sm:right-2 sm:top-1/2 bg-opacity-10">
                    <svg
                      className="w-4 h-4 mr-1.5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                    User not valid
                  </p>
                ) : (
                  <p className="relative top-auto right-auto flex items-center w-auto h-8 p-2 mt-2 mb-0 text-xs font-semibold tracking-wider text-green-500 uppercase bg-green-500 rounded-md -translate-y-0 sm:mt-0 sm:-translate-y-1/2 sm:absolute sm:right-2 sm:top-1/2 bg-opacity-10">
                    <svg
                      className="w-4 h-4 mr-1.5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    User valid
                  </p>
                )}
              </form>

              {state.errorGenerating ? (
                <div className="w-full h-auto p-2 mt-6 text-xs font-semibold text-center text-red-500 bg-red-500 rounded-md md:w-1/2 right-2 bg-opacity-10">
                  Error - Check user is valid and then try again.
                </div>
              ) : null}

              <GoToNextStep newCount={2} scrollTo={"/#select-style"} />
            </section>
            {/* Select Style */}
            <section
              id="select-style"
              ref={selectStyleRef}
              className="flex flex-col pt-4 pb-4 border-b-2 lg:pb-12 lg:pt-12 border-xlight"
            >
              <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
                Step 2
              </p>
              <h1 className="mb-2 text-4xl">Select Style</h1>
              <p className="mb-6 text-lg">
                Select one of the pre-made styles below
              </p>
              <article className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Style 1 - Basic Default */}
                <BasicDefault />
                {/* Style 2 - Basic Alternative */}
                <BasicAlternative />
                {/* Style 3 - With Banner Default */}
                <BannerDefault />
                {/* Style 4 - With Banner Alternative */}
                <BannerAlt />
              </article>
              <GoToNextStep newCount={3} scrollTo={"/#edit-colors"} />
            </section>
            {/* Edit Colors */}
            <section
              id="edit-colors"
              ref={editColorsRef}
              className="flex flex-col pt-4 pb-4 border-b-2 lg:pb-12 lg:pt-12 border-xlight"
            >
              <article className="flex flex-col w-full lg:flex-row gap-x-0 sm:gap-x-4">
                <div className="flex-grow">
                  <p className="mb-0 font-semibold tracking-wide uppercase text-mid">
                    Step 3
                  </p>
                  <h1 className="mb-2 text-4xl">Edit Colors</h1>
                  <p className="mb-6 text-lg">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                  {/* Color Buttons */}
                  <article className="flex flex-wrap w-auto gap-y-4 gap-x-4">
                    <ColorSquare
                      bgColor={`bg-slate-500`}
                      textColor={`text-slate-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-gray-500`}
                      textColor={`text-gray-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-red-500`}
                      textColor={`text-red-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-orange-500`}
                      textColor={`text-orange-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-amber-500`}
                      textColor={`text-amber-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-yellow-500`}
                      textColor={`text-yellow-500`}
                      handleColorSelection={handleColorSelection}
                    />

                    <ColorSquare
                      bgColor={`bg-lime-500`}
                      textColor={`text-lime-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-green-500`}
                      textColor={`text-green-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-emerald-500`}
                      textColor={`text-emerald-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-teal-500`}
                      textColor={`text-teal-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-cyan-500`}
                      textColor={`text-cyan-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-blue-500`}
                      textColor={`text-blue-500`}
                      handleColorSelection={handleColorSelection}
                    />

                    <ColorSquare
                      bgColor={`bg-indigo-500`}
                      textColor={`text-indigo-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-violet-500`}
                      textColor={`text-violet-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-purple-500`}
                      textColor={`text-purple-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-fuchsia-500`}
                      textColor={`text-fuchsia-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-pink-500`}
                      textColor={`text-pink-500`}
                      handleColorSelection={handleColorSelection}
                    />
                    <ColorSquare
                      bgColor={`bg-rose-500`}
                      textColor={`text-rose-500`}
                      handleColorSelection={handleColorSelection}
                    />
                  </article>
                </div>
                {/* Preview */}
                <div className="flex flex-col w-full mt-8 lg:mt-0 sm:w-96">
                  {state.selectedStyle === "basic-default" ? (
                    <PreviewBasicDefault />
                  ) : state.selectedStyle === "basic-alt" ? (
                    <PreviewBasicAlternative />
                  ) : state.selectedStyle === "banner-default" ? (
                    <PreviewBannerDefault />
                  ) : state.selectedStyle === "banner-alt" ? (
                    <PreviewBannerAlternative />
                  ) : null}
                </div>
              </article>
            </section>
            {/* Generate Button */}
            <section className="flex flex-col py-12 border-b-2 border-xlight">
              <button
                onClick={() => {
                  if (state.userValid) {
                    dispatch({
                      type: "check-for-errors",
                      payload: false,
                    });
                    router.push({
                      pathname: "/generate",
                      query: {
                        searchUser: state.searchUser,
                        cardStyle: state.selectedStyle,
                        textColor: state.cardTextColor,
                        bgColor: state.cardBgColor,
                      },
                    });
                  } else {
                    dispatch({
                      type: "check-for-errors",
                      payload: true,
                    });
                  }
                }}
                className="w-full md:w-1/2 p-3.5 font-bold text-white rounded-lg bg-brand mb-4"
              >
                Generate Shoutout
              </button>
              {state.errorGenerating ? (
                <div className="w-1/2 h-8 p-2 text-xs font-semibold text-center text-red-500 bg-red-500 rounded-md right-2 bg-opacity-10">
                  Error - Check user is valid
                </div>
              ) : null}
            </section>
          </main>
          <footer className="flex flex-col items-center w-full mt-12 md:flex-row">
            <p className="mb-0 text-sm">
              &copy;2022 holr - Designed and built by{" "}
              <a className="font-normal" href="http://www.danielcranney.com">
                Daniel Cranney
              </a>
            </p>
            <div className="flex items-center ml-auto">
              <a
                className="flex items-center px-2 py-2 text-sm font-normal bg-opacity-0 group hover:bg-opacity-5 bg-brand"
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
          </footer>
        </div>
      </div>
    </div>
  );
}

// Home.getLayout = function getLayout(page) {
//   return <MainLayout>{page}</MainLayout>;
// };
