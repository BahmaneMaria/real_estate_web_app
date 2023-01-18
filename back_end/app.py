from flask import Flask,jsonify,request,send_file
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from werkzeug.utils import secure_filename
from io import BytesIO



app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:''@localhost/tp_bdd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)
ma=Marshmallow(app)

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
        self.code=code
        self.nom=nom
        self.wilaya_id=wilaya_id

class CommunesSchema(ma.Schema):
    class Meta:
        fields=('id','code_postal','nom','id_wilaya')

commune_schema=CommunesSchema()
communes_schema=CommunesSchema(many=True)

@app.route('/getcommune/<id>',methods=['GET'])
def get_communes(id):
    communes=Communes.query.filter_by(wilaya_id=id)
    results=communes_schema.dump(communes)
    return jsonify(results)



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

@app.route('/getcategorie',methods=['GET'])
def get_categorie():
    all_categories=Categorie.query.all()
    results=categories_schema.dump(all_categories)
    return jsonify(results)

    
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
def get_type_bien_immobilier():
    all_types=Type_bien_immobilier.query.all()
    results=Types_bien_immobilier_schema.dump(all_types)
    return jsonify(results)


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
    date_creation=db.Column(db.DateTime(),default=datetime.datetime.now)
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
        fields=('id','id_categorie','id_type_bien_immobilier','surface','prix','id_commune','address','description','date_creation','heure_creation','id_utilisateur','num_tlp','photos')

annonce_schema=AnnonceSchema()
annonces_schema=AnnonceSchema(many=True)


@app.route('/get_annonce',methods=['GET'])
def get_Annonces():
    all_Annonces=Annonce.query.all()
    results=annonces_schema.dump(all_Annonces)
    return jsonify(results)


@app.route('/get_annonce/<id>/',methods=['GET'])
def post_details(id):
    annonce=Annonce.query.get(id)
    return annonce_schema.jsonify(annonce)


@app.route('/add',methods=['POST'])
def add_Annonces():
    id_categorie=Categorie.query.filter_by(nom=request.json['categorie']).first().id
    id_type_bien_immobilier=Type_bien_immobilier.query.filter_by(nom=request.json['type_bien']).first().id
    surface=request.json['surface']
    prix=request.json['prix']
    id_commune=Communes.query.filter_by(nom=request.json['commune']).first().id
    address=request.json['address']
    description=request.json['description']
    id_utilisateur=1
    num_tlp=request.json['num_tlp']
    annonce=Annonce(id_categorie, id_type_bien_immobilier, surface, prix, id_commune, address, description, id_utilisateur, num_tlp)
    db.session.add(annonce)
    db.session.commit()
    return annonce_schema.jsonify(annonce)


@app.route('/delete/<id>',methods=['DELETE'])
def delete_Annonce(id):
    Annonce=Annonce.query.get(id)
    db.session.delete(Annonce)
    db.session.commit()
    return annonce_schema.jsonify(Annonce)

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
    return send_file(BytesIO(img.data),mimetype=img.mimetype,download_name=img.nom)


if __name__ == "__main__":
     app.run(debug=True)
