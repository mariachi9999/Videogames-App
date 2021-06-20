import React from 'react'
import styles from "./PagingBox.module.css"

export const PagingBox = (props) => {
    
    const {pages} = props
    
    const pagesArray = []
    for(let i=1; i<=pages;i++){
        pagesArray.push(i)
    }

    return (
        <div id={styles.container}>
            <div id={styles.contenedorNumbers}>
                {pagesArray.length > 0 ? 
                <div className={styles.numbers}>
                {pagesArray && pagesArray.map(page =>
                    <button key={page} onClick={()=>props.page(page)} className={styles.buttonPagin}>{page}</button> 
                )}
                </div>
                : 
                <div className={styles.numbers}>1</div>
                }
            </div>
        </div>
    )
}

export default PagingBox;
