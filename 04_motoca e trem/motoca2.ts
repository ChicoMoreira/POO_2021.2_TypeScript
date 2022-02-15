class Pessoa {
    nome : string;
    idade : number;
    constructor (nome : string, idade : number) {
        this.nome = nome;
        this.idade = idade;
    }
        toString(): string {
            return `${this.nome}, ${this.idade} anos`;
        }
    }
    
class Motoca {
    pessoa: Pessoa | null;
    potencia : number = 1;
    minutos : number = 0;

    constructor (potencia : number){
        this.pessoa = null;
        this.potencia = potencia;
        this.minutos = 0;
    }

    montar(pessoa: Pessoa): boolean {
        if (this.pessoa === null) {
            this.pessoa = pessoa;
            return true;
        }   
            console.log("moto lotada");
            return false;
    }

    desmontar(): Pessoa | null {
        if (this.pessoa === null){
            return null;
        }
        const pessoa = this.pessoa;
        this.pessoa = null;
        return pessoa;
    }

    buzina(): string {
        let saida = "P";
        for (let i = 0; i < this.potencia; i++) 
            saida += "e";
            return saida + "m";
    }

    toString(): string {
        let nome = "vazio";    
        if (this.pessoa != null)
        nome = this.pessoa.toString();
        return `Motoca: \n potência: ${this.potencia} \n minutos disponíveis: ${this.minutos} \n motorista: ${nome}`  
        }

    comprar(minuto : number) {
        this.minutos = minuto;
        console.log(`~${this.minutos} minutos comprados~`)
        return this.minutos;
    }

    dirigir(tempo: number): boolean {
       if(this.pessoa == null){
           console.log("moto vaziaa");
           return false;
       } 
       if (this.pessoa.idade > 10) {
           console.log("pessoa muito velha para pilotar")
           return false; 
        }
        if (this.minutos < tempo) {
            console.log(`tempo insuficiente, andou ${this.minutos} minutos`);
            this.minutos = tempo - this.minutos
            return false;
        }
        this.minutos -= tempo;
        return true;
    }
}

let moto = new Motoca(5);
moto.comprar(40);
console.log(moto.toString());
moto.montar(new Pessoa("joao", 9));
console.log(moto.buzina());
//moto.montar( new Pessoa("maria", 26));
moto.dirigir(35);
console.log(moto.toString());
moto.desmontar();
moto.montar(new Pessoa("cleide", 7))
moto.comprar(60);
moto.dirigir(70)
console.log(moto.toString())

