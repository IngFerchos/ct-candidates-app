import { Account, Credential, Token } from "../Interfaces/IAccount"

const LoginHook = () => {
    const url = 'http://localhost:8000/api/'
    const signIn = async(account: Account): Promise<{user:Account, token:Token}> => {
        const newUserStringified = JSON.stringify(account)
        try {
            const token = await fetch(`${url}users`,{
                method:'POST',
                body: newUserStringified,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response:{user:Account, token:Token} = await token.json()
            return await response
        } catch (error) {
            throw new Error('Error')
        }
    }
    const logIn = async(credentials: Credential):Promise<{user:Account, token:Token}> => {
        const credentialsStringified = JSON.stringify(credentials)
        try {
            const token = await fetch(`${url}login`,{
                method:'POST',
                body: credentialsStringified,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response:{user:Account, token:Token} = await token.json()
            return await response
        } catch (error) {
            throw new Error('Error')
        }
    }
    const logOut = async(token:Token) => {
        try {
            await fetch(`${url}logout`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return true
        } catch (error) {
            throw new Error('Error')
        }
    }
    return {signIn, logIn, logOut}
}

export{LoginHook}