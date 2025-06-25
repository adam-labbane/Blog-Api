import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">Bienvenue sur le Blog</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="card-text">
            Ceci est un test de style Bootstrap. Si tu vois ce message avec un joli cadre, c'est que tout fonctionne !
          </p>
          <button className="btn btn-success">Clique ici</button>
        </div>
      </div>
    </div>
  );
}

export default App;
