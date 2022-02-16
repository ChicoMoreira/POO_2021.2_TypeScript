import { fchown } from "fs";

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
        return this.nome + ": " + this.teles.join(" / ");
    }
  
    public setNome(nome : string) {
        this.nome = nome;
    }
    
    public getTeles() : Array<Tele> {
        return this.teles
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
    private contatos: Map<string, Contato>;
    constructor() {
        this.contatos = new Map<string, Contato>();
    }

    public add(contato : string, tele: Array<Tele>) {
        if (this.contatos.has(contato)){   
         let cntt = this.contatos.get(contato);
        //    for(let fone of this.contatos.getTeles()){
        //     cntt!.addTele(tele);
        //    }
            for (let teles of tele) {
            if (cntt.addTele(teles) == true)
            cntt.getTeles().push(teles)
            return
        }
        this.contatos.set(contato, new Contato(contato, tele))
        return
    }
    //      if (!this.contatos.has(contato.getNome())) {
    //          this.contatos.set(contato.getNome(), contato)
    //         for (let fone of contato.getTeles()) {
    //         let cntt2 = this.contatos.get(contato.getNome())
    //         cntt2!.addTele(fone)  
    //     }
    //     return
    // }
        // contato.getNome()
        // if (this.contatos.has(contatoNome)) {
        //     for(let fone of contato.getTeles()){
        //             let cntt = this.contatos.get(contato.getNome());
        //             this.contatos.get(contatoNome)!.addTele(fone);
        //            }
        //            return
        // }
        // this.contatos.set(contatoNome, contato)
        // for (let fone of contato.getTeles()) {
        //         let cntt2 = this.contatos.get(contatoNome)
                  
        //         }
        //         return

    }
    public remove(nome: string) {
        if (this.contatos.has(nome)){
        this.contatos.delete(nome)
        }
        else { 
        console.log("contato nao encontrado")
        }
    }

    findContato(nome:string): Contato | undefined {
        if(this.contatos.has(nome)){
        return this.contatos.get(nome)
        }
        
        console.log("esse contato não existe") 
        
    }

    public toString(): string {
        let saida = "";
        for(let contatos of this.contatos.values()) {
            saida += `${contatos.toString()}\n`
        }
        return saida;
    }

    public findByPattern(pattern: string): Array<Contato> {
        let saida = new Array<Contato>();
        for(let contato of this.contatos.values()){
            if(contato.getNome().includes(pattern)){
                saida.push(contato);
            }
        }
        return saida;
    }
}

let agenda = new Agenda()
agenda.add("chico", [new Tele("vivo", "(85)882131"), new Tele("tim", "(11)389750")])
agenda.add("chico", [new Tele("laricel", "88224214")])
agenda.toString()


