export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 bg-[#1e293b] border border-gray-700 flex-shrink-0 min-w-0 
        /* Altura reducida para que no sea tan larga: h-24 (96px) */
        h-24 sm:h-28 ${
        isSelected
          ? "ring-2 ring-blue-400 transform scale-105 shadow-lg z-10"
          : "hover:bg-[#2d3a4f]"
      }`}
      onClick={() => onClick(pokemon)}
    >
      {/* Contenedor del Sprite */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 pb-6">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          className="h-full w-full object-contain"
          style={{ 
            imageRendering: 'pixelated',
            /* Tamaño Mediano: scale(1.4) es ideal para que no se corten los bordes */
            transform: 'scale(1.4)', 
            transformOrigin: 'center center'
          }} 
        />
      </div>

      {/* Nombre: Barra inferior sólida */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-black/70">
        <span className="text-[10px] text-white font-bold py-1 w-full text-center block truncate uppercase tracking-tighter">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
