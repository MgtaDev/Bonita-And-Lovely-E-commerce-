const express = require('express');
const router = express.Router();

const getAll = require("../controllers/Reviewr/getAllReviewr")
const postReviewr = require("../controllers/Reviewr/postReviewr")
const getReviewr = require("../controllers/Reviewr/getAllReviewrId")
const putReviewr = require("../controllers/Reviewr/putReviewr")

router.get('/:productoId', async (req, res) => {
    const { productoId } = req.params; // Cambia de req.query a req.params
    try {
      const productoReseña = await getReviewr(productoId);
      res.status(200).json(productoReseña);
    } catch (error) {
      console.error('Error al obtener la reseña:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al obtener la reseña.' });
    }
});

router.get('/' , async (req, res) => {
    try{
        const productoReseñas = await getAll()
        res.status(200).json(productoReseñas)
    }catch(error){
        console.error('Error al obtener la reseña:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al obtener la reseña.' });
    }
})


router.post('/', async (req, res) => {
    const { currentUserId, productId, rating, comentario } = req.body;

    if (!currentUserId || !productId || !rating || !comentario) {
        return res.status(400).json({ error: 'Faltan propiedades en la solicitud.' });
    }

    try {
        const nuevaReseña = await postReviewr(currentUserId, productId, rating, comentario);
        res.status(201).json(nuevaReseña);
    } catch (error) {
        console.error('Error al agregar la reseña:', error.message);
        res.status(500).json({ error: 'Ha ocurrido un error al agregar la reseña: ' + error.message });
    }

});

router.put('/:productoId/:clienteId', async (req, res) => {
    const {productId, clienteId} = req.params;
    const {rating, comentario} = req.body;
    try{
        const reseñaActual = await putReviewr(clienteId, productId, rating, comentario)
        res.status(200).json(reseñaActual)
    }catch(error){
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la reseña: ' + error.message });
    }
});
module.exports = router;