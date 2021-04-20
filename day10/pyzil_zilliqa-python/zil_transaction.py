
from pprint import pprint

from pyzil.crypto import zilkey
from pyzil.account import Account, BatchTransfer

account = Account(address="zil1xpl00tlcrvcwyjjd33tcj0au02ckyn7rgcu3wr")
balance = account.get_balance()
print("{}: {}".format(account, balance))