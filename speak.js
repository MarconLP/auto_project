function sprechen(text)
{
  console.log(text);
 
  var url = 'http://plaro.de/tts.php?text=';
  
  url = url + encodeURIComponent(text);

  audio = new Audio(url);
    audio.onended = function() {
    console.log("The audio has ended");
      spreche_liste();
      };
  audio.play();
}

window.sprechen_liste = Array();
function sprechen_warteliste(text, soll_ich_sprechen)
{
  window.sprechen_liste.push(text);
  
  console.log(window.sprechen_liste);
  
  if (soll_ich_sprechen)
    spreche_liste();
}

function spreche_liste()
{
  console.log('spreche_liste', window.sprechen_liste.length);
  
  if (window.sprechen_liste.length > 0)
    sprechen(window.sprechen_liste.shift());
}