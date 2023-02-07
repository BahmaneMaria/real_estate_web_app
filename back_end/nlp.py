import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
import spacy
from nltk.stem.snowball import FrenchStemmer

nlp = spacy.load("fr_core_news_md")


stopWords = ['aux','a','était', 'au', 'ma', 'eusse', 'en', 'la', 'soyons', 'ayez', 'sommes', 'sur', 'étants', 'par', 'aura', 'vous', 'son', 'seraient', 'étiez', 'il', 'sont', 'j', 'soit', 'serais', 'eusses', 'de', 'me', 'fussent', 'auront', 'aies', 'eussiez', 'un', 'te', 'du', 'soient', 'avons', 'seriez', 'ne', 'eussions', 'ayantes', 'étées', 'eût', 'fusses', 'ses', 'fusse', 'votre', 'sera', 'serons', 'es', 'est', 'eûmes', 'aviez', 'ayants', 'moi', 'se', 'serai', 'étante', 'auraient', 'étais', 'serions', 'fut', 'eûtes', 'seras', 'ayons', 'ayant', 'avions', 'une', 'on', 'les', 'tes', 'qu', 'fus', 'eussent', 's', 'le', 'à', 'avaient', 'aurions', 'pas', 'n', 'ton', 'auriez', 'êtes', 'serez', 'auras', 'aie', 'tu', 'eus', 'eurent', 'mes', 'aient', 'y', 'été', 'aux', 'eut', 'seront', 'ou', 'je', 'leur', 'ta', 'nos', 't', 'fûtes', 'avez', 'aurons', 'ce', 'fussiez', 'serait', 'vos', 'avait', 'étaient', 'des', 'notre', 'étantes', 'fûmes', 'nous', 'même', 'ayante', 'eux', 'ils', 'sois', 'ont', 'étions', 'que', 'm', 'qui', 'étés', 'suis', 'aurait', 'avec', 'dans', 'et', 'furent', 'mon', 'aurais', 'mais', 'd', 'ait', 'fussions', 'sa', 'pour', 'soyez', 'étée', 'elle', 'eue', 'eu', 'lui', 'eues', 'l', 'as', 'ai', 'avais', 'aurez', 'c', 'ces', 'toi', 'aurai', 'fût', 'étant']


stemmer = FrenchStemmer()

#pour trouver les synon
from nltk.corpus import wordnet
lang = 'fra'


from spellchecker import SpellChecker
spell = SpellChecker(language='fr')

def return_spellcheck(sentence) :
    spell = SpellChecker(language='fr')
    doc = nlp(sentence)
    words = ""
    for word in doc:
        word = spell.correction(word.text).__str__()
        words = words + word+" "
    return words


def return_token(sentence) :
    # Tokeniser la phrase
    #sentence = return_spellcheck(sentence.lower())
    doc = nlp(sentence.title())
    sent = []
    for X in doc :
        if X.pos_ != "PROPN" : 
            sent.append(X.text.lower())
    # Retourner le texte de chaque token
    return sent

def return_clean_words(sentence) : 
    clean_words=[]
    for word in sentence : 
        if word not in stopWords : 
            clean_words.append(word)
    return [X for X in clean_words]

def return_stem(sentence) :
    stem =[]
    for word in sentence :
        stem.append(word)
        stem.append(stemmer.stem(word))
    return stem


def return_without_double(sentence) :
    new = []
    for word in sentence :
        if word not in new :
            new.append(word)
    return new


def return_synon(sentence) : 
    synon = []
    for word in sentence :

        for syn in wordnet.synsets(word, lang=lang):
            for lemma in syn.lemmas(lang = lang) : 
                synon.append(lemma.name())
    synon = return_without_double(synon)
    return synon


def return_string (sentence) :
    chaine = ""
    for word in sentence : 
        chaine = chaine + word + " "
    return chaine

def mot_cles(sentence):
    #sentence = return_spellcheck(sentence)
    sent = return_token(sentence)
    sent = return_clean_words(sent)
    sent = return_synon(sent)
    sent = return_string(sent)
    sent = sentence.lower() + " " + sent.lower()
    return sent



def getString(x):

    return x
 

def solve(s1, s2):
 
    a = getString(s1[0])
    b = getString(s2[0])

    for i in range(1, len(s1)):
        if s1[i] != s1[i - 1]:
            a += getString(s1[i])
         
    for i in range(1, len(s2)):
        if s2[i] != s2[i - 1]:
            b += getString(s2[i])
         
    if a == b:
        return True
    return False

def context(string1, string2):
    res = False
    res2 = False

    string_set = set(string1.split())
    list_set = set(string2.split())

    list_set2 = set(return_spellcheck(string2).split())

    c = 0
    for i in list_set:
        for word in string_set : 
            if i in word : 
                c+=1
            else : 
                if solve(i,word) :
                    c+=1
    if (c >= 1):
        if (c >= (len(list_set))) :
            res = True

    c2 = 0
    for i in list_set2:
        for word in string_set : 
            if i in word :
                c2+=1
            else : 
                if solve(i,word) :
                    c2+=1
    if (c2 >= 1):
        if (c2 >= (len(list_set2))) :
            res2 = True

    return res or res2



def extract_filter(string , sub1 , sub2) :
    # getting index of substrings
    idx1 = string.index(sub1)
    idx2 = string.index(sub2)
 
    res = ''
    # getting elements in between
    res = string[idx1 + len(sub1) : idx2]
    return res
