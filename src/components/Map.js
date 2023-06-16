"use client"
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({ iconUrl: "/marker/marker-icon.png" });
const Map = () => {
  return (
    <MapContainer center={[31.69452322200092, 74.24724019523563]} zoom={15} style={{ height: '400px', width: '50%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={icon} position={[31.69452322200092, 74.24724019523563]} />
    </MapContainer>
  );
};

export default Map;