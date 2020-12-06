import React from "react";
import './styles.css';
const AutoCompleteItem = ({
    nombre,
    onSelectItem,
    isHighlighted
}) => {
    return (
        <li
            className={`list-group-item ${
                isHighlighted ? "active highlighted" : ""
            }`}
            onClick={onSelectItem}
        >
            <div className="row">
                <div className="col text-left">
                    <p className="mb-0 font-weight-bold line-height-1">
                        {nombre}{" "}
                        
                    </p>
                    <p className="mb-0 badge badge-primary">REGION</p>
                    <p className="mb-0 ml-2 badge badge-secondary">CAPITAL</p>
                </div>
            </div>
        </li>
    );
};

export default AutoCompleteItem;