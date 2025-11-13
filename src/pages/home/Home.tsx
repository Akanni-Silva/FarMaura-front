import ListarRemedios from "../../components/remedio/listarRemedios/ListarRemedios";

function Home() {
  return (
    <>
      <div className="bg-gray-50 flex justify-center min-h-screen relative">
        <div className=" p-4 flex flex-col gap-6">
          {/* CARD DE DESTAQUE */}
          <div
            className="bg-linear-to-r from-green-500 to-sky-500 
                          text-white rounded-b-3xl shadow-xl p-6 -mt-6"
          >
            <p className="text-lg font-semibold opacity-90 tracking-wide">
              PRÓXIMA DOSE:
            </p>

            <h2 className="text-4xl font-extrabold leading-tight drop-shadow">
              Novalgina 500mg
            </h2>

            <p className="text-base mt-1 mb-6 opacity-90">
              1 Comprimido às 10:00h
            </p>

            <button
              className="w-full bg-linear-to-r from-green-400 to-sky-400
                        text-white text-2xl font-extrabold py-4
                        rounded-full shadow-xl hover:scale-105
                        transition-all duration-300"
            >
              TOMEI!
            </button>
          </div>

          {/* SEU DIA */}
          <h3 className="text-2xl font-bold text-gray-700 -mb-9">Seu Dia</h3>

          <ListarRemedios />
        </div>
      </div>
    </>
  );
}

export default Home;
