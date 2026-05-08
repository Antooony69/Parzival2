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
          : "hover:transform hover:scale-102"
      }`}
      onClick={() => onClick(pokemon)}
    >
      <div className="flex items-center justify-center p-1">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain"
        />
      </div>
      {/* He quitado bg-black y bg-opacity-30 de aquí */}
      <div className="absolute inset-0 bg-transparent flex items-end">
        {/* He quitado bg-black y bg-opacity-60 de aquí para eliminar la sombra del nombre */}
        <span className="text-white text-xs sm:text-sm font-medium p-1 sm:p-2 w-full text-center truncate">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
