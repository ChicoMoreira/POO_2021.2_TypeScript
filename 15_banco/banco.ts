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
        return `${this.idCliente} [${this.contas[0].getId()}, ${this.contas[1].getId()}]`
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
        this.saldo += valor
        console.log(`${this.idCliente} depositou ${valor} reais na conta [${this.id}]`)
    }

    attMensal() {
    }

    transferir(outra: Conta, valor: number) {
        this.saldo -= valor
        if(this.saldo < 0) {
            this.saldo += valor
            return console.log("saldo insuficiente... seu liso")
        }
        outra.saldo += valor
    }

    sacar(valor: number) {
        this.saldo -= valor
        console.log(`${this.idCliente} sacou ${this.saldo} reais de conta [${this.id}]`)
    }

    toString() {
        return `[${this.id}]:${this.idCliente}:${this.saldo}:${this.tipo}`
    }

    getId() {
        return this.id
    }

    getSaldo() {
        return this.saldo
    }
}

class CC extends Conta {
    constructor(id: number, idCliente: string) {
        super(id, idCliente)
        this.tipo = "CC"
    }

    attMensal(): void {
        this.saldo -= 20
    }
}

class CP extends Conta {
    constructor(id: number, idCliente: string) {
        super(id, idCliente)
        this.tipo = "CP"
    }

    attMensal(): void {
        this.saldo += this.saldo*0.01
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
        if (this.clientes.has(cliente))
        return console.log("Cliente já cadastrado")

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
        let conta:undefined | Conta = this.contas.get(idConta)
        if (conta == undefined)
        throw new Error("Conta não existe")
        conta.depositar(valor)
    }

    attMensal() {
        for (let contas of this.contas.values())
        contas.attMensal()
    }

    transferir(contaDe: number, contaPara: number, valor: number) {
        let de: undefined | Conta = this.contas.get(contaDe)
        let para: undefined | Conta = this.contas.get(contaPara)
        if (de == undefined || para == undefined )
        throw new Error("Conta não existe")
        de.transferir(para, valor)
        return console.log(`${valor} transferido de conta [${contaDe}] para [${contaPara}]`)
    }

    sacar (idConta: number, valor: number) {
        let conta: undefined | Conta = this.contas.get(idConta)
        if (conta == undefined)
        throw new Error("Conta não existe")
        conta.sacar(valor)
    }

    toString() {
        let saida =`Clientes:\n`
        for (let cli of this.clientes.values())
            saida += `${cli.toString()}\n`
        saida += `Contas:\n`
         for (let con of this.contas.values())
            saida += `${con.toString()}\n`
         
            return saida
    }
}

let banco = new Banco()
banco.addCliente("chico")
banco.addCliente("dio")
banco.depositar(1, 300)
banco.depositar(3, 10001)
console.log(banco.toString())
banco.transferir(3, 1, 10000)
banco.depositar(4, 100)
banco.attMensal()
banco.sacar(1, 5000)
console.log(banco.toString())