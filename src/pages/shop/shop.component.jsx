import React from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections:dataSet} = this.state; //destructure the state value - Collections
        return (<div className='shop-page'>
                {
                    dataSet.map(({ id, ...otherCollectionProps }) => (
                        <CollectionPreview key={id} {...otherCollectionProps}/>

                    ))
                }
            </div>
        )    
}
}

export default ShopPage;