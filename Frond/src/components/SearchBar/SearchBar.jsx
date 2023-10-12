import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import loupe from '../../assets/img/Loupe.svg';
import styled from 'styled-components';
import { getProductByName } from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LandingPage from '../../views/LandingPage/LandingPage';

//Styled components
const FormSearchBar = styled.form`
  background: var(--clr-white);
  border: 2px solid var(--clr-primary);
  border-radius: 10px;
  min-width: 500px;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.7em;
  border: 1px solid #eecafa;
  box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.15);

  button {
    width: 20px;
    background: transparent;
    border: none;
    margin-left: 0.5em;

    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.75, 2);

    transform-origin: center;
    text-align: right;
    &:hover,
    &:focus {
      filter: brightness(75%);
      transform: rotateZ(15deg);
    }

    img {
      height: 20px;
    }
  }

  input {
    background: transparent;
    border: 1px #0d0202;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    padding: 0.7em 1em;
    width: 100%;
  }

  button:focus,
  input:focus {
    outline: 2px solid var(--clr-primary);
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin-left: 15px;
  font-size: 15px;
`;

const CustomDatalist = styled.ul`
  background-color: #fff;
  border-radius: 0.25rem;
  color: black;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  max-height: 400px;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  top: 4em;
  width: 35%;
  z-index: 10;

  li {
    cursor: pointer;
    padding: 1rem;
    text-transform: capitalize;
    color: #252525;
    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

const SearchBar = ({ placeholder }) => {
  const location = useLocation()
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const formRef = useRef();


  //Dropdown Handle
  const handleChange = async (ev) => {
    setInputText(ev.target.value);
    setErrorMessage('');
    try {
      const response = await axios.get(`/producto?name=${inputText}`);
      console.log(response);
      setOptions(response.data);
    } catch (error) {
      console.error(error);
      setOptions([]);
    }
  };
  //Search handle
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    navigate('/catalogo');
    const ProductFound = await dispatch(getProductByName(inputText));
    if (ProductFound.payload.length > 0) {
      setInputText('');
    } else {
      Swal.fire("Oops", "Este producto no existe o no esta en venta en estos momentos", "error");
      setInputText('');
    }
  };

  //Hide dropdown useEffect
  useEffect(() => {
    const handleClick = (ev) => {
      if (formRef.current && !formRef.current.contains(ev.target)) {
        setOptions([]);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);



  return (
    <>
      <FormSearchBar onSubmit={handleSubmit} ref={formRef}>
        <input
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          value={inputText}
          list="suggestions"
        />
        {options?.length > 0 && inputText !== '' && (
          <CustomDatalist id="suggestions">
            {options?.map((option) => (
              <li
                className="capitalize text-black-600"
                key={option.id}
                value={option.name}
                onClick={ async () => {
                  await setInputText(option.name);
                  await navigate('/catalogo')
                  dispatch(getProductByName(option.name));
                  
                  setOptions([]);
                }}
              >
                {option.name}
              </li>
            ))}
          </CustomDatalist>
        )}
        {inputText.length > 0 && (
        <button onClick={()=>{
          setInputText('')
        }} className='mb-1'>x</button>
        )}
        <button type="submit">
          <img src={loupe} alt="seeker" />
        </button>
      </FormSearchBar>
      {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
    </>
  );
};

export default SearchBar;