import random

# let mod = 13 as prime
# g is base generator


#mod = 13

mod = random.getrandbits(1024)
g = 6

print("public info ----->")
print("mod :",mod)
print("base generator ",g)

thanga_private = random.getrandbits(1024)

# need to calculate thanga public key
thangaPublic = pow(g, thanga_private, mod)

print("\n thanga public : \n",thangaPublic)

#need to calculate vidhya public key
vidhya_private = random.getrandbits(1024)
vidhyaPublic = pow(g, vidhya_private, mod)

print("\n vidhya public : \n",vidhyaPublic)


thangaShared = pow(vidhyaPublic,thanga_private,mod)
vidhyShared = pow(thangaPublic,vidhya_private,mod)

print("\n thanga shared :\n",thangaShared)
print("\n vidhya sharedd : \n",vidhyShared)

# now thanga shared and vidhya shared should be equal

# yes !!!!!! now how can above shared keys can be used ?

message = "hi vidhya, here is my secret mes"

from Crypto.Cipher import AES

#create new object
obj = AES.new(str(thangaShared)[0:32])

#now encrypt
ciphertext = obj.encrypt(message)
print("encrypted ->",ciphertext)

#vidhya will decrypt
objdecrypt = AES.new(str(vidhyShared)[0:32])

restored_plaintext = objdecrypt.decrypt(ciphertext)

print("decrypted text ------------- <>",restored_plaintext)



