<template>
    
<div>
    <NavBar />
</div>

      

     
  
      <div class="container">
        <div class="button-group">
        <button @click="openSection('kitchen')">Küche und Haushalt</button>
        <button @click="openSection('garten')">Garten</button>
        <button @click="openSection('kochen')">Kochen</button>
        <button @click="openSection('bad')">Bad und Toilette</button>
        <button @click="openSection('waschen')">Waschen</button>
        <button @click="openSection('heizen')">Heizen</button>
        <button @click="openSection('kühlen')">Kühlen und spülen</button>
        <button @click="openSection('beleuchtung')">Beleuchtungen</button>
        <button @click="openSection('fahrzeug')">Fahrzeuge</button>
      </div>
    </div>
  
      <div v-for="(section, index) in sections" :key="index" class="containerCardsTipp">
        <div v-show="activeSection === section.id" class="tippsCard">
          <h1>{{ section.title }}</h1>
          <h4 @click="closeSection(section.id)">X</h4>
          <ul>
            <li v-for="(tip, tipIndex) in section.tips" :key="tipIndex">
                <div class="tipTitle">
                    <span class="bullet"></span>
              <p class="title">{{ tip.title }}</p>
            </div>
              <p>{{ tip.description }}</p>
            </li>
          </ul>
        </div>
      </div>

      

     
   
  </template>
  
  <script>



 import NavBar from "./NavBar.vue";

export default {
  name: "SaveTipps",
    components: {
        NavBar,
    },

    
    data() {
        return {
            activeSection: null,
            sections: [
                {
                    id: "kitchen",
                    title: "Küche und Haushalt",
                    tips: [
                        {
                            title: "Regionale Produkte kaufen",
                            description: "Kaufen Sie regionale Produkte - das spart überflüssige Transportwege",
                        },
                        {
                            title: "Fleisch reduzieren oder verzichten",
                            description: "Um CO2 zu sparen, sollten Sie in Betracht ziehen, weniger oder gar kein Fleisch zu konsumieren, da die Transportwege des Fleisches sehr lang sind",
                        },
                        {
                            title: "Produkte aus Bio-Anbau kaufen",
                            description: "Bio-Landwirtschaften greifen im Vergleich zur herkömmlichen Landwirtschaft nur auf ein Drittel so vieler fossiler Energieträger zurück",
                        },
                        {
                            title: "Recyclingpapier kaufen",
                            description: "Für die Herstellung von Recyclingpapier werden weniger Energie und Wasser benötigt",
                        },
                        {
                            title: "Nachfüllpacks kaufen",
                            description: "Bevorzugen Sie diese Packs, damit sparen Sie an Müll, dazu zählen auch Einkaufstaschen",
                        },
                        {
                            title: "Getränke in Mehrwegflaschen kaufen",
                            description: "Beim Kauf von Getränken und auch von Milch, Joghurt und anderen Molkereiprodukten sollte man zu denjenigen greifen, deren Verpackungen mehrmals verwendbar sind",
                        }
                        // Weitere Tipps für diesen Abschnitt hinzufügen
                    ],
                },
                {
                    id: "garten",
                    title: "Garten",
                    tips: [
                        {
                            title: "Weniger Chemie im Garten",
                            description: "Verwenden Sie organische Dünger, wie z.B. Kompost, Hornspäne oder Stallmist, die die Bodenfruchtbarkeit aufbauen und pflanzen Sie Pflanzen, die standortangepasst sind",
                        },
                        {
                            title: "Vermeiden Sie Gartenerde mit Torf",
                            description: "Für den Torfabbau werden ökologisch besonders wertvolle Moore zerstört. Verwenden Sie Gartenerde mit Torfersatz"
                        },
                        // Weitere Tipps für diesen Abschnitt hinzufügen
                    ],
                },
                {
                    id: "kochen",
                    title: "Kochen",
                    tips: [
                        {
                            title: "Mikrowelle seltener benutzen",
                            description: "Die Mikrowelle hat einen hohen Stromverbrauch. Nutzen Sie das Gerät daher eher seltener ",
                        },
                        {
                            title: "Gefrorene Lebensmittel rechtzeitig auftauen",
                            description: "Lassen Sie die gefrorenen Lebensmittel rechtzeitig auftauen. Legen Sie das Produkt in den Kühlschrank damit wird der Kühlschrank gekühlt und das Produkt wird trotzdem aufgetaut",
                        },
                        {
                            title: "Kochen mit Deckel",
                            description: "Schließen Sie mit dem Deckel den Topf. Ein offener Topf erhört den Energieverbrauch da es länger dauert bis es sich erwärmt. Ebenfalls benutzen Sie den passenden Deckel.",
                        },
                        {
                            title: "Schnellkochplatte verwenden/Energie sparend kochen",
                            description: "Verwenden Sie die Schnellkochplatte und Schnellkochtöpfe, um die Kochzeit zu verringern.Kochen Sie mit einer möglichst geringen Menge Wasser und schalten Sie die Kochplatte rechtzeitig aus, um die Nachhitze zu nutzen",
                        },
                        {
                            title: "Wasserkocher statt Herd benutzen",
                            description: "Geben Sie nur soviel Wasser in den Wasserkocher wie Sie benötigen. Das spart Energie und Zeit",
                        },
                    ],
                },
                {
                    id: "bad",
                    title: "Bad und Toilette",
                    tips: [
                        {
                            title: "Duschen statt Baden",
                            description: "Ziehen Sie eine Dusche dem Vollbad vor und duschen Sie nicht länger als nötig",
                        },
                        {
                            title: "Wasserhahnzudrehen",
                            description: "Wenn Sie einen Niederdruck-Brausekopf in Ihre Dusche einbauen, begrenzen Sie Ihren Warmwasserverbrauch. Damit sparen Sie mehr als die hälfte der Energie",
                        },
                        {
                            title: "Niederdruck-Brausekopf installieren",
                            description: "Nutzen Sie eine Spülstopp- bzw. Spartaste um den Wasserverbrauch zu senken.",
                        },
                    ],
                },
                {
                    id: "waschen",
                    title: "Waschen",
                    tips: [
                        {
                            title: "Bei niedriger Temperatur waschen",
                            description: "Kleidung bei 90 Grad zu waschen ist heutzutage in der Regel unnötig. Auf die Vorwäsche verzichten und waschen Sie ihre Sache bei 40 Grad das reicht völlig aus",
                        },
                        {
                            title: "Waschmaschinentrommel ganz füllen",
                            description: "Nutzen Sie die Füllmenger der waschtrommel. Weniger Wäsche in der Trommel bedeutet in der regel mehr Waschvorgänge",
                        },
                        {
                            title: "Auf den Trockner verzichten",
                            description: "Der Trockner verbraucht noch mehr Strom als die Waschmaschine, daher trocknen Sie ihre Sachen im Haus,Wohnung oder an der frischen Luft ",
                        },
                    ],
                },
                {
                    id: "heizen",
                    title: "Heizen",
                    tips: [
                        {
                            title: "Türen und Fenster abbdichten",
                            description: "Achten Sie darauf das die Dichtungen bei den Fenstern nicht kaputt ist. Türen gegebenenfalls Abdichten.",
                        },
                        {
                            title: "Heizung nachts zurückdrehen",
                            description: "Heizung in der Nacht zurückdrehen, den falls Sie sie abschalten braucht die Heizung am nächsten Tag mehr Energie um wieder den Raum zu erwärmen",
                        },
                        {
                            title: "Heizung nicht voll aufdrehen/verdecken",
                            description: "Vermeiden Sie, die Heizung auf vollen Touren laufen zu lassen. Ein Grad weniger Raumtemperatur spart Energie und Geld. Stellen Sie keine Möbel vor den Heizkörper, der Wärmefluss ist nicht mehr gegeben.",
                        },
                        {
                            title: "Stoßlüften",
                            description: "Im Winter ein paar Minuten Stoßlüften, damit verhindern Sie einen zu großen Wärmeverlust des Raumes.",
                        },
                        {
                            title: "Thermostatventile",
                            description: "Schon eine um ein Grad Celsius höhere Raumtemperatur lässt den Energieverbrauch um fünf bis sechs Prozent steigen.Thermostatventile welche beim Erreichen der gewünschten Temperatur automatisch drosseln, sollten deshalb an keinem Heizkörper fehlen.",
                        },
                    ],
                },
                {
                    id: "kühlen",
                    title: "Kühlen",
                    tips: [
                        {
                            title: "Kühlschrank nicht unnötig lange öffnen",
                            description: "Der Kühlschrank gehört zu den größten Stromfressern im Haushalt. Das Gerät braucht weniger Strom, wenn die Türen nicht länger als notwendig geöffnet werden. Nach dem Einkauf benötigt das gerät den meisten Strom, da es die Lebensmittel herunterkühlen muss.",
                        },
                        {
                            title: "Kühlschrank bei Vereisung abtauen",
                            description: "Wenn sich im Tiefkühlfach  Ihres Kühlschrankes eine Eisschicht gebildet hat, sollten Sie diese abtaue, denn diese erhöht den Stromverbrauch.",
                        },
                        {
                            title: "Kühlschrank bei längerer Abwesenheit abschalten",
                            description: "Wenn Sie mehrer Wochen nicht zu Hause sind, schalten Sie das Gerät ab.",
                        },
                        {
                            title: "Geschirrspüler",
                            description: "Lassen Sie den Geschirrspüler im Energiesparmodus laufen, so ist der Verbrauch wesentlich geringer. Ebenso schalten Sie das gerät nur ein wenn es voll ist.",
                        },
                    ],
                },
                {
                    id: "beleuchtung",
                    title: "Beleuchtung",
                    tips: [
                        {
                            title: "Energiespar- und LED-Lampen",
                            description: "Glühbirnen verbrauchen bei gleicher Helligkeit fünfmal soviel Strom wie Energiesparlampen. Zwischen 5.000 und 15.000 Stunden reicht das Leben einer Energiepsarlampe gegenüber nur 1.000 bei der Glühbirne.",
                        },
                        {
                            title: "Elektrogeräte abschalten",
                            description: "Fernseh-,DVD oder ähnliche Geräte sollten Sie besser nicht nur mit der Fernbedienung abschalten sondern kaufen Sie sich eine abschaltbare Steckleiste, da die Geräte im Stand-by-Modus weiter Strom ziehen.",
                        },
                        {
                            title: "Akkus leeren",
                            description: "Bevor Sie akkubetriebene Geräte wie Handys oder elektrische Zahnbürsten auflade, sollten diese fast leer sein. Denn auch wenn Sie diese mit vollem Akku ans Netz anschließe, ziehen sie kontinuierlich Strom.",
                        },
                        {
                            title: "Akkus statt Batterien",
                            description: "Akkus können Sie wieder aufladen. Bei Battereien entsteht Müll und Sie können sie nicht wieder verwenden.",
                        },
                    ],
                },
                {
                    id: "fahrzeug",
                    title: "Fahrzeuge",
                    tips: [
                        {
                            title: "Fahrrd und öffentliche Verkehrsmittel nutzen",
                            description: "Für kurze Strecken sollten Sie das Auto stehen lassen und auf Fahrrad oder öffentliche Verkehrsmittel umsteigen.",
                        },
                        {
                            title: "Flüge vermeiden",
                            description: "Nach wie vor stoßen Flugzeuge eine hohe Menge an Schadstoffen aus. Gerade Inlandsflüge lassen sich vermeiden. Aber auch bei Fernreisen steht Ihnen die Wahl von Bahn oder Bus zur verfügung, diese sind Umweltfreundlicher.",
                        },
                        {
                            title: "Fahrgemeinschaften nutzen",
                            description: "Kennen Sie KollegInnen, die denselben Arbeitsweg haben wie Sie? Dann sprechen Sie sich zusammen und bilden eine Fahrgemeinschaft, Sie sparen Geld und schonen die Umwelt. Beim fahren können sie sich immer wieder abwechseln.",
                        },
                        {
                            title: "Motor nicht warm laufen lassen",
                            description: "Lassen Sie den Motor nicht warmlaufen. Fahren Sie direkt nach dem starten los.",
                        },
                        {
                            title: "Autokauf",
                            description: "Achten Sie beim Kauf eines Neuwagens auf den Spritverbrauch und die Emissionswerte und beziehen Sie ihre Lebensumstände mit ein. Sollten Sie in der Stadt wohnen, bevorzugen Sie die öffenltichen Verkehrsmittel.",
                        },
                    ],
                },
                
            ],
        };
    },
    methods: {
        openSection(sectionId) {
            this.activeSection = sectionId;
        },
        closeSection() {
      this.activeSection = null;
    },
  },
};
</script>





<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}



.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 15%;
  padding-top: 150px;
  background: #4b4c52;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

button {
  width: 200px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  margin: 10px;
}



button:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

button:hover {
  background-color: #2c974b;
}

button:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

button:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

button:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

.icon-wrapper {
  margin-right: 5px;
}

.containerCardsTipp {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
}

.tippsCard {
    position: absolute;
    top: 115px;
  width: 100%;
  height: auto;
  max-width: 800px;
  background-color: #f6f8e2;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.tippsCard h1 {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
}

.tippsCard h4 {
  position: absolute;
  top: 0px;
  right: 20px;
  cursor: pointer;
}

.tippsCard ul {
  padding: 0;
  margin: 0;
}

.tippsCard li {
  list-style-type: none;
  margin-bottom: 10px;
}

.tipTitle {
  display: flex;
  align-items: center;
}

.bullet {
  width: 8px;
  height: 8px;
  background-color: #2ea44f;
  border-radius: 50%;
  margin-right: 10px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>