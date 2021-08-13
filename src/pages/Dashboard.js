import React from 'react'
import * as R from 'ramda'
import { Text } from '../styles/index'



function Dashboard(){
    const plus = R.add(2, 3);
    return <div>
        <p>Hello World</p>
        <p>I love Mcgriddle</p>
        <Text>I try DIY text</Text>
        <Text>{plus}</Text>
    </div>
}

export default Dashboard