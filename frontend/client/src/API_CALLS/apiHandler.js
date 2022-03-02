
const API = "https://gdschackathon.herokuapp.com/api";

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

export const ngosignup = user => {
    return fetch(`${API}/ngosignup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const ngosignin = user => {
    return fetch(`${API}/ngosignin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}


export const authenticate = (data, next) => {
    if (typeof Window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof Window == "undefined") {
        return false
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const createPlace = (userId, token, file) => {
    return fetch(`${API}/createPlace/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: file
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getPlaces = () => {
    return fetch(`${API}/places`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const getNgos = () => {
    return fetch(`${API}/getNgos`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updatePlace = (placeId, userId, token) => {
    return fetch(`${API}/linkNgoWithPlace/${placeId}/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getPlaceByNgo = (userId, token) => {
    return fetch(`${API}/getPlacesByNgo/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const workDoneByNgo = (placeId, userId, token) => {
    return fetch(`${API}/workDoneByNgo/${placeId}/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const getPlaceByUser = (userId, token) => {
    return fetch(`${API}/getPlacesByUserId/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
export const workDoneOfPlace = (placeId, userId, token) => {
    return fetch(`${API}/workDoneOfPlace/${placeId}/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}