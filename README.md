# CSS IA 1 : AES ENCRYPTION
#### Darshil Mehta - 1911007
#### Divesh Thakker - 1911061
#### Kush Vora - 1911064

## Abstract:
We have studied the popular AES encryption which is
heavily used by the US Government for protecting sensitive data.
We have implemented the encryption in JavaScript, because
we want this implementation to be useful in websites, especially
which run on JS Backend (Node). We have made use of the
JSAES library for the same.

## Work Done:
1. We have developed an Express Based Node Web Application powered by MongoDB database at the backend for developing a secure login system backed by the AES Encryption.
2. We have incorporated various functionalities and security aspects in our login system.
3. The encryption keys can have lengths of 128 bits (16 bytes), 192 bits (24 bytes) or 256 bits (32 bytes) long. We have used the 128 bits (16 bytes) key in our application. This can be changed based on the level of security the application requires.
4. We can have several cryptography modes of operations viz. Counter CTR Mode, Cipher Block Chaining CBC Mode, Cipher Feedback CFB Mode, Output Feedback OFB Mode, Electronic Codebook ECB Mode. We have used the CTR Counter Mode.
5. The database always stores the encrypted password, therefore the system is end-to-end encrypted. The verification takes place by fetching the encrypted values from the database and thereby determining the access.
6. The aim is to provide performance and security on the web. We have achieved an optimized performance for our application along with highly secure authorization. 

Mongo DB Database storing encrypted password.

![database](https://user-images.githubusercontent.com/52334437/154425754-bfe0dbb3-a1ee-48c9-b2fd-d6bfc8ad3dab.jpeg)

## Reusability
We have developed a codebase which can be used by anyone trying to implement AES Encryption into their system / application. The codebase is public and the AES Encrypt and AES Verify functions can be used for solving the problem.
