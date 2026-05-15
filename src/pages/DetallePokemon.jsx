import { useState, useEffect } from "react"
import { BASE_URL, COLOR_TIPOS } from "../constants"

function DetallePokemon({ pokemonId, onVolver }) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDetalle()
  }, [pokemonId])

  async function cargarDetalle() {
    setLoading(true)
    setError(null)
    setPokemon(null)

    try {
      const res = await fetch(`${BASE_URL}/pokemon/${pokemonId}`)
      if (!res.ok) throw new Error("No se pudo cargar el pokemon")
      const data = await res.json()
      setPokemon(data)
    } catch (err) {
      setError("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* boton de volver */}
      <button
        onClick={onVolver}
        style={{
          padding: "8px 16px",
          background: "none",
          border: "1px solid #ddd",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14,
          color: "#555",
          marginBottom: 24
        }}
      >
        ← Volver
      </button>

      {/* estado loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ color: "#666" }}>Cargando datos...</p>
        </div>
      )}

      {/* estado error */}
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
          <p style={{ fontWeight: "bold" }}>⚠️ Algo salió mal</p>
          <p style={{ margin: "8px 0 12px" }}>{error}</p>
          <button
            onClick={cargarDetalle}
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

      {/* detalle del pokemon */}
      {pokemon && !error && (
        <div style={{
          maxWidth: 420,
          margin: "0 auto",
          background: "white",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 4px", fontWeight: 600 }}>
              #{String(pokemon.id).padStart(3, "0")}
            </p>
            <h2 style={{ fontSize: 26, fontWeight: "bold", color: "#222", margin: "0 0 12px", textTransform: "capitalize" }}>
              {pokemon.name}
            </h2>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: 180, height: 180, objectFit: "contain", margin: "0 auto" }}
              onError={(e) => {
                // si no carga la imagen grande uso el sprite pequeño
                e.target.src = pokemon.sprites.front_default
              }}
            />
          </div>

          {/* tipos */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "16px 0" }}>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                style={{
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "capitalize",
                  backgroundColor: COLOR_TIPOS[t.type.name] || "#888"
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {/* altura y peso */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginTop: 16,
            background: "#f9f9f9",
            borderRadius: 10,
            padding: 16
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                Altura
              </span>
              <span style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                {pokemon.height / 10} m
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                Peso
              </span>
              <span style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                {pokemon.weight / 10} kg
              </span>
            </div>
          </div>

          {/* estadisticas base */}
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 14, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
              Estadísticas base
            </h3>
            {pokemon.stats.map((s) => {
              const porcentaje = Math.min((s.base_stat / 150) * 100, 100)
              return (
                <div key={s.stat.name} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
                    <span style={{ color: "#666", textTransform: "capitalize" }}>
                      {s.stat.name.replace("-", " ")}
                    </span>
                    <span style={{ fontWeight: 600 }}>{s.base_stat}</span>
                  </div>
                  <div style={{ background: "#eee", borderRadius: 4, height: 8 }}>
                    <div style={{
                      width: porcentaje + "%",
                      height: "100%",
                      borderRadius: 4,
                      backgroundColor: porcentaje > 66 ? "#4CAF50" : porcentaje > 33 ? "#FFC107" : "#F44336"
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DetallePokemon