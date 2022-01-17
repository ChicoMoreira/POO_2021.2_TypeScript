
class Pessoa {
    nome : string
    numero : number

    constructor(nome: string, numero: number) { 
        this.nome   = nome
        this.numero = numero
    }
}

class Cinema {
    cadeiras: Map<number, Pessoa>;
    nomes: Map<string, number>;

    constructor(public lotacao: number){
        this.cadeiras = new Map<number, Pessoa>();
        this.nomes = new Map<string, number>();
    }

    procurarChave(nome: string): number {
        for (let [chave, pessoa] of this.cadeiras) {
            if (pessoa.nome == nome) {
                return chave;
            }
        }
        return -1;
    }

    public reservar(chave: number, pessoa: Pessoa){
        if (this.cadeiras.has(chave)){
            console.log("Posicao ocupada");
            return;
        }
        if(this.nomes.has(pessoa.nome)){
            console.log("a pessoa ja esta no cinema");
            return;
        }
        this.cadeiras.set(chave, pessoa);
        this.nomes.set(pessoa.nome, chave);
    }
    public cancelar(nome: string){
        if(!this.nomes.has(nome)){
            console.log("Pessoa nao encontrada");
            return;
        }
        let chave = this.nomes.get(nome);
        this.cadeiras.delete(chave);
        this.nomes.delete(nome);
    }

    public toString() {
        let saida = "";
        for (let i = 0; i < this.lotacao; i++) {
            if (this.cadeiras.has(i)) {
                let pessoa = this.cadeiras.get(i);
                saida += pessoa.nome + " ";
            } else {
                saida += "- ";
            }
        }
    }
}


// let cin = new Cinema (7)
// cin.reservar(0, new Pessoa("clebis"))
// cin.reservar(1, new Pessoa("joao"))
// cin.reservar(7, new Pessoa("joseb"))
// console.log(cin.toString())