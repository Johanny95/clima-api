require("dotenv").config();

const {
  leerInput,
  inquiererMenu,
  pausa,
  listarOptionInquierer,
} = require("./helpers/inquierer");

const Busqueda = require("./models/busquedas");

const main = async () => {
  // const texto = await leerInput('');
  // console.log(texto);

  let opt;
  const busquedas = new Busqueda();
  do {
    opt = await inquiererMenu();
    // console.log({opt});

    switch (opt) {
      case 1:
        //mostrar mensaje
        const busqueda = await leerInput("Ciudad: ");
        // console.log(lugar);
        //buscar los lugares
        const lugares = await busquedas.ciudad(busqueda);
        const optionSeleccionado = await listarOptionInquierer(lugares);
        //seleccionar el lugar
        const lugarSelect = lugares.find((l) => l.id === optionSeleccionado);
        //Clima

        const climaCiudad = await busquedas.buscarClima(
          lugarSelect.lat,
          lugarSelect.lng
        );

        //mostrar resultado
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSelect.nombre);
        console.log("Lat:", lugarSelect.lat);
        console.log("Long:", lugarSelect.lng);
        console.log("Clima:", climaCiudad.desc);
        console.log("Temp:", climaCiudad.tAct);
        console.log("Min:", climaCiudad.tMin);
        console.log("Max:", climaCiudad.tMax);
        break;

      default:
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
