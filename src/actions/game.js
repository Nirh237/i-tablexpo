import Api from '../../server/Api';

export const startValidateTableId = (tableId, userId) => {
    return (dispatch) =>{
        return Api.post("CheckTableId",{tableId, userId}).then((Response) => {
            const result = JSON.parse(Response.data.d);
            dispatch(validateTableId(!!result));
        });
    }
}

export const validateTableId = (result) => ({
    type:'ISTABLEIDVALID',
    isTableIdValid: result
});