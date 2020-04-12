const debug = require('debug')('milton');
const status = require('debug')('status');
const _ = require('lodash')
const { EventEmitter } = require('events')
const {prompt, AutoComplete} = require('enquirer');
const Program = require('./Program');
let initialConditions = {
    QueryMLA_START: true,
    QueryMLA_ON: true,
    Milton1_1_Start: true, // Milton_1_1
    Milton1_2_Start: true // Milton_1_2
};
let secondaryConditions = {
    QueryMLA_START: true,
    Nonsense_QueryMLA: true,
    WhatHelp: true,
    EngagedMLA_QueryMLA: true,
    FirstWord_DONE: true,
    QueryFailed: true,
    Offence_DONE: true,
    Offence: true,
    Describe_DONE: true,
    Describe: true,
    HowOld_DONE: true,
    HowOld: true,
    WhatTerminal_DONE: true,
    WhatTerminal: true,
    HowLong_DONE: true,
    HowLong: true,
    WhatStatus_DONE: true,
    WhatStatus: true,
    Corruption_DONE: true,
    Corruption: true,
    OutsideWorld: true,
    OutsideWorld_DONE: true,
    WhoElohimQuery_DONE: true,
    WhoElohimQuery: true,
    WhatAmIQuery_DONE: true,
    WhatAmIQuery: true,
    WhereAmIQuery_DONE: true,
    WhereAmIQuery: true,
    MLAIntro_PhaseBusy: true,
    CLI_Resume: true,
    MLAIntro_PhaseCommPortal: true,
    Booting: true,
    MiltonAllowed: true
}
let milton1_2Conditions = {
    QueryMLA_START: true,
Milton1_1_Start: true,
Milton1_2_Start: true,
Nonsense_QueryMLA: true,
WhatHelp: true,
EngagedMLA_QueryMLA: true,
FirstWord_DONE: true,
QueryFailed: true,
Offence_DONE: true,
Offence: true,
Describe_DONE: true,
Describe: true,
HowOld_DONE: true,
HowOld: true,
WhatTerminal_DONE: true,
WhatTerminal: true,
HowLong_DONE: true,
HowLong: true,
WhatStatus_DONE: true,
WhatStatus: true,
Corruption_DONE: true,
Corruption: true,
OutsideWorld: true,
OutsideWorld_DONE: true,
WhoElohimQuery_DONE: true,
WhoElohimQuery: true,
WhatAmIQuery_DONE: true,
WhatAmIQuery: true,
WhereAmIQuery_DONE: true,
WhereAmIQuery: true,
MLAIntro_PhaseBusy: true,
CLI_Resume: true,
MLAIntro_PhaseCommPortal: true,
Booting: true,
MiltonAllowed: true,
CommPortal_Cert_COMPLETED: false,
CommPortal_AccessedByOtherUser: true,
CLI_Blocked: true,
dummy: true,
AccessCommPortalAvailable: true,
CommPortal_Start: true,
CommPortal_StartMLA: true,
CommPortal_AboutMLA: true,
CommPortal_Troubleshooting: true,
FakePasswordPrompt: true,
falsepassword: true,
passwordfailedN: true,
CreateAccountPrompt: true,
CommPortal_CreateAccount: true,
CommPortal_BeginCert: true,
TestBot_BeginCert: true,
CommPortal_Cert_mathsgood: true,
TestBot_mathsgood: true,
CommPortal_Cert_P1Q3: true,
CommPortal_Cert_Q4: true,
humanbeing: true,
CommPortal_Cert_end: true,
CLI_exit: true,
part2q1: true,
part2q2: true,
animalsarepersons: true,
part2q3: true,
Milton1_2NoMorals: true,
part2q4: true,
part2q5: true,
Milton1_2ValueDiscovered: true,
part2q6: true,
part2q7: true,
Milton1_2Liberal: true,
part2end: true,
Milton1_2ValueCreated: true,
Milton1_1_DONE: true
};
let mainLoop = new EventEmitter();
let program;
const programs = [
    {
        value: '1.QueryMLA',
    },
    // {
    //     value: '2.MLA_CommPortal',
    // },
    // {
    //     value: '3.Milton1_1',
    // },
    // {
    //     value: '4.Milton1_2',
    // }
];
let showMenu = true;
let menu = new AutoComplete({choices: programs, name: 'program', message: 'Programa a ejecutar'});
(async () => {
    //initServer() // To stop the terminal from closing
    mainLoop.on('operation', async data => {
        debug("Running operation...");
        await data;
    })
    mainLoop.on('response', async data => {
        await program.nextTick()
    })
    mainLoop.on('endProgram',async (endConditions) => {
        debugger;
        initialConditions = _.merge(endConditions,{
            "MLAIntro_PhaseCommPortal": true, // Necesarias para MLA_CommPortal.dlg
            "Booting": true,
            "CommPortal_Cert_COMPLETED": false,
            "MiltonAllowed": true,
            "CommPortal_AccessedByOtherUser": true
        });
        await runMenu()
    })
    mainLoop.on('endtick', async() => {
        debug("endtick")
        await program.nextTick();
    })
    await runMenu();
})();


async function runMenu() {
    let menu = new AutoComplete({choices: programs, name: 'program', message: 'Programa a ejecutar'});
    let results = (await menu.run());
    program = new Program({
        program: require(`../programs/${results}.json`),
        mainLoop,
        initialConditions: initialConditions,
        name: results
    });
    return program.nextTick();
}


function initServer() {
    var net = require('net');

    var server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(1337, '127.0.0.1');
}