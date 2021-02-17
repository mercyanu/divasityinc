export const addItemToCart = (cartItems, newItemToAdd) => {
    const existingItem = cartItems.find(
        cartItem => cartItem.id === newItemToAdd.id); 
        //above line:- existingItem stores the find method return value of cartItem object 
        // if ids match else stores undefined returned from tne find method

        //below line: after checking if existingItem is true, we map through cartItems and  increment 
        // the quantity element in it. NOTE map returns a new array based on conditions set out
        if(existingItem){
            return cartItems.map(cartItem => 
                 cartItem.id === newItemToAdd.id
                ? {...cartItem, quantity: cartItem.quantity +1}
                : cartItem
                );
        }

        return [ ...cartItems, {...newItemToAdd, quantity: 1} ]
        //above line: this executes if the existingItem is undefined, and the existing cartItems
        // is returned but with a new object added with quantity element initiated with a value of 1
}