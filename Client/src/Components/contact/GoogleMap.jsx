import { useEffect, useRef } from 'react';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDW3D74aKSyXBGY1chCo4fcUb_qiEMT5MI`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const defaultLocation = { lat: 42.6640, lng: 23.2886 }; 
      
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 15,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }]
          }
        ]
      });

      new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstanceRef.current,
        title: "Our Location"
      });
    };

    if (!window.google) {
      loadGoogleMapsAPI();
    } else {
      initMap();
    }

    return () => {
    };
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default GoogleMap; 