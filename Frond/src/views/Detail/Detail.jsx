import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionReviews from "../../components/modalReviwers/reviewrsDetail/SectionReviews";
import bagIcon from '../../assets/img/baghandleWhite.svg';
//import colorIcon from '../../assets/img/colorIcon.svg'
import { getProductsByDetail, cleanDetail, addToCartFunction, addItemToCartLS, addItemToCartApi, clientes } from "../../redux/actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
// import { FaCircle } from "react-icons/fa";

import MoreProductsCardContainer2 from "../../components/MoreProducts/MoreProducts2";

const Detail = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const back = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const stateProducts = useSelector((state) => state.productsDetail);
  useEffect(() => {
    dispatch(clientes());
  }, []);
  const usuarios = useSelector((state) => state.Allclients);
  const currentUser = usuarios.find(
    (usuario) =>
      !isLoading &&
      user &&
      usuario.name.toLowerCase() === user.name.toLowerCase() &&
      usuario.correo_electronico.toLowerCase() === user.email.toLowerCase()
  );

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      Swal.fire("Debes iniciar sesión para continuar", "error", "error");
      return;
    }
    if (
      !currentUser.name ||
      !currentUser.correo_electronico ||
      !currentUser.telefono ||
      !currentUser.contraseña
    ) {
      Swal.fire("Completa tu información de perfil antes de continuar", "", "error");
      return;
    }
    if (stateProducts.cantidad <= 0) {
      Swal.fire("Producto agotado momentáneamente", "", "error");
      return;
    }
  
    axios
      .post("bonitaandlovely-production-a643.up.railway.app/pago", productToPay)
      .then((res) => (window.location.href = res.data.response.body.init_point));
  };

  useEffect(() => {
    dispatch(getProductsByDetail(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  // const colorIcon1 = "#EBC9BB";
  // const colorIcon2 = "#800040";
  // const colorIcon3 = "#EF3A57";
  // const colorIcon4 = "#C81819";

  const [amount, setAmount] = useState(1);
  // const [color, setColor] = useState(colorIcon1);

  const handleDecrement = () => {
    setAmount((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setAmount((prev) => Math.min(prev + 1, 10));
  };

  const productToPay = {
    nombre: stateProducts.name,
    precio: stateProducts.precio_venta,
    descripcion: stateProducts.descripcion,
    imagen: stateProducts.imagenPrincipal,
    quantity: amount,
  };

  const extractNumber = (string) => {
    const match = string.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
}; 
const Clientela = useSelector(state=>state.Allclients); console.log("user"); console.log(JSON.stringify(user,null,2));
const clientFound = isAuthenticated ? Clientela.find(client => client.correo_electronico === user.email) : null;
const NumUserId = isAuthenticated ? extractNumber(clientFound.id) : undefined;

  const addToCart = () => {        
    if (isAuthenticated){ 
        dispatch(addItemToCartApi({userId: NumUserId, productoId:id, cantidad:amount}));
    }else{
        dispatch(addItemToCartLS(id, amount)); 
    }
    dispatch(addToCartFunction(id, amount));
    const carritotUrl = `/itemadded/${id}?amount=${amount}`;
    navigate(carritotUrl);
}
  const goBack = () => {
    navigate('/catalogo')
  }

  return (
    <><div className="px-6 py-12 max-w-7xl mx-auto">
    <button
      onClick={goBack}
      className="bg-customColor text-white py-2 px-4 rounded-lg mb-8"
    >
      Volver
    </button>

    <div className="flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <img
          src={stateProducts.imagenPrincipal}
          alt={stateProducts.name}
          className="w-full object-cover mb-4 rounded-md h-96"
        />
        <div className="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-md">
          <span className="text-gray-500 text-xl font-medium">Cantidad:</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-lg py-2 px-4 bg-customColor text-white font-semibold text-lg hover:bg-customColor2 transition duration-300 ease-in-out"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="bg-gray-200 py-2 px-4 rounded-lg text-xl font-medium">
              {amount}
            </span>
            <button
              type="button"
              className="rounded-lg py-2 px-4 bg-customColor text-white font-semibold text-lg hover:bg-customColor2 transition duration-300 ease-in-out"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={addToCart}
            className="w-full md:w-auto bg-customColor text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor2 transition duration-300 ease-in-out"
          >
            <img
              src={bagIcon}
              alt="bag icon"
              className="inline-block w-6 h-6 mr-2"
            />{" "}
            Añadir al carrito
          </button>
          <button
            onClick={() => {
              handleProceedToPayment();
            } }
            className="w-full md:w-auto bg-customColor2 text-customColor py-3 px-6 rounded-lg text-lg font-medium hover:bg-customColor3 transition duration-300 ease-in-out"
            style={{ borderWidth: "2px" }}
          >
            Comprar ahora
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold capitalize text-gray-900 mb-4">
          {stateProducts.name}
        </h2>
        <span className="text-medium">
          Disponibles: {stateProducts.cantidad}
        </span>
        <h3 className="text-xl font-medium text-customColor mt-4">
          ${stateProducts.precio_venta}
        </h3>
        <hr className="my-6" />
        <SectionReviews />
      </div>
    </div>

    <div className='flex flex-row gap-2 mt-10 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
        <MoreProductsCardContainer2/>
      </div>
  );
  </div></>
  );
};

export default Detail;