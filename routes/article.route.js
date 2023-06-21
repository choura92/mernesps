const express = require('express');
const router = express.Router();
const Article = require("../models/article")
// créer un nouvelle article
router.post('/', async (req, res) => {
    const { reference, designation, prix, marque, qtestock, imageart, scategorieID, ref } = req.body;
    const newArticle = new Article({
        reference:reference,
        designation:designation,
        prix:prix,
        marque:marque,
        qtestock:qtestock,
        imageart:imageart,
        scategorieID:scategorieID,
        ref:ref
    })
    try {
        await newArticle.save();
        res.status(200).json(newArticle);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// afficher la liste des articles. 
router.get('/', async (req, res) => {
    try {
        const cat = await Article.find({}, null, { sort: { '_id': -1 } }).populate("scategorieID").exec();

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// chercher une article  
router.get('/:articleId', async (req, res) => {
    try {
        const cat = await Article.findById(req.params.articleId);

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une article 
router.delete('/:articleId', async (req, res) => {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });

});
// modifier une article 
router.put('/:articleId', async (req, res) => {

    try {
        const cat1 = await Article.findByIdAndUpdate(req.params.articleId, 
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