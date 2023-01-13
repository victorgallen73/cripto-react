import styled from '@emotion/styled'

const Container = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`


const Result = ({quote}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = quote;
  return (
    <Container>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Cripto image"></Image>
        <div>
            <Price>Price: <span>{PRICE}</span></Price>
            <Text>Day high rice: <span>{HIGHDAY}</span></Text>
            <Text>Day low price: <span>{LOWDAY}</span></Text>
            <Text>Change percentage last 24 hours: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Image: <span>{IMAGEURL}</span></Text>
            <Text>Last update: <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Result