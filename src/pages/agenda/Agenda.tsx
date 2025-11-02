function Agenda() {
  return (
    <>
      <div className="grid grid-flow-col min-h-[80vh] p-0 mx-0 text-white ">
        <div className="flex flex-col bg-blue-600 max-w-[20vw] items-center justify-around font-semibold">
          <p className="ml-2 ">Agendar novo remedio</p>
          <p className="ml-2 ">Colsultar Periodos</p>
          <p className="ml-2 ">Agendar novo remedio</p>
          <p className="ml-2 ">Agendar novo remedio</p>
        </div>
        <div className="bg-emerald-500 min-w-[80vw] overflow-hidden">
          <div className="container w-1/3 mx-auto">
          <h1 className="text-4xl text-center my-4">Dia</h1>
          <p className="text-center font-semibold mb-4">Voce tem os seguintes remedios hoje</p>
          <p className="text-center mb-4">nome/dosagem/horario</p>
          
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Agenda;
