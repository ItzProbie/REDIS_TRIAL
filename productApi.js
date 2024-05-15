exports.getProducts = () => {

    return new Promise((resolve,rejetc) => {
        setTimeout(() => {
            resolve({
                id : 1,
                name : "Piyush"
            })
        },2000);
    })

}