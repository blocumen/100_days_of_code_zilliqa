from pprint import pprint

from pyzil.crypto import zilkey
from pyzil.zilliqa import chain
from pyzil.zilliqa.units import Zil, Qa
from pyzil.account import Account, BatchTransfer

# init from bech32 address
account1 = Account(address="zil1xpl00tlcrvcwyjjd33tcj0au02ckyn7rgcu3wr")
print("address: {}".format(account1.address))
account2 = Account(address="zil1p2y6nwv3tpefadcv6uxdkc26dp2pkpcdg7anrs")
print("bech32 address: {}".format(account2.bech32_address))
assert account1 == account2

# tranfer to bech32 address
account = Account.from_mykey_txt("mykey.txt")
txn_info = account.transfer(to_addr="zil1p2y6nwv3tpefadcv6uxdkc26dp2pkpcdg7anrs", zils=0.01)
pprint(txn_info)
txn_id = txn_info["TranID"]