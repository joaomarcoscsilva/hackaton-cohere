import flask
import json

import generate, embed

app = flask.Flask(__name__) 

@app.route('/')
def index():
    """
    Return the index page.
    """

    return flask.render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    """
    Summarize the song.
    """
    
    data = flask.request.json

    ret = f'{{"summary": "{generate.summarize(data["title"], data["lyrics"])}"}}'
    print(ret)

    return ret

@app.route('/books', methods=['POST'])
def books():
    """
    Get the related books.
    """

    data = flask.request.json

    ret = f'{{"books": {json.dumps(generate.get_related_books(data["summary"]))}}}'
    print(ret)

    return ret

@app.route('/movies', methods=['POST'])
def movies():
    """
    Get the related movies.
    """

    data = flask.request.json

    ret = f'{{"movies": {json.dumps(generate.get_related_movies(data["summary"]))}}}'
    print(ret)

    return ret

@app.route('/articles', methods=['POST'])
def articles():
    """
    Get the related articles.
    """

    data = flask.request.json

    ret = f'{{"articles": {json.dumps(generate.get_wikipedia_articles(data["summary"]))}}}'
    print(ret)

    return ret

@app.route('/songs', methods=['POST'])
def songs():
    """
    Get the related songs.
    """

    data = flask.request.json
    ret = f'{{"song": {json.dumps(embed.regenerate_song(data["summary"]))}}}'
    print(ret)
    return ret


# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0')