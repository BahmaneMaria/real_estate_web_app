from flask import Flask,flash, render_template , request, jsonify, Response, send_file
from flask_cors import CORS
from flask_migrate import Migrate
from io import BytesIO
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

import datetime
import uuid as uuid
import os
import json


from flask_marshmallow import Marshmallow
from flask_msearch import Search

from nlp import mot_cles , context , extract_filter
import numpy as np




#Create a Flask instance
app = Flask(__name__)
#if you didn't put this you will get error 
CORS(app= app)
#Configure db
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tp_igl'
app.config['SQLALCHEMY_TRACK_MoODIFICATIONS'] = False
app.config['SECRET_KEY'] = "my super secret key that no one is supposed to know"

# Initalize The Database
UPLOAD_FOLDER = "frontend/src/static/images/"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)
migrate = Migrate(app, db)

ma = Marshmallow(app)
search = Search(app)
search.init_app(app)



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

@app.route('/getwilaya/<id>',methods=['GET'])
def get_wilaya(id):
    wilaya=Wilayas.query.filter(Wilayas.code == id).first()
    results=wilaya_schema.dump(wilaya)
    return jsonify(results)

@app.route('/getwilayas',methods=['GET'])
def get_wilayas():
    all_wilayas=Wilayas.query.all()
    results=wilayas_schema.dump(all_wilayas)
    return jsonify(results)


@app.route('/add_wilaya/<wilaya>/<code>', methods = ['POST'])
def add_wilaya(wilaya, code) : 
    wilaya = Wilayas(code,wilaya)
    db.session.add(wilaya)
    db.session.commit()
    return "seccess"


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
    communes=Communes.query.filter_by(Communes.id_wilaya==id)
    results=communes_schema.dump(communes)
    return jsonify(results)

@app.route('/getcommune/<id>',methods=['GET'])
def get_commune(id):
    commune=Communes.query.get(id)
    return commune_schema.jsonify(commune)


@app.route('/add_commune/<commune>/<id_wilaya>/<code>/', methods = ['POST'])
def add_commune(commune, code, id_wilaya) : 
    commune = Communes(code,commune,id_wilaya)
    db.session.add(commune)
    db.session.commit()
    return "seccess"

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

@app.route('/add_categorie/<categorie>', methods = ['POST'])
def add_categorie(categorie) : 
    categorie = Categorie(categorie)
    db.session.add(categorie)
    db.session.commit()
    return "seccess"

#classe type bien immobilier
class Type_bien_immobilier(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    nom=db.Column(db.String(255))

    def __init__(self,nom):
        self.nom=nom

class Type_bien_immobilierSchema(ma.Schema):
    class Meta:
        fields=('id','nom')

Type_bien_immobilier_schema=Type_bien_immobilierSchema()
Types_bien_immobilier_schema=Type_bien_immobilierSchema(many=True)

@app.route('/get_Types_bien_immobilier',methods=['GET'])
def get_types_bien_immobilier():
    all_types=Type_bien_immobilier.query.all()
    results=Types_bien_immobilier_schema.dump(all_types)
    return jsonify(results)

@app.route('/get_Type_bien_immobilier/<id>',methods=['GET'])
def get_type_bien_immobilier(id):
    type=Type_bien_immobilier.query.get(id)
    return Type_bien_immobilier_schema.jsonify(type)

@app.route('/add_type/<type>', methods = ['POST'])
def add_type(type) : 
    type = Type_bien_immobilier(type)
    db.session.add(type)
    db.session.commit()
    return "seccess"

#classe images
class Images_annonce(db.Model) : 
    id = db.Column(db.Integer(),primary_key = True)
    id_annonce = db.Column(db.Integer())
    pic_name = db.Column(db.Text())
    def __init__(self,id_annonce,pic_name):
        self.id_annonce = id_annonce
        self.pic_name = pic_name

class Images_annonceSchema(ma.Schema):
    class Meta:
        fields=('id','id_annonce', 'pic_name')

Image_annonce_schema = Images_annonceSchema()
Images_annonce_schema = Images_annonceSchema(many=True)

@app.route('/get_Images_annonce/<id>', methods = ['GET'])
def get_images_annonce(id):
    images = Images_annonce.query.get(Images_annonce.id_annonce == id)
    return Images_annonce_schema.jsonify(images)


#define our models
#class Annonce:
class Annonce(db.Model):
    __searchable__ = ['title', 'description']

    id_annonce=db.Column(db.Integer(),primary_key=True)
    id_user=db.Column(db.Integer())
    title = db.Column(db.Text())
    description=db.Column(db.Text())

    id_categorie=db.Column(db.Integer())
    id_type_bien_immobilier=db.Column(db.Integer())
    surface=db.Column(db.Float())
    prix=db.Column(db.Float())
    #localisation de l'imobillier
    id_wilaya = db.Column(db.Integer())
    id_commune = db.Column(db.Integer())
    address=db.Column(db.String(255))

    #date de creation
    date_creation=db.Column(db.DateTime(),default=datetime.datetime.now)
    #contact info
    contact = db.Column(db.Text())
    #image
    multi_pics = db.Column(db.Boolean())
    annonce_pic = db.Column(db.Text())
    # tags and keywords (for research)
    key_words = db.Column(db.Text())

    def __init__(self,id_user,title,description,id_categorie,id_type_bien_immobilier,surface,prix,id_wilaya,id_commune,address,contact,multi_pics,annonce_pic,key_words):
        self.id_user = id_user
        self.title = title
        self.description = description
        self.id_categorie = id_categorie
        self.id_type_bien_immobilier = id_type_bien_immobilier
        self.surface = surface
        self.prix = prix
        self.id_wilaya = id_wilaya
        self.id_commune = id_commune
        self.address = address
        self.contact = contact
        self.multi_pics = multi_pics
        self.annonce_pic = annonce_pic
        self.key_words = key_words


class AnnonceSchema(ma.Schema):
    class Meta:
        fields=('id_annonce','id_user','title','description','id_categorie','id_type_bien_immobilier','surface','prix','id_wilaya','id_commune','address','date_creation','contact','multi_pics','multi_pics','annonce_pic','key_words')

annonce_schema=AnnonceSchema()
annonces_schema=AnnonceSchema(many=True)


#get all announces
@app.route('/get_annonces',methods=['GET'])
def get_Annonces():
    all_Annonces=Annonce.query.all()
    results=annonces_schema.dump(all_Annonces)
    return jsonify(results)
#get une annonce selon le id
@app.route('/get_annonce/<id>/',methods=['GET'])
def post_details(id):
    annonce=Annonce.query.get(id)
    return annonce_schema.jsonify(annonce)
#get les annonces d'une categorie
@app.route('/get_annonce/categorie/<categorie>',methods=['GET'])
def get_annonces_categorie(categorie):
    #premierment trouver le id de la categorie correspandante 
    #puis trouver les annonces qui on cette id
    id_categorie = Categorie.query.filter(Categorie.nom == str(categorie))
    all_Annonces=Annonce.query.filter(Annonce.id_categorie == id_categorie).all()
    #all_Annonces=Annonce.query.filter(Annonce.description == str("categorie")).all()
    results=annonces_schema.dump(all_Annonces)
    return jsonify(results)

#get les annonces selon les mots clés
@app.route('/get_annonce_search/<search>',methods=['GET'])
def post_details_search(search):
    all_annonces = Annonce.query.filter(Annonce.title == str(search)).all()
    #all_annonces = Annonce.query.filter(Annonce.title.like(str(search))).all()
    all_Annonces=Annonce.query.all()
    result = []
    words = search.split()
    result_annonce = all_Annonces
    for word in words:
        for i in result_annonce:
            if (word.lower() in i.title.lower()) is True :
                result.append(i)
                print("hi")
            result_annonce = result
        result = []
    
    #for i in all_Annonces:
     #   if (search.lower() in i.title.lower()) is True :
      #      result.append(i)
    #annonce=Annonce.query.filter_by(Annonce.title.like("Location Terrain Agricole")).all()
    #Annonce.query.filter_by(title = "Location Terrain Agricole").all()
    results=annonces_schema.dump(result_annonce)

    return jsonify(results)

#une autre methode de recherche
@app.route('/search/<search>',methods=['GET'])
def search(search):
    all_annonces = Annonce.query.msearch(search,fields=['title', 'description'])
    results=annonces_schema.dump(all_annonces)
    return jsonify(results)




@app.route('/annonces_search/<search>',methods=['GET'])
def get_annonces_search(search):
    #all_annonces = Annonce.query.msearch(search,fields=['key_words'])
    annonces = Annonce.query.all()
    res = []
    for annonce in annonces : 
        if (context(str(annonce.key_words),search)):
            res.append(annonce)
    #results1 = annonces_schema.dump(all_annonces)
    #results2 = annonces_schema.dump(annonces)
    resultat = annonces_schema.dump(res)
    #res = np.unique(results1+results2)
    return jsonify(resultat)


@app.route('/annonces_search_filter/<filter>',methods=['GET'])
def get_annonces_search_filter(filter):
    search  = extract_filter(filter,"search=","&")
    print("seaaaaaaaaaaaaaarch")
    print (search)
    filter = filter.replace("search="+search+"&", '')
    categorie = extract_filter(filter,"categorie=","&")
    print("caaaaaaaaaat")
    print (categorie)
    filter = filter.replace("categorie="+categorie+"&", '')
    types = extract_filter(filter,"types=","&")
    filter = filter.replace("types="+types+"&", '')
    types = types.split("%")
    wilayas = extract_filter(filter,"wilayas=","&")
    filter = filter.replace("wilayas="+wilayas+"&", '')
    wilayas = wilayas.split("%")
    communes = extract_filter(filter,"communes=","&")
    filter = filter.replace("communes="+communes+"&", '')
    comm = []
    communes = communes.split("%")
    stop = False

    annonces = Annonce.query.all()
    res = []
    for annonce in annonces : 
        if (context(str(annonce.key_words),search)):
            res.append(annonce)

    res2 = []
    if categorie.lower() != "tout" : 
        cat = Categorie.query.filter(Categorie.nom == categorie).one()
        id_categorie = cat.id
        print("id caaaaaaaaaat")
        print(id_categorie)
        for annonce in res :
            print("premier annonce")
            if str(annonce.id_categorie) == str(id_categorie):
                print("oui")
                res2.append(annonce)
        if (len(res2) == 0) : 
            stop = True
    else:
        res2 = res
    
    res3 = []
    if types[0].lower() != "tout":
        for type in types : 
            typ = Type_bien_immobilier.query.filter(Type_bien_immobilier.nom == type).one()
            id_type = typ.id
            for annonce in res2 :
                print("premier annonce")
                if str(annonce.id_type_bien_immobilier) == str(id_type):
                    print("oui")
                    res3.append(annonce)
        if (len(res3) == 0) : 
            stop = True
    else : 
        res3 = res2

    res4 = []
    if wilayas[0].lower() != "n'importe quel" :
        for wilaya in wilayas:
            wil = Wilayas.query.filter(Wilayas.nom == wilaya).one()
            id_wilaya = wil.code
            for annonce in res3 :
                print("premier annonce")
                if str(annonce.id_wilaya) == str(id_wilaya):
                    print("oui")
                    res4.append(annonce)
        if (len(res4) == 0) : 
            stop = True
    else :
        res4 = res3

    res5 = []

    if communes[0].lower() != "n'importe quel" :
        for commune in communes:
            com = Communes.query.filter(Communes.nom == commune).one()
            id_commune = com.code_postal
            for annonce in res4 :
                print("premier annonce")
                if str(annonce.id_commune) == str(id_commune):
                    print("oui")
                    res5.append(annonce)
        if (len(res5) == 0) : 
            stop = True

    resultat = annonces_schema.dump(res5)
    return jsonify(resultat)





#add annonce to the data
@app.route('/add_annonce', methods= ['POST'])
def add_annonce():
    # get Images
    annonce_pics = request.files.getlist("pics") 
    if(annonce_pics[0].filename ==''):
        print("empty")
    print("nombre des images")
    print(len(annonce_pics))
    print("hh")
    #get a string from the request
    info = request.form['info'] 
    #convert string to json object
    json_info = json.loads( info)
    #get a feild from json object
    id_user = json_info['id_user']
    title  = json_info['title']
    description = json_info['description']
    id_categorie = json_info['id_categorie']
    id_type_bien_immobilier = json_info['id_type_bien_immobilier']
    surface = json_info['surface']
    prix = json_info['prix']
    id_wilaya = json_info['id_wilaya']
    id_commune = json_info['id_commune']
    address = json_info['address']
    contact = json_info['contact']
    key_words = mot_cles(title)
    pics_names = list()

    """
    if (len(annonce_pics) == 0) : 
        multi_pics = False
        pics_names[0] = "default_pic_name.png"
    else : 
        if (len(annonce_pics) == 1) :
            multi_pics = False
        else :
            multi_pics = True
        pic_filename = secure_filename(annonce_pics[0].filename)
        pics_names[0] = str(uuid.uuid1()) + "_" +pic_filename
    """
    

    #pic_filename= secure_filename(annonce_pic.filename)
    #pic_name1 = str(uuid.uuid1()) + "_" +pic_filename
    #change annonce_pic to string to send it to db
    #save = pic_name 
    default = False
    i=0
    for file in annonce_pics :
        if (i==0) : 
            if(file.filename == '') : 
                multi_pics = False
                default = True
                pics_names.append("default_pic_name.png")
            else : 
                multi_pics = False
                pic_filename = secure_filename(annonce_pics[i].filename)
                pics_names.append(str(uuid.uuid1()) + "_" +pic_filename)
        else : 
            multi_pics = True
            pic_filename = secure_filename(annonce_pics[i].filename)
            pics_names.append(str(uuid.uuid1()) + "_" +pic_filename)
        i = i + 1

    annonce = Annonce(id_user,title,description,id_categorie,id_type_bien_immobilier,surface,prix,id_wilaya,id_commune,address, contact,multi_pics,pics_names[0],key_words)
    #add it to the data
    db.session.add(annonce)
    #envoyer l'annonce pour ensuite on puisse retourner le id de l'annonce
    db.session.commit()
    
    if (multi_pics == True) :
        i = 0
        for file in annonce_pics : 
            if (i !=  0) : # la deuxieme photo
                image = Images_annonce(id_annonce=annonce.id_annonce , pic_name=pics_names[i])
                db.session.add(image)
            i = i+1
    db.session.commit()

    i=0
    for file in annonce_pics :
        if(i == 0):
            if(default == False):
                file.save(os.path.join(app.config['UPLOAD_FOLDER'],pics_names[i]))
        else : 
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],pics_names[i]))
        i = i + 1

    #try :
        #send it to mysql
    """
    for i in range(0,len(annonce_pics)-1) :
        print(i)
        pic = annonce_pics[i]
        pic.save(os.path.join(app.config['UPLOAD_FOLDER'],pics_names[i]))
    """
    flash("User Updated Successfully!")
    #except : 
    #         flash("Error! Looks like there was a problem...try again!")
    

    return title + description + str(surface) + str(prix) + str(pics_names[0]) + key_words


@app.route('/')
def hello_world():
    return 'Hello, World!'

