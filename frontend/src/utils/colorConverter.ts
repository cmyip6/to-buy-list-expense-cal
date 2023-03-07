export function colorConverter(username: string){
    switch (username){
        case 'frankie':
            return 'blue'
        case 'iris': 
            return 'orange'
        case 'brenda':
            return 'violet'
        case 'samuel': 
            return 'green'
        case 'carlson':
            return 'cyan'
        default:
            return 'pink'
    }
}