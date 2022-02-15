class Cliente {
    nome : string;
    fone : number;
    constructor (nome : string, fone: number) {
        this.nome = nome;
        this.fone = fone;
    }

    setFone(fone : number) {
        this.fone =  fone;
    }
    
    setId(id : string) {
        this.nome = id;
    }

    getNome() {
        return this.nome
    }
    
    toString() {
        return `${this.nome}, ${this.fone}`
    }
}

class Sala {
    cadeiras: Array<Cliente | null>;
    constructor (tamSala : number) {
        this.cadeiras = [];
        for (let i = 0; i < tamSala; i++) {
            this.cadeiras.push(null);
        }
    }

   toString() {
    let sda = "(";
    for (let i = 0; i < this.cadeiras.length; i++) {
        let cadeira = this.cadeiras[i];
        if (cadeira == null) {
            sda += " - ";
        } else {
            sda += ` ${cadeira.getNome()} `;
        }  
    }   
    sda += ")";
    return sda;
    }

    indexOf(id: string): number {
        return this.cadeiras.findIndex(c => c != null && c.nome == id);
    }

    reservar(cliente: Cliente, posicao: number): boolean {
        if (posicao < 0 || posicao > this.cadeiras.length) {
            console.log("Essa cadeira não existe!")
            return false;
        }
        if (this.cadeiras[posicao] != null) {
            console.log("Essa cadeira já está reservada!")
            return false;
        }
        if (this.indexOf(cliente.nome) != -1) {
            console.log("Você já está reservando uma cadeira!")
            return false;
        }
        this.cadeiras[posicao] = cliente;
        return true;
    }

    cancelar(id: string) {
        let posicao = this.indexOf(id);
        if (posicao == -1) {
            this.cadeiras[posicao] = null 
            console.log(`${id} não encontrado na sessão`)
            return;
        }
        this.cadeiras[posicao] = null;
        return;        
    }
}

let jober = new Cliente("jober", 3030);
let leti = new Cliente("leti", 30030);
let salaa = new Sala(5);
salaa.reservar(jober, 1);
salaa.reservar(new Cliente("goba", 1000), 4)
salaa.reservar(leti, 1);
salaa.reservar(new Cliente("doidim", 3434), 7)
salaa.reservar(leti, 2);
console.log(salaa.toString());
salaa.cancelar("goba");
salaa.cancelar("chico")
console.log(salaa.toString());