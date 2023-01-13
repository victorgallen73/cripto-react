import styled from "@emotion/styled"
import CriptoImage from './img/criptos-img.png'
import Form from "./components/Form"
import { useEffect, useState } from "react"
import Result from "./components/Result"
import Spinner from "./components/Spinner"

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }

`

function App() {

  const  [ currencies, setCurrencies ] = useState({});
  const  [ quote, setQuote ] = useState({});
  const  [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      setLoading(true);
      setQuote({});
      
      const quoteCripto = async () => {
      const {currency, cripto} = currencies;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${currency}`
      
      const response = await fetch(url);
      const result = await response.json();
      
      setQuote(result?.DISPLAY[cripto][currency]);
      setLoading(false);
      }

      quoteCripto();
    }
  }, [currencies]);

  return (
    <Container>
      <Image
        src={CriptoImage}
        alt="Criptocurrency image"
      />
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Form setCurrencies={setCurrencies}/>
        {loading && <Spinner />}
        {quote?.PRICE && <Result quote={quote} />}
      </div>
    </Container>
  )
}

export default App
