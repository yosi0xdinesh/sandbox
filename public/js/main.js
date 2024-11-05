const collection = "skyedgegamex";
const endpoint = "https://wax.greymass.com";
let wallet_userAccount = "";
let display_nft = false;
let loggedIn = false;
const schema = "mysterybox";
const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint
});

// main();
async function main() {
    
    if (loggedIn) {
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("logout").style.visibility = "visible";
        const response = await fetch("getResource?" + new URLSearchParams({
            userAddress: wallet_userAccount
        }), {
            headers: {
                "Content-Type": "text/plain"
            },
            method: "GET"
        });
        const body = await response.json();
        if(body!=null) {
            document.getElementsByClassName('pos2')[0].insertAdjacentHTML('beforeend', body.amount);
        }
        let assets = await GetAssets();
        if (assets.length != 0) PopulateData(assets);
        else document.getElementById('autologin').textContent = 'No assets to display !';
    } else 
        await autoLogin(); 
}

async function autoLogin() {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
        wallet_userAccount = wax.userAccount;
        let pubKeys = wax.pubKeys;
        let str = 'Player: ' + wallet_userAccount

        document.getElementById('loginresponse').textContent = str;

        loggedIn = true;
        await main();
       }
}


async function login() {
    try {
        if (!loggedIn) {
            wallet_userAccount = await wax.login();
            let pubKeys = wax.pubKeys;
            let str = 'Player: ' + wallet_userAccount 
            document.getElementById('loginresponse').textContent = str;
            loggedIn = true;

            await main();

            const response = await fetch("getResource?" + new URLSearchParams({
                userAddress: wallet_userAccount
            }), {
                headers: {
                    "Content-Type": "text/plain"
                },
                method: "GET"
            });
            const body = await response.json();
            if(body!=null) {
                document.getElementsByClassName('pos2')[0].textContent = "RESOURCES :" + body.amount;
                document.getElementsByClassName('pos0')[0].textContent = "LEVEL :" + body.level;

            }
            else {
                let data = {
                    userAddress: wallet_userAccount,
                    amount: 0,
                    level: 1,
                    battleCount: 0,
                }
                const response1 = await fetch("/addresource", {
                    method: 'POST',
                    mode: 'cors', // this cannot be 'no-cors'
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const body1 = await response1.json();
            }
            
        }
    } catch (e) {
        document.getElementById('loginresponse').append(e.message);
    }
}

async function sign() {
    if (!wax.api) {
        return document.getElementById('response').append('* Login first *');
    }
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    from: wax.userAccount,
                    to: 'h5e2s.c.wam',
                    quantity: '0.00000001 WAX',
                    memo: '',
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });
    
    } catch (e) {
        document.getElementById('response').append(e.message);
    }
}
async function GetAssets() {
    let results = [];
    var path = "atomicassets/v1/assets?collection_name=" + collection + "&owner=" + wallet_userAccount + "&page=1&limit=1000&order=desc&sort=asset_id";
    const response = await fetch("https://" + "wax.api.atomicassets.io/" + path, {
        headers: {
            "Content-Type": "text/plain"
        },
        method: "POST",
    });
    const body = await response.json();
    if (body.data.length != 0)
        results = body.data;
    return results;
}
async function openMystery(a) {
    let results = [];
    
    const result = await wax.api.transact({
        actions: [{
            account: 'atomicassets',
            name: 'burnasset',
            authorization: [{
                actor: wax.userAccount,
                permission: 'active',
            }],
            data: {
                asset_owner: wax.userAccount,
                asset_id: a,
                
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
    if(result){
        let getResource = Math.floor(Math.random() * 450) + 50;
        const response = await fetch("getResource?" + new URLSearchParams({
            userAddress: wallet_userAccount
        }), {
            headers: {
                "Content-Type": "text/plain"
            },
            method: "GET"
        });
        const body = await response.json();
        console.log("body", body);
        if(body!=null) {
            var totalAmount = body.amount + getResource;
            let updateLevel = body.level + 1;
            document.getElementsByClassName('pos2')[0].textContent = "RESOURCES :" + totalAmount;
            document.getElementsByClassName('pos0')[0].textContent = "LEVEL :" + updateLevel;

            let data = {
                userAddress: wallet_userAccount,
                amount: totalAmount,
                level: body.level + 1,
                battleCount: body.battleCount,
            }
            const respons1 = await fetch("/updateResource", {
                method: 'POST',
                mode: 'cors', // this cannot be 'no-cors'
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const body1 = await respons1.json();

        }
        document.getElementById("openMystery").remove();
        document.getElementById(a).remove();


    }
    return results;
}
const PopulateData = async (assets) => {
    if (!display_nft) {
        var src = "https://ipfs.infura.io/ipfs/";
        for (const data of assets) {
            if(data.schema.schema_name != schema){
                continue;
            }
            var items = document.createElement('div');
            var div = document.createElement('div');
            div.id = "tablecontainer";
            items.className = "itemwrapper";

            img2 = document.createElement('BUTTON');
            let img_src = src + data.data.img;
            img2.className = 'nftimg';

            img2.style.backgroundImage = 'url(' + img_src + ')';
            items.appendChild(img2);
            let asset_id = data.asset_id;
            img2.id = asset_id;

            img2.onclick = async function () {
                document.getElementById('autologin').textContent = 'Selected Asset ID : #' + asset_id;
                document.getElementById('autologin').innerHTML = "<div>Selected Asset ID : #'" + asset_id + "</div> <button id = 'openMystery' onclick = openMystery(" + asset_id + ")>Open</button>";
            };

            var div2 = document.createElement('div');
           
            div2.style = "color:white;font-size:16px;font-family:Times New Roman, Times, serif;";
            items.appendChild(div2);

            div.appendChild(items);
            document.getElementById("maindiv").appendChild(items);
        }
        display_nft = true;
    }
}

const logout = async() => {
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("logout").style.visibility = "hidden";
    document.getElementById('autologin').textContent = '';
    document.getElementById('loginresponse').textContent = '';
    loggedIn = false;
    display_nft = false;
    wallet_userAccount = "";
    let scrolldiv = document.getElementById('maindiv');
    if (scrolldiv.children.length > 0) {
        var child = scrolldiv.lastElementChild;
        while (child) {
          scrolldiv.removeChild(child);
          child = scrolldiv.lastElementChild;
        }
    }
    document.getElementsByClassName('pos2')[0].textContent = "RESOURCES :" + "";
    document.getElementsByClassName('pos0')[0].textContent = "LEVEL :" + "";
}