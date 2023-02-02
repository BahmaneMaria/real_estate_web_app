import unittest
import sys
sys.path.append(".")
from app import get_categorie,app,get_utilisateur,delete_Annonce
app.app_context().push()
class Test(unittest.TestCase):
#tester la recherche de la catégorie par identifiant
    def test_categorie(self):
        categorie=get_categorie(1)
        self.assertEqual("Vente", categorie.json['nom'])
    
    def test_utilisateur(self):
        user=get_utilisateur(5)
        self.assertEqual("Rahma", user.json['Prenom'])
    
    def test_suppression_annonce(self):
        annonce=delete_Annonce(1)
        self.assertIsNone(annonce)
        self.assertEqual(1,annonce.json['id'])



if __name__ == '__main__':
    unittest.main()