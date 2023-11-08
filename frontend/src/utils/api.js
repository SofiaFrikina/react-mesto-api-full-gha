

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка')
        // return Promise.reject(new Error('Произошла ошибка.'))
    };

    setToken(token) {
        this._headers.authorization = `Bearer ${token}`;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._handleResponse)
    };
    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
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

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
            }).then(this._handleResponse)
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
            }).then(this._handleResponse)
        }
    }
    /*likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._handleResponse)
    };
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,

        })
            .then(this._handleResponse)
    };*/

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
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
        "Content-Type": "application/json",
    },
})

export default api;