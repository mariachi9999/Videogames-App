import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "./OrderBox.module.css"
import { orderAlphabetical, orderRating } from "../../store/actions";


export const OrderBox = (props) => {
    
    const alphabetical = useSelector(store=>store.alphabetical);
    const rating = useSelector(store=>store.rating);
    
    const dispatch = useDispatch()
   
    const handleClick = event =>{
        if(event.target.attributes[2].value === "alphabetical"){
            dispatch(orderAlphabetical(event.target.value));
        }
        if(event.target.attributes[2].value === "rating"){
            dispatch(orderRating(event.target.value));
        }
    }

    const limpiarAlphabetical = ()=> {
        // console.log(alphabetical)
        if(alphabetical === "ascendent"){
            document.getElementById("cbox2").checked = false
        }
        if(alphabetical === "descendent"){
            document.getElementById("cbox1").checked = false
        }
    }

    const limpiarRating = ()=> {
        // console.log(alphabetical)
        if(rating === "ascendent"){
            document.getElementById("cbox4").checked = false
        }
        if(rating === "descendent"){
            document.getElementById("cbox3").checked = false
        }
    }

    useEffect(()=>
        limpiarAlphabetical(),
        [alphabetical]
    )

    useEffect(()=>
        limpiarRating(),
        [rating]
)

    return (
        <div id={styles.orderBox}>
            <h4>Order Box</h4>
            <div className={styles.nameContainer}>
                <label className={styles.label}>Order by name:</label>
                <label><input type="checkbox" id="cbox1" field="alphabetical" value="ascendent" onClick={handleClick} defaultChecked="false"/>Ascendent</label>
                <label><input type="checkbox" id="cbox2" field="alphabetical" value="descendent" onClick={handleClick} defaultChecked="false"/>Descendent</label>
            </div>
            <div className={styles.nameContainer}>
                <label className={styles.label}>Order by rating:</label>
                <label><input type="checkbox" id="cbox3" field="rating" value="ascendent" onClick={handleClick} defaultChecked="false"/> Top to bottom</label>
                <label><input type="checkbox" id="cbox4" field="rating" value="descendent" onClick={handleClick} defaultChecked="false"/> Bottom to Top</label>
            </div>
        </div>
    )
}

export default OrderBox;

