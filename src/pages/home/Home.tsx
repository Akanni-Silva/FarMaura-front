function Home() {
  return (
    <>
    <div className="bg-emerald-500 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p className="text-xl">Organize sua agenda de Remedios</p>

            <div className="flex justify-around gap-4">
              Novo remedio 
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://i.postimg.cc/fRLyHWBP/Gemini-Generated-Image-y17bb8y17bb8y17b.png"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home