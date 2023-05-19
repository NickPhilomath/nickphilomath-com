import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <div className="login">
        <h3>Login</h3>
        <div className="inputs">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
        </div>
        <button>OK</button>
      </div>
    </div>
  );
}

export default App;
