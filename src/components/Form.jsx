import { useEffect } from 'react'
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

const Form = () => {

  const  [ currency, SelectCurrency ] = useSelectCurrency('Select your currency', currencies);

  useEffect ( () => {
    const consultAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const response = await fetch(url);
        const result = await response.json();
    }

    consultAPI();
  }, [])

  return (
    <form>

        <SelectCurrency />

        <InputSubmit 
            type="submit"
            value="Quote"
        />
    </form>
  )
}

export default Form