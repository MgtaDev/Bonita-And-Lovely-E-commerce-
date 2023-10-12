import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import SectionReviews from "../../components/modalReviwers/reviewrsDetail/SectionReviews";
import bagIcon from '../../assets/img/baghandleWhite.svg';
import { getProductsByDetail, cleanDetail, addToCartFunction, addItemToCartLS, addItemToCartApi, clientes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import MoreProductsCardContainer2 from "../../components/MoreProducts/MoreProducts2";

const Detail = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const redirigirAlInicio = () => {
    window.scrollTo(0, 0);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const stateProducts = useSelector((state) => state.productsDetail);
  useEffect(() => {
    dispatch(clientes());
  }, []);
  const usuarios = useSelector((state) => state.Allclients);
  const currentUser = usuarios?.find(
    (usuario) =>
      !isLoading &&
      user &&
      usuario.name.toLowerCase() === user?.name.toLowerCase() &&
      usuario.correo_electronico.toLowerCase() === user?.email.toLowerCase()
  );
  const extractIdNumber = (id) => {
    const idParts = id && id.split('-')  ;
    return parseInt(idParts && idParts[1]);
  };
  const idNumber = extractIdNumber(currentUser?.id);
  const productId = extractIdNumber(id);
  const [amount, setAmount] = useState(1);
  const [show, setShow] = useState(false);

  const productToAdd = {
    productos: [
      {
        cantidad: amount,
        productoId: productId,
        colorId:1
      }
    ]
  }

  const handleProceedToPayment = async () => {
    if (!isAuthenticated) {
      Swal.fire("Debes iniciar sesión para continuar", "", "error");
      return;
    }
    if (
      !currentUser.name ||
      !currentUser.correo_electronico ||
      !currentUser.telefono ||
      !currentUser.direccion
    ) {
      setShow(true);
      return;
    }
    if (stateProducts.cantidad <= 0) {
      setShow(true);
      return;
    }
    
    try {
      await axios.put(`carrito/${idNumber}`, productToAdd);
     
      const response = await axios.post("http://localhost:3001/pago", productToPay);
      window.location.href = response.data.response.body.init_point;
      
      if(response){
        axios.put(`http://localhost:3001/carrito/pagado/${idNumber}`, { pagado: true });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getProductsByDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

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

  const addToCart = () => {        
    dispatch(addItemToCartLS(id, amount, 1)); 
    dispatch(addToCartFunction(id, amount, 1)); 
    const carritotUrl = `/itemadded/${id}?amount=${amount}&color=${1}`;
    navigate(carritotUrl);
    redirigirAlInicio()
  }

  const goBack = () => {
    navigate('/catalogo');
    redirigirAlInicio()
  }

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    delay: 200,
    onRest: () => setShow(true)
  });

  const slideIn = useSpring({
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: show ? 1 : 0 },
    config: { duration: 500 },
    delay: 500,
  });

  return (
    <>
      <button
        onClick={goBack}
        style={{ backgroundColor: 'rgb(109, 1, 110)' }}
        className="absolute ml-20 text-white py-2 px-4 rounded-lg mb-6 mt-12"
      >
        Volver
      </button>
      <animated.div style={fadeIn}>
        <div className="px-4 py-11 max-w-4xl mx-auto">
          <animated.div style={slideIn}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md pb-6">
                <img
                  src={stateProducts.imagenPrincipal}
                  alt={stateProducts.name}
                  className="w-full object-cover rounded-md h-64 mb-4" />
              </div>

              <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl capitalize font-bold text-gray-900 mb-4">
                  {stateProducts.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {stateProducts.cantidad === 0 ? (
                    'AGOTADO'
                    )
                  : (
                    `Disponibles: ${stateProducts.cantidad} unidades`
                  )
                  }
                </span>
                <h3 style={{ color: 'rgb(109, 1, 110)' }} className="text-lg font-medium mt-2">
                  ${stateProducts.precio_venta}
                  <span className="ml-1 text-sm text-gray-500">c/u</span>

                </h3>
                <hr className="my-4" />
                <div className="flex items-center justify-between bg-gray-100 py-2 px-4 rounded-md">
                  <span className="text-gray-500 text-sm font-medium">Cantidad:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      style={{ backgroundColor: 'rgb(109, 1, 110)' }}
                      className="rounded-full text-white font-bold text-xs py-1 px-2 hover:bg-customColor2"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 py-1 px-4 rounded-full text-xs font-medium">
                      {amount}
                    </span>
                    <button
                      type="button"
                      className="rounded-full text-white font-bold text-xs py-1 px-2 hover:bg-customColor2"
                      onClick={handleIncrement}
                      style={{ backgroundColor: 'rgb(109, 1, 110)' }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={addToCart}
                    style={{ backgroundColor: 'rgb(109, 1, 110)' }}
                    className="text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-customColor2 transition duration-300 ease-in-out"
                  >
                    <img
                      src={bagIcon}
                      alt="bag icon"
                      className="inline-block w-6 h-6 mr-2" />{" "}
                    Añadir al carrito
                  </button>
                

                </div>
              </div>
            </div>
          </animated.div>

          {/* Sección de reseñas */}
          <div className="w-full justify-center bg-white rounded-lg shadow-md p-6">
            <SectionReviews />
          </div>

          {/* Contenedor de más productos */}
        </div>
        <animated.div style={slideIn}>
          <div className='flex flex-row gap-2 mt-10 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
            <MoreProductsCardContainer2 />
          </div>
        </animated.div>
        
      </animated.div>
    </>
  );
};

export default Detail;