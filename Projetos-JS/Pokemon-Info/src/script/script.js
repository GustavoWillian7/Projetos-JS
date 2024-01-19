const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonTypes = document.querySelector('.pokemon__types')
const pokemonAbility = document.querySelector('.pokemon__ability');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    const tamanhoType = data['types'].length;

    pokemonName.innerHTML = 'Name: ' + data.name;
    pokemonNumber.innerHTML = 'ID: ' + data.id;
    pokemonHeight.innerHTML = 'Height: ' + data.height / 10 + 'm';
    pokemonWeight.innerHTML = 'Weight: ' + data.weight / 10 + 'KG';
    if (tamanhoType == 1) {
      pokemonTypes.innerHTML = 'Type: ' + data['types']['0']['type']['name'];
    } else if (tamanhoType == 2) {
      pokemonTypes.innerHTML = 'Types: ' + data['types']['0']['type']['name'] + "/" + data['types']['1']['type']['name'];
    }
    pokemonAbility.innerHTML = 'Ability: ' + data['abilities']['0']['ability']['name'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    alert("[ERRO] Insira o nome/número do Pokémon corretamente!")
    pokemonName.innerHTML = 'Name: Not found';
    pokemonNumber.innerHTML = 'ID: Not found';
    pokemonHeight.innerHTML = 'Weight: Not found';
    pokemonWeight.innerHTML = 'Height: Not found';
    pokemonTypes.innerHTML = 'Types: Not found';
    pokemonAbility.innerHTML = 'Ability: Not found';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);