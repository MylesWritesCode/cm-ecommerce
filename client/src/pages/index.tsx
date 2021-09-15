import { Container } from '../components/Container'


const Index: React.FC<{}> = ({}) => (
  <Container height="100vh">
    <h1>Hello there, general kenobi</h1>
    <h1>{ process.env.NEXT_PUBLIC_API_URL }</h1>
  </Container>
)

export default Index
