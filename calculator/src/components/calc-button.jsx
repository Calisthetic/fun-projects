export default function CalcButton(params) {
  return (
    <button className=" rounded-full bg-slate-800 hover:bg-slate-600 transition-colors h-10 w-10"
    onClick={params.action}>{params.children}</button>
  )
}