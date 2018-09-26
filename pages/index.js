import React from 'react'
import {Button} from 'carbon-components-react'
import {Link} from 'server/routes'
import '../static/custom-carbon-theme.scss'


const Home = () => (
  <div>
    <Link route="/about/about-us">
      <a>Click me</a>
    </Link>
    <Button>Hello World</Button>
  </div>
)

export default Home
