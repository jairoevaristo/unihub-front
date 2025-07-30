import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: LayoutAuth,
})

function LayoutAuth() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-blue flex flex-col items-center justify-center text-white px-8 py-10">
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold">Unihub</h1>
          <p className="mt-4 text-base md:text-lg">
            A plataforma que conecta estudantes universitários para compartilhar
            materiais acadêmicos e colaborar no aprendizado e centraliza seus
            estudos.
          </p>
        </div>
        <img
          src="/assets/hero.png"
          alt="Estudante"
          className="mt-6 hidden lg:block h-[72vh] w-full object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
