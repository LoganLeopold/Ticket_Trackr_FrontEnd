import React, { useEffect, useState } from "react";
import axios from "axios"

const TestCall = (props) => {

    const [authState, changeAuthState] = useState(false)

    useEffect( () => {
        if (props.oAuth) {
            changeAuthState(true)
        }
    })

    const [flights, refreshFlights] = useState()

    let grabFlights = async () => {

        try {
    
            let testFlights = await axios({
                method: "GET",
                url: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SFO&destinationLocationCode=JFK&departureDate=2021-08-15&returnDate=2021-08-22&adults=1`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${props.oAuth}`,
                },
            })

            let currencies = await axios({
                method: "GET",
                url: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json",                
            })

            refreshFlights(testFlights)
            return testFlights
    
        } catch (err) {

            console.log(err)
    
        }
    
    }

    useEffect( () => {
        if (authState) {
            grabFlights()
        }
    }, [authState])

    useEffect( () => console.log(flights), [flights])

    return (
        <div>
            {flights && <p>{JSON.stringify(flights.data.data[0])}</p>}
        </div>
    )

}


export default TestCall