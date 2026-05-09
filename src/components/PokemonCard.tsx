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
      {/* Contenedor de la imagen: He aumentado el padding inferior para que el nombre no tape al Pokémon */}
      <div className="flex items-center justify-center p-2 pb-6">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          /* Tamaños aumentados y renderizado de píxeles para que no se vea borroso */
          className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain image-pixelated transition-transform duration-300"
          style={{ imageRendering: 'pixelated' }} 
        />
      </div>

      {/* Contenedor del nombre */}
      <div className="absolute inset-0 bg-transparent flex items-end">
        <span className="text-white text-xs sm:text-sm font-medium p-1 sm:p-2 w-full text-center truncate bg-black/20 backdrop-blur-sm">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
