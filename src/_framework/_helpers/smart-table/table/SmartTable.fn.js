import _ from 'lodash';

/**
 * Procesa las condiciones de un boton
 * 
 */
export const conditionsValidator = (conditions, item) =>{
    if(conditions === undefined){
        return null;
    }

    // Var to save when any condition matched
    let denied = false;

    // If the condition index 0 is an instance of array, we have more than one condition
    if(Array.isArray(conditions[0])){
        conditions.map(obj => {
            let value = obj[0].includes(".")?_.get(item,`${obj[0]}`, undefined):item[obj[0]];
            const type = obj[1];
            switch (type.toLowerCase().trim()) {
                case 'not_in':
                    if(obj[2].includes(value)){
                        denied = true;
                    }
                    break;
                case 'in':
                    if(!obj[2].includes(value)){
                        denied = true;
                    }
                    break;
                case '==':
                    if(item[obj[2]] !== value){
                        denied = true;
                    }
                    break;
                case '!=':
                    if(item[obj[2]] === value){
                        denied = true;
                    }
                    break;
                default:
                    break;
            }
            return null;
        });
    }else{
        let value = conditions[0].includes(".")?_.get(item,`${conditions[0]}`, undefined):item[conditions[0]];
        const type = conditions[1];
        switch (type.toLowerCase().trim()) {
            case 'not_in':
                if(conditions[2].includes(value)){
                    denied = true;
                }
                break;
            case 'in':
                if(!conditions[2].includes(value)){
                    denied = true;
                }
                break;
            case '==':
                if(item[conditions[2]] !== value){
                    denied = true;
                }
                break;
            case '!=':
                if(item[conditions[2]] === value){
                    denied = true;
                }
                break;
            default:
                break;
        }
    }

    // return the inverse value
    return !denied;
}