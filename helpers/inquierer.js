const inquirer = require('inquirer');
require('colors');


const menu = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ] 
    }
];



const inquiererMenu = async () => {
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una Opción'.green);
    console.log('======================\b'.green);

    const { option } = await inquirer.prompt(menu);
    // console.log(option);
    return option;
};


const pausa = async () => {
    const input = [
        {
            type: 'input',
            name: 'option',
            message: `Precione ${'Enter'.green} para continuar`
        }
    ];
    console.log(`\n`);
    await inquirer.prompt(input);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        } 
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarOptionInquierer = async (objetos = []) => {

    const choices = objetos.map((obj, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: obj.id,
            name: `${idx} ${obj.nombre}`
        }
    });
    choices.unshift(
        { value: '0', name: `${(0 + '.').green} Cancelar` }
    );
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;

}


const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}


const listadoTareasChecklist = async ( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    // choices.unshift(
    //     { value: '0', name: `${(0 + '.').green} Cancelar` }
    // );
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices

        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = { inquiererMenu, pausa, leerInput, listarOptionInquierer, confirmar, listadoTareasChecklist };