import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container example">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Fucking Component</div>

                        <div className="card-body">I'm a fucking component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

// if (document.getElementById('root')) {
//     console.log('shit');
//     ReactDOM.render(<Example />, document.getElementById('root'));
// }
