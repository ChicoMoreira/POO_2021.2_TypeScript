
class Kid {
    nome: string;
    idade: number;
    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
    toString(): string {
        return `${this.nome} tem ${this.idade} anos`;
    }
}

class Trem {
    pessoas: Array<Kid>; //Kid
    potencia: number;
    tempo: number;
    lotacao: number;

    constructor(potencia: number, lotacao: number) {
        this.potencia = potencia; 
        this.pessoas = new Array<Kid>();
        this.tempo = 0;
        this.lotacao = lotacao;
    }

    comprarTempo(qtd: number): void {
        this.tempo += qtd;
    }

    dirigir(tempo: number): boolean {
        if (this.pessoas.length == 0) {
            console.log("Trem vazio");
            return false;
        }
        if (this.pessoas[0].idade < 5) {
            console.log("criança muito pequena pra dirigir o trem");
            return false;
        }
        if (this.tempo < tempo) {
            console.log("tempo insuficiente");
            return false;
        }
        this.tempo -= tempo;
        return true;
    }

    buzinar(): string {
        let saida = "P";
        for (let i = 0; i < this.potencia; i++)
            saida += "e";
        return saida + "m";
    }

    subir(pessoa: Kid): boolean {
        if (this.pessoas.length === this.lotacao) {
            console.log("trem lotado");
            return false;
        }
        this.pessoas.push(pessoa);
        return true;
    }

    descer(): Kid | null {
        if (this.pessoas.length == 0) {
            console.log("Trem vazio");
            return null;
        }
        let kid = this.pessoas.shift();
        if (kid === undefined)
            return null;
        return kid;
    }



    toString(): string {
        if (this.pessoas.length == 0) {
            return "Trem vazio";
        }
        let saida = `(${this.pessoas[0].nome}) [ `;
        for (let i = 1; i < this.pessoas.length; i++) {
            saida += `${this.pessoas[i].nome} `;
        }
        return saida + "]";
    }
}


let trem = new Trem(5, 4);
console.log(trem.toString());
trem.subir(new Kid("João", 5));
trem.subir(new Kid("Maria", 4));
trem.subir(new Kid("Pedro", 3));
trem.subir(new Kid("José", 2));
trem.subir(new Kid("Paulo", 1));
console.log(trem.toString());
trem.comprarTempo(5);
console.log(trem.buzinar());
console.log(trem.dirigir(5));
console.log(trem.toString());
console.log(trem.descer());
console.log(trem.toString());
console.log(trem.descer());
console.log(trem.toString());
