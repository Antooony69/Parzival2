import type { Pokemon } from '../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onClick: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 bg-[#1e293b] border border-gray-700 flex-shrink-0 min-w-0 ${
        isSelected
          ? "ring-2 ring-blue-400 transform scale-105"
          : "hover:transform hover:scale-105"
      }`}
      onClick={() => onClick(pokemon)}
    >
      {/* Contenedor de la imagen con más espacio (pb-8) para que no choque con el nombre */}
      <div className="flex items-center justify-center p-2 pb-8">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          /* Tamaños extra grandes: w-20 en móvil hasta w-40 en pantallas grandes */
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }} 
        />
      </div>

      {/* Nombre del Pokémon con un fondo ligeramente más oscuro para legibilidad */}
      <div className="absolute inset-0 bg-transparent flex items-end">
        <span className="text-white text-xs sm:text-base font-bold p-2 w-full text-center truncate bg-black/40 backdrop-blur-sm">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
