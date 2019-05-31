import React, { useState, useEffect } from 'react';
import '../../configs';
const axios = require('axios');

const Submission = (props) => {

    const logdata = {
        fontSize: "30px",
        color: "red",
        width: "50%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        borderStyle: "dotted"
    }


    const params = new URLSearchParams(props.location.search);
    const score = params.get('score'); 
    const issueId = params.get('issueId');

    console.log(score);

    const [evaluation, setEvaluation] = useState([]);

    const fetchEvaluation = async () => {
        const data = await fetch(global.apiBaseURL + "/evaluation/" + issueId + "?score=" + score).then(dataPromise => dataPromise.json()).then(data => {
            setEvaluation(true);
        });
    };

    fetchEvaluation();

    if(evaluation == true) {
        const isOk = false;
        if (isOk) {
            return (
                <div className="App">
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
                <div className="App">
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
}

export default Submission;