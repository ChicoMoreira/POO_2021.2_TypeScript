class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;
    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        //return "Grafite: " + this.calibre + ":" + this.dureza + ":" + this.tamanho;
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

class Lapiseira {
    private calibre: number;
    private ponta: null | Grafite;
    private barril: Array<Grafite | null>;
    constructor(calibre: number) { 
        this.calibre = calibre;
        this.ponta = null;
        this.barril = new Array()
    }

    setPonta(novaponta: Grafite | null) {
        this.ponta = novaponta
    }

    setGrafite(grafite: Grafite): boolean {
        if (this.ponta != null) {
            console.log("A lapiseira já possui um grafite");
            return false;
        }
        if (grafite.calibre != this.calibre) {
            console.log("O grafite não é compatível com a lapiseira");
            return false;
        }
        this.barril.push(grafite)
        return true;
    }

    empurrar(): boolean {
        if (this.barril !== null) {
            this.setPonta(this.barril[0])
            this.barril.shift()
            console.log("grafite empurrado")
            return true
        }
        return false
    }

    removerGrafite(): Grafite | null {
        if (this.ponta == null) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }
        let grafite = this.ponta;
        this.ponta = null;
        return grafite;
    }

    escrever(folhas: number): boolean {
        if (this.ponta == null) {
            console.log("A lapiseira não possui um grafite");
            return false;
        }
        let gasto = this.ponta.gastoPorFolha() * folhas;
        if (gasto <= this.ponta.tamanho) {
            console.log("Escrita concluida");
            this.ponta.tamanho -= gasto;
        } else {
            let realizado = this.ponta.tamanho / this.ponta.gastoPorFolha()
            console.log("Escrita parcial: " + realizado + " folhas");
            this.ponta.tamanho = 0;
        }
        if (this.ponta.tamanho == 0) {
            this.ponta = null;
        }        
        return true
    }

    toString() {
        return `Lapiseira\ncalibre: ${this.calibre}, bico: (${this.ponta}),\nbarril: {${this.barril}}`
    }
}

let pentel = new Lapiseira(0.5);
pentel.setGrafite(new Grafite(0.5, "HB", 40));
pentel.setGrafite(new Grafite(1.0, "2B", 30))
pentel.setGrafite(new Grafite(0.5, "4B", 30))
console.log(pentel.toString());
pentel.empurrar()
pentel.escrever(10);
pentel.escrever(40);
console.log(pentel.toString());
