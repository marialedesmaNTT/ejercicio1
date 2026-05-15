import { useState, useEffect } from "react"
import { BASE_URL, POKEMON_POR_PAGINA } from "../constants"
import TarjetaPokemon from "../components/TarjetaPokemon"

function ListaPokemon({ onSeleccionar, paginaActual, setPaginaActual }) {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalPokemon, setTotalPokemon] = useState(0)

  useEffect(() => {
    cargarPokemon()
  }, [paginaActual])

  async function cargarPokemon() {
    setLoading(true)
    setError(null)
    setPokemonList([])

    try {
      const offset = paginaActual * POKEMON_POR_PAGINA
      const res = await fetch(`${BASE_URL}/pokemon?limit=${POKEMON_POR_PAGINA}&offset=${offset}`)

      if (!res.ok) {
        throw new Error("Error al cargar, codigo: " + res.status)
      }

      const data = await res.json()
      setTotalPokemon(data.count)

      const promesas = data.results.map((p) => fetch(p.url).then((r) => r.json()))
      const detallados = await Promise.all(promesas)

      setPokemonList(detallados)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPaginas = Math.ceil(totalPokemon / POKEMON_POR_PAGINA)

  return (
    <div>

      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ color: "#666" }}>Cargando pokémons...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{
          background: "#FFF3F3",
          border: "1px solid #ffcdd2",
          borderRadius: 8,
          padding: 20,
          margin: "20px 0",
          textAlign: "center",
          color: "#c62828"
        }}>
          <p style={{ fontWeight: "bold" }}>⚠️ Error de conexión</p>
          <p style={{ margin: "8px 0 12px" }}>{error}</p>
          <button
            onClick={cargarPokemon}
            style={{
              padding: "8px 20px",
              background: "#E53935",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            🔄 Reintentar
          </button>
        </div>
      )}

      {!loading && !error && pokemonList.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ color: "#999" }}>No hay pokémons aquí...</p>
        </div>
      )}

      {!loading && pokemonList.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 16,
          marginTop: 24
        }}>
          {pokemonList.map((p) => (
            <TarjetaPokemon key={p.id} pokemon={p} onClick={() => onSeleccionar(p.id)} />
          ))}
        </div>
      )}

      {!loading && pokemonList.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
          <button
            onClick={() => setPaginaActual((p) => p - 1)}
            disabled={paginaActual === 0}
            style={{
              padding: "8px 14px",
              border: "1px solid #ddd",
              borderRadius: 6,
              background: "white",
              fontSize: 14,
              opacity: paginaActual === 0 ? 0.4 : 1,
              cursor: paginaActual === 0 ? "not-allowed" : "pointer"
            }}
          >
            ← Anterior
          </button>

          {Array.from({ length: Math.min(totalPaginas, 5) }, (_, i) => {
            let paginaMostrar = i
            if (paginaActual > 2 && totalPaginas > 5) {
              paginaMostrar = paginaActual - 2 + i
            }
            if (paginaMostrar >= totalPaginas) return null
            return (
              <button
                key={paginaMostrar}
                onClick={() => setPaginaActual(paginaMostrar)}
                style={{
                  padding: "8px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: "pointer",
                  backgroundColor: paginaActual === paginaMostrar ? "#E53935" : "white",
                  color: paginaActual === paginaMostrar ? "white" : "#333",
                  fontWeight: paginaActual === paginaMostrar ? "bold" : "normal"
                }}
              >
                {paginaMostrar + 1}
              </button>
            )
          })}

          <button
            onClick={() => setPaginaActual((p) => p + 1)}
            disabled={paginaActual >= totalPaginas - 1}
            style={{
              padding: "8px 14px",
              border: "1px solid #ddd",
              borderRadius: 6,
              background: "white",
              fontSize: 14,
              opacity: paginaActual >= totalPaginas - 1 ? 0.4 : 1,
              cursor: paginaActual >= totalPaginas - 1 ? "not-allowed" : "pointer"
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

      <p style={{ textAlign: "center", color: "#999", fontSize: 13, marginTop: 8 }}>
        Página {paginaActual + 1} de {totalPaginas}
      </p>

    </div>
  )
}

export default ListaPokemon