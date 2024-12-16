
(function () {
    const lat = 20.237977244466354; 
    const lng = -97.95752626147666;
    const mapa = L.map('mapa-inicio').setView([lat, lng], 13);

    let markers = new L.FeatureGroup().addTo(mapa)
    let propiedades = [];
    //Filtros

    const filtros = {
        categoria: '',
        precio: ''
    }

    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)

    //Filtrado de categorias y precios

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value
        filtrarPropiedades();
    })

    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value
        filtrarPropiedades();
    })


    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            propiedades = await respuesta.json()

            mostrarPropiedades(propiedades)

        } catch (error) {
            console.log(error)
        }
    }

    const mostrarPropiedades = propiedades => {

        //Limpiar markers previos

        markers.clearLayers()

        propiedades.forEach(propiedad => {
            //Agregar los pines

            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            })
                .addTo(mapa)
                .bindPopup(`
            <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
            <h1 class="text-xl font-extrabold uppercase my-5"> ${propiedad.titulo} </h1>
            <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
            <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
            <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver Propiedad</a>
            `)

            markers.addLayer(marker)
        })
    }

    let userMarker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    userMarker.bindPopup(`Lat: ${lat}, Lng: ${lng} `).openPopup();

    userMarker.on('moveend', function (e) {
        const posicion = e.target.getLatLng(); 
        const nuevaLat = posicion.lat.toFixed(6);
        const nuevaLng = posicion.lng.toFixed(6);
    
        userMarker.bindPopup(`Lat: ${nuevaLat}, Lng: ${nuevaLng}`).openPopup();
    });

    const filtrarPropiedades = () => {
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)
        mostrarPropiedades(resultado)
    }

    const filtrarCategoria = (propiedad) => {
        return filtros.categoria ? propiedad.categoriaID === filtros.categoria : propiedad
    }

    const filtrarPrecio = (propiedad) => {
        return filtros.precio ? propiedad.precioID === filtros.precio : propiedad
    }
    obtenerPropiedades()

})()