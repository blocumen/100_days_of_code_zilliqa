var my_block_hash = "0000000000000000000a5d6d7c63a46399a522c86b042ee1755f13a68659cc38";
var bitcoin_api_url = "https://blockchain.info/rawblock/";
async function getBlockInfo() {
    let response = await fetch(bitcoin_api_url.concat(my_block_hash));
    let my_json = await response.json();
    return my_json;
}
getBlockInfo().then(my_json => console.log(my_json));