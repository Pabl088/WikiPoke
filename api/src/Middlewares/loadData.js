const axios = require('axios');
const { Pokemon, Tipo } = require('../db.js');

const loadTypes = async () => {
    try {
        const response = (await axios.get('https://pokeapi.co/api/v2/type')).data;
        const types = response.results.map(item => {
            return { nombre: item.name }
        });
        await Tipo.bulkCreate(types);
    } catch (error) {
        return 'Algo salió mal al cargar los tipos de Pokemon ', error.message;
    }
};

const loadPokes = async () => {

    const typesDB = Tipo.findAll();
    if (!typesDB.length) loadTypes();

    try {
        const response = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=320')).data;
        const arrUrlPoke = response.results.map(item => item.url);

        await Promise.all(arrUrlPoke.map(async url => {
            const poke = (await axios.get(url)).data;

            const pokeDB = await Pokemon.create({
                nombre: poke.name,
                vida: poke.stats[0].base_stat,
                ataque: poke.stats[1].base_stat,
                defensa: poke.stats[2].base_stat,
                velocidad: poke.stats[5].base_stat,
                altura: poke.height,
                peso: poke.weight,
                img: poke.sprites.other['official-artwork'].front_default
            });

            for (const item of poke.types) {
                const typeDB = await Tipo.findOne({ where: { nombre: item.type.name } });
                await pokeDB.addTipo(typeDB);
            };
        }));

    } catch (error) {
        return 'Algo salió mal al cargar los Pokemons ', error.message;
    };
};


module.exports = { loadPokes, loadTypes };
