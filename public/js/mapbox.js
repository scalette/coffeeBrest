/* eslint-disable */


export const displayMap = (locations) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZnVyYyIsImEiOiJjbDM4anluN2EwMG5wM2JvNmtyaHk5cmUyIn0.wrPWDbplvMORTthpuTVpNA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/furc/cl38nt35m00dt14mmb6x17h1a',
        scrollZoom: false
        // center: [-118.113491,34.111745], 
        // zoom: 4
    });
    
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
            })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
            .addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    })
    
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}
