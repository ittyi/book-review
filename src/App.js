function App() {
  return (
    <div className="App">
      <header className="">
      </header>
      <main>
        <form>
          <p>
            <label for="email">email:</label>
            <input type="email" id="email" pattern=".+@example\.com" size="30" required></input>
          </p>
          <button type="submit">sign in</button>
        </form>
      </main>
    </div>
  );
}

export default App;
