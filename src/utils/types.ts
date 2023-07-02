export interface Credentials {
    email: string
    password: string
}

export interface UserData {
    firstName: string
    lastName: string
    email: string
    password: string
    vehicles?: Vehicle[]
}

export interface PasswordUpdate {
    email: string
    oldPW: string
    newPW: string
}

export interface User {
    email: string
    name: string
    image?: Vehicle[]
}

export interface Vehicle {
    id: string
    name?: string
    year: number
    make: string
    model: string
    color: string
    mileage: number
    journalEntries?: JournalEntry[]
}
  
export interface JournalEntry {
    id: string
    date: Date
    future: boolean
    service: string
    mileage: number
    notes: string
    spent?: number
    tools?: string
    parts?: string
}
  

  