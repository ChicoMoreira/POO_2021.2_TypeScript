class Tele {
    private tag: string;
    private number: string;
    constructor(tag: string, number: string) {
        this.tag = tag;
        this.number = number;
    }
    
    public toString(): string {
        return `${this.tag} - ${this.number}`;
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
    constructor(nome: string, teles:Array<Tele>) {
        this.nome = nome;
        this.teles = new Array<Tele>();
        for (let tele of teles) {
            this.addTele(tele);
        }
    }

    public toString(): string {
        let saida = this.nome + "\n";
        for(let i of this.teles) {
            saida += `[${this.teles.indexOf(i)}]${this.teles.toString()}${"\n"}`
        }
        return saida;
    }

    setFone(teles: Array<Tele>) {
        this.teles = [];
        for(let tele of teles) {
            this.addTele(tele);
        }
    }

    addTele(tele : Tele) : boolean {
        if( tele.isValid() == true) {
            this.teles.push(tele);
            return true;
        }
        else return false;
    }

    removeFone(index: number) {
        if (this.teles.length == 0) {
            console.log("lista vazia");
        }
        else if (index > this.teles.length) {
            console.log("posição não existe na lista");
        }
        this.teles.splice(index, 1);
    }
}

let ctt = new Contato("jober", []);
ctt.addTele(new Tele("claro", "(88)000000"));
ctt.addTele(new Tele("tim", "88-996677"));
ctt.addTele(new Tele("oi 2", "86773028"));
console.log(ctt.toString());


