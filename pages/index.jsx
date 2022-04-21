import { InfoBox } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { GoogleMap, Circle } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getLatLng, getGeocode } from "use-places-autocomplete";

import customMapStyles from "../config/map-styles";

const addresses = [
  {
    street: "Andalucia",
    exteriorNumber: "77",
    settlement: "Alamos",
    country: "Méxcio",
  },
  {
    street: "Ote 225",
    exteriorNumber: "268",
    settlement: "Agricola oriental",
    country: "Méxcio",
  },
];

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 19.432608,
  lng: -99.133209,
};

const mapOptions = {
  styles: customMapStyles,
  disableDefaultUI: true,
};

const circleOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 10,
};

function Card({ address }) {
  const addressString = `${address.street} ${address.exteriorNumber} ${address.settlement} ${address.country}`;
  const [lat, setLat] = useState(center.lat);
  const [lng, setLng] = useState(center.lng);

  useEffect(() => {
    // Para obtener la latitud y longitus a partir del string de la dirección
    getGeocode({ address: addressString })
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        setLat(lat);
        setLng(lng);
      });
  }, []);

  return (
    <article className="card">
      <aside>
        <p style={{ textAlign: "center" }}>{addressString}</p>
      </aside>
      <figure style={{ textAlign: "center" }}>
        <GoogleMap
          center={{ lat, lng }}
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          options={mapOptions}
        >
          {/* Para renderizar un circulo */}
          <Circle
            center={{ lat, lng }}
            radius={1000}
            visible={true}
            options={circleOptions}
          />

          {/* Para renderizar un Pin */}
          <Marker position={{ lat, lng }} />
          <InfoBox position={{ lat, lng }}>
            <div
              style={{ backgroundColor: "yellow", opacity: 0.75, padding: 12 }}
            >
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                Hello, World!
              </div>
            </div>
          </InfoBox>
        </GoogleMap>
      </figure>
    </article>
  );
}

export default function cardList() {
  return (
    <main>
      {addresses.map((address, index) => {
        return <Card address={address} key={`address-card-${index}`} />;
      })}
    </main>
  );
}
