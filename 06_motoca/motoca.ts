
class Pessoa {
    nome : string;
    idade : number;
    

    constructor (nome : string, idade : number) {
        this.nome = nome;
        this.idade = idade;
        
    }
        toString(): string {
            return `Pessoa ${this.nome} ${this.idade}`;
        }
    }
    


let pessoa = new Pessoa("joberclecio", 9);


class Motoca {
    pessoa: Pessoa;
    potencia : number = 1;
    minutos : number = 0;

    constructor (pessoa : Pessoa, potencia : number, minutos : number){
        this.pessoa = pessoa;
        this.potencia = potencia;
        this.minutos = minutos;
    }

    toString(): string {
            return `Motoca ${this.potencia} ${this.minutos}, pessoa`;
        }


    comprar(minuto : number) {
        this.minutos = minuto;
        return this.minutos;
    }

   


}

let motoca = new Motoca(pessoa, 1, 0);

console.log(motoca);

motoca.comprar(20);

console.log(motoca);