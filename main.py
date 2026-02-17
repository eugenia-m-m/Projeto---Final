from flask import Flask, render_template, request, redirect, flash
import sqlite3

app = Flask(__name__)

app.secret_key = "segredo_super_secreto"

# Função para conectar ao banco de dados
def conectar():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

# Criar tabela de turmas (se não existir)
def criar_tabela():
    conn = conectar()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS turmas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            ano_letivo INTEGER,
            serie_etapa TEXT,
            turno TEXT,
            modalidade TEXT,
            numero_alunos INTEGER,
            professor_regente TEXT,
            numero_sala INTEGER
        )
    """)
    conn.commit()
    conn.close()

criar_tabela()


@app.route("/turmas")
def listar_turmas():
    conn = conectar()
    turmas = conn.execute("SELECT * FROM turmas").fetchall()
    conn.close()
    return render_template("turmas.html", turmas=turmas)

@app.route("/cadastrar_turma", methods=["GET", "POST"])
def cadastrar_turma():
    if request.method == "POST":
        nome = request.form["nome"]
        ano_letivo = request.form["ano_letivo"]
        serie_etapa = request.form["serie_etapa"]
        turno = request.form["turno"]
        modalidade = request.form["modalidade"]
        numero_alunos = request.form["numero_alunos"]
        professor_regente = request.form["professor_regente"]
        numero_sala = request.form["numero_sala"]

        conn = conectar()
        conn.execute("""
            INSERT INTO turmas 
            (nome, ano_letivo, serie_etapa, turno, modalidade, numero_alunos, professor_regente, numero_sala)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (nome, ano_letivo, serie_etapa, turno, modalidade, numero_alunos, professor_regente, numero_sala))

        conn.commit()
        conn.close()

        return redirect("/turmas")

    return render_template("cadastrar_turma.html")

@app.route("/deletar_turma/<int:id>")
def deletar_turma(id):
    conn = conectar()
    conn.execute("DELETE FROM turmas WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    flash("Turma deletada com sucesso!", "deletado")
    return redirect("/turmas")


@app.route("/editar_turma/<int:id>", methods=["GET", "POST"])
def editar_turma(id):
    conn = conectar()

    if request.method == "POST":
        nome = request.form["nome"]
        ano_letivo = request.form["ano_letivo"]
        serie_etapa = request.form["serie_etapa"]
        turno = request.form["turno"]
        modalidade = request.form["modalidade"]
        numero_alunos = request.form["numero_alunos"]
        professor_regente = request.form["professor_regente"]
        numero_sala = request.form["numero_sala"]

        conn.execute("""
            UPDATE turmas SET
            nome = ?,
            ano_letivo = ?,
            serie_etapa = ?,
            turno = ?,
            modalidade = ?,
            numero_alunos = ?,
            professor_regente = ?,
            numero_sala = ?
            WHERE id = ?
        """, (nome, ano_letivo, serie_etapa, turno, modalidade, numero_alunos, professor_regente, numero_sala, id))

        conn.commit()
        conn.close()

        flash("Turma atualizada com sucesso!", "sucesso")
        return redirect("/turmas?sucesso=1")


    turma = conn.execute("SELECT * FROM turmas WHERE id = ?", (id,)).fetchone()
    conn.close()
    return render_template("editar_turma.html", turma=turma)


if __name__ == "__main__":
    app.run(debug=True)


