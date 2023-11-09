import { Routes, Route, } from "react-router-dom";
import Calculator from "./calculator/calculator";
import { Suspense } from "react";
import LoadingComponent from "./components/loading-component";
import PageNotFound from "./components/page-not-found";
import Welcome from "./components/welcome";
import Header from "./components/header";

function App() {
  return (
    <div>
      <Header></Header>

      <div className="pt-14 transition-transform text-textLight dark:text-textDark text-lg">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-[calc(100vh-56px)]">
          <Suspense fallback={<LoadingComponent></LoadingComponent>}>
            <Routes>
              <Route path='calculator' element={<Calculator></Calculator>}></Route>
              <Route path='/' element={<Welcome></Welcome>}></Route>
              <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
