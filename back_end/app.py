from flask import Flask,jsonify,request,send_file, blueprints
from flask_sqlalchemy import SQLAlchemy
from datetime import date
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from io import BytesIO
#from auth import auth
#--------------------- Packages for authentification page --------------
import json
from flask.wrappers import Response
from werkzeug.exceptions import abort
from werkzeug.utils import redirect
import google 
from flask_cors import CORS
from tokenize import generate_tokens
from urllib import request
import requests
from flask import Flask, session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import os,pathlib
import google.auth.transport.requests
from flask import Flask, request, json,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from sqlalchemy import insert
#--------------------------------------------------------



app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:''@localhost/tp_bdd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
#------------- configurations for auth ---------------------
app.secret_key = os.urandom(32)
app.config['SECRET_KEY'] = 'your secret key'
os.environ["OAUTHLIB_INSECURE_TRANSPORT"]="1"

GOOGLE_CLIENT_ID ="418126861632-1r2dbg7v8h4fu792sfnjmdr0i5r440rb.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent,"client_secret.json")
BACKEND_URL="http://127.0.0.1:5000"
FRONTEND_URL="http://localhost:3000/Profile"

flow = Flow.from_client_secrets_file(
    client_secrets_file = client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri = "http://127.0.0.1:5000/callback"
    )


#--------------------end configurations-------------------------




#app.register_blueprint(auth, url_prefix='/')

db=SQLAlchemy(app)
ma=Marshmallow(app)

#------------Utilisateurs------------
class table_utilisateurs(db.Model):
    Id_User=db.Column(db.Integer(),primary_key=True)
    Nom=db.Column(db.String(40))
    Prenom=db.Column(db.String(40))
    Email=db.Column(db.String(50))
    Adresse=db.Column(db.Integer())
    telephone=db.Column(db.String(10))
    Lien_Image =db.Column(db.String(255))


    def __init__(self,Nom, Prenom,Email,Adresse,telephone,Lien_Image):
        self.Nom=Nom
        self.Prenom=Prenom
        self.Email=Email
        self.Adresse=Adresse
        self.telephone=telephone
        self.Lien_Image=Lien_Image

       

class table_utilisateursSchema(ma.Schema):
    class Meta:
        fields=('Id_User','Nom', 'Prenom','Email','Adresse','telephone','Lien_Image')

table_utilisateur_schema=table_utilisateursSchema()
table_utilisateurs_schema=table_utilisateursSchema(many=True)
#---------------------------------------------
#--------------- authentification Part -----------------
#------------------------------------------

def login_is_required(function):
    def wrapper(*args ,**kwargs):
        if "google_id" not in session :
            return abort(401) # ne pas autoriser la connexion
        else:
            return function()
    return wrapper


#------------- Login with google account -------------------
@app.route("/login")
def login():
    # create a session 
   authorization_url, state = flow.authorization_url()
   session["state"] = state
   return Response(
        response=json.dumps({'auth_url':authorization_url}),
        status=200,
        mimetype='application/json'
    )


#-------------------------------- Authentification----------------------------------
@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    
    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["email"]=id_info.get('email')
    session["picture"]=id_info.get('picture')

    # rechercher l'utilisateur dans la bdd
    exists = db.session.query(db.session.query(table_utilisateurs).filter_by(Email=session['email']).exists()).scalar()
    # s'il existe on recupere son id 
    if ( exists):
        USER= table_utilisateurs.query.filter_by(Email=session["email"]).first()
        ID_USER=USER.Id_User
    #sinon on insere l'utilisateur dans la bdd
    else :
        user = table_utilisateurs(session["name"],session["name"],session["email"],10,10,session["picture"])
        db.session.add(user)
        db.session.commit()
        USER= table_utilisateurs.query.filter_by(Email=session["email"]).first()
        ID_USER=USER.Id_User
    
    return redirect(f"{FRONTEND_URL}/{ID_USER}")
    
    
# ------------------  logout -----------------
@app.route("/logout")
def logout():
    session.clear()
    return Response(
        response=json.dumps({"message":"Logged out"}),
        status=202,
        mimetype='application/json'
    )

#--------------------------End Auth Part--------------------------------

#-------------------------- Add Annonce Page + Profile Page ----------------------

#class wilaya:
class Wilayas(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    code=db.Column(db.Integer())
    nom=db.Column(db.String(255))

    def __init__(self,code,nom):
        self.code=code
        self.nom=nom

class WilayasSchema(ma.Schema):
    class Meta:
        fields=('id','code','nom')

wilaya_schema=WilayasSchema()
wilayas_schema=WilayasSchema(many=True)

@app.route('/getwilaya',methods=['GET'])
def get_wilayas():
    all_wilayas=Wilayas.query.all()
    results=wilayas_schema.dump(all_wilayas)
    return jsonify(results)


#class commune:
class Communes(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    code_postal=db.Column(db.Integer())
    nom=db.Column(db.String(255))
    wilaya_id=db.Column(db.INTEGER())

    def __init__(self,code_postal,nom,wilaya_id):
        self.code=code_postal
        self.nom=nom
        self.wilaya_id=wilaya_id

class CommunesSchema(ma.Schema):
    class Meta:
        fields=('id','code_postal','nom','id_wilaya')

commune_schema=CommunesSchema()
communes_schema=CommunesSchema(many=True)

@app.route('/getcommunes/<id>',methods=['GET'])
def get_communes(id):
    communes=Communes.query.filter_by(wilaya_id=id).order_by(Communes.nom.asc()) # asc
    results=communes_schema.dump(communes)
    return jsonify(results)

@app.route('/getcommune/<id>',methods=['GET'])
def get_commune(id):
    commune=Communes.query.get(id)
    return commune_schema.jsonify(commune)

#classe catégorie:
class Categorie(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    nom=db.Column(db.String(255))

    def __init__(self,nom):
        self.nom=nom
 
class CategorieSchema(ma.Schema):
    class Meta:
        fields=('id','nom')

categorie_schema=CategorieSchema()
categories_schema=CategorieSchema(many=True)

@app.route('/getcategories',methods=['GET'])
def get_categories():
    all_categories=Categorie.query.all()
    results=categories_schema.dump(all_categories)
    return jsonify(results)

@app.route('/getcategorie/<id>',methods=['GET'])
def get_categorie(id):
    categorie=Categorie.query.get(id)
    return categorie_schema.jsonify(categorie)
    
#classe type bien immobilier
class Type_bien_immobilier(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    nom=db.Column(db.String(255))

    def __init__(self,nom):
        self.nom=nom

class Type_bien_immobilierSchema(ma.Schema):
    class Meta:
        fields=('id','nom')

Type_bien_immobilier_schema=WilayasSchema()
Types_bien_immobilier_schema=WilayasSchema(many=True)

@app.route('/get_Types_bien_immobilier',methods=['GET'])
def get_types_bien_immobilier():
    all_types=Type_bien_immobilier.query.all()
    results=Types_bien_immobilier_schema.dump(all_types)
    return jsonify(results)

@app.route('/get_Type_bien_immobilier/<id>',methods=['GET'])
def get_type_bien_immobilier(id):
    type=Type_bien_immobilier.query.get(id)
    return Type_bien_immobilier_schema.jsonify(type)

#class Annonce:
class Annonce(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    id_categorie=db.Column(db.Integer())
    id_type_bien_immobilier=db.Column(db.Integer())
    surface=db.Column(db.Float())
    prix=db.Column(db.Float())
    id_commune=db.Column(db.Integer())
    address=db.Column(db.String(255))
    description=db.Column(db.Text())
    date_creation=db.Column(db.Date(),default=date.today())
    heure_creation=db.Column(db.DateTime(),default=datetime.datetime.now)
    id_utilisateur=db.Column(db.Integer())
    num_tlp=db.Column(db.String(10))
    def __init__(self,id_categorie,id_type_bien_immobilier,surface,prix,id_commune,address,description,id_utilisateur,num_tlp):
        self.id_categorie=id_categorie
        self.id_type_bien_immobilier=id_type_bien_immobilier
        self.surface=surface
        self.prix=prix
        self.id_commune=id_commune
        self.address=address
        self.description=description
        self.id_utilisateur=id_utilisateur
        self.num_tlp=num_tlp

class AnnonceSchema(ma.Schema):
    class Meta:
        fields=('id','id_categorie','id_type_bien_immobilier','surface','prix','id_commune','address','description','date_creation','heure_creation','id_utilisateur','num_tlp')

annonce_schema=AnnonceSchema()
annonces_schema=AnnonceSchema(many=True)


@app.route('/get_annonce',methods=['GET'])
def get_Annonces():
    all_Annonces=Annonce.query.all()
    results=annonces_schema.dump(all_Annonces)
    return jsonify(results)


@app.route('/get_annonce/<id>',methods=['GET'])
def get_annonce(id):
    annonces=Annonce.query.filter_by(id_utilisateur=id)
    results=annonces_schema.dump(annonces)
    return jsonify(results)


@app.route('/add',methods=['POST'])
def add_Annonces():
    id_categorie=Categorie.query.filter_by(nom=request.json['categorie']).first().id
    id_type_bien_immobilier=Type_bien_immobilier.query.filter_by(nom=request.json['type_bien']).first().id
    surface=request.json['surface']
    prix=request.json['prix']
    id_commune=Communes.query.filter_by(nom=request.json['commune']).first().id
    address=request.json['address']
    description=request.json['description']
    id_utilisateur=request.json['id_user']
    num_tlp=request.json['num_tlp']
    annonce=Annonce(id_categorie, id_type_bien_immobilier, surface, prix, id_commune, address, description, id_utilisateur, num_tlp)
    db.session.add(annonce)
    db.session.commit()
    return annonce_schema.jsonify(annonce)

    
@app.route('/delete_annonce/<id>/',methods=['DELETE'])
def delete_Annonce(id):
    annonce=Annonce.query.get(id)
    db.session.delete(annonce)
    db.session.commit()
    return annonce_schema.jsonify(annonce)

#class images:
class Images(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    data = db.Column(db.LargeBinary(),nullable=False)
    nom = db.Column(db.String(50), nullable=False)
    mimetype = db.Column(db.Text(), nullable=False)
    id_annonce = db.Column(db.Integer())

class ImagesSchema(ma.Schema):
    class Meta:
        fields=('id','data','nom','mimtype','id_annonce')

image_schema=ImagesSchema()
images_schema=ImagesSchema(many=True)

@app.route('/upload/<id>', methods=['POST'])
def upload(id):
    pic = request.files['pic']
    if not pic:
        return 'No pic uploaded!', 400
    
    img = Images(data=pic.read(), nom=pic.filename, mimetype=pic.mimetype,id_annonce=id)
    db.session.add(img)
    db.session.commit()

    return 'Img Uploaded!', 200


@app.route('/getimage/<id>',methods=['GET'])
def get_img(id):
    img = Images.query.filter_by(id_annonce=id).first()
    if not img:
        img = Images.query.get(0)
        return send_file(BytesIO(img.data),mimetype=img.mimetype,download_name=img.nom)

    return send_file(BytesIO(img.data),mimetype=img.mimetype,download_name=img.nom)

@app.route('/delete_image/<id>/',methods=['DELETE'])
def delete_Images(id):
    img=Images.query.filter_by(id_annonce=id).first()
    db.session.delete(img)
    db.session.commit()
    return 'Done',200

@app.route('/get_utilidateur/<id>',methods=['GET'])
def get_utilisateur(id):
    user=table_utilisateurs.query.get(id)
    return table_utilisateur_schema.jsonify(user)

if __name__ == "__main__":
     app.run(debug=True)
