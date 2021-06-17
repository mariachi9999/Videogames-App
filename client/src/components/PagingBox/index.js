import React from 'react'
import styles from "./PagingBox.module.css"

export const PagingBox = (props) => {
    
    const {pages} = props
    
    const pagesArray = []
    for(let i=1; i<=pages;i++){
        pagesArray.push(i)
    }

    console.log(pagesArray)
    
    return (
        <div>
            <h4>PagingBox</h4>
            <div id={styles.container}>
                {pagesArray.length > 0 ? 
                <ul id={styles.numbers}>
                {pagesArray && pagesArray.map(page =>
                    <button key={page} onClick={()=>props.page(page)}>{page}</button> 
                )}
                </ul>
                : 
                <div>1</div>
                }
            </div>
        </div>
    )
}


export default PagingBox;
