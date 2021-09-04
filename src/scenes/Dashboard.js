import React from 'react'
import * as R from 'ramda'
import { Text, H1, H2 } from '../styles'


function Dashboard(){
    const plus = R.add(2, 3);
    
    return <div>
        <H1>Title H1</H1>
        <H2 fontFamily="poppins" >Title H2</H2>
        <Text>I try DIY text</Text>
        <Text>This is poppins texts</Text>
        <Text>{plus}</Text>
    </div>
}

export default Dashboard