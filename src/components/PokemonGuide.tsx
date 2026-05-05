import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Interfaces
import type { Pokemon } from "../interfaces/Pokemon"
import type { Region } from "../interfaces/Region"

// Hooks
import { useDynamicImports } from "../hooks/useDynamicImports"

// Components
import { RegionCard } from "./RegionCard"
import { LeaderCard } from "./LeaderCard"
import { PokemonCard } from "./PokemonCard"
import { PokemonDetails } from "./PokemonDetails"

export default function PokemonGuide() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [lightMode, setLightMode] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [regions, setRegions] = useState<Region[]>([])
  const [regionsLoaded, setRegionsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  const { getPokemonFiles } = useDynamicImports()

  // 🔹 Créditos (más limpio)
  const credits = [
    {
      name: "Irving",
      img: "IrviingHC.png",
      link: "https://twitch.tv/irviinghc",
    },
    {
      name: "Parzival",
      img: "ParziivalTwitch.png",
      link: "https://twitch.tv/parziival",
    },
    {
      name: "Itachi",
      img: "ItachiiSuka.png",
      link: "https://twitch.tv/itachi",
    },
  ]

  // Load region config
  useEffect(() => {
    const loadRegionConfig = async () => {
      try {
        const regionConfigModule = await import("../data/config-region.json")
        setRegions(regionConfigModule.regions || [])
      } catch (error) {
        console.error("Error loading region config:", error)
      }
    }

    loadRegionConfig()
  }, [])

  // Load pokemon data
  useEffect(() => {
    const loadPokemonData = async () => {
      if (regions.length === 0 || regionsLoaded) return

      const updatedRegions: Region[] = []

      for (const region of regions) {
        const updatedLeaders = []

        for (const leader of region.leaders) {
          try {
            const pokemonFiles = await getPokemonFiles(region.id, leader.id)

            const pokemons = await Promise.all(
              pokemonFiles.map(async (file) => {
                try {
                  const module = await import(
                    `../data/${region.id}/${leader.id}/${file.replace(".json", "")}.json`
                  )

                  const data = module.default || module

                  return {
                    ...data,
                    id:
                      data.id ||
                      data.name?.toLowerCase() ||
                      file.replace(".json", ""),
                  }
                } catch (error) {
                  console.error(`Error importing ${file}:`, error)
                  return null
                }
              })
            )

            updatedLeaders.push({
              ...leader,
              pokemons: pokemons.filter(Boolean),
            })
          } catch (error) {
            console.error(`Error loading pokemon data for ${leader.name}:`, error)

            updatedLeaders.push({
              ...leader,
              pokemons: [],
            })
          }
        }

        updatedRegions.push({
          ...region,
          leaders: updatedLeaders,
        })
      }

      setRegions(updatedRegions)
      setRegionsLoaded(true)
      setLoading(false)
    }

    loadPokemonData()
  }, [regions, regionsLoaded, getPokemonFiles])

  const handleRegionClick = (regionId: string) => {
    setExpandedRegion(expandedRegion === regionId ? null : regionId)
    setExpandedLeader(null)
    setSelectedPokemon(null)
  }

  const handleLeaderClick = (leaderId: string) => {
    setExpandedLeader(expandedLeader === leaderId ? null : leaderId)
    setSelectedPokemon(null)
  }

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(
      selectedPokemon?.name === pokemon.name ? null : pokemon
    )
  }

  const currentRegion = regions.find((r) => r.id === expandedRegion)
  const currentLeader = currentRegion?.leaders.find((l) => l.id === expandedLeader)
  const currentLeaderPokemons = currentLeader?.pokemons || []

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        lightMode
          ? "bg-gray-100 text-gray-900"
          : "bg-[#111827] text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            FARM LIGA PokeMMO
          </h1>

          <p className="text-blue-400 font-bold mb-4">
            <a
              href="https://youtu.be/LidSI0vJYKs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-red-500 transition"
            >
              <img
                className="w-8 h-8"
                src={`${import.meta.env.BASE_URL}images/PaxpoYT.png`}
                alt="Video"
              />
              VER TUTORIAL EN VIDEO
            </a>

            <span className="mx-3">|</span>

            <a
              href="https://discord.gg/pKPxjAFNmA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition"
            >
              <img
                className="w-6 h-6"
                src={`${import.meta.env.BASE_URL}images/discord.png`}
                alt="Discord"
              />
              Reportes
            </a>
          </p>

          {loading && (
            <p className="text-yellow-400 font-semibold">
              Cargando datos...
            </p>
          )}
        </div>

        {/* TIPS */}
        <div className="flex flex-col items-center mb-4">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex gap-2 hover:text-blue-300 transition"
          >
            {showTips ? <ChevronUp /> : <ChevronDown />}
            <span className="text-yellow-400 font-medium">
              RECOMENDACIONES (EQUIPO - TIPS)
            </span>
          </button>

          {showTips && (
            <ul className="list-disc text-left max-w-2xl pl-6 text-gray-300 mt-2">
              <li>
                <a
                  href="https://pokepast.es/e356ee22f26cf6dc"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400"
                >
                  👉 Equipo recomendado 👈
                </a>
              </li>
              <li>Completa cada Liga 5 veces antes</li>
              <li>Configura bien el equipo</li>
              <li>Desactiva EXP Share</li>
            </ul>
          )}
        </div>

        {/* REGIONS */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {regions.map((region) => (
            <RegionCard
              key={region.id}
              region={region}
              isExpanded={expandedRegion === region.id}
              onClick={handleRegionClick}
            />
          ))}
        </div>

        {/* LEADERS */}
        {expandedRegion && currentRegion && (
          <div className="grid grid-cols-5 gap-3 mb-6">
            {currentRegion.leaders.map((leader) => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                isExpanded={expandedLeader === leader.id}
                onClick={handleLeaderClick}
              />
            ))}
          </div>
        )}

        {/* POKEMON */}
        {expandedLeader && (
          <div className="mb-6">
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {currentLeaderPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isSelected={selectedPokemon?.id === pokemon.id}
                  onClick={handlePokemonClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* DETAILS */}
        {selectedPokemon && (
          <PokemonDetails pokemon={selectedPokemon} />
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">

          <div className="flex items-center gap-3">
            <span className="text-gray-400">Créditos</span>

            <img
              src={`${import.meta.env.BASE_URL}images/LehosifJS.png`}
              className="w-12 h-12"
              alt="Lehosif"
            />

            <div className="flex gap-2">
              {credits.map((user) => (
                <a
                  key={user.name}
                  href={user.link}
                  target="_blank"
                  rel="noreferrer"
                  title={user.name}
                >
                  <img
                    className="w-10 h-10 hover:scale-110 hover:opacity-80 cursor-pointer transition"
                    src={`${import.meta.env.BASE_URL}images/${user.img}`}
                    alt={user.name}
                  />
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => setLightMode(!lightMode)}
            className="text-gray-400 hover:text-white transition"
          >
            {lightMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

      </div>
    </div>
  )
}
