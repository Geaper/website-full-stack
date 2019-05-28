import React from 'react';

const Submission = () => {
    return (
        <div className="App">
            <head>
                <title>Inquérito de Satisfação</title>
            </head>
            <body>
                <h1 id="title">Inquério de Satisfação - Sistema de Gestão de Qualidade</h1><br/>
                <div id="head">
                    <p>Agradecemos a sua colaboração na resposta a este inquérito de satisfação.</p><br/>
                    <p>A nossa plataforma recebeu com sucesso a sua resposta.</p>
                </div><br /><br />
                <div id="logdata"> 2019-04-10 / 21:23:47 </div>
                <br /><br />
                <div id="goodbye">
                    <p>Obrigado pela sua colaboração!<br /><br />O departamento de qualidade da JIBS.</p>
                </div>
            </body>
        </div>
    );
}

export default Submission;