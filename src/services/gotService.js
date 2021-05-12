export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`не могу получить данные из ${url}, статус ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResourse('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter);
  }
  getCharacter = async (id) => {
    const char = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(char);
  }

  getAllHouses = async () => {
    const res = await this.getResourse('/houses');
    return res.map(this._transformHouse);
  }
  getHouse = async (id) => {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  }

  getAllBooks = async () => {
    const res = await this.getResourse('/books');
    return res.map(this._transformBook);
  }
  getBook = async (id) => {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBook(book);
  }

  isSet(data) {
    if (data) {
      return data
    } else {
      return 'no data :('
    }
  }

  _addId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter = (char) => {
    return {
      id: this._addId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
    };
  }

  _transformHouse = (house) => {
    return {
      id: this._addId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
    };
  }

  _transformBook = (book) => {
    return {
      id: this._addId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: this.isSet(book.released)
    };
  }
}

const got = new GotService();