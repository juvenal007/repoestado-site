import React, {useEffect} from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import SmartTable from '../../_framework/_helpers/smart-table/table/SmartTable';
import config from './config';

const Estado = () => {

    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Estados</div>
            </div>            
            <SmartTable
                dtColumns={config.columns}
                edit_btn={config.edit_btn}
                delete_btn={config.delete_btn}
                add_btn={config.add_btn}               
                list_data={config.list} // url con la data
                pk_key="id" // pk de las lineas
                model_p="Estados" // titulo grilla
                model_s="Estado" // titulo form
            />
        </ContentWrapper>
    );
}

export default Estado;