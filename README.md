# Quick Note 2

Symetricaly, client-side encrypted web based note app with a rich text editor.

## Synopsis
Notes are encrypted and 'locked' by a key on the client, the server works only with the encrypted data. Uses a hash to ensure that no one can override your note; currently doesn't support changing of a key.

Either ``npm install && node initdb.js && node index.js`` or build a docker image using the dockerfile and run it

``localhost:300/n/<myNoteName>``
will lead you to a note. If it is free you can claim it by saving it 

![Example Image](http://store.picbg.net/pubpic/39/21/faa220f2d3693921.png)

## Why 2 ?
In Early 2017 I decided to create an app like that. I remember spending a lot more time than I should have on it.
In one of my late night coding sessions I decided to re build this app a few years later to see how much faster I can build it, what I will and won't be happy with.

Good Things:
- did something in a few 30 minute intervals over a couple of nights that a couple of years ago took me over a week of active development
- I did the research much faster

Bad Things:
- Still no automated tests
- Again lost interest after reaching a prototype level

## Configuration
This project is at prototype level; Currently no configuration is avaliable, default port is port ``3000``


## License
MIT, use as you wish
