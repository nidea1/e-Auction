import React from 'react'
import MenuItems from "./MenuItems";

function Dropdown({subcategories, dropdown, depthlevel}){

    depthlevel = depthlevel+1
    const dropwdownClass = depthlevel > 1 ? "dropdown-submenu":""

    return(
        <ul className={`dropdown ${dropwdownClass} ${dropdown ? "show":""}`}>
            {
            subcategories.map((subcategory,index) =>(
                <MenuItems item={subcategory} key={index} depthLevel={depthlevel} />
            ))
            }
        </ul>
    )
}

export default Dropdown
