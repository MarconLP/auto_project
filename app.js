var phasen = [];

var morgen = {
  dauer: 10,
  name: 'morgen',
  hintergrundbild: 'http://de.best-wallpaper.net/wallpaper/1920x1080/1303/Park-the-morning-sun-the-green-trees-and-grass_1920x1080.jpg',
  dings: function() {
    console.log('die function in der phase morgen wurde ausgeführt');
  }
};
phasen.push(morgen);

var mittag = {
  dauer: 10,
 name: 'mittag',
  hintergrundbild: 'http://images.fotocommunity.de/bilder/landschaft/lebensraeume/mittagssonne-7a768cb0-f985-4b56-b30e-2a8e4385b787.jpg'
};
phasen.push(mittag);

var abend = {
  dauer: 10,
  name: 'abend',
  hintergrundbild:'http://www.taramah.de/galerie/abendmond.jpg'
};
phasen.push(abend);

var nacht = {
  dauer: 10,
  name: 'nacht',
  hintergrundbild:'http://pics.sterngucker.de/userpics/astronomie-sternhimmel-sterne-mond-planeten-346308.gr.jpg'
};
phasen.push(nacht);



//var aktuelle_phase = 0;



//console.log(phasen);

//console.log(phasen[aktuelle_phase].dauer);

setTimeout(function() {
  phasen_aendern(0);
}, 1000);


tag = 0;

function phasen_aendern(phase)
{
  console.log(phase);
  
  if (phasen[phase].name == morgen.name)
    {
      sprechen ()
  tag = tag + 1;
      sprechen_warteliste('Es ist Tag ' + tag)
    }
  
  console.log('Es ist Tag', tag);
  
  sprechen_warteliste(phasen[phase].name, true);

  if (phasen[phase]['hintergrundbild'])
  {
    console.log(phasen[phase]['hintergrundbild']);
    $('body').css('background-image', 'url(' + phasen[phase]['hintergrundbild'] + ')');
  }
  else
    console.log('kein bild haben wir hier', phasen[phase]['hintergrundbild']);
  
  if (phasen[phase]['dings'])
    phasen[phase].dings();
  else
    console.log('keine function haben wir hier');
  
  setTimeout(function() {
    console.log('set time out für nächste phase');
    
    
    if (phasen.length <= phase + 1)
      phasen_aendern(0);
    else
      phasen_aendern(phase + 1);
    
  }, phasen[phase].dauer * 1000);
}

new soundBoardListener([
  {
    regex: /welcher tag/,
    fnc: function() {
      sprechen(tag);
    }
  }
]);

/*
sprechen_warteliste('mittag');
sprechen_warteliste('abend');
sprechen_warteliste('nacht');
sprechen_warteliste('tag ist zuende');
sprechen_warteliste('hab ich doch schon gesagt der tag ist zuende');

spreche_liste();
*/