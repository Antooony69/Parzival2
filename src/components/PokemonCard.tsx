import type { Pokemon } from '../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onClick: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 bg-[#1e293b] border border-green-900/50 flex-shrink-0 min-w-0 h-32 sm:h-40 ${
        isSelected
          ? "ring-2 ring-green-400 transform scale-105 shadow-lg z-10"
          : "hover:bg-[#2d3a4f]"
      }`}
      onClick={() => onClick(pokemon)}
    >
      {/* Contenedor del Sprite */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}images/pokemon/${pokemon.name.toLowerCase().replace(/ /g, '_')}.png`}
          alt={pokemon.name}
          className="h-full w-full object-contain"
          style={{ 
            imageRendering: 'pixelated',
            transform: 'scale(2)',
            transformOrigin: 'center center'
          }} 
        />
      </div>

      {/* Nombre: CAMBIADO A VERDE */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-black/60">
        <span className="text-[10px] sm:text-xs text-green-500 font-bold py-0.5 w-full text-center block truncate uppercase tracking-tighter">
          {pokemon.name}
        </span>
      </div>
    </div>
  );
};
