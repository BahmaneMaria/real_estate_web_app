export default class APIService {
  static GetWilayas() {
    return fetch('http://127.0.0.1:5000/getwilaya', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetCommunes(id) {
    return fetch(`http://127.0.0.1:5000/getcommune/${id}`, {
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
  static GetCategorie() {
    return fetch('http://127.0.0.1:5000/getcategorie', {
      'method': 'GET',
      headers: { 'Content-Type': 'applications/json' }
    }).then(resp => resp.json())
  }
  static GetAnnonce() {
    return fetch('http://127.0.0.1:5000/get_annonce', {
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
  static AddImage(data,id){
    return fetch(`http://127.0.0.1:5000/upload/${id}`, {
      method: ['POST'],
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
}
}