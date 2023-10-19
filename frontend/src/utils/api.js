

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers['authorization'];
    }
    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка')
        // return Promise.reject(new Error('Произошла ошибка.'))
    };
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                method: 'GET',
                authorization: this._authorization
            }
        })
            .then(this._handleResponse)
    };
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                method: 'GET',
                authorization: this._authorization
            }
        })
            .then(this._handleResponse)
    };
    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._handleResponse)
    };
    addCards(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._handleResponse)
    };
    likeCard(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._handleResponse)
    };
    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,

        })
            .then(this._handleResponse)
    };
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._handleResponse)
    };
    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._handleResponse)
    }
}

const api = new Api({
    url: 'https://api.sofia.frikina.nomoredomainsrocks.ru',
    headers: {
        authorization: 'c6851ead-6953-413a-a6ee-14ef0893ecb7',
        'Content-Type': 'application/json'
    }
})

export default api;