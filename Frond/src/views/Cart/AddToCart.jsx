import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartProducts, addToCartFunction } from "../../redux/actions";
import { useEffect } from "react";
import greentick from '../../assets/img/greentick.png';
import MoreProductsCardContainer from "../../components/MoreProducts/MoreProductsContainer";
import OtherMoreProductsContainer from "../../components/MoreProducts/OtherMoreProductsContariner";
import { useAuth0 } from "@auth0/auth0-react";


const AddToCart = () => {
  const cartLS = useSelector(state => state.localCart);
  console.log(cartLS);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const stateProducts = useSelector(state => state.cartProducts);
  console.log(stateProducts);
  const { id, amount } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const cartApi = useSelector(state => state.apiCart); 


  useEffect(() => {
    dispatch(getCartProducts(id, amount));
  }, [dispatch, id, amount]);



  const addToCart = () => {
    const carritotUrl = `/carrito/${id}?amount=${amount}`;
    navigate(carritotUrl);
  };



  return (
    <div className='flex flex-column items-center justify-center border border-black-500 border-5'>
      <div className='w-full h-full border border-black-500 border-500'>
        <div className='flex m-10 rounded-lg shadow-2xl p-20 justify-between items-center'>

          {stateProducts.productos && stateProducts.productos.map((item) => (
            <p key={item.id} className="capitalize">{item.name}</p>
          ))}
          <div className='flex items-center'>
            <div className='relative'>
              <img src={stateProducts.imagenPrincipal} alt="Productimage" className='border border-green-500 w-20 h-20 object-cover rounded-full ml-10 mr-2' />
              <img src={greentick} alt="tick-image" className='w-10 h-10 object-cover rounded-full absolute bottom-0 right-0 m-0' />
            </div>
          </div>

          <div>
          <p className=' text-1xl capitalize font-bold'>{(stateProducts.name)}</p>
          <p className='text-green-500 font-semibold'>Fue agregado al carrito exitosamente</p>
          </div>

          <p> Hay {!isAuthenticated ? cartLS?.length : cartApi.productos?.length} producto(s) en tu carrito </p>

          <div className="flex space-x-4">
          <button onClick={addToCart} className='bg-customColor text-white font-semibold py-1 px-4 rounded-xl flex items-center gap-2'>
            Ver carrito
          </button>

          <button onClick={()=> navigate('/catalogo')} className='bg-customColor text-white font-semibold py-1 px-4 rounded-xl flex items-center gap-2'>
           Catalogo
          </button>
        </div>
        </div>

        <div className='flex flex-row gap-2 m-10 rounded-lg bg-fuchsia-200 p-10 justify-center items-center'>
          <MoreProductsCardContainer />
        </div>

       
      </div>
    </div>
  );
};

export default AddToCart;