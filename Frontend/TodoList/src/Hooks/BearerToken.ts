const BearerToken = () => {
    const storage = localStorage.getItem('bearer')
    if(storage){
        const parseStorage = JSON.parse(storage)
        const {token} = parseStorage
        return token
    }
}
export {BearerToken}