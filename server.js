const a0_0x5c494a=a0_0x1a35;function a0_0x31c0(){const _0x1d1a45=['clearActivity','Failed\x20to\x20clear\x20Rich\x20Presence:','5bEhNCO','558138RvDyLz','10MDRRxr','10587665UPATPh','send','209932buEhcr','win32','close','platform','log','discord','error','Connected\x20to\x20Discord\x20RPC.','destroy','89202JNYoAK','child_process','9JzvfHW','catch','🎤\x20By:\x20','stringify','login','1499384pVjYbU','message','WebSocket\x20server\x20listening\x20on\x20ws://localhost:','nrfm_rpc_asset','includes','songTitle','ps\x20aux','112acyGiG','1204250fQSMwR','requestSongData','then','tasklist','Nightride.fm','toLowerCase','artistName','discord-rpc','connection','4666FzmyVn','Failed\x20to\x20connect\x20to\x20Discord\x20RPC:','setActivity','🎶\x20Song:\x20','Discord\x20RPC\x20disconnected.\x20Resetting\x20connection...','Server'];a0_0x31c0=function(){return _0x1d1a45;};return a0_0x31c0();}(function(_0x5aab1a,_0x1fc125){const _0x21da2b=a0_0x1a35,_0x3bd32f=_0x5aab1a();while(!![]){try{const _0x3d6e7c=parseInt(_0x21da2b(0xb2))/0x1*(-parseInt(_0x21da2b(0xbc))/0x2)+-parseInt(_0x21da2b(0xbb))/0x3+parseInt(_0x21da2b(0xbf))/0x4*(-parseInt(_0x21da2b(0xba))/0x5)+parseInt(_0x21da2b(0xc8))/0x6*(-parseInt(_0x21da2b(0xa8))/0x7)+-parseInt(_0x21da2b(0xa1))/0x8*(parseInt(_0x21da2b(0x9c))/0x9)+-parseInt(_0x21da2b(0xa9))/0xa+parseInt(_0x21da2b(0xbd))/0xb;if(_0x3d6e7c===_0x1fc125)break;else _0x3bd32f['push'](_0x3bd32f['shift']());}catch(_0x324247){_0x3bd32f['push'](_0x3bd32f['shift']());}}}(a0_0x31c0,0x25d38));const WebSocket=require('ws'),{Client}=require(a0_0x5c494a(0xb0)),{exec}=require(a0_0x5c494a(0xc9)),PORT=0x1f90;let rpcClient=null,lastActivity=null,activeClient=null,isRpcConnected=![];function isDiscordRunning(){const _0x2de6ac=a0_0x5c494a,_0x3654f2=process[_0x2de6ac(0xc2)]===_0x2de6ac(0xc0)?_0x2de6ac(0xac):_0x2de6ac(0xa7);return new Promise(_0x5d11bb=>{exec(_0x3654f2,(_0x1e2923,_0x3da271)=>{const _0xc56de4=a0_0x1a35;if(_0x1e2923)return console['error']('Error\x20checking\x20Discord\x20process:',_0x1e2923['message']),_0x5d11bb(![]);_0x5d11bb(_0x3da271[_0xc56de4(0xae)]()[_0xc56de4(0xa5)](_0xc56de4(0xc4)));});});}function initializeRPC(){const _0x3f06e8=a0_0x5c494a;rpcClient&&(rpcClient[_0x3f06e8(0xc7)](),console[_0x3f06e8(0xc3)]('Previous\x20RPC\x20client\x20destroyed.\x20Initializing\x20a\x20new\x20session...')),rpcClient=new Client({'transport':'ipc'}),rpcClient[_0x3f06e8(0xa0)]({'clientId':'1317193583714893944'})[_0x3f06e8(0xab)](()=>{const _0x766c54=_0x3f06e8;console[_0x766c54(0xc3)](_0x766c54(0xc6)),isRpcConnected=!![],lastActivity&&rpcClient[_0x766c54(0xb4)](lastActivity)['catch'](_0x3ef887=>{const _0x41f62b=_0x766c54;console['error']('Failed\x20to\x20restore\x20Rich\x20Presence:',_0x3ef887[_0x41f62b(0xa2)]);});})[_0x3f06e8(0x9d)](_0x16d9a0=>{const _0x4fcf75=_0x3f06e8;console[_0x4fcf75(0xc5)](_0x4fcf75(0xb3),_0x16d9a0['message']),isRpcConnected=![];}),rpcClient['on']('disconnected',()=>{const _0x2d8a43=_0x3f06e8;console[_0x2d8a43(0xc3)](_0x2d8a43(0xb6)),isRpcConnected=![];});}async function monitorDiscordAndReconnect(){const _0x308748=await isDiscordRunning();_0x308748?!isRpcConnected&&initializeRPC():isRpcConnected=![],setTimeout(monitorDiscordAndReconnect,0x2710);}function a0_0x1a35(_0xe048d7,_0x55de8a){const _0x31c004=a0_0x31c0();return a0_0x1a35=function(_0x1a35f2,_0x129bb5){_0x1a35f2=_0x1a35f2-0x9c;let _0x13a11f=_0x31c004[_0x1a35f2];return _0x13a11f;},a0_0x1a35(_0xe048d7,_0x55de8a);}const wss=new WebSocket[(a0_0x5c494a(0xb7))]({'port':PORT},()=>{const _0x2c4c68=a0_0x5c494a;console['log'](_0x2c4c68(0xa3)+PORT);});wss['on'](a0_0x5c494a(0xb1),_0x3bee80=>{const _0x27f9c4=a0_0x5c494a;activeClient=_0x3bee80,_0x3bee80[_0x27f9c4(0xbe)](JSON[_0x27f9c4(0x9f)]({'type':_0x27f9c4(0xaa)})),_0x3bee80['on'](_0x27f9c4(0xa2),async _0x15a6e5=>{const _0x3d3d4a=_0x27f9c4;try{const _0x17943b=JSON['parse'](_0x15a6e5);if(_0x17943b[_0x3d3d4a(0xa6)]&&_0x17943b['artistName']){const _0x4753e4={'details':_0x3d3d4a(0xb5)+_0x17943b[_0x3d3d4a(0xa6)],'state':_0x3d3d4a(0x9e)+_0x17943b[_0x3d3d4a(0xaf)],'largeImageKey':_0x3d3d4a(0xa4),'largeImageText':_0x3d3d4a(0xad)};lastActivity=_0x4753e4,isRpcConnected&&rpcClient[_0x3d3d4a(0xb4)](_0x4753e4)[_0x3d3d4a(0x9d)](_0x214797=>console[_0x3d3d4a(0xc5)]('Error\x20updating\x20Rich\x20Presence:',_0x214797));}}catch(_0x435f65){console['error']('Error\x20processing\x20WebSocket\x20message:',_0x435f65);}}),_0x3bee80['on'](_0x27f9c4(0xc1),async()=>{const _0x5d8c05=_0x27f9c4;activeClient=null,isRpcConnected&&rpcClient[_0x5d8c05(0xb8)]()[_0x5d8c05(0x9d)](_0x455fba=>console[_0x5d8c05(0xc5)](_0x5d8c05(0xb9),_0x455fba)),lastActivity=null;});}),monitorDiscordAndReconnect();