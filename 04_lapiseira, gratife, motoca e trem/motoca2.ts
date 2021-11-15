
class Pessoa {
    nome : string;
    idade : number;
    

    constructor (nome : string, idade : number) {
        this.nome = nome;
        this.idade = idade;
        
    }
        toString(): string {
            return `${this.nome} tem ${this.idade} anos`;
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
        nome = this.pessoa.nome;
       return `[${nome}]`;
        }


    comprar(minuto : number) {
        this.minutos = minuto;
        return this.minutos;
    }

   dirigir(tempo: number): boolean {
       if(this.pessoa == null){
           console.log("moto vaziaa");
           return false;
       } 
       if (this.pessoa.idade > 10) {
           console.log("criança acima de 10")
           return false; 
        }
        if (this.minutos < tempo) {
            console.log("tempo insuficiente");
            return false;
        }
        this.minutos -= tempo;
        return true;
    }


}




let moto = new Motoca(5);

moto.montar( new Pessoa("joao", 9));
console.log(moto.buzina());

//moto.montar( new Pessoa("maria", 26));
moto.comprar(40);
console.log(moto);
moto.dirigir(35);
console.log(moto);

moto.desmontar();

