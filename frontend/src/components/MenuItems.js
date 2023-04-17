import React, { useEffect, useRef, useState } from 'react'
import { Button, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

function MenuItems({item, depthLevel}) {
    const [dropdown, setDropdown] = useState(false)
    let ref = useRef()

    useEffect(() =>{
        const handler = (e) => {
            if(dropdown && ref.current && !ref.current.contains(e.target)) {
                setDropdown(false)
            }
        }
        document.addEventListener("mousedown", handler)
        document.addEventListener("touchstart", handler)
        return () => {

            document.removeEventListener("mousedown", handler)
            document.removeEventListener("touchstart", handler)
        };
    }, [dropdown])

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true)
    }

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false)
    }

    return (
        <ListGroupItem className='menu-items' ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {item.subCategory ? (
                <>
                <Button
                type='button'
                aria-haspopup='menu'
                aria-expanded={dropdown ? 'true' : 'false'}
                onClick={() => setDropdown((prev) => !prev)}
                >
                    {item.name}{" "}{depthLevel>0 ? <span> &raquo; </span>: <span className='arrow' />}
                </Button>
                <Dropdown
                    depthLevel={depthLevel}
                    subcategories={item.subCategory}
                    dropdown={dropdown}
                />
                </>
            ): (
                <Link to={'#'}>{item.name}</Link>
            )}
        </ListGroupItem>
    );
};

export default MenuItems
