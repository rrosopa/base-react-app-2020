export const StringHelper = {
    capitalize: (str:string): string => {
        if(str){
            return str.charAt(0).toUpperCase() + (str.length > 1 ? str.substr(1, str.length).toLowerCase() : '');
        }

        return str;
    }
}