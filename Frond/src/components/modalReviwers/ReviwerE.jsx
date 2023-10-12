import React, { useState } from "react";
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

export default function EditReviewModal({ clienteId, productoId , initialRating, initialComentario }) {
    const [showModal, setShowModal] = useState(false);
    const [newRating, setNewRating] = useState(initialRating);
    const [newComentario, setNewComentario] = useState(initialComentario);
    
    const onChangeRating = (rating) => {
        setNewRating(rating);
    }

    const handleComentarioChange = (event) => {
        setNewComentario(event.target.value);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`/reviewr/${productoId}/${clienteId}`, {
                rating: newRating,
                comentario: newComentario
            });
            console.log(response);
            Swal.fire('Calificacion editada','Ha editado correctamente su calificacion a este producto','success')
            setShowModal(false);
        } catch (error) {
            console.log(error);
            Swal.fire('Ha ocurrido un error editando tu reseña',`${error.message}`,'error')
        }
    }

    return (
        <>
        <button
          className="text-gray-500 py-1 px-3 rounded-full"
          onClick={() => setShowModal(true)}
        >
          <FaEdit/>
        </button>
        {showModal ? (
       <>
       <button
         className="bg-purple-400 hover:bg-gray-500 text-gray-900 font-semibold py-2 px-4 rounded-md"
         onClick={() => setShowModal(true)}
       >
         Editar reseña
       </button>
       {showModal ? (
         <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
           <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
           <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
             <div className="modal-content py-4 text-left px-6">
               <div className="flex justify-between items-center pb-3">
                 <p className="text-2xl font-bold">Editar reseña</p>
                 <div
                   className="modal-close cursor-pointer z-50"
                   onClick={() => setShowModal(false)}
                 >
                   <svg
                     className="icon-fill-current hover:text-red-500"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                   >
                     <path d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5" />
                   </svg>
                 </div>
               </div>
               <StarRatings
                 rating={newRating}
                 starHoverColor="orange"
                 starEmptyColor="gray"
                 starRatedColor="orange"
                 changeRating={onChangeRating}
                 numberOfStars={5}
                 starDimension="30px"
                 name="rating"
                 className="mx-auto"
               />
               <textarea
                 value={newComentario}
                 onChange={handleComentarioChange}
                 cols="30"
                 rows="10"
                 className="resize-none h-24 border-solid border-2 border-slate-500 rounded w-full my-4 px-3 py-2 placeholder-gray-400 text-gray-700 placeholder-opacity-75 focus:placeholder-opacity-50 focus:outline-none"
                 placeholder="Escribe aquí tu comentario"
               />
               <div className="flex justify-end pt-2">
               <button
                className="focus:outline-none py-2 px-4 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white modal-btn-cancel mr-2"
                onClick={() => setShowModal(false)}
                >
                Cancelar
                </button>
                <button
                onClick={handleSaveChanges}
                className="focus:outline-none py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white modal-btn-save"
                >
                Guardar cambios
                </button>
               </div>
             </div>
           </div>
         </div>
       ) : null}
     </>
        ) : null}
      </>
    );
}
