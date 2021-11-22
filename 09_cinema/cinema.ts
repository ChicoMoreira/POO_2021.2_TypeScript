class Cliente {
    nome : string;
    fone : number;
    constructor (nome : string, fone: number) {
        this.nome = nome;
        this.fone = fone;
    }

    toString() {
        return `${this.nome}, ${this.fone}`
    }
        
    setFone(fone : number) {
       this.fone =  fone;
    }

    setId(id : string) {
        this.nome = id;
    }

}

class Sala {
    cadeiras : Array<Cliente | null>;
    
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
            sda += ` ${cadeira.nome[i]} `;
        }
        
    }   
    sda += ")";
    return sda;
    }

    
    //retorna -1 se não encontrar
    indexOf(id: String): number {
        return this.cadeiras.findIndex(c => c != null && c.nome == id);
        // for (let i = 0; i < this.cadeiras.length; i++)
        //     if (this.cadeiras[i] != null && this.cadeiras[i].id == id)
        //         return i;
        // return -1;
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

    cancelar(id: string): boolean {
        let posicao = this.indexOf(id);
        if (posicao == -1) {
            this.cadeiras[posicao] = null;
            return true;
        }
        return false;
    }
}












// let person = new Cliente("jober", 3000);

// console.log(person.toString());
// person.setFone(2999);
// person.setId("jobervando");
// console.log(person.toString());


// let sala = new Sala(5);

// console.log(sala.toString());

// console.log("" + sala);


let jober = new Cliente("jober", 3030);
let leti = new Cliente("let", 30030);
let salaa = new Sala(5);

salaa.reservar(jober, 1);
salaa.reservar(leti, 1);
salaa.reservar(leti, 2);
salaa.cancelar("jober");
//console.log(control.abrir(5));
console.log(salaa.toString());

