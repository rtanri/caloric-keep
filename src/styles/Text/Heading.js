import styled from 'styled-components'
import Text from './Text'

const H1 = styled(Text)`
  font-family: 'Libre Baskerville', serif;
  font-size: 3.6rem;
  font-weight: 400;
  color: "black";
  line-height: 4.8rem;
`
H1.displayName = 'H1'

const H2 = styled(Text)`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  color: "black";
  line-height: 4rem;
`
H2.displayName = 'H2'

export { H1, H2 }