import React from 'react';

const Graph = ({ information }) => {
    let name = information.name;
    return (
        <div>
            {name}
            {/* {data && <div>
                Name: {data.name}
            </div>}
            {data && <div>
                Current Price: {data.currentPrice}
            </div>} */}
        </div>
    )
}

export default Graph;