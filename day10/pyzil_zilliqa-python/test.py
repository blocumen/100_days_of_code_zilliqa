from pyzil.zilliqa.api import ZilliqaAPI, APIError
from pprint import pprint

api = ZilliqaAPI("https://api.zilliqa.com/")
print(api)

info = api.GetBlockchainInfo()
pprint(info)

sharding = api.GetShardingStructure()
pprint(sharding)
print("sharding",sharding)

ds_block = api.GetCurrentDSEpoch()
print("ds block",ds_block)
pprint(ds_block)

tx_block = api.GetCurrentMiniEpoch()
print("get current mini ds epoch",tx_block)
pprint(tx_block)
