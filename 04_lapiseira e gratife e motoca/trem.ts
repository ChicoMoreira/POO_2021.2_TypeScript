
class Kid {
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
    



class Trem {
    Kid: Kid[];
    potencia : number = 1;
    minutos : number = 0;

    constructor (potencia : number){
        this.Kid = [];
        this.potencia = potencia;
        this.minutos = 0;
    }

    montar(Kid: Kid): boolean {
        if (this.Kid === null) {
            this.Kid = Kid;
            return true;
        }   
            console.log("moto lotada");
            return false;
    }

    desmontar(): Kid | null {
        if (this.Kid === null){
            return null;
        }
        const Kid = this.Kid;
        this.Kid = null;
        return Kid;
    }

    buzina(): string {
        let saida = "P";
        for (let i = 0; i < this.potencia; i++) 
            saida += "e";
            return saida + "m";
    }

    toString(): string {
        let nome = "vazio";    
        if (this.Kid != null)
        nome = this.Kid.nome;
       return `[${nome}]`;
        }


    comprar(minuto : number) {
        this.minutos = minuto;
        return this.minutos;
    }

   dirigir(tempo: number): boolean {
       if(this.Kid.length == 0){
           console.log("trem vaziaa");
           return false;
       } 
       if (this.Kid[0].idade < 10) {
           console.log("criança muito pequena");
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

