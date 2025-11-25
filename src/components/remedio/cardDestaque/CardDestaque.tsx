import type Remedio from "../../../models/Remedio";

interface CardDestaqueProps {
  remedio: Remedio;
}

function CardDestaque({ remedio }: CardDestaqueProps) {
  return (
    <div
      className="bg-linear-to-r from-green-500 to-sky-500 
                          text-white rounded-3xl shadow-xl p-6 -mt-6 container w-2xl "
    >
      <p className="text-lg font-semibold opacity-90 tracking-wide">
        PRÓXIMA DOSE:
      </p>

      <h2 className="text-4xl font-extrabold leading-tight drop-shadow">
        {remedio.nome} {remedio.doseMg}
      </h2>

      <p className="text-base mt-1 mb-6 opacity-90">
        1 Comprimido às {remedio.periodo?.horario}
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
  );
}

export default CardDestaque;
