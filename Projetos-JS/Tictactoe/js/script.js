const elementosQuadrado = document.querySelectorAll('[dados-quadrado]')
const tabuleiro = document.querySelector('[dados-tabuleiro]')
const elementoMensagemVencedor = document.querySelector('[dados-mensagem-vencedor]')
const mensagemVencedor = document.querySelector('[dados-vencedor]')
const botaoRestart = document.querySelector('[dados-botao-restart]')

let vezBolinha

const sequenciasVitoriosas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]   
]

const comecarPartida = () => {
    vezBolinha = false

    for (const quadrado of elementosQuadrado) {
        quadrado.classList.remove('x')
        quadrado.classList.remove('bolinha')
        quadrado.removeEventListener('click', handleClick)
        quadrado.addEventListener('click', handleClick, { once : true })
    }

    verificarVez()

    mensagemVencedor.classList.remove('mostrar-mensagem-vencedor')
}

const finalizarPartida = (empate) => {
    if (empate) {
        elementoMensagemVencedor.innerText = 'Empate!'
    } else {
        elementoMensagemVencedor.innerText = vezBolinha ? 'O venceu!' : 'X venceu!'
    }

    mensagemVencedor.classList.add('mostrar-mensagem-vencedor')
}

const verificarVencedor = (jogadorAtual) => {
    return sequenciasVitoriosas.some(sequencia => {
        return sequencia.every(index => {
            return elementosQuadrado[index].classList.contains(jogadorAtual)
        })
    })
}

const verificarEmpate = () => {
    return [...elementosQuadrado].every(quadrado => {
        return quadrado.classList.contains('x') || quadrado.classList.contains('bolinha')
    })
}

const fazerJogada = (quadrado, classeJogadorAtual) => {
    quadrado.classList.add(classeJogadorAtual)
}

const verificarVez = () => {
    tabuleiro.classList.remove('x')
    tabuleiro.classList.remove('bolinha')

    if (vezBolinha) {
        tabuleiro.classList.add('bolinha')
    } else {
        tabuleiro.classList.add('x')
    }
}

const mudarJogador = () => {
    vezBolinha = !vezBolinha

    verificarVez()
}

const handleClick = (e) => {
    // Realiza jogada
    const quadrado = e.target
    const classeJogadorAtual = vezBolinha ? 'bolinha' : 'x'

    fazerJogada(quadrado, classeJogadorAtual)

    // Verifica se há vencedor ou empate
    const venceu = verificarVencedor(classeJogadorAtual)
    const empate = verificarEmpate()

    if (venceu) {
        finalizarPartida(false)
    } else if (empate) {
        finalizarPartida(true)
    } else {
        mudarJogador()
    }
}

comecarPartida()

botaoRestart.addEventListener('click', comecarPartida)