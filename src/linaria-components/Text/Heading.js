import styled from 'styled-components'
import Text from './Text'
import { primary, secondary } from '../Colors'

const H1 = styled(Text)`
  font-family: 'Libre Baskerville', serif;
  font-size: 3.6rem;
  font-weight: 400;
  color: ${primary};
  line-height: 4.8rem;
  text-align: center;
  margin: 30px 0;
  display: block;
`
H1.displayName = 'H1'

const H2 = styled(Text)`
  font-family: 'Libre Baskerville', serif;
  font-size: 3rem;
  font-weight: 400;
  color: ${secondary};
  line-height: 4rem;
  text-align: left;
  margin: 20px 0;
  display: block;
`
H2.displayName = 'H2'

export { H1, H2 }