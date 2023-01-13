import { useEffect, useState } from 'react'
import useSelectCurrency from '../hooks/useSelectCurrency'
import styled from '@emotion/styled';
import { currencies } from '../data/currencies';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {

  const  [ criptos, setCriptos ] = useState([]);
  const  [ error, setError ] = useState(false);
  
  const  [ currency, SelectCurrency ] = useSelectCurrency('Select your currency', currencies);
  const  [ cripto, SelectCripto ] = useSelectCurrency('Select your cripto currency', criptos);

  useEffect ( () => {
    const consultAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const response = await fetch(url);
        const result = await response.json();

        const arrayCriptos = result?.Data.map( cripto => {
            const criptoObj = {
                id: cripto?.CoinInfo?.Name,
                name: cripto?.CoinInfo?.FullName
            }
            return criptoObj;
        });

        setCriptos(arrayCriptos);
    }

    consultAPI();
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if ([currency, cripto].includes('')) {
        setError(true);
        return;
    }
    setError(false);
    setCurrencies({
        currency,
        cripto
    });

  }

  return (
    <>
        {/* {error && <Error>You must chose a value in both selectors</Error>} */}
        <form
            onSubmit={handleSubmit}
        >
            <SelectCurrency />
            <SelectCripto />

            <InputSubmit 
                type="submit"
                value="Quote"
            />
        </form>
    </>
  )
}

export default Form