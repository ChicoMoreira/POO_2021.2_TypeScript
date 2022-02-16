class Tele {
    private tag: string;
    private number: string;    
    constructor(tag: string, number: string) {
    this.tag = tag;
    this.number= number;
    }
    
    public toString(): string {
        return `${this.tag} - ${this.number}`;
    }
    
    public getTag() {
        return this.tag;
    }

    public getNumber() {
        return this.number;
    }

    public validate(): boolean {    
        let valid = "0123456789()-.";
        for (let i = 0; i < this.number.length; i++) {
            if (valid.indexOf(this.number[i]) == -1) {
                console.log("número inválido");
                return false;
                }
        }
        return true;
    }
        
    public isValid(): boolean {
            if (this.validate() == true) {
               return true; 
            }
            else return false;
    }
} 

class Contato {
    private nome: string;
    private teles: Array<Tele>;
    constructor(n: string, t: Array<Tele>) {
        this.nome = n;
        this.teles = new Array<Tele>();
        for (let fone of t) {
            this.addTele(fone);
    
        }
    }
    
    public toString(): string {
        let saida = `Telefone de ${this.nome}\ncontatos:{`;
        for(let i = 0; i < this.teles.length; i++) {
            saida += ` [${(i)}: ${this.teles[i].toString()}] `
        }
        return saida += "}";
    }
  
    public setNome(nome : string) {
        this.nome = nome;
    }
    
    public getNumbers() : Array<Tele> {
        let saida = []
        for (let tele of this.teles) {
        saida.push(tele)
        }
    return saida
    }
    
    public addTele(tele : Tele) : boolean {
        if(tele.isValid() == true) {
            this.teles.push(tele);
            return true;
        }
        else return false;
    }
    
    public removeFone(index: number) : void {
        if (this.teles.length == 0) {
            console.log("lista vazia");
        }
        else if (index > this.teles.length) {
            console.log("número inexistente");
        }
        
        this.teles.splice(index, 1);
    }

    public getNome(){
        return this.nome;
    }
}

class Agenda {
    private contatos: Array<Contato>;
    constructor() {
        this.contatos = Array<Contato>();
    }

    private findByName(nome: string): number {
        for (let i = 0; i < this.contatos.length ; i++) {
            if (this.contatos[i].getNome() == nome) {
                return i;
            }
        }
        return -1;
    }

    public add (nome : string, fone: Array<Tele>) {
        if ( this.findByName(nome) == -1 ){
            this.contatos.push(new Contato(nome, fone)); 
            this.contatos.sort((a,b) => a.getNome().localeCompare(b.getNome()))
        }
        else {
            for (let i of fone)
            this.contatos[this.findByName(nome)].addTele(i);
            this.contatos.sort((a,b) => a.getNome().localeCompare(b.getNome()))
        }
    }

    public remove(nome: string): void {
        if (this.findByName(nome) !== -1 ) {
            this.contatos.splice(this.findByName(nome), 1)
        }
        else console.log("contato inexistente")

    }

    public removeTele(nome: string, pos: number): void {
        if (this.findByName(nome) !== -1 ) {
            this.contatos[this.findByName(nome)].removeFone(pos)
        }
    }
    
    public getContato(nome: string): Contato | null {
        if (this.findByName(nome) !== -1) {
            return this.contatos[this.findByName(nome)];
        }
            console.log("contato inexistente")
            return null;
        
    }

    public toString(): string {
        let saida = "";
        for(let i = 0; i < this.contatos.length; i++) {
            saida += `${this.contatos[i].toString()}\n`
        }
        return saida;
    }
    
    // busca(padrao: string): Array<Contato> | undefined{
    //     let result = [];
    //         // for (let i = 0; i < this.contatos.length ; i++){
    //         //     if(this.getContato[i] == padrao){
    //         //         result.push(this.contatos[i]);    
    //         // }
    //         for (let i = 0; i < this.contatos.length ; i++){
    //             if(this.contatos[i].toString() == padrao){
    //                 result.push(this.contatos[i].toString());    
    //         }
    //     }
    //     for (let contato of result) {
    //         contato.toString()
    //     }
    //     return result
    // }
}

let agenda = new Agenda();
agenda.add("chico", [new Tele("vivo", "988110452"), new Tele("laricel", "(85)97762452")])
agenda.add("dio", [new Tele("laricel", "(11)999222"), new Tele("tim", "1284721984")])
agenda.add("chico", [new Tele("oi", "(85)213123")])
console.log(agenda.toString());
agenda.remove("dio")
agenda.remove("jp");
agenda.removeTele("chico", 0);
agenda.removeTele("chico", 4);
console.log(agenda.toString());
// agenda.busca("o")
// agenda.busca("9")