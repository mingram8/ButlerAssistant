# ButlerAssistant

<h3>What is it?</h3>
<p>The app that runs alongside <a href="https://github.com/mingram8/Butler">Butler</a> It uses pocketsphinx to do voice to text and then relays the text to Butler to determine what to do with it. I set it up on a bunch of raspberry pis to stash around with house with microphones.</p>

<h3>How to use</h3>

<p>Do an NPM install, set up Butler's ip and port in the config/config.js file, and then in a seperate terminal, run pocketsphinx with:</p>

<p>pocketsphinx_continuous -hmm /usr/local/share/pocketsphinx/model/en-us/en-us -lm ~/5016.lm -dict ~/5016.dic -topn 2 -ds 2 -maxwpf 5 -samprate 16000/8000/48000 -fwdflat no -pl_window 10 -maxhmmpf 50 -bestpath no -adcdev plughw:1,0 -inmic yes > ~/ButlerAssistant/words.log</p>

<p>Or you can stream the audio to your desktop or beefier computer to do the pocketpshinx processing on with:</p>

<p>arecord -D plughw:1,0 -f S16_LE -r 16000 | ssh -C YOUR_USERNAME@YOUR_IP pocketsphinx_continuous -hmm /usr/local/share/pocketsphinx/model/en-us/en-us -dict YOUR_DICTIONARY.dic -lm YOUR_LANGUAGE_MODEL.lm -infile /dev/stdin > ~/ButlerAssistant/words.log</p>

<p>Replace plughw:1,0 with your card number, so if arecord -l says your microphone is on card 2, change it to plughw:2,0 . This allows you to avoid fiddling with getting the microphone to card 0. That will allow pocketsphinx to throw the words into a file that ButlerAssistant watches for changes and fires it off to Butler.</p>

