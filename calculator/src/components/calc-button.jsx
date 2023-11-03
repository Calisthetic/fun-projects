import { twMerge } from "tailwind-merge"

export default function CalcButton(params) {
  return (
    <button className={twMerge("rounded-full transition-colors duration-100 h-10 w-10 "
    + (params.color ? params.color : " bg-[#232630] ") + " " + (params.hoverColor ? params.hoverColor : " hover:bg-[#53565f] "))}
    onClick={params.action}>{params.children}</button>
  )
}