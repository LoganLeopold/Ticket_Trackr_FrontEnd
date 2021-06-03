import React, { useEffect, useState } from "react";
import axios from "axios"

const TestCall = (props) => {

    const [flights, refreshFlights] = useState()

    let grabFlights = async () => {

        try {
    
            console.log(props.oAuth, "OAUTH")
            let testFlights = await axios({
                method: "GET",
                url: `https://test.api.amadeus.com/v2/shopping/flight-offers/?originLocationCode="SFO"&destinationLocationCode="JFK"&departureDate="2021-08-15"&returnDate="2021-08-22"`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${props.oAuth}`,
                },
            })
    
            refreshFlights(testFlights)
    
        } catch (err) {

            console.log(err)
    
        }
    
    }

    grabFlights().then( result => console.log(result) )

    return (
        <div>
        </div>
    )

}


export default TestCall