const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn_prev')
const buttonNext = document.querySelector('.btn_next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponde = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponde.status === 200){
        const data = await APIResponde.json()
        return data
    }
}

const renderPokemon = async(pokemon) => {
    
    pokemonNumber.innerHTML = ''
    pokemonName.innerHTML = 'Loading...'


    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
    }else {
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    searchPokemon = Number(pokemonNumber.innerHTML)
    if (searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }

})

buttonNext.addEventListener('click', () => {
    searchPokemon = Number(pokemonNumber.innerHTML)
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon('1')