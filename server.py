from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from karteikarten_erstellen import neukarteikarte

app = FastAPI()

# CORS für React erlauben
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/button-click")
def button_click(data: dict):
    print("Button geklickt mit Daten:", data)

    neuekarteikarte = neukarteikarte()

    return neuekarteikarte