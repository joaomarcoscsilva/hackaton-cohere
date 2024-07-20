# InterText

## Equipe Tokenizers

* Carlos Filipe de Castro Lemos
* João Marcos Cardoso da Silva
* Jorge Luiz Franco
* Lucas Vizzotto de Castro

## Descrição do programa

O programa InterText, desenvolvido para o Hackathon da Cohere, teve o objetivo de trabalhar a ideia da intertextualidade combinada com a temática da música. Ele recebe como entrada uma letra de música ou o seu contexto, entendido como trechos da música. Após o processamento, ele retorna outras mídias relacionadas, tais como músicas, filmes, artigos da Wikipedia e livros.

## Limitações do repositório

Há uma limitação de tamanho de arquivo no github, e por isso não foi possível subir os arquivos .csv, já que o mesmo é muito grande. Por isso, foi incluído um arquivo "sample_embeddings.csv", com estrutura idêntica ao utilizado na aplicação. Os embeddings(vetores extraídos) foram gerados com o modelo embed-english-2.0.

## Uso

Para testar o site, execute o seguinte comando:

```bash
python3 server.py
```

## Funcionamento

Inicialmente, é realizada uma sumarização da letra da música através da API Summarize da Cohere. Esse sumário é imediatamente mostrado ao usuário e é usado nas demais requisições ao servidor.

### Artigos da Wikipedia

Para a listagem dos artigos relacionados, um par de requisições à api Chat é usada para listar possíveis páginas da wikipédia relacionadas ao tema do sumário da música, em um formato estrito de lista. Um parsing é feito para extrair os nomes das páginas e as mesmas são baixadas através da API da Wikipedia. Por fim, cada página sugerida é sumarizada e as melhores páginas (em proximidade de seus embeddings ao embedding do sumário) são exibidas.

### Livros e Filmes

Para a listagem de livros e filmes, é feita uma requisição à API Chat para listar possíveis livros e filmes relacionados ao tema do sumário da música, juntamente com seus resumos. Ambos são listados em uma única requisição. Um parsing é feito para extrair os nomes dos livros e filmes. Por fim, a API Embeddings é usada para selecionar as opções mais relevantes.

### Músicas

Para a listagem de músicas relacionadas, o embedding do sumário é comparado a uma base pré-computada de embeddings de letras, sendo a melhor selecionada. As letras da base estão muito ruins, então a API Chat é usada para reconstruir a letra original usando a Retrieval-Augmented Generation.
