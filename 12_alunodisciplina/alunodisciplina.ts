class Aluno {
    private nome: string;
    private disciplinas: Map<string, Disciplina>;
    constructor(nome: string) {
        this.nome = nome;
        this.disciplinas = new Map<string, Disciplina>();
    }
    public getNome(): string {
        return this.nome;
    }
    public addDisciplina(disciplina: Disciplina): void {
        let chave = disciplina.getNome();
        if (this.disciplinas.has(chave))
            return;
        this.disciplinas.set(chave, disciplina);
        disciplina.addAluno(this);
    }
 
    
    
    public toString(): string {
        let keys = this.disciplinas.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }



}

class Disciplina {
    private nome: string;
    private alunos: Map<string, Aluno>;
    constructor(nome: string) {
        this.nome = nome;
        this.alunos = new Map<string, Aluno>();
    }
    public getNome(): string {
        return this.nome;
    }
    public addAluno(aluno: Aluno): void {
        let chave = aluno.getNome();
        if (this.alunos.has(chave))
            return;
        this.alunos.set(chave, aluno);
        aluno.addDisciplina(this);
    }
 
    public toString(): string {
        let keys = this.alunos.keys();
        return this.nome + " [" + [...keys].join(", ") + "]";
    }
}
 
let david = new Aluno("David");
let poo = new Disciplina("POO");
let fup = new Disciplina("FUP");
 
david.addDisciplina(poo);
david.addDisciplina(fup);
 
console.log("" + david);
console.log("" + poo);
console.log("" + fup);
 