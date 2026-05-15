import ListaPokemon from './pages/ListaPokemon'

function App() {
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
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#E53935", margin: 0 }}>
          Pokédex
        </h1>
        <p style={{ color: "#999", fontSize: 13, margin: 0 }}>PokéAPI</p>
      </div>

      <ListaPokemon />
    </div>
  )
}

export default App