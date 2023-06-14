import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div style={{fontSize:"30px"}}> <img style={{width:'30px',height:'30px',borderRadius:'50%'}} src={require('../assets/img/logo3.png')} /></div>

export function GoogleMap({loc}) {


    const zoom = 15

    return (
        <div className="google-map" style={{fontSize:'100px'}}  id='map'>
            <GoogleMapReact
                
                bootstrapURLKeys={{ key: "AIzaSyAEbO1NdPSMoIY-mfHBTOj4vB0R37KKUvQ" }}
                defaultCenter={loc}
                center={loc}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    {...loc}
                    
                />
            </GoogleMapReact>
        </div>
    );
}