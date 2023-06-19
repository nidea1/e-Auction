import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import FilterContext from '../contexts/FilterContext'


function ShoppingCartScreen() {

    const [selectedOrders, setSelectedOrders] = useState([])

    const location = useLocation()
    
    useEffect(() => {
        if(location.pathname === '/shopping-cart'){
            setSelectedOrders([])
        }
    }, [location.pathname])

    return (
        <>
        <FilterContext.Provider value={{selectedOrders, setSelectedOrders}}>
            <Row className='mx-3'>
                <Outlet />
            </Row>
        </FilterContext.Provider>
        </>
    )
}

export default ShoppingCartScreen
