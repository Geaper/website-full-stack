import React, { useState, useEffect } from 'react';
import '../../configs';
const axios = require('axios');

export default class Submission extends React.Component {

    state = {
        evaluationExecuted : false,
        evaluation: false
    };
   
    componentDidMount() {

        let params = new URLSearchParams(this.props.location.search);
        let score = params.get('score'); 
        let issueId = params.get('issueId');
 
        axios.get(global.apiBaseURL + "/evaluation/" + issueId + "?score=" + score).then(response => {
            console.log(response);
            this.setState({
                evaluationExecuted: true,
                evaluation : true
            });
        })
        .catch(error => {
            console.error("Cannot get evaluation");
            this.setState({
                evaluationExecuted: true,
                evaluation : false
            });
        });
    };

    render() {     

        let logdata = {
            fontSize: "30px",
            color: "red",
            width: "50%",
            marginRight: "auto",
            marginLeft: "auto",
            textAlign: "center",
            borderStyle: "dotted"
        }

        if(this.state.evaluationExecuted) {
            if (this.state.evaluation) {
                return (
                    <div>
                        <div className="container-fluid">
                            <div className="text-center">
                                <h1 id="title">Inquério de Satisfação - Sistema de Gestão de Qualidade</h1><br />
                                <div id="head">
                                    <p>Agradecemos a sua colaboração na resposta a este inquérito de satisfação.</p><br />
                                    <p>A nossa plataforma recebeu com sucesso a sua resposta.</p>
                                </div><br /><br />
                                <div style={logdata}> 2019-04-10 / 21:23:47 </div>
                                <br /><br />
                                <div id="goodbye">
                                    <p>Obrigado pela sua colaboração!<br /><br />O departamento de qualidade da JIBS.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <div className="container-fluid">
                            <div className="text-center">
                                <h1 id="title">Inquério de Satisfação - Sistema de Gestão de Qualidade</h1><br />
                                <div id="head">
                                    <p>Agradecemos a sua colaboração na resposta a este inquérito de satisfação.</p><br />
                                    <p>Já for registado anteriormente o seu nível de satisfação a este inquérito.</p>
                                </div><br /><br />
                                <div style={logdata}>Não é possivel submeter duas vezes o seu nível de satisfação ou alterar o mesmo!</div>
                                <br /><br />
                                <div id="goodbye">
                                    <p>Obrigado pela sua colaboração!<br /><br />O departamento de qualidade da JIBS.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } 
        else {
            return (<h1>Loading...</h1>);
        }
    };
}