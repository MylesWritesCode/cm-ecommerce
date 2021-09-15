import { Container } from '../components/Container'


const Index: React.FC<{}> = ({}) => (
  <Container height="100vh">
    <h1>Hello there, general kenobi</h1>
    <h1>{ process.env.path }</h1>
    <h1>{ process.env.NEXT_PUBLIC_development }</h1>
    <h1>{ process.env.development }</h1>
    <h1>TEST THIS GOD DAMNIT</h1>
  </Container>
)

export default Index
