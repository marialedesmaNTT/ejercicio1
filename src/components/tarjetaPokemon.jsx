import { COLOR_TIPOS } from "../constants"

function TarjetaPokemon({ pokemon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
        transition: "transform 0.2s",
      }}
    >
      <span style={{ fontSize: 11, color: "#aaa", fontWeight: 600 }}>
        #{String(pokemon.id).padStart(3, "0")}
      </span>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: 80, height: 80, margin: "0 auto", imageRendering: "pixelated" }}
      />

      <p style={{ fontSize: 14, fontWeight: 600, color: "#333", margin: "4px 0 8px" }}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </p>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            style={{
              fontSize: 10,
              color: "white",
              padding: "2px 8px",
              borderRadius: 20,
              fontWeight: 600,
              textTransform: "capitalize",
              backgroundColor: COLOR_TIPOS[t.type.name] || "#888",
            }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TarjetaPokemon