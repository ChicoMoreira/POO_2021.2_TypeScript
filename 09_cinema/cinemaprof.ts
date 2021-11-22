class Person {
    id : String;
    fone : Number;
    constructor(id : String, fone : Number){
        this.id = id;
        this.fone = fone;
    }
}

class Cinema {
    fileira : Array <Person | null>
    constructor(qtdCadeiras:Number){
        this.fileira = []
        for (let i= 0;i < qtdCadeiras;i++){
            this.fileira.push(null)
        }
    }

    //retorna -1 se não encontrar
    indexOf(id: String): number {
        return this.fileira.findIndex(c => c != null && c.id == id);
        // for (let i = 0; i < this.fileira.length; i++)
        //     if (this.fileira[i] != null && this.fileira[i].id == id)
        //         return i;
        // return -1;
    }

    reservar(Person: Person, posicao: number): boolean {
        if (posicao < 0 || posicao > this.fileira.length) {
            console.log("Essa cadeira não existe!")
            return false;
        }
        if (this.fileira[posicao] != null) {
            console.log("Essa cadeira já está reservada!")
            return false;
        }
        if (this.indexOf(Person.id) != -1) {
            console.log("Você já está reservando uma cadeira!")
            return false;
        }
        this.fileira[posicao] = Person;
        return true;
    }

    cancelar(id: string): boolean {
        let posicao = this.indexOf(id);
        if (posicao == -1) {
            this.fileira[posicao] = null;
            return true;
        }
        return false;
    }
}
