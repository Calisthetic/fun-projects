import { Link } from "react-router-dom";

export default function Welcome() {
  const paths = ["calculator", "graph"]
  
  return (
    <div className="min-h-[calc(100vh-56px)] w-full items-center justify-center flex flex-col">
      <div className="flex flex-col items-center gap-y-2 text-center text-xl font-medium">
        {paths.map((item, index) => (
          <Link to={item} key={index} className="first-letter:uppercase
          rounded-md bg-buttonLight dark:bg-buttonDark w-full px-3 py-1
          hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark">{item}</Link>
        ))}
      </div>
    </div>
  )
}