import { useState } from "react"
import ListaPokemon from "./pages/ListaPokemon"
import DetallePokemon from "./pages/DetallePokemon"

function App() {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)
  // subimos la pagina aqui para que no se pierda al cambiar de vista
  const [paginaActual, setPaginaActual] = useState(0)

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        borderBottom: "2px solid #E53935",
        paddingBottom: 12
      }}>
        <h1
          onClick={() => setPokemonSeleccionado(null)}
          style={{ fontSize: 28, fontWeight: "bold", color: "#E53935", margin: 0, cursor: "pointer" }}
        >
          Pokédex
        </h1>
        <p style={{ color: "#999", fontSize: 13, margin: 0 }}>PokéAPI</p>
      </div>

      {pokemonSeleccionado === null ? (
        <ListaPokemon
          onSeleccionar={(id) => setPokemonSeleccionado(id)}
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
        />
      ) : (
        <DetallePokemon
          pokemonId={pokemonSeleccionado}
          onVolver={() => setPokemonSeleccionado(null)}
        />
      )}
    </div>
  )
}

export default App