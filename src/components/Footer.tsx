"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-fundo text-white mt-10 border-t border-gray-400 w-full rounded-t-3xl animacao">
      <div className="m-auto p-4 text-center">
        <p className="text-sm md:text-base">
          Desenvolvido por <span className="font-semibold">Matheus Souza</span> para Techlab 2025 :)
        </p>
      </div>
    </footer>
  );
}
