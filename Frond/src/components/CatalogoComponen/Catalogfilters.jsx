import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brands, colors, sizes, productFilter} from "../../redux/actions";
import Swal from "sweetalert2";

const Catalogfilters = ({products, pageNumber, searchResults}) => {
  const stateProducts = useSelector(state => state.Allproducts);
  const tallas = useSelector((state)=> state.Allsizes)
  const marcas = useSelector((state) => state.Allbrands)
  const categorias = useSelector((state)=> state.Allcategories)
  const productosFiltrados = useSelector((state)=> state.productsFiltered)
  const [filterChanged, setFilterChanged] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    {
      precio_venta: "",
      marcaId: [],
      categoriaId: [],
      tamañoId: [],
    });
  console.log(productosFiltrados)
  console.log(selectedFilters)
  const extractNumber = (string) => {
  const match = string.match(/\d+/); 
    return match ? parseInt(match[0]) : 0; 
  };
  
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(sizes())
      dispatch(colors())
      dispatch(brands())
    }, [dispatch])

    
    useEffect(() => {
      const minPriceValue = parseFloat(minPrice);
      const maxPriceValue = parseFloat(maxPrice);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        precio_venta: {
          min: isNaN(minPriceValue) ? "" : minPriceValue,
          max: isNaN(maxPriceValue) ? "" : maxPriceValue,
        },
      }));
      setFilterChanged(true);
    }, [minPrice, maxPrice]);
    
    const total  = products?.length;
    
    const handleMultipleOptionChange = (propertyName, optionId) => {
      setSelectedFilters((prevFilters) => {
      const isAlreadySelected = prevFilters[propertyName].includes(optionId);
      if (isAlreadySelected) {
        return {
          ...prevFilters,
          [propertyName]: prevFilters[propertyName].filter((id) => id !== optionId),
        };
      } else {
        return {
          ...prevFilters,
          [propertyName]: [...prevFilters[propertyName], optionId],
        };
      }
    });
    setFilterChanged(true);
  }
  useEffect(() => {

    if (productosFiltrados.length > 0) {
      const filteredCategoriaId = productosFiltrados.map(producto => producto.categoriaId);
      
      setSelectedFilters(prevFilters => ({
        ...prevFilters,
        categoriaId: filteredCategoriaId,

      }));
    }
  }, []);

  useEffect(() => {
    if (
      (!selectedFilters.tamañoId.length &&
      !selectedFilters.marcaId.length &&
      !selectedFilters.categoriaId.length &&
      selectedFilters.precio_venta.min === "" &&
      selectedFilters.precio_venta.max === "") 
    ) {
      dispatch(productFilter({
          precio_venta: {
            min: null,
            max: null,
          },
          marcaId: [],
          categoriaId: [],
          tamañoId: [],
      }))
    } else if (filterChanged) {
      dispatch(productFilter(selectedFilters));
      setFilterChanged(false);
  } 

  }, [selectedFilters, filterChanged]);
  
  const handleReset = ()=>{
    window.location.reload();
  }
  console.log(pageNumber);



    return (
      <div className="grid grid-cols-1 w-4/5 mx-auto bg-white text-black py-10 text-lg capitalize justify-items-start rounded-md">
        
        {searchResults.length ? (
       <span className="text-sm text-gray-500 rounded-full shadow-lg border-2  px-4 py-2 border-gray-500">{searchResults.length} Resultados</span>
        )
      :
      <>
        {!productosFiltrados.length ? (
       <span className="text-sm rounded-full shadow-lg border-2  px-4 py-2 border-gray-500 text-gray-500 ">{total} Resultados</span>
      )
      :  <span className="text-sm text-gray-500 rounded-full shadow-lg border-2  px-4 py-2 border-gray-500">{productosFiltrados.length} Resultados</span>
        }
      </>
      }   
    
      {/* Botón RESET */}
      <div className="flex justify-center">
        <button
          className="px-8 py-2 mt-5 font-semibold rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
      <br />

      {/* Categorias */}
      <div>
        <h3 className="font-bold mb-2">Categorías</h3>
        <ul>
          {categorias &&
            categorias.map(categoria => {
              const categoriaNumber = extractNumber(categoria.id);
              return (
                <li key={categoria.id} className="flex items-center mb-2">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={selectedFilters.categoriaId.includes(categoriaNumber)}
                    onChange={() =>
                      handleMultipleOptionChange("categoriaId", categoriaNumber)
                    }
                  
                  />
                  <span>{categoria.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    
      {/* Marca */}
      <div>
        <h3 className="font-bold mb-2">Marca</h3>
        <ul>
          {marcas &&
            marcas.map(marca => {
              const marcaNumber = extractNumber(marca.id);
              return (
                <li key={marca.id} className="flex items-center mb-2">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={selectedFilters.marcaId.includes(marcaNumber)}
                    onChange={() =>
                      handleMultipleOptionChange("marcaId", marcaNumber)
                    }
                  />
                  <span>{marca.name}</span>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Talla */}
      <div>
        <h3 className="font-bold mb-2">Talla</h3>
        <ul>
          {tallas &&
            tallas.map(talla => {
              const tallaNumber = extractNumber(talla.id);
              return (
                <li key={talla.id} className="flex items-center mb-2">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={selectedFilters.tamañoId.includes(tallaNumber)}
                    onChange={() =>
                      handleMultipleOptionChange("tamañoId", tallaNumber)
                    }
                  />
                  <span>{talla.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    
      {/* Precios */}
      <div>
        <h3 className="font-bold mb-2">Precios</h3>
        <div className="grid grid-cols-5 mb-2">
          <div className="col-span-2">
          <p className="text-sm font-bold">Desde</p>
            <input
              label="precio"
              placeholder="min"
              type="number"
              className="border border-gray-300 px-2 py-1 rounded w-full"
              value={minPrice}
              onChange={e => {
                const value = parseFloat(e.target.value);
                setMinPrice(isNaN(value) || value < 0 ? 0 : value);
              }}
            />
          </div>
          <div className="flex items-center justify-center font-bold">
            -
          </div>
          <div className="col-span-2">
          <p className="text-sm font-bold">Hasta</p>
            <input
              label="precio"
              placeholder="max"
              type="number"
              className="border border-gray-300 px-2 py-1 rounded w-full"
              value={maxPrice}
              onChange={e => {
                const value = parseFloat(e.target.value);
                setMaxPrice(isNaN(value) || value < 0 ? 0 : value);
              }}
            />
          </div>
        </div>
      </div>
    
 
    </div>
    );
  };
  
  export default Catalogfilters;
  