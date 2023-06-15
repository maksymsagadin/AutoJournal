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
    email: string,
    oldPW: string,
    newPW: string,
}

export interface User {
    email: string
    name: string
    vehicles?: Vehicle[]
    image?: Vehicle[]
}
export interface Vehicle {
    year: number
    make: string
    model: string
    color: string
    mileage: number
    journalEntries: JournalEntry[]
}
  
export interface JournalEntry {
    date: Date
    service: string
    notes: string
    spent?: number
    toolsUsed?: string
    parts?: string
}
  

  