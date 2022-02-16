class Pessoa {
    nome : string
    tag : number
    constructor(nome: string, tag: number) { 
        this.nome   = nome
        this.tag = tag
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
        if(chave !== undefined) {
        this.cadeiras.delete(chave);
        this.nomes.delete(nome);
        }
    }

    public toString() : string {
        let saida = "Sala [-";
        for (let i = 0; i < this.lotacao; i++) {
            let pessoa : undefined | Pessoa = this.cadeiras.get(i);
            if (this.cadeiras.has(i)  && pessoa != undefined) {
                saida += `-${pessoa.nome}-`;
            } else {
                saida += `-p${i}-`;
            }
        }
        return saida + "-]"
    }
}

let cin = new Cinema (7)
cin.reservar(0, new Pessoa("clebis", 3032))
cin.reservar(3, new Pessoa("chico", 3334))
cin.reservar(7, new Pessoa("dio", 3336))
cin.reservar(2, new Pessoa("joao", 3333))
cin.reservar(4, new Pessoa("dio", 3336))
console.log(cin.toString())
cin.cancelar("clebis")
cin.cancelar("jojo")
console.log(cin.toString())