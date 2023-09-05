import axios from "axios";
import React from "react";
import StarRatings from 'react-star-ratings';

export default function Modal({ productoId , currentUser}) {
    const [showModal, setShowModal] = React.useState(false);
    const [startCount, SetStartCount] = React.useState(0)
    const [comentario, setComentario] = React.useState("");

    const onchangeStart = (rating) => {
        SetStartCount(rating)
    }
    const handleComentarioChange = (event) => {
        setComentario(event.target.value);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post('http://localhost:3001/reviewr', {
                // clienteId,
                productoId,
                rating: startCount,
                comentario
            });
            console.log(response.data);

            setShowModal(false);
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
        }
    }


    return (
        <>
            <button
                className="bg-customColor text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
            Calificar
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5">
                                {/*header*/}
                                <div className="grid grid-cols-1 grid-rows-2 p-5 justify-items-center gap-5">
                                    <h2 className="text-2xl font-semibold">
                                        ¿Qué te pareció tu producto?
                                    </h2>
                                    <h3 className="text-zinc-500">
                                        Nombre del producto
                                    </h3>
                                    <div className="grid grid-cols-1 gap-1">
                                        <StarRatings
                                            rating={startCount}
                                            starHoverColor="orange"
                                            starEmptyColor="gray"
                                            starRatedColor="orange"
                                            changeRating={(newRating) => onchangeStart(newRating)}
                                            numberOfStars={5}
                                            starDimension="30px"
                                            name='rating'
                                        />
                                        <div className="flex flex-row justify-between text-zinc-400 font-semibold">
                                            <p>Malo</p>
                                            <p >Excelente</p>
                                        </div>
                                    </div>
                                </div>
                                {/*body*/}
                                <div className="relative flex flex-col justify-items-center m-auto gap-2 text-center">
                                    <h3>Cuéntanos más acerca de tu producto</h3>
                                    <span className="text-zinc-400">(opcional)</span>
                                    <textarea
                                        name="comentario"
                                        id="comentario"
                                        cols="30"
                                        rows="10"
                                        className="resize-none h-24 border-solid border-2 border-slate-500 rounded"
                                        value={comentario}
                                        onChange={handleComentarioChange}
                                    ></textarea>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        className="bg-customColor text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleSaveChanges()}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}