const fetch = require('cross-fetch');
const JSSoup =  require('jssoup').default;

const decryptFile = (a) => {
    const words = ["_XDDD", "_CDA", "_ADC", "_CXD", "_QWE", "_Q5", "_IKSDE"];

    // first replace very cringy joke and other bad obfuscation
    words.map((item) => {
        a = a.replace(item, "");
    });

    // then apply decodeURIComponent
    a = decodeURIComponent(a);

    // store decrypted characters
    let b = []


    for (let e = 0; e < a.length; e++){
        let f = a[e].codePointAt(0);
        b.push((33 <= f && 126 >= f) ? String.fromCharCode(33 + (f + 14) % 94) : String.fromCharCode(f));
    }
    
    // decrypted URL
    a = b.join('');

    // more "obfuscation" to deal with
    a = a.replace(".cda.mp4", "");
    a = a.replace(".2cda.pl", ".cda.pl");
    a = a.replace(".3cda.pl", ".cda.pl");

    return `https://${a}.mp4`;
}

exports.extractVideo = async (id) => {
    const headers = {
        "Referer": "http://www.cda.pl",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
    };

    let url = `https://www.cda.pl/video/${id}`;
    const initRes = await fetch(url, {headers: headers});
    const res = await initRes.text();
    const bs = new JSSoup(res, "lxml");
    let quality = [];
    bs.findAll("a", {"class": "quality-btn"}).map((item) => {
        quality.push(item.string);
    });
    if (quality.length !== 0){
        url = `https://www.cda.pl/video/${id}?wersja=${quality[-1]}`;
    }
    const initRes2 = await fetch(url, {headers: headers});
    const res2 = await initRes2.text();
    const bs2 = new JSSoup(res2, "lxml");
    let data = bs2.findAll("div", {"player_data": true});
    const playerData = JSON.parse(data[0].attrs["player_data"]);
    return decryptFile(playerData["video"]["file"]);
}