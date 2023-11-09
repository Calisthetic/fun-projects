import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconLight from "./IconLight";
import IconDark from "./IconDark";

export default function Header() {
  const [currentTheme, setCurrentTheme] = useState(!('theme' in localStorage) ? "system" : localStorage.getItem('theme'))

  const ChangeTheme = useCallback((theme) => {
    setCurrentTheme(theme)
  }, [])

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", PrefersThemeChangedHandler)

    function PrefersThemeChangedHandler() {
      if (!('theme' in localStorage)) {
        ChangeTheme("system")
      }
    }

    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", PrefersThemeChangedHandler)
  }, [ChangeTheme])

  useEffect(() => {
    if (currentTheme === "system") {
      localStorage.removeItem("theme")
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else if (currentTheme === "light") {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    }
  }, [currentTheme])

  return (
    <header className="fixed top-0 z-40 h-14 px-1 sm:px-2 w-full bg-backgroundLight dark:bg-backgroundDark
    shadow-lightLight dark:shadow-none">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          <Link to="/" className="flex ml-1 sm:ml-2 md:mr-24">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-textDark text-textLight">Home</span>
          </Link>
        </div>

        <div className="flex items-center">
          <button onClick={() => ChangeTheme(currentTheme === "dark" ? "light" : "dark")}>
            {currentTheme === "dark" ? (
              <div>
                <IconDark classes="h-6 w-6 fill-white dark:fill-white fill-black"></IconDark>
              </div>
            ) : (
              <section>
                <IconLight classes="h-6 w-6 fill-black dark:fill-white fill-black"></IconLight>
              </section>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}