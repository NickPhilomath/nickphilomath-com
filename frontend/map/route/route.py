import os
import requests
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"

HEADERS = {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline,routes.legs.polyline,routes.legs.steps.polyline,routes.legs.steps.polyline",
    "X-Goog-Api-Key": GOOGLE_API_KEY,
}

data = {
    "origin": {"location": {"latLng": {"latitude": 41.321588, "longitude": 69.249908}}},
    "destination": {
        "location": {"latLng": {"latitude": 41.323576, "longitude": 69.248988}}
    },
    "travelMode": "DRIVE",
    "polylineEncoding": "GEO_JSON_LINESTRING",
    "routingPreference": "TRAFFIC_AWARE",
    # "departureTime": "2023-10-15T15:01:23.045123456Z",
    "computeAlternativeRoutes": False,
    "routeModifiers": {
        "avoidTolls": False,
        "avoidHighways": False,
        "avoidFerries": False,
    },
    "languageCode": "en-US",
    "units": "IMPERIAL",
}


response = requests.post(ROUTES_URL, json=data, headers=HEADERS)

print(response.json())
