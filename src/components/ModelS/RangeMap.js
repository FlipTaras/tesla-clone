import React, { useCallback } from "react";
import { Marker, GoogleMap, useLoadScript } from "@react-google-maps/api";
import Icon from "../../static/images/ModelS/Range/dotIcon.svg";
import { connect } from "react-redux";
import OrderButton from "../Buttons/OrderButton";

const mapStyle = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#333333",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const containerStyle = { height: "100%", width: "100%" };

const center = { lat: 37.09024, lng: -95.712891 };

const options = { disableDefaultUI: true, styles: mapStyle };

const Map = ({ chargers, width }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  const renderMarkers = useCallback(() => {
    if (chargers) {
      return chargers.map((el, i) => {
        return (
          <Marker
            key={i}
            position={{
              lat: el.lat,
              lng: el.lng,
            }}
            icon={{
              url: Icon,
              scaledSize: new window.google.maps.Size(4, 4),
            }}
          />
        );
      });
    }
  }, [chargers]);

  if (loadError) return "Error Loading Maps";

  if (!isLoaded) return "";

  return (
    <>
      {isLoaded && (
        <>
          <div className="range__learnMoreMapInner">
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={width <= 814 ? 3 : 4}
              center={center}
              options={options}
            >
              {renderMarkers()}
            </GoogleMap>
          </div>
          <div className="range__learnMoreMapInfoContainer">
            <div className="range__learnMoreMapInfo">
              <div>
                <span className="range__learnMoreMapInfoTitle">18,000+</span>
                <span>Superchargers</span>
              </div>
              <span>2,000+ Stations</span>
            </div>
            <OrderButton
              classNames="range__learnMoreMapButton"
              customText="Learn More"
            />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  chargers: state.models.chargers,
  width: state.page.width,
});

export default connect(mapStateToProps)(Map);
