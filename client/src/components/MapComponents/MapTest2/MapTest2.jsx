
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps'


import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";

import Chatik from "../Chatik/Chatik";
import MapAddPoint from "./MapAddPoint";
import {ChatRoom} from "../../ChatRoom";
import {Home} from "../../Home";
import Chat from "../../Chat/Chat";


// import myIcon from 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png';

const mapState = { center: [56.848217, 53.236675], zoom: 12 }

const PlacemarkDemo = () => {
  const [cords, setCords] = useState([])

  const [point, setPoint] = useState([])

  console.log('MAPTEST RENDERED')
  console.log(cords, 'COORDS')
  return (
    <YMaps
      query={{
        apikey: 'a1d74d39-8cef-45bf-b08e-15d2c7d52345',
      }}
      version={'2.1'}
    >
      <Map
        defaultState={mapState}
        width="500px"
        height="400px"
        onLoad={(ymaps) => console.log(ymaps)}
        instanceRef={(ref) => {}}
        onClick={(ev) => (
          setCords({ lat: ev.get('coords')[0], lon: ev.get('coords')[1] }),
          setPoint(
            <Placemark
              geometry={{
                type: 'Point',
                coordinates: [ev.get('coords')[0], ev.get('coords')[1]],
              }}
              properties={{
                hintContent: 'Stack Overflow',
                balloonContent: 'Stack Overflow на русском',
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: './device2.jpg',
                iconImageSize: [100, 36],
                iconImageOffset: [-50, -18],
              }}
            />
          )
        )}
        // onClick ={(ev) => pointsHandler(ev)}
        // console.log(ev.get('coords'))}
      >
        {point}
        {/* <GeoObject
              // The geometry description.
              geometry={{
                type: "Point",
                coordinates: [55.8, 37.8],
              }}
              // Properties.
              properties={{
                // The placemark content.
                iconContent: "Я тащусь",
                hintContent: "Ну давай уже тащи",
              }}
              // Options.
              options={{
                // The placemark's icon will stretch to fit its contents.
                preset: "islands#blackStretchyIcon",
                // The placemark can be moved.
                draggable: true,
              }}
            /> */}
        <MapAddPoint setPoint={setPoint} point={point} cords={cords} />

        <Placemark
          geometry={{
            type: 'Point',
            coordinates: mapState.center,
          }}
          properties={{
            hintContent: 'Stack Overflow',
            balloonContent: 'Stack Overflow на русском',
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: './device2.jpg',
            iconImageSize: [100, 36],
            iconImageOffset: [-50, -18],
          }}

        >
          {/* <MapAddPoint key={1} point={point} /> */}
          <Typography>Чатик</Typography>
          <Chat/>
        </Box>
      </YMaps>
    </>
  );
};


export default PlacemarkDemo