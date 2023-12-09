import React, { useState, useEffect } from 'react';
import Card from '../../ui/Card';
import style from './Collections.module.css';
import axios from 'axios';
import CollectionListItem from './collection-list-item/CollectionListItem';


const Collections = () => {
    const [collections, setCollections] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {
        try {
            // Make an API call to your authentication endpoint (replace with your actual API URL)
            axios.get('http://localhost:9090/collection', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setCollections(response.data)
            })
        } catch (error) {
            console.error('API request error:', error);
        }
    }, [])

    const selectHandler = (coll) => {
        setSelected(coll)
    }


    return <Card className={style.card}>
        <ul className={style.list}>
            {collections.map((coll) => {
                return <CollectionListItem selected={selected} onClick={() => selectHandler(coll.id)} key={coll.id} collection={coll} />
            })}
        </ul>
    </Card>;
}

export default Collections;