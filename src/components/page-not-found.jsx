import { useNavigate } from "react-router-dom";
 
export default function PageNotFound() {
  const navigate = useNavigate()
  
  return (
    <section className="bg-backgroundLight !h-[calc(100vh-56px)] dark:bg-backgroundDark text-textLight dark:text-textDark">
      <div className="container flex items-center h-full px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm rounded-full bg-backgroundSecondLight dark:bg-backgroundSecondDark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" 
            className="w-6 h-6 stroke-iconLight dark:stroke-iconDark">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">Page not found</h1>
          <p className="mt-4 opacity-80">The page you are looking for doesn't exist.</p>
          <p className="opacity-80">Here are some helpful links:</p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm 
            transition-colors border border-borderLight dark:border-borderDark rounded-lg 
            gap-x-2 sm:w-auto bg-backgroundThirdLight dark:bg-backgroundThirdDark
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark font-medium"
            onClick={() => window.history.go(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              <span>Go back</span>
            </button>

            <button className="w-1/2 px-5 py-2 text-sm tracking-wide transition-colors rounded-lg shrink-0 sm:w-auto
            bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark font-medium"
            onClick={() => navigate("/")}>
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}