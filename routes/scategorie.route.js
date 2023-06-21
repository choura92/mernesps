const express = require('express');
const router = express.Router();
const SCategorie = require("../models/scategorie")
// créer un nouvelle scatégorie
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat,categorieID } = req.body;
    const newSCategorie = new SCategorie({
        nomscategorie: nomscategorie,
        imagescat: imagescat,
        categorieID:categorieID
    })
    try {
        await newSCategorie.save();
        res.status(200).json(newSCategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// afficher la liste des scategories. 
router.get('/', async (req, res) => {
    try {
        const cat = await SCategorie.find({}, null, { sort: { '_id': -1 } })

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// chercher une scatégorie  
router.get('/:scategorieId', async (req, res) => {
    try {
        const cat = await SCategorie.findById(req.params.scategorieId);

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie 
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    res.json({ message: "scategorie deleted successfully." });

});
// modifier une catégorie 
router.put('/:scategorieId', async (req, res) => {

    try {
        const cat1 = await SCategorie.findByIdAndUpdate(req.params.scategorieId, 
            { 
                $set: req.body 
            },
             { 
                new: true 
            });
              res.status(200).json(cat1);

    } catch (error) 
    { 
        res.status(404).json({ message: error.message }); 
    }
});
    module.exports = router