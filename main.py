# Importa as funções principais do Flask
from flask import Flask, render_template, request, redirect, flash

# Importa o SQLite para usar banco de dados local
import sqlite3


# Cria a aplicação Flask
app = Flask(__name__)

# Chave secreta necessária para usar mensagens flash
# (usada para segurança interna do Flask)
app.secret_key = "segredo_super_secreto"


# FUNÇÃO DE CONEXÃO COM O BANCO DE DADOS #
def conectar():
    """
    Cria e retorna uma conexão com o banco de dados SQLite.
    O row_factory permite acessar os dados pelo nome da coluna.
    Exemplo: turma["nome"] em vez de turma[0]
    """
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn


# ROTA PRINCIPAL (HOME) #
@app.route("/")
def home():
    """
    Renderiza a página inicial do sistema.
    """
    return render_template("index.html")


# CRIAÇÃO DA TABELA (CASO NÃO EXISTA) # 
def criar_tabela():
    """
    Cria a tabela 'turmas' no banco de dados
    apenas se ela ainda não existir.
    """
    conn = conectar()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS turmas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único automático
            nome TEXT,                             -- Nome da turma
            ano_letivo INTEGER,                    -- Ano letivo
            serie_etapa TEXT,                      -- Série ou etapa
            turno TEXT,                            -- Turno (Matutino/Vespertino/Noturno)
            modalidade TEXT,                       -- Modalidade de ensino
            numero_alunos INTEGER,                 -- Quantidade de alunos
            professor_regente TEXT,                -- Professor responsável
            numero_sala INTEGER                    -- Número da sala
        )
    """)

    conn.commit()  # Salva as alterações
    conn.close()   # Fecha a conexão


# Executa a criação da tabela ao iniciar o sistema
criar_tabela()


# LISTAR TODAS AS TURMAS # 
@app.route("/turmas")
def listar_turmas():
    """
    Busca todas as turmas cadastradas no banco
    e envia para a página turmas.html
    """
    conn = conectar()

    turmas = conn.execute("SELECT * FROM turmas").fetchall()

    conn.close()

    return render_template("turmas.html", turmas=turmas)


# CADASTRAR NOVA TURMA # 
@app.route("/cadastrar_turma", methods=["GET", "POST"])
def cadastrar_turma():
    """
    GET  -> Mostra o formulário
    POST -> Salva os dados no banco
    """
    if request.method == "POST":

        # Captura os dados enviados pelo formulário
        nome = request.form["nome"]
        ano_letivo = request.form["ano_letivo"]
        serie_etapa = request.form["serie_etapa"]
        turno = request.form["turno"]
        modalidade = request.form["modalidade"]
        numero_alunos = request.form["numero_alunos"]
        professor_regente = request.form["professor_regente"]
        numero_sala = request.form["numero_sala"]

        conn = conectar()

        # Insere os dados no banco usando parâmetros (evita SQL Injection)
        conn.execute("""
            INSERT INTO turmas 
            (nome, ano_letivo, serie_etapa, turno, modalidade, numero_alunos, professor_regente, numero_sala)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (nome, ano_letivo, serie_etapa, turno, modalidade, numero_alunos, professor_regente, numero_sala))

        conn.commit()
        conn.close()

        # Redireciona para a lista de turmas
        return redirect("/turmas")

    # Se for GET, apenas mostra o formulário
    return render_template("cadastrar_turma.html")


# ROTA PARA DELETAR TURMA #
@app.route("/deletar_turma/<int:id>")
# Define a rota que recebe o ID da turma pela URL
# Exemplo: /deletar_turma/5

def deletar_turma(id):
    # Recebe o ID da turma que será deletada

    conn = conectar()
    # Abre conexão com o banco de dados

    conn.execute("DELETE FROM turmas WHERE id = ?", (id,))
    # Executa comando SQL para deletar a turma com o ID informado

    conn.commit()
    # Salva a alteração no banco

    conn.close()
    # Fecha conexão com o banco

    flash("Turma deletada com sucesso!", "sucesso")

    return redirect("/turmas?deletado=1")
    # Redireciona para a página de turmas
    # Passa parâmetro na URL para mostrar mensagem de sucesso


# ROTA PARA EDITAR TURMA # 

@app.route("/editar_turma/<int:id>", methods=["GET", "POST"])
# Define rota para editar turma
# Aceita dois métodos:
# GET → mostrar formulário
# POST → salvar alterações

def editar_turma(id):

    conn = conectar()
    # Abre conexão com banco

    if request.method == "POST":
        # Se o formulário foi enviado

        nome = request.form["nome"]
        # Pega valor do campo nome

        ano_letivo = request.form["ano_letivo"]
        # Pega ano letivo digitado

        serie_etapa = request.form["serie_etapa"]
        # Pega série ou etapa

        turno = request.form["turno"]
        # Pega turno

        modalidade = request.form["modalidade"]
        # Pega modalidade

        numero_alunos = request.form["numero_alunos"]
        # Pega número de alunos

        professor_regente = request.form["professor_regente"]
        # Pega nome do professor

        numero_sala = request.form["numero_sala"]
        # Pega número da sala

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
        """, (nome, ano_letivo, serie_etapa, turno, modalidade,
            numero_alunos, professor_regente, numero_sala, id))
        # Executa atualização no banco usando parâmetros seguros

        conn.commit()
        # Salva alterações

        conn.close()
        # Fecha conexão

        return redirect("/turmas?sucesso=1")
        # Redireciona para lista com mensagem de sucesso


    # Se for método GET (primeira vez abrindo edição)

    turma = conn.execute(
        "SELECT * FROM turmas WHERE id = ?", (id,)
    ).fetchone()
    # Busca os dados da turma no banco

    conn.close()
    # Fecha conexão

    return render_template("editar_turma.html", turma=turma)
    # Envia os dados para o HTML preencher o formulário


#--------------------------------SERVIDORES-------------------------------------------------------#

# CRIAÇÃO DA TABELA SERVIDORES # 

def criar_tabela_servidores():
    """
    Cria a tabela 'servidores' caso ela ainda não exista.
    """

    conn = conectar()  # Abre conexão com o banco

    conn.execute("""
        CREATE TABLE IF NOT EXISTS servidores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID automático
            nome TEXT,                             -- Nome do servidor
            cpf TEXT,                              -- CPF
            email TEXT,                            -- Email
            endereco TEXT,                         -- Endereço
            estado TEXT,                           -- Estado
            cidade TEXT,                           -- Cidade
            genero TEXT,                           -- Gênero
            telefone TEXT,                         -- Telefone
            cargo TEXT,                            -- Cargo
            data_ingresso TEXT                     -- Data de ingresso
        )
    """)

    conn.commit()  # Salva alterações
    conn.close()   # Fecha conexão


# Executa ao iniciar o sistema
criar_tabela_servidores()


# LISTAR SERVIDORES # 

@app.route("/servidores")
def listar_servidores():
    """
    Busca todos os servidores cadastrados
    e envia para servidores.html
    """

    conn = conectar()  # Conecta ao banco

    servidores = conn.execute(
        "SELECT * FROM servidores"
    ).fetchall()

    conn.close()

    return render_template(
        "servidores.html",
        servidores=servidores
    )


# CADASTRAR SERVIDOR # 

@app.route("/cadastrar_servidores", methods=["GET", "POST"])
def cadastrar_servidor():

    if request.method == "POST":

        # Captura dados do formulário
        nome = request.form["nome"]

        cpf = request.form["cpf"]

        email = request.form["email"]

        endereco = request.form["endereco"]

        estado = request.form["estado"]

        cidade = request.form["cidade"]

        genero = request.form["genero"]

        telefone = request.form["telefone"]

        cargo = request.form["cargo"]

        data_ingresso = request.form["data"]

        conn = conectar()

        # Insere no banco
        conn.execute("""
            INSERT INTO servidores
            (nome, 
            cpf, 
            email, 
            endereco, 
            estado, 
            cidade, 
            genero, 
            telefone, 
            cargo, 
            data_ingresso)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (nome, cpf, email, endereco, estado, cidade,
              genero, telefone, cargo, data))


        conn.commit()
        conn.close()

        return redirect("/servidores")

    return render_template("cadastrar_servidores.html")


# EDITAR SERVIDOR #

@app.route("/editar_servidores/<int:id>", methods=["GET", "POST"])
def editar_servidor(id):

    conn = conectar()

    if request.method == "POST":

        nome = request.form["nome"]

        cpf = request.form["cpf"]

        email = request.form["email"]

        endereco = request.form["endereco"]

        estado = request.form["estado"]

        cidade = request.form["cidade"]

        genero = request.form["genero"]

        telefone = request.form["telefone"]

        cargo = request.form["cargo"]

        data_ingresso = request.form["data"]

        conn.execute("""
            UPDATE servidores SET
            nome = ?, 
            cpf = ?, 
            email = ?, 
            endereco = ?, 
            estado = ?,
            cidade = ?, 
            genero = ?, 
            telefone = ?, 
            cargo = ?, 
            data_ingresso = ?
            WHERE id = ?
        """, (nome, cpf, email, endereco, estado, cidade, 
              genero, telefone, cargo, id))

        conn.commit()
        conn.close()

        return redirect("/servidores")

    servidor = conn.execute(
        "SELECT * FROM servidores WHERE id = ?",
        (id,)
    ).fetchone()

    conn.close()

    return render_template("editar_servidores.html", servidor=servidor)


# DELETAR SERVIDOR #

@app.route("/deletar_servidores/<int:id>")
def deletar_servidor(id):
    conn = conectar()
    # Abre conexão com o banco de dados

    conn.execute("DELETE FROM servidores WHERE id = ?", (id,))
    # Executa comando SQL para deletar o servidor com o ID informado

    conn.commit()
    # Salva a alteração no banco

    conn.close()
    # Fecha conexão com o banco

    flash("Servidor deletado com sucesso!", "sucesso")

    return redirect("/servidores?deletado=1")
    # Redireciona para a página de servidores
    # Passa parâmetro na URL para mostrar mensagem de sucesso


# EXECUTA O SERVIDOR #
if __name__ == "__main__":
    # debug=True permite atualizar automaticamente ao salvar
    app.run(debug=True)
