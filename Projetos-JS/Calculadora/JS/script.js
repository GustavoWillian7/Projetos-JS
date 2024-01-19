// Vínculo entre HTML e JS com DOM
const textoOperacaoAnterior = document.querySelector("#operacao-anterior")
const textoOperacaoAtual = document.querySelector("#operacao-atual")
const botoes = document.querySelectorAll("#container-botoes button")

// Construção da classe Calculadora
class Calculadora {
    constructor(textoOperacaoAnterior, textoOperacaoAtual) {
        this.textoOperacaoAnterior = textoOperacaoAnterior
        this.textoOperacaoAtual = textoOperacaoAtual
        this.operacaoAtual = ""
    }

    // Adiciona digitos no input
    adicionarDigito(digito) {
        // Verificação de float
        if (digito === "." && this.textoOperacaoAtual.innerText.includes(".")) {
            return;
        } 

        this.operacaoAtual = digito
        this.atualizarTela()
    }

    // Processamento de operações
    processarOperacao(operacao) {
        // Verifica se o valor atual está vazio
        if (this.textoOperacaoAtual.innerText === "" && operacao != "C") {
            if (this.textoOperacaoAnterior.innerText !== "") {
                this.mudarOperacao(operacao)
            }
            return
        }

        let valorOperacao
        const anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0]
        const atual = +this.textoOperacaoAtual.innerText

        switch(operacao) {
            case "+":
                valorOperacao = anterior + atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break
            case "-":
                valorOperacao = anterior - atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break
            case "/":
                valorOperacao = anterior / atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break
            case "*":
                valorOperacao = anterior * atual
                this.atualizarTela(valorOperacao, operacao, atual, anterior)
                break
            case "DEL":
                this.processarDEL()
                break
            case "CE":
                this.processarCE()
                break
            case "C":
                this.processarC()
                break
            case "=":
                this.processarResultado()
            default:
                return                
        }
    }

    // Atualiza os valores no input
    atualizarTela(
        valorOperacao = null, 
        operacao = null, 
        atual = null, 
        anterior = null
    ) {
        if (valorOperacao === null) {
            this.textoOperacaoAtual.innerText += this.operacaoAtual
        } else {
            if (anterior === 0) {
                valorOperacao = atual
            }
            this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`
            this.textoOperacaoAtual.innerText = ""
        }
    } 

    // Mudar operação
    mudarOperacao(operacao) {
        const operacoes = ["+", "-", "/", "*"]

        if (!operacoes.includes(operacao)) {
            return
        }

        this.textoOperacaoAnterior.innerText = this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao
    }

    // Deleta último dígito
    processarDEL() {
        this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0, -1)
    }

    // Limpa operação atual
    processarCE() {
        this.textoOperacaoAtual.innerText = ""
    }

    // Limpa tudo
    processarC() {
        this.textoOperacaoAnterior.innerText = ""
        this.textoOperacaoAtual.innerText = ""
    }

    // Mostra o resultado
    processarResultado() {
        const operacao = textoOperacaoAnterior.innerText.split(" ")[1]

        this.processarOperacao(operacao)
    }
}

// Instância de calculadora
const calculadora = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual)

// Event listeners dos botões
botoes.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        const value = e.target.innerText

        if (+value >= 0 || value == ".") {
            calculadora.adicionarDigito(value)
        } else {
            calculadora.processarOperacao(value)
        }
    })
})