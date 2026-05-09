import type { Pokemon } from '../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onClick: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 bg-[#1e293b] border border-gray-700 flex-shrink-0 h-32 sm:h-40 
        /* 
           CAMBIO CLAVE: He fijado un ancho (w-28 o w-36) para que haya 
           espacio real a los costados antes de que el sprite toque el borde.
        */
        w-28 sm:w-36 ${
        isSelected
          ? "ring-2 ring-blue-400 transform scale-105 shadow-lg z-10"
          : "hover:bg-[#2d3a4f]"
      }`}
      onClick={() => onClick(pokemon)}
    >
      {/* 
          Contenedor con Padding Lateral (px-4): 
          Esto garantiza el "aire" a los costados.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 pb-6">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          className="w-full h-full object-contain"
          style={{ 
            imageRendering: 'pixelated',
            /* 
               Scale 2.2: Ahora que la tarjeta es más ancha, 
               podemos subir el scale y se seguirá viendo con aire.
            */
            transform: 'scale(2.2)', 
            transformOrigin: 'center center'
          }} 
        />
      </div>

      {/* Nombre con gradiente para que no tape los pies del Pokémon */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-4">
        <span className="text-[10px] sm:text-xs text-white font-bold py-1 w-full text-center block truncate uppercase tracking-tighter">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
