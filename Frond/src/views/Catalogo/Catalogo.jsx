import Cards from "../../components/CatalogoComponen/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Catalogfilters from "../../components/CatalogoComponen/Catalogfilters";
import { addCartLSToApi, emptyCartLS, products } from "../../redux/actions";
import { useSpring, animated } from "react-spring";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const Catalogo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const stateProducts = useSelector(state => state.Allproducts);
  const searchResults = useSelector((state) => state.searchResults);
  const productosFiltrados = useSelector((state) => state.productsFiltered);   
  const productosEnVenta = stateProducts?.productos?.filter((product) => product.activa === true);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [cardStyles, setcardStyles] = useState()
  const numberSize = 20;
  const redirigirAlInicio = () => {
    window.scrollTo(0, 0);
  }
  console.log(stateProducts)
  console.log(productosFiltrados)

  const dispatch = useDispatch();

  useEffect(() => {
    setPageNumber(0);
    const fetchData = () => {
      const queries = {
        page: 0,
        size: numberSize
      };
      dispatch(products(queries));
    };
    fetchData();
  }, [dispatch, numberSize]);

  useEffect(() => {
    setDisablePrev(pageNumber <= 0);
    setDisableNext(pageNumber >= stateProducts.paginas - 1);
  }, [pageNumber, stateProducts.paginas]);

  const handlePageClick = (newPageNumber) => {
    // Limitar la navegación entre las páginas 1 y 3
    if (newPageNumber < 0) {
      newPageNumber = 0;
    } else if (newPageNumber > 2) {
      newPageNumber = 2;
    }
    setPageNumber(newPageNumber);
    const queries = {
      page: newPageNumber,
      size: numberSize
    };
    dispatch(products(queries));
    redirigirAlInicio()
  };
  const cartLS = useSelector(state => state.localCart); 

  const cartUnif = (cart) => {
      const countMap = {};
      cart.forEach((item) => {
          if (item.id !== undefined && item.id !== null && item.color) {
              const itemKey = `${item.id}`;
              if (countMap[itemKey]) {
                  countMap[itemKey] += item.amount;
              } else {
                  countMap[itemKey] = item.amount;
              }
          }
      });
      const cartUnifRes = Object.keys(countMap).map((itemKey) => {
          const [itemId] = itemKey.split('_');
          return {
              objeto: cart.find((item) => item.id === itemId),
              cantidad: countMap[itemKey],
              color: 1
          };
      });
      return cartUnifRes;
  };

  const extractNumber = (string) => {
    const match = string?.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
}; 
  const Clientela = useSelector(state=>state.Allclients);
  const clientFound = isAuthenticated ? Clientela.find(client => client.correo_electronico === user.email) : null;
  const NumUserId = isAuthenticated ? extractNumber(clientFound?.id) : undefined;


  useEffect(() => {
    if (isAuthenticated && cartLS) {
      dispatch(addCartLSToApi({ user: NumUserId, localCart: cartLS }))
        .catch(error => {             
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data || 'Hubo un error en la solicitud.',
          });
        });
        dispatch(emptyCartLS());
    } else {
      return;
    }
}, [isAuthenticated]);

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 0; i < 3; i++) {
      pages.push(
        <button
          key={i}
          className={`border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 ${
            i === pageNumber ? "bg-slate-950 text-white" : ""
          }`}
          disabled={i === pageNumber || stateProducts.loading}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  const filtersFadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    delay: 200,
  });

  const buttonsSlideIn = useSpring({
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { duration: 500 },
    delay: 500,
  });

  const cardsSlideUp = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 500 },
    delay: 500,
  });

  return (
    <section> 
      <animated.div style={filtersFadeIn}>
        <div className="grid grid-cols-5 ">
          <div className="col-span-1 px-5">
            <Catalogfilters searchResults={searchResults} products={productosEnVenta} pageNumber={pageNumber} />
          </div>
          <div className="col-span-4 py-2 px-0 pr-20">
            {searchResults.length  || productosFiltrados.length? (
              ''
            ) : (
              <animated.div style={buttonsSlideIn}>
                <div className="flex justify-center py-10">
                  <button
                    disabled={disablePrev || stateProducts.loading}
                    onClick={() => handlePageClick(pageNumber - 1)}
                    className="border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 "
                  >
                    {"<"}
                  </button>
                  {renderPageButtons()}
                  <button
                    disabled={disableNext || pageNumber === 2}
                    onClick={() => handlePageClick(pageNumber + 1)}
                    className="border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 "
                  >
                    {">"}
                  </button>
                </div>
              </animated.div>
            )}

            <animated.div style={cardsSlideUp}>
              <Cards stateProducts={productosEnVenta}  />
            </animated.div>
            {searchResults.length  || productosFiltrados.length? (
            ''
            ) : (
              <animated.div style={buttonsSlideIn}>
                <div className="flex justify-center py-10">
                  <button
                    disabled={disablePrev || stateProducts.loading}
                    onClick={() => handlePageClick(pageNumber - 1)}
                    className="border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 "
                  >
                    {"<"}
                  </button>
                  {renderPageButtons()}
                  <button
                    disabled={disableNext || stateProducts.loading}
                    onClick={() => handlePageClick(pageNumber + 1)}
                    className="border-solid rounded border border-[255 255 255] px-3 py-1 mx-1 text-lg font-semibold text-slate-400 focus:text-slate-950 focus:border-slate-950 "
                  >
                    {">"}
                  </button>
                </div>
              </animated.div>
            )}
          </div>
        </div>
      </animated.div>
    </section>
  );
};

export default Catalogo;