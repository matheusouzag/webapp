export default function Home() {
  return (
      <main className="flex flex-col justify-center m-auto bg-gray-700 text-white w-8/12">
          <div className="text-center space-y-1 bg-neutral-900 p-8 shadow-lg">
            <h1 className="text-4xl">Gestor Financeiro Pessoal</h1>
            <p className="text-lg text-gray-400">subtitulo gestor financeiro</p>
          </div>
          <hr />
          <div className="flex justify-between py-4 px-4">
            <div>
              <button className="px-4 py-2 bg-gray-500 text-lg rounded hover:bg-blue-600 border border-gray-100 text-white mr-3">criar</button>
              <button className="px-4 py-2 bg-gray-500 text-lg rounded hover:bg-blue-600 border border-gray-100 text-white mr-3">historico</button>
              <button className="px-4 py-2 bg-gray-500 text-lg rounded hover:bg-blue-600 border border-gray-100 text-white">transferencia</button>
            </div>
            <div className="px-6 py-4 border border-gray-100 text-white">
              <p className="text-5xl">50</p>
            </div>
          </div>
          <div className="flex border border-gray-100 justify-between px-2">
            <div className="flex w-full justify-between pr-8">
              <p>nome da conta</p>
              <p>tipo de conta</p>
              <p>saldo inicial</p>
            </div>
            <div>
              <button className="px-4 py-2 bg-gray-500 text-lg rounded hover:bg-blue-600 border border-gray-100 text-white">...</button>
            </div>
          </div>
      </main>
  );
}
