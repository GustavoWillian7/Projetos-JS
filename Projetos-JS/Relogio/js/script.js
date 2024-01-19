function atualizarHorario() {
    var displayElement = document.querySelector('.display')

    var horaAtual = new Date()
    var horario = 
    corrigirHorario( horaAtual.getHours() ) + ':' + 
    corrigirHorario( horaAtual.getMinutes() ) + ':' + 
    corrigirHorario( horaAtual.getSeconds() ) 

    displayElement.textContent = horario
}

function corrigirHorario(num) {
    if (num < 10) {
        num = '0' + num
    }

    return num
}

atualizarHorario()
setInterval(atualizarHorario, 1000)