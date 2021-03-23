from bitcoin import *

# private keys
a = random_key()
b = random_key()
c = random_key()
d = random_key()
e = random_key()

print("Private keys: ")
print(a)
print(b)
print(c)
print(d)
print(e)

# public keys
p1 =  privtopub (a) 
p2 =  privtopub (b)
p3 =  privtopub (c)
p4 =  privtopub (d)
p5 =  privtopub (e)

print("Public keys: ")
print(p1)
print(p2)
print(p3)
print(p4)
print(p5)


k = 2 # signitures required
n = 5 # keys generated

script =  mk_multisig_script ([p1 ,p2 ,p3 ,p4 ,p5], k, n)
address = scriptaddr(script)

print('\n')
print("multi_sig", script)

print('\n')
print("script address" , address)

# unspentData = unspent(address)
# print(unspentData)

# unspentOutput = unspentData["output"]
# print("\n")
# print("unspent output : ",unspentOutput)


spendSats = 10000 # satoshis to spend
# addSpend = '<------ to adddress -------->' # address to receive new transaction
# tx =  mktx (unspentOutput, addSpend+':'+str(spendSats))
# print(tx)

# # Now, let’s sign it with keys 1 and 3:
# sig1 =  multisign (tx, 0, script, k1)
# sig2 =  multisign (tx, 0, script, k3)

# tx2 =  apply_multisignatures (tx, 0, script, [sig1, sig2])
# print(tx2)

# # And now we push:
# eligius_pushtx (tx2 )