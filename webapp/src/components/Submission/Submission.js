import React from 'react';

const Submission = () => {

    const logdata = {
        fontSize: "30px",
        color: "red",
        width: "50%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        borderStyle: "dotted"
    }

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
                            <p>Test</p><br />
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
}

export default Submission;