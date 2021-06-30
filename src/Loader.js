import React, { useState, useEffect } from 'react'

const Loader = (props) => {

    console.log("RENDER")
    
    const [loadState, changeLoad] = useState([0, "Loading"])

    const iterate = () => {
        console.log("ITERATE")
        if (loadState[0] < 3) {
            // if (timer) {
                timer = setTimeout(iterate, 1000)
                changeLoad([loadState[0] + 1, loadState[1] += '.'])
            // }
            console.log(loadState[0])
        } else if (loadState[0] === 3) {
            console.log("TOP OF THE COUNT")
            // if (timer) {
                timer = setTimeout(iterate, 1000)
                changeLoad([0, "Loading"])
            // }
        }
    }

    let timer = setTimeout(iterate, 1000)

    useEffect( () => {

        return function () { 
            console.log("CLEANED")
            clearTimeout(timer) 
            timer = null
        }

    }, [])

    return (
        <h2 className="loader">
            {loadState[1]}
            {/* Loading */}
        </h2>
    )

}

export default Loader