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


    public add (contato : Contato): void {
        if (this.contatos.has(contato.getNome())){
           // this.contatos.get(contato.getNome()).addTele();   
           for(let fone of contato.getTeles()){
            let cntt = this.contatos.get(contato.getNome());
            cntt!.addTele(fone);
           }
        }
        else {
           this.contatos.set(contato.getNome(), contato)
            
        }
    }

    public remove(nome: string): void {
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

    toString(): string {
        let str = "";
        for (let contact of this.contatos.values()){
            str += contact.toString();
            str +="\n";
        }
        return str;
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


let vai = new Agenda();
let tele1 = new Tele("claro" , "888888" )
let chico = new Contato("chico", [tele1])
vai.add(chico)
vai.add(new Contato("airton", [new Tele("oi", "881199"), new Tele("claro", "990909")]))
vai.add(new Contato("josué", [new Tele("oi", "881199"), new Tele("claro", "99090+SFJ9")]))
console.log(vai.toString());
vai.remove("chico")
vai.remove("clebisvaldo")
console.log(vai.toString());
console.log(vai.findContato("josué"))
console.log(vai.findContato("josaías"))
console.log(vai.findByPattern("o"))


