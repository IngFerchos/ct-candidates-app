export interface Account {
    email: string,
    password: string,
    name: string,
}

export interface Token {
    token: string
}

export interface Credential extends Pick<Account, 'email' | 'password'>{}