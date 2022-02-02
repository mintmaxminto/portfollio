import React from 'react';

import { getSecretData, getSecretDataServer } from '../actions/index';
import withAuth from '../components/hoc/withAuth';
import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';

class Secret extends React.Component {

    static async getInitialProps({ req }) {
        const anotherSecretData = await getSecretData(req);

        return { anotherSecretData };
    }

    // constructor(props){
    //     super();

    //     this.state = {
    //         secretData: []
    //     }
    // }

    state = {
        secretData: []
    } 

    async componentDidMount() {
        const secretData = await getSecretData();
     
        this.setState({
            secretData
        })
    }

    render() {
      
        const { secretData } = this.state;
        const { secretValue } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Secret Page</h1>
                    {this.state.secretData.map((data, index) => {
                        return (
                            <div key={index}>
                                <p>{data.title}</p>
                                <p>{data.description}</p>
                            </div>
                        )
                    })}
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(Secret);