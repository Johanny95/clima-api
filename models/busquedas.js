const https = require("https");
const axios = require("axios");

class Busquedas {
  // historial = ['Madrir', 'Santiago', 'Bogota'];

  constructor() {
    // todo: leer db si existe
  }

  get paramsMapBox() {
    return {
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get agente() {
    return new https.Agent({
      rejectUnauthorized: false,
    });
  }

  url(lugar) {
    return `geocoding/v5/mapbox.places/${lugar}}.json`;
  }

  // get urlClima (){
  //     return `data/2.5/weather`;
  // }

  get paramsClima() {
    return {
      lang: "es",
      appid: process.env.OPENWEATHER_KEY,
      units: "metric"
    };
  }

  async ciudad(lugar = "") {
    try {
      // At instance level
      const instance = axios.create({
        httpsAgent: this.agente,
        baseURL: `https://api.mapbox.com/`,
        params: this.paramsMapBox,
      });
      const resp = await instance.get(this.url(lugar));

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async buscarClima(lat, lon) {
    try {
      //instace
      const instance = axios.create({
        httpsAgent: this.agente,
        baseURL: `https://api.openweathermap.org/`,
        params: {...this.paramsClima , lat, lon} //des estrocturacion 
      });

      const resp = await instance.get("data/2.5/weather");

    //   console.log(resp.data);
      return {
          desc : resp.data.weather[0].description,
          tMin : resp.data.main.temp_min,
          tMax : resp.data.main.temp_max,
          tAct : resp.data.main.temp,
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Busquedas;
