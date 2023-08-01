export default function Home() {
  return (
    <div className="h-screen p-4 bg-slate-900 text-slate-100">
      <h1 className="font-bold flex gap-3 items-center text-5xl before:w-0.5 before:h-8 before:bg-sky-500 before:flex">Hello Tailwind</h1>
      <h3>Hello Tailwind</h3>
      <p>Hello Tailwind</p>
      <button disabled className="bg-sky-500 px-4 py-2 rounded-md font-medium mt-4 enabled:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed">
        Sign in
      </button>
    </div>
  )
}
