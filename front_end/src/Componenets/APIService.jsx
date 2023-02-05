export default class APIService {
  static GetWilayas() {
    return fetch('http://127.0.0.1:5000/getwilaya', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetCommunes(id) {
    return fetch(`http://127.0.0.1:5000/getcommunes/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetTypeBienImmobilier() {
    return fetch('http://127.0.0.1:5000/get_Types_bien_immobilier', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetCategories() {
    return fetch('http://127.0.0.1:5000/getcategories', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetAllAnnonce() {
    return fetch('http://127.0.0.1:5000/get_annonce', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetAnnonce(id) {
    return fetch(`http://127.0.0.1:5000/get_annonce/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetFullAnnonce(id) {
    return fetch(`http://127.0.0.1:5000/get_full_annonce/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static AddAnnonce(body) {
    return fetch('http://127.0.0.1:5000/add', {
      'method': 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }
  static AddImage(data, id,num) {
    return fetch(`http://127.0.0.1:5000/upload/${id}/${num}`, {
      method: ['POST'],
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }
  static GetCommune(id) {
    return fetch(`http://127.0.0.1:5000/getcommune/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.json())
  }
  static GetType(id) {
    return fetch(`http://127.0.0.1:5000/get_Type_bien_immobilier/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.json())
  }
  static GetCategorie(id) {
    return fetch(`http://127.0.0.1:5000/getcategorie/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.json())
  }
  static GetUtilisateur(id) {
    return fetch(`http://127.0.0.1:5000/get_utilidateur/${id}`, {
      'method': 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.json())
  }
  static DeleteAnnonce(id) {
    return fetch(`http://127.0.0.1:5000/delete_annonce/${id}/`, {
      'method': 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(resp => resp.json())
  }
  static DeleteImages(id) {
    return fetch(`http://127.0.0.1:5000/delete_image/${id}/`, {
      'method': 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }
  static UpdateUser(id, body) {
    return fetch(`http://127.0.0.1:5000/update_user/${id}`, {
        'method': 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(body)
    }).then(resp=>resp.json())
}
static GetWilaya(id) {
  return fetch(`http://127.0.0.1:5000/getwilaya/${id}`, {
    'method': 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(resp => resp.json())
}}