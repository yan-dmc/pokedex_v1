function selecionar(selecionar, desselecionar) {
    const btnSelecionado = document.querySelector(selecionar);
    const btnDesselecionado = document.querySelector(desselecionar);
    btnSelecionado.classList.add('selecionado');
    btnDesselecionado.classList.remove('selecionado');
}

function irParaNew(classe, hidden) {
    document.querySelector(classe).classList.add('hidden');
    document.querySelector(hidden).classList.remove('hidden');
}

function irParaHome(classe, hidden) {
    document.querySelector(classe).classList.add('hidden');
    document.querySelector(hidden).classList.remove('hidden');
}

const pokemonList = document.querySelector('#pokemonList');
const nextPage = document.querySelector('.next');
const prevPage = document.querySelector('.prev');
const limit = 12;
let offset = 0;
const maxRecords = 149;


function loadPokemonItems(offset, limit) {
    function convertPokemonTypesToLi(pokemonTypes) {
        return pokemonTypes.map((typeSlot) => `<div class="${typeSlot.type.name}">${typeSlot.type.name}</div>`)
    }
    
    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokeCard" data-name="${pokemon.name}" data-version="1"
            style="background-image: url(./assets/imagens/Cartas/${pokemon.name}1.png); background-size: contain">
            <div class="types">
                ${convertPokemonTypesToLi(pokemon.types).join('')}
            </div>
            <div class="pkmID"><span class="font2">#</span>${pokemon.id}</div>
        </li>
        `;
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('');
    
        document.querySelector(".pokemonList").addEventListener("click", function(event) {
            const targetCard = event.target.closest('.pokeCard'); 
    
            if (targetCard) {
                let currentVersion = parseInt(targetCard.dataset.version, 10);
                let nextVersion = currentVersion + 1;
                const pokemonName = targetCard.dataset.name;
    
                let nextImageUrl = `./assets/imagens/Cartas/${pokemonName}${nextVersion}.png`;
    
                let imgTest = new Image();
                imgTest.src = nextImageUrl;
    
                imgTest.onload = function () {
                    targetCard.dataset.version = nextVersion;
                    targetCard.style.backgroundImage = `url(${nextImageUrl})`;
                };
    
                imgTest.onerror = function () {
                    targetCard.dataset.version = 1;
                    targetCard.style.backgroundImage = `url(./assets/imagens/Cartas/${pokemonName}1.png)`;
                };
            }
        });
    }); 
}

loadPokemonItems(offset, limit);


nextPage.addEventListener('click', () => {
    offset += limit;

    const qtdRecord = offset + limit;

    if (offset > 0) {
        prevPage.style.visibility = 'visible';
    }

    if (qtdRecord >= maxRecords) {
        const newLimit = qtdRecord - maxRecords;
        loadPokemonItems(offset, newLimit);
        nextPage.style.visibility = 'hidden';
    } else {
        loadPokemonItems(offset, limit);
    }
})


prevPage.addEventListener('click', () => {
    offset -= limit;

    if (offset < 151) {
        nextPage.style.visibility = 'visible';
    }

    if (offset <= 0) {
        loadPokemonItems(offset, limit);
        prevPage.style.visibility = 'hidden';
    } else {
        loadPokemonItems(offset, limit);
    }
})
