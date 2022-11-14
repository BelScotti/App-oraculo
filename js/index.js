let formjuego = document.querySelector('#formjuego')
let player1
let player2
//pantallas
let inicio = document.querySelector('.inicio')
let loading = document.querySelector('.loading')
let carousel = document.querySelector('.carousel')
let resultados = document.querySelector('.resultados')

//carousel
let carouselInner = document.querySelector('.carousel-inner')
let juegoTitulo = document.querySelector('#juegoTitulo')

//este es el array principal de cartas
let cartas = cards
let partidasGuardadas = []

formjuego.addEventListener('submit',(e) => {
    e.preventDefault()
    
    player1 = e.target.player1.value
    player2 = e.target.player2.value

    console.log('players:', player1 ,'y', player2)
    if (player1 && player2) {
        iniciarJuego()
        formjuego.reset()
    } else {
        alert('Si quieres suerte debes ingresar los participantes...')
    }
})


const iniciarJuego = () => {
    inicio.classList.add('d-none')
    loading.classList.remove('d-none')
    const timeoutID = window.setTimeout(() => showCarousel(), 3500)
}
// este array va a tener las 6 cartas para mostrar resutados..
let resultadosJuego = [] 

const showCarousel = () => {
    loading.classList.add('d-none')
    carousel.classList.remove('d-none')
    //este array va a tener 6 cartas ...
    const cartasJuego = [] 

    while (cartasJuego.length < 6) { //while se repite hasta q se cumpla una condición.
        //recupero un objeto random del array carta
        random = Math.floor(Math.random() * cartas.length)
        //si el objeto ya existe en el array cartas Juuego y si no existe lo agrego al array
        if (cartasJuego.indexOf(cartas[random]) === -1) {
            cartasJuego.push(cartas[random])
        }
    }
    resultadosJuego = cartasJuego 
    carouselInner.innerHTML = ''
    
    let active
    cartasJuego.forEach((carta, index) => {
        if (index === 0) active = 'active'
        else active = ''

        carouselInner.innerHTML += `<div class="carousel-item ${active}">
                        <img src=${carta.imageUrl} class="d-block w-100" alt=${carta.title}>
                        <div class="carousel-caption">
                          <h5>${carta.title}</h5>
                          <p>${carta.descripcion}</p>
                        </div>
                      </div>`
    })

    juegoTitulo.innerHTML = `Estas son las cartas de ${player1} y de ${player2}`
    //aca poner lo del match
}

let cartasP1titulo = document.querySelector('#cartasP1titulo')
let cartasP2titulo = document.querySelector('#cartasP2titulo')
let cartasP1 = document.querySelector('#cartasP1')
let cartasP2 = document.querySelector('#cartasP2')


const verResultados = () => {
    console.log(resultadosJuego)
    resultados.classList.remove('d-none')
    carousel.classList.add('d-none')
    inicio.classList.add('d-none')

    cartasP1titulo.innerHTML = `Cartas de ${player1}`
    cartasP2titulo.innerHTML = `Cartas de ${player2}`

    resultadosJuego.forEach((carta, index) => {

        if(index < 3) {
            cartasP1.innerHTML += `<div class="col">
        <div class="card h-100">
          <img src=${carta.imageUrl} class="card-img-top" alt=${carta.title}>
          <div class="card-body">
            <h5 class="card-title">${carta.title}</h5>
            <p class="card-text">${carta.descripcion}</p>
          </div>
        </div>
      </div>`
        } else {
        cartasP2.innerHTML += `<div class="col">
        <div class="card h-100">
          <img src=${carta.imageUrl} class="card-img-top" alt=${carta.title}>
          <div class="card-body">
            <h5 class="card-title">${carta.title}</h5>
            <p class="card-text">${carta.descripcion}</p>
          </div>
        </div>
      </div>`
        }
    })
}

const vaciarTodo = () => {
    cartasP1titulo.innerHTML = ''
    cartasP2titulo.innerHTML = ''
    cartasP1.innerHTML = ''
    cartasP2.innerHTML = ''
    carouselInner.innerHTML = ''
}

const guardarPartida = () => {
    vaciarTodo()

    let partidaAguardar = [{player1: player1, player2: player2, match: true , 
        partida: resultadosJuego}]

        carouselInner.innerHTML = ''
    inicio.classList.remove('d-none')
    resultados.classList.add('d-none')

    console.log(partidaAguardar)
    partidasGuardadas.push(partidaAguardar)
    partidasGuardadasList()
}

    let listaGuardadas = document.querySelector('#listaGuardadas')
    const partidasGuardadasList = () => {
        listaGuardadas.innerHTML = ''

        partidasGuardadas.forEach((partida, index) => {
            listaGuardadas.innerHTML += `<li>Partida entre ${partida[0].player1} 
            y ${partida[0].player2} <button class="btn btn-primary" onclick="verResultados(${index})" >Ver resultados</button></li>`       
        })
    }

const volverAlInicio = () => {
    vaciarTodo()
    inicio.classList.remove('d-none')
    carousel.classList.add('d-none')
    resultados.classList.add('d-none')
}



