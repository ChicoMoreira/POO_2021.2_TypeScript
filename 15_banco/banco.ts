class Cliente {
    contas: Array<Conta>
    idCliente: string
    constructor(idcliente: string) {
        this.idCliente = idcliente
        this.contas = new Array()
    }
    
    addConta(conta: Conta) {
        this.contas.push(conta)
    }

    toString() {
        console.log(`${this.idCliente} [${this.contas[0].getId()}, ${this.contas[1].getId()}]`)
    }
}

abstract class Conta {
    saldo: number
    idCliente: string
    id: number
    tipo: string
    constructor(id: number, idCliente: string) {
        this.saldo = 0
        this.idCliente = idCliente
        this.id = id
        this.tipo = ""
    }

    depositar(valor:number) {

    }

    attMensal() {

    }

    transferir(outra: Conta, valor: number) {

    }

    sacar(valor: number) {

    }

    toString() {

    }

    getId() {
        return this.id
    }

}

class CC extends Conta {
    constructor(id: number, idCliente: string) {
        super(id, idCliente)
    }

    attMensal(): void {
        this.saldo -= 20
    }

    toString() {
        console.log(`[${this.id}]: ${this.idCliente}: ${this.saldo}: CC`)
    }
}


class CP extends Conta {
    constructor(id: number, idCliente: string) {
        super(id, idCliente)
    }

    attMensal(): void {
        this.saldo += this.saldo*0.1
    }

    toString() {
        console.log(`[${this.id}]: ${this.idCliente}: ${this.saldo}: CP`)
    }
}

class Banco {
    contas: Map<number, Conta>
    clientes: Map<string, Cliente>
    proximoIdConta: number
    constructor() {
        this.contas = new Map()
        this.clientes = new Map()
        this.proximoIdConta = 0
    }

    addCliente(cliente: string) {
        // this.clientes.set(cliente, new Cliente(cliente))
        // this.proximoIdConta++
        // this.clientes.get(cliente).addConta(new CC(this.proximoIdConta, cliente))
        // this.proximoIdConta++
        // this.clientes.get(cliente).addConta(new CP(this.proximoIdConta, cliente))
    
        let cli: Cliente = new Cliente(cliente)
        this.proximoIdConta++
        let cc: CC = new CC(this.proximoIdConta, cliente)
        this.proximoIdConta++
        let cp: CP = new CP(this.proximoIdConta, cliente)
        cli.addConta(cc)
        cli.addConta(cp)
        this.clientes.set(cliente, cli)
        this.contas.set(cc.getId(), cc)
        this.contas.set(cp.getId(), cp)
    
    }

    depositar(idConta: number, valor: number) {

    }

    attMensal() {

    }

    transferir(contaDe: number, contaPara: number, valor: number) {

    }

    sacar (idConta: number, valor: number) {

    }

    toString() {
        let saida = ""
        for (let cli of this.clientes.values()) {
            saida += `${cli.toString()}`
        }
        return saida
    }
}

let banco = new Banco()
banco.addCliente("chico")
banco.addCliente("dio")
console.log(banco.toString())
