const Profile = require('../models/profilModel.js')

const getProfilID = async (req,res) =>{
    try{
        const list = await Profile.findOne({userID: req.params.id})
        if(!list){
            return res.status(404).json({error: 'Profil non trouvé'})
        }
        res.status(200).json(list)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erreur serveur"})
    }
}

const createProfil = async (req,res) =>{
    try{
        const {userID,preferences, history} = req.body
        if(!userID || !preferences || !history){
            return res.status(404).json({error: "Champs manquants"})
        }
        const newProfil = new Profile({userID,preferences,history})
        await newProfil.save()
        res.status(201).json(newProfil)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erreur serveur"})
    }
}

const updateProfil = async (req,res) =>{
    try{
        const {preferences, history} = req.body
        const utilisateur = await Profile.findOneAndUpdate(
            {userID: req.params.id},
            {$set: {preferences,history} },
            {new : true}
        );
        if(!utilisateur){
            return res.staus(404).json({error: "Profil non trouvé"})
        }
        res.status(204).json(utilisateur)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erreur serveur"})
    }
}

module.exports = {
    getProfilID,
    createProfil,
    updateProfil
}