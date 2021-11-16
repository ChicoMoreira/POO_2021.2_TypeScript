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
            sda += `${cadeira.nome[i]}`;
        }
        
    }   
    sda += ")";
    return sda;
    }
}

class Control {
   


    constructor () {
        
    }

    abrir(tamCinema : number) {
        let sala = new Sala(tamCinema);
        console.log(`Nova sala de ${tamCinema} lugares aberta`);
        return console.log(sala.toString());
    }

    reservar(nome : string, fone : number, cadeira : number) {
        if (this. !== null)
        let reservado = new Cliente(nome, fone);
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

let control = new Control;
control.abrir(5);
//console.log(control.abrir(5));


