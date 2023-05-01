
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{fontSize:"30px"}}>{text}</div>;

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 12
    const HaifaLoc = { lat: 32.794044, lng: 34.98957 }
    const TlvLoc = { lat: 32.0853, lng: 34.7818 }
    const AshdodLoc = { lat: 31.801447, lng: 34.643497 }

    return (
        <div>
            <div className="locations-cont">
                <h2 className="bramches-title">Our Branches</h2>
                <div className="branches-cont">

                <h3 onClick={() => setCoordinates({ ...HaifaLoc })}> Haifa</h3>
                <h3 onClick={() => setCoordinates({ ...TlvLoc })}> Tel-aviv</h3>
                <h3 onClick={() => setCoordinates({ ...AshdodLoc })}>Ashdod </h3>
                </div>
            </div>
            <div style={{ margin: 'auto' }} className="map-cont">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyD_K-ZiXChnVhCka_u60AHJg57rJn3RinQ" }}
                    defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        {...TlvLoc}
                        text="💛"
                    />
                    <AnyReactComponent
                        {...AshdodLoc}
                        text="🧡"
                    />
                    <AnyReactComponent
                        lat={32.794044}
                        lng={34.989571}
                        {...HaifaLoc}
                        text="💚"
                    />
                </GoogleMapReact>
            </div>
        </div >
    );
}